import { getSettings } from "./helpers/getSettings.js"
import { P22 } from "./proxy.js";

const settings = getSettings();
if (!settings) throw new Error("No settings found");
const proxy = new P22(settings).startProxy();

proxy.on("incoming", (data, meta, client, server) => {
	client.write(meta.name, data);
})

proxy.on("outgoing", (data, meta, client, server) => {
	server.write(meta.name, data);
})