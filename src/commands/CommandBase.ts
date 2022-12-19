// @ts-ignore
import type { PacketMeta, ServerClient, Client } from "prismarine-proxy"

export class CommandBase {
	constructor(
		public name: string,
		public description = "This command has no description (yet)",
		public aliases: string[] = [],
		public enabled = true,
	) { }
}

export interface Command extends CommandBase {
	execute: (data: any, meta: PacketMeta, toClient: ServerClient, toServer: Client) => void
}