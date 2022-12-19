import { getSettings } from "./helpers/getSettings.js"
import { P22 } from "./client.js";

const settings = getSettings();
if (!settings) throw new Error("No settings found"); // LOG AND CREATE DEFAULT SETTINGS :)
const prefix = settings.settings.prefix

const client = new P22(settings);
const proxy = await client.startProxy();

proxy.on("incoming", (data, meta, toClient, toServer) => {
	toClient.write(meta.name, data);
})

proxy.on("outgoing", (data, meta, toClient, toServer) => {
	let shouldSend = true;

	if (meta.name === "chat") {
		const message = data.message.split(" ") as string[];
		const possibleCommand = message[0];
		const args = message.slice(1);

		if (!possibleCommand.startsWith(prefix)) return;
		const commandName = possibleCommand.slice(prefix.length);
		const command = client.commands.get(commandName);
		if (!command) return;
		command?.execute(data, meta, toClient, toServer);

		shouldSend = false;
	}

	if (shouldSend) toServer.write(meta.name, data);
})