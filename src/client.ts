import { InstantConnectProxy } from "prismarine-proxy";
import mc_protocol from "minecraft-protocol";
const { ping } = mc_protocol;
type NewPingResult = mc_protocol.NewPingResult;
import { readdirSync } from "fs";
import { Logger, version } from "./utils/logger.js";
const logger = new Logger();

// @ts-ignore - Technically not allowed to import those but who cares :)
import type { PacketMeta, ServerClient, Client } from "prismarine-proxy";
import type { Settings } from "./interfaces/settings.js"
import type { Command } from "./commands/CommandBase.js";
import type { Module, ModuleReturn } from "./modules/ModuleBase.js";

export class P22 {
	commands = new Map<string, Command>();
	modules: Module[] = [];

	constructor(public settings: Settings) { }

	startProxy = async () => {
		const config = this.settings;
		logger.info("starting proxy");

		const proxy = new InstantConnectProxy({
			loginHandler: (client: any) => {
				return {
					username: client.username,
					auth: "microsoft"
				}
			},
			serverOptions: {
				validateChannelProtocol: false,
				port: this.settings.proxy.port,
				async beforePing(response, client, callback) {
					let hypixel = await ping({
						host: config.proxy.host,
						version: config.proxy.version
					}) as NewPingResult;

					const description = `                    §kX§r §6P28 - v${version} §r§kX§r\n`;
					hypixel.description = hypixel.description.toString().replace(/.*\n/, description);

					if (callback) callback(null, hypixel);
				},
				version: this.settings.proxy.version,
			},
			clientOptions: {
				version: this.settings.proxy.version,
				host: this.settings.proxy.host
			}
		})

		logger.info("loading commands");
		await this.loadCommands();

		logger.info("loading modules");
		await this.loadModules();

		logger.info(`proxy started using version ${this.settings.proxy.version}`);
		return proxy;
	}

	loadCommands = async () => {
		const commandFiles = readdirSync("./dist/commands");

		for (const file of commandFiles) {
			if (file === "CommandBase.js") continue;
			const { default: CommandBase } = await import(`./commands/${file}`);
			const command = new CommandBase as Command;

			logger.info(`adding command ${command.settings.name}`);
			this.commands.set(command.settings.name, command);

			for (const alias of command.settings.aliases) {
				this.commands.set(alias, command);
			}
		}
	}

	loadModules = async () => {
		const moduleFiles = readdirSync("./dist/modules");

		for (const file of moduleFiles) {
			if (file === "ModuleBase.js") continue;
			const { default: ModuleBase } = await import(`./modules/${file}`);
			const module = new ModuleBase as Module;

			logger.info(`adding module ${module.settings.name}`);
			this.modules.push(module)
		}
	}

	parsePacket = async (data: any, meta: PacketMeta, toClient: ServerClient, toServer: Client, type: "incoming" | "outgoing"): Promise<ModuleReturn> => {
		let shouldSend = true;
		for (const module of this.modules) {
			if (!module.settings.enabled) continue;
			try {
				let response;
				if (type === "incoming") response = await module.parseIncoming(data, meta, toClient, toServer);
				else response = await module.parseOutgoing(data, meta, toClient, toServer);

				[data, meta] = [response.data, response.meta];

				if (response.intercept) shouldSend = false;
			} catch (e) {
				logger.error(`error trying to run ${module.settings.name}`);
				logger.error(`${e}`);
			}
		}

		return { intercept: shouldSend, data: data, meta: meta };
	}
}