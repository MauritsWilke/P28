export const EmptyPlayer = {
	username: null,
	location: {
		server: null,
		gametype: null,
		lobbyname: null,
		mode: null,
		map: null
	},
	lastGame: null
} satisfies Player;

export interface Player {
	username: string | null,
	location: Location,
	lastGame: string | null
}

export interface Location {
	server: string | null,
	gametype: string | null,
	lobbyname: string | null,
	mode: string | null,
	map: string | null
}