import { getSettings } from "./utils/getSettings.js"
import { P22 } from "./client.js";
import { Logger } from "./utils/logger.js";
import type { Settings } from "./interfaces/settings.js";
const logger = new Logger();

const settings = getSettings() as Settings;
const prefix = settings.settings.prefix;

const client = new P22(settings);
const proxy = await client.startProxy();

proxy.on("incoming", async (data, meta, toClient, toServer) => {
	let shouldSend = true;

	// For some reason custom_payload just crashes the modules...
	if (meta.name !== "custom_payload") {
		const response = await client.parsePacket(data, meta, toClient, toServer, "incoming");
		shouldSend = response.intercept;
		[data, meta] = [response.data, response.meta];
	}

	if (shouldSend) toClient.write(meta.name, data);
})

proxy.on("outgoing", async (data, meta, toClient, toServer) => {
	let shouldSend = true;

	if (meta.name === "chat") {
		const message = data.message.split(" ") as string[];
		const possibleCommand = message[0];
		const args = message.slice(1);

		if (possibleCommand.startsWith(prefix)) {
			const commandName = possibleCommand.slice(prefix.length);
			const command = client.commands.get(commandName);
			if (command?.settings.enabled) {
				try {
					logger.info(`running command ${commandName}`);
					await command.execute(args, data, meta, toClient, toServer, client);

				} catch (e) {
					const msg = `{"text":"Something went wrong running ${commandName}, please check the logs."}`;
					toClient.write("chat", { message: msg });
					logger.error(`${e}`);
				}

				shouldSend = false;
			}
		}
	}

	const response = await client.parsePacket(data, meta, toClient, toServer, "outgoing");
	if (shouldSend) shouldSend = response.intercept;
	[data, meta] = [response.data, response.meta];

	if (shouldSend) toServer.write(meta.name, data);
})