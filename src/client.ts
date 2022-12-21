import { InstantConnectProxy } from "prismarine-proxy";
import mc_protocol from "minecraft-protocol";
const { ping } = mc_protocol;
type NewPingResult = mc_protocol.NewPingResult;
import { readdirSync } from "fs";
import { Logger, version } from "./utils/logger.js";
const logger = new Logger();

import type { Settings } from "./interfaces/settings.js"
import type { Command } from "./commands/CommandBase.js";

export class P22 {
	commands = new Map<string, Command>();

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

					const description = `                    §kX§r §6P22 - v${version} §r§kX§r\n`;
					hypixel.description = hypixel.description.toString().replace(/.*\n/, description);

					if (callback) callback(null, hypixel);
				},
			},
			clientOptions: {
				version: this.settings.proxy.version,
				host: this.settings.proxy.host
			}
		})

		logger.info("loading commands");
		await this.loadCommands();

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
}