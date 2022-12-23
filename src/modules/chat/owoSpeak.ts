// @ts-ignore - Technically not allowed to import those but who cares :)
import type { PacketMeta, ServerClient, Client } from "prismarine-proxy";

import { ModuleBase, Module } from "../ModuleBase.js";
import { Logger } from "../../utils/logger.js";
import type { P22 } from "../../client.js";
const logger = new Logger();

const allowedCommands = [
	"shout",
	"msg",
	"message",
	"tell",
	"whisper",
	"w",
	"r",
	"reply",
	"oc",
	"ac",
	"gc",
	"pc"
]

export default class extends ModuleBase implements Module {
	constructor() {
		super({
			name: "owoSpeak",
			description: "M-Make youw chat wook wike this :3",
			enabled: true
		});
	}

	parseIncoming = async (data: any, meta: PacketMeta, toClient: ServerClient, toServer: Client) => {
		return { intercept: false, data: data, meta: meta };
	}

	parseOutgoing = async (data: any, meta: PacketMeta, toClient: ServerClient, toServer: Client, proxyClient: P22) => {
		if (meta.name === "chat") {
			const regex = new RegExp(`${allowedCommands.map(v => `/${v}\s`).join("|")}`, "gi");
			if (data.message[0] === "/" && !data.message.match(regex)) return { intercept: false, data: data, meta: meta };

			let splitMessage = data.message.split(" ") as string[];
			const prefix = data.message.match(regex) ? splitMessage.shift() : null;
			console.log(prefix)
			const suffixes = ["UwU", "OwO", "XwX", ":3", "rawr"];

			splitMessage = splitMessage.map(word => word.replaceAll(/L|R/g, "W").replaceAll(/l|r/g, "w"));
			splitMessage = splitMessage.map(word => {
				if (Math.random() < 0.2 && word.length > 4) {
					const chars = Math.random() < 0.5 ? 1 : 2;
					return `${word.slice(0, chars)}-${word}`;
				}
				return word;
			})

			if (Math.random() < 0.5) {
				const randomIndex = Math.floor(Math.random() * suffixes.length);
				splitMessage.push(suffixes[randomIndex]);
				if (Math.random() < 0.2) splitMessage[-1] = splitMessage[-1].toLowerCase();
			}

			if (prefix) data.message.unshift(prefix);
			data.message = splitMessage.join(" ");

			return { intercept: false, data: data, meta: meta }
		}

		return { intercept: false, data: data, meta: meta };
	}
}