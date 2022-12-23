export interface Settings {
	proxy: {
		host: string,
		version: string,
		port: number,
	}

	settings: {
		prefix: string,
		locale: string
	}

	modules: {
		[key: string]: boolean
	}

	commands: {
		[key: string]: boolean
	}
}