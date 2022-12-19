import { InstantConnectProxy } from "prismarine-proxy";
import { readdirSync } from "fs";
import { resolve } from "path";

import type { Settings } from "./interfaces/settings.js"
import type { Command } from "./commands/CommandBase.js";

export class P22 {
	commands = new Map<string, Command>();

	constructor(public settings: Settings) { }

	startProxy = async () => {
		const proxy = new InstantConnectProxy({
			loginHandler: (client: any) => {
				return {
					username: client.username,
					auth: "microsoft"
				}
			},
			serverOptions: {
				version: this.settings.proxy.version,
				validateChannelProtocol: false,
				motd: "P22 - v0.0.1",
				maxPlayers: 1,
			},
			clientOptions: {
				version: this.settings.proxy.version,
				host: this.settings.proxy.host
			}
		})

		await this.loadCommands();

		return proxy;
	}

	loadCommands = async () => {
		const commandFiles = readdirSync("./dist/commands");

		for (const file of commandFiles) {
			if (file === "CommandBase.js") continue;
			const { default: CommandBase } = await import(`./commands/${file}`);
			const command = new CommandBase as Command;

			this.commands.set(command.name, command);

			for (const alias of command.aliases) {
				this.commands.set(alias, command);
			}
		}
	}
}