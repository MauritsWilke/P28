// @ts-ignore
import type { PacketMeta, ServerClient, Client } from "prismarine-proxy"

interface CommandSettings {
	name: string,
	description: string,
	aliases: string[],
	enabled: boolean
}

export class CommandBase {
	constructor(
		public settings: CommandSettings
	) { }
}

export interface Command extends CommandBase {
	execute: (args: string[], data: any, meta: PacketMeta, toClient: ServerClient, toServer: Client) => void
}