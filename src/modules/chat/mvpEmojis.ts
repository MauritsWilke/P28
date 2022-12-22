// @ts-ignore - Technically not allowed to import those but who cares :)
import type { PacketMeta, ServerClient, Client } from "prismarine-proxy";

import { ModuleBase, Module } from "../ModuleBase.js";
import { Logger } from "../../utils/logger.js";
import type { P22 } from "../../client.js";
const logger = new Logger();

const emojis = {
	"<3": "❤",
	":star:": "✮",
	":yes:": "✔",
	":no:": "✖",
	":java:": "☕",
	":arrow:": "➜",
	":shrug:": "¯\\_(ツ)_/¯",
	":tableflip:": "(╯°□°）╯︵ ┻━┻",
	"o/": "( ﾟ◡ﾟ)/",
	":123:": "123",
	":totem:": "☉_☉",
	":typing:": "✎...",
	":maths:": "√(π+x)=L",
	":snail:": "@'-'",
	":thinking:": "(0.o?)",
	":gimme:": "༼つ◕_◕༽つ",
	":wizard:": "('-')⊃━☆ﾟ.*･｡ﾟ",
	":pvp:": "⚔",
	":peace:": "✌",
	":oof:": "OOF",
	":puffer:": "<('O')>",
	":yey:": "ヽ (◕◡◕) ﾉ",
	":cat:": "= ＾● ⋏ ●＾ =",
	":dab:": "<o/",
	":dj:": "ヽ(⌐■_■)ノ♬",
	":snow:": "☃",
	"^_^": "^_^",
	"h/": "ヽ(^◇^*)/",
	"^-^": "^-^",
	":sloth:": "(・⊝・)",
	":cute:": "(✿◠‿◠)",
	":dog:": "(ᵔᴥᵔ)"
}

export default class extends ModuleBase implements Module {
	constructor() {
		super({
			name: "mvpEmojis",
			description: "Why pay?",
			enabled: true
		});
	}

	parseIncoming = async (data: any, meta: PacketMeta, toClient: ServerClient, toServer: Client) => {
		return { intercept: false, data: data, meta: meta };
	}

	parseOutgoing = async (data: any, meta: PacketMeta, toClient: ServerClient, toServer: Client, proxyClient: P22) => {
		if (meta.name === "chat") {
			for (const [key, value] of Object.entries(emojis)) {
				const regex = new RegExp(key, "gi");
				data.message = data.message.replaceAll(regex, value);
			}

			return { intercept: false, data: data, meta: meta };
		}

		return { intercept: false, data: data, meta: meta };
	}
}