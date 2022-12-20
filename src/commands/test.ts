// @ts-ignore - Technically not allowed to import those but who cares :)
import type { PacketMeta, ServerClient, Client } from "prismarine-proxy";
import prismarine_chat from "prismarine-chat";
// @ts-ignore - Haven't found a better way
const MessageBuilder = prismarine_chat("1.8.9").MessageBuilder;
import { CommandBase, Command } from "./CommandBase.js";
import { Logger } from "../utils/logger.js";
const logger = new Logger();

export default class extends CommandBase implements Command {
	constructor() {
		super({
			name: "test",
			description: "a testing command",
			aliases: [],
			enabled: true
		});
	}

	execute = (args: string[], data: any, meta: PacketMeta, toClient: ServerClient, toServer: Client) => {
		logger.info(`test command was ran with these args: ${args}`);

		const testMessage = new MessageBuilder()
			.setText(`test command was ran with these args: ${args}`)
			.toString();

		toClient.write("chat", {
			message: testMessage
		});

		toServer.write("chat", {
			message: "test"
		})
	}
}