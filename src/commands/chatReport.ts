// @ts-ignore - Technically not allowed to import those but who cares :)
import type { PacketMeta, ServerClient, Client } from "prismarine-proxy";
import prismarine_chat from "prismarine-chat";
// @ts-ignore - Haven't found a better way
const MessageBuilder = prismarine_chat("1.8.9").MessageBuilder;
import { CommandBase, Command } from "./CommandBase.js";
import { Logger } from "../utils/logger.js";
const logger = new Logger();

import { sleep } from "../utils/utils.js";

export default class extends CommandBase implements Command {
	constructor() {
		super({
			name: "chatreport",
			description: "A shortcut for chat reporting",
			aliases: [
				"cr",
				"creport"
			],
			enabled: true
		});
	}

	execute = async (args: string[], data: any, meta: PacketMeta, toClient: ServerClient, toServer: Client) => {
		for (const user of args) {
			toServer.write("chat", {
				message: `/creport ${user}`
			});

			await sleep(500); // Delay because Hypixel isn't instant :)

			toServer.write("chat", {
				message: `/report confirm`
			});
		}
	}
}