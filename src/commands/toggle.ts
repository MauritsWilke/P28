// @ts-ignore - Technically not allowed to import those but who cares :)
import type { PacketMeta, ServerClient, Client } from "prismarine-proxy";
import prismarine_chat from "prismarine-chat";
// @ts-ignore - Haven't found a better way
const MessageBuilder = prismarine_chat("1.8.9").MessageBuilder;
import { CommandBase, Command } from "./CommandBase.js";
import { Logger } from "../utils/logger.js";
const logger = new Logger();

import type { P22 } from "../client.js";
import type { Module } from "../modules/ModuleBase.js";

export default class extends CommandBase implements Command {
	constructor() {
		super({
			name: "toggle",
			description: "toggle commands and modules",
			aliases: [
				"tl"
			],
			enabled: true
		});
	}

	execute = async (args: string[], data: any, meta: PacketMeta, toClient: ServerClient, toServer: Client, proxyClient: P22) => {
		if (args[0]?.match(/command/)) {
			const command = proxyClient.commands.get(args[1])
			if (!command) return;
			command.settings.enabled = !command.settings.enabled;

			const successMessage = new MessageBuilder()
				.setText(`The command ${command.settings.name} is now ${command.settings.enabled ? "enabled" : "disabled"}`)
				.toString();

			toClient.write("chat", { message: successMessage });
		} else if (args[0]?.match(/module/)) {
			// @ts-ignore
			const module = proxyClient.modules[args[1]] as Module;
			if (!module) return;
			module.settings.enabled = !module.settings.enabled;

			const successMessage = new MessageBuilder()
				.setText(`The module ${module.settings.name} is now ${module.settings.enabled ? "enabled" : "disabled"}`)
				.toString();

			toClient.write("chat", { message: successMessage });
		}

		proxyClient.updateSettings();
	}
}