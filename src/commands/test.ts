// @ts-ignore
import type { PacketMeta, ServerClient, Client } from "prismarine-proxy"
import { CommandBase, Command } from "./CommandBase.js";


export default class extends CommandBase implements Command {
	constructor() {
		super("test", "test")
	}

	execute = (data: any, meta: PacketMeta, toClient: ServerClient, toServer: Client) => {
		console.log("WORKING")
	}
}