import { InstantConnectProxy } from "prismarine-proxy";

import type { Settings } from "./interfaces/settings.js"

export class P22 {
	constructor(public settings: Settings) { }

	startProxy = () => {
		const proxy = new InstantConnectProxy({
			loginHandler: (client: any) => {
				return {
					username: client.username,
					auth: "microsoft"
				}
			},
			serverOptions: {
				version: this.settings.proxy.version,
				validateChannelProtocol: false,
				motd: "P22 - v0.0.1",
				maxPlayers: 1,
			},
			clientOptions: {
				version: this.settings.proxy.version,
				host: this.settings.proxy.host
			}
		})

		return proxy;
	}
}