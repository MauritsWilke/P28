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
import type { Player } from "../interfaces/player.js";

export default class extends CommandBase implements Command {
	constructor() {
		super({
			name: "requeue",
			description: "requeue the last game you played",
			aliases: [
				"rq"
			],
			enabled: true
		});
	}

	execute = async (args: string[], data: any, meta: PacketMeta, toClient: ServerClient, toServer: Client, proxyClient: P22, player: Player) => {

		if (!player.lastGame) {
			const message = new MessageBuilder()
				.setText(`You haven't played any games yet!`)
				.toString();
			toClient.write("chat", { message: message });

			return;
		} else toServer.write("chat", { message: `/play ${player.lastGame.toLowerCase()}` })
	}
}