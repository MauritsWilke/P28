// @ts-ignore - Technically not allowed to import those but who cares :)
import type { PacketMeta, ServerClient, Client } from "prismarine-proxy";
import type { P22 } from "../client.js";
import type { Player } from "../interfaces/player.js";

import { ModuleBase, Module } from "./ModuleBase.js";
import { Logger } from "../utils/logger.js";
const logger = new Logger();

export default class extends ModuleBase implements Module {
	constructor() {
		super({
			name: "locraw",
			description: "Locraw is used to track the player lobby location. Disable at own risk ",
			enabled: true
		});
	}

	parseIncoming = async (data: any, meta: PacketMeta, toClient: ServerClient, toServer: Client, proxyClient: P22, player: Player) => {
		if (meta.name === "respawn") {
			toServer.write("chat", { message: "/locraw" });
		}

		if (meta.name === "chat" && data.message.match(/"{\\"server\\":/)) {
			const jsonMessage = JSON.parse(data.message);
			const jsonText = JSON.parse(jsonMessage.text);

			const keys = ["server", "gametype", "lobbyname", "mode", "map"] as const;

			keys.forEach(key => {
				player.location[key] = jsonText?.[key] ?? null;
			});

			if (jsonText?.["mode"]) player.lastGame = jsonText["mode"];

			console.log(player)

			return { intercept: true, data: data, meta: meta }
		}

		return { intercept: false, data: data, meta: meta };
	}

	parseOutgoing = async (data: any, meta: PacketMeta, toClient: ServerClient, toServer: Client) => {
		// if (meta.name === "chat") return { intercept: true, data: data, meta: meta };

		return { intercept: false, data: data, meta: meta };
	}
}