// @ts-ignore - Technically not allowed to import those but who cares :)
import type { PacketMeta, ServerClient, Client } from "prismarine-proxy";
import prismarine_chat from "prismarine-chat";
// @ts-ignore - Haven't found a better way
const MessageBuilder = prismarine_chat("1.8.9").MessageBuilder;
import { CommandBase, Command } from "./CommandBase.js";
import { Logger } from "../utils/logger.js";
import type { P22 } from "../client.js";
const logger = new Logger();

export default class extends CommandBase implements Command {
	constructor() {
		super({
			name: "reload",
			description: "reload commands and modules",
			aliases: [
				"rl"
			],
			enabled: true
		});
	}

	execute = async (args: string[], data: any, meta: PacketMeta, toClient: ServerClient, toServer: Client, proxyClient: P22) => {
		if (args[0].match(/module/)) await proxyClient.reloadModules();
		else if (args[0].match(/command/)) await proxyClient.reloadCommands();
		else {
			await proxyClient.reloadCommands();
			await proxyClient.reloadModules();
		}
	}
}