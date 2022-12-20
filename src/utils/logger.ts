import { appendFileSync, readdirSync, mkdirSync, writeFileSync } from "fs";

const getTimestamp = () => `[${new Date().toISOString().split("T")}]`;

export class Logger {
	private debugChar = "[debug]";
	private errorChar = "[error]";
	private warnChar = "[warn]";

	private logFile = getLogFile();

	debug = (message: string) => {
		const timestamp = getTimestamp();
		const formatted = `${timestamp} ${this.debugChar} ${message}`;
		console.log(formatted);
		appendFileSync(this.logFile, `${formatted}\r\n`);
	}

	error = (message: string) => {
		const timestamp = getTimestamp();
		const formatted = `${timestamp} ${this.errorChar} ${message}`;
		console.log(formatted);
		appendFileSync(this.logFile, `${formatted}\r\n`);
	}

	warn = (message: string) => {
		const timestamp = getTimestamp();
		const formatted = `${timestamp} ${this.warnChar} ${message}`;
		console.log(formatted);
		appendFileSync(this.logFile, `${formatted}\r\n`);
	}
}

function getLogFile() {
	try {
		readdirSync("./logs");
	} catch (e) {
		mkdirSync("./logs");
	}

	try {
		const fileName = `./logs/${Date.now()}.p28`;
		writeFileSync(fileName, `${getTimestamp()} [init] log initialised\r\n`);
		return fileName;
	} catch (e) {
		console.log(e);
		throw new Error("Failed to create log file.");
	}
}