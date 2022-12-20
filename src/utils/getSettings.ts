import { parse } from "toml";
import { readFileSync, copyFileSync } from "fs";
import type { Settings } from "../interfaces/settings.js";
import { Logger } from "./logger.js";
const logger = new Logger();

export function getSettings() {
	try {
		const settings = parse(readFileSync("./settings.toml", "utf-8"));

		// validate settings?

		return settings as Settings;
	} catch (e) {
		logger.warn("no settings file was found, creating a default one");

		copyFileSync("./dist/utils/settingsTemplate.toml", "settings.toml");
		const settings = parse(readFileSync("./settings.toml", "utf-8"));
		return settings;
	}
}