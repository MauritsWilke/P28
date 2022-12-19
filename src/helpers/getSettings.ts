import { parse } from "toml";
import { readFileSync } from "fs";
import type { Settings } from "../interfaces/settings";

export function getSettings() {
	try {
		const settings = parse(readFileSync("./settings.toml", "utf-8"));

		// validate settings?

		return settings as Settings;
	} catch (e) {
		return null;
	}
}