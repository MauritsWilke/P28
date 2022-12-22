// @ts-ignore - Technically not allowed to import those but who cares :)
import type { PacketMeta, ServerClient, Client } from "prismarine-proxy";

import { ModuleBase, Module } from "./ModuleBase.js";
import { Logger } from "../utils/logger.js";
import type { P22 } from "../client.js";
const logger = new Logger();

export default class extends ModuleBase implements Module {
	constructor() {
		super({
			name: "Shrug",
			description: "¯\\_(ツ)_/¯",
			enabled: true
		});
	}

	parseIncoming = async (data: any, meta: PacketMeta, toClient: ServerClient, toServer: Client) => {
		return { intercept: false, data: data, meta: meta };
	}

	parseOutgoing = async (data: any, meta: PacketMeta, toClient: ServerClient, toServer: Client, proxyClient: P22) => {
		if (meta.name === "chat") {
			if (data.message === "/shrug") data.message = "¯\\_(ツ)_/¯";
			data.message = data.message.replaceAll(":shrug:", "¯\\_(ツ)_/¯");
			return { intercept: false, data: data, meta: meta };
		}

		return { intercept: false, data: data, meta: meta };
	}
}