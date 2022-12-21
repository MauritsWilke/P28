// @ts-ignore
import type { PacketMeta, ServerClient, Client } from "prismarine-proxy"

interface ModuleSettings {
	name: string,
	description: string,
	enabled: boolean
}

export class ModuleBase {
	constructor(
		public settings: ModuleSettings
	) { }
}

export interface ModuleReturn {
	intercept: boolean,
	data: any,
	meta: PacketMeta
}

export interface Module extends ModuleBase {
	parseIncoming: (data: any, meta: PacketMeta, toClient: ServerClient, toServer: Client) => Promise<ModuleReturn>
	parseOutgoing: (data: any, meta: PacketMeta, toClient: ServerClient, toServer: Client) => Promise<ModuleReturn>
}