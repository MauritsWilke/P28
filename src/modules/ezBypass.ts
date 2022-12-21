// @ts-ignore - Technically not allowed to import those but who cares :)
import type { PacketMeta, ServerClient, Client } from "prismarine-proxy";

import { ModuleBase, Module } from "./ModuleBase.js";
import { Logger } from "../utils/logger.js";
const logger = new Logger();

export default class extends ModuleBase implements Module {
	constructor() {
		super({
			name: "ezBypass",
			description: "Bypass the ez block with special characters",
			enabled: true
		});
	}

	parseIncoming = async (data: any, meta: PacketMeta, toClient: ServerClient, toServer: Client) => {
		return { intercept: false, data: data, meta: meta };
	}

	parseOutgoing = async (data: any, meta: PacketMeta, toClient: ServerClient, toServer: Client) => {
		if (meta.name === "chat") {
			data.message = data.message.replaceAll(/\sez(\s|$)/, " ｅｚ ");
			return { intercept: false, data: data, meta: meta }
		}

		return { intercept: false, data: data, meta: meta };
	}
}