import { stringify } from "@iarna/toml";
import { writeFileSync, copyFileSync } from "fs";
import type { Settings } from "../interfaces/settings.js";
import { Logger } from "./logger.js";
const logger = new Logger();

export function updateSettings(settings: Settings) {
	try {
		writeFileSync("./settings.toml", stringify(settings as any));

	} catch (e) {
		logger.warn("no settings file was found, creating a default one");

		copyFileSync("./dist/utils/settingsTemplate.toml", "settings.toml");
	}
}