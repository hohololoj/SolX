import { onMounted, reactive } from "vue";
import { useSettings } from "./useSettings";

export const enum WindowsList{
	CHAT = 1,
	PRESETS = 2,
	SETTINGS = 3
}

export interface Game{
	name: string,
	genre: string,
	description: string,
	tags: string[],
	sysPrompt: string
}
export interface EditGame{
	name: string,
	genre: string,
	description: string,
	tags: string,
	sysPrompt: string,
	id: number
}
export type GamesList = Game[];

interface GlobalAppState{
	activeWindow: WindowsList,
	AIActive: boolean,
	games: GamesList,
	selectedEditGame: EditGame | null,
	selectedGameIdToDelete: number | null,
	selectedPlayGameId: number | null
}

const {settings} = useSettings();

async function checkAI(){
	try{
		const res = await fetch(`${settings.baseUrl}/v1/models`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${settings.token}`
		}
		});
		return res;
	}
	catch{
		return false;
	}
}

const state = reactive<GlobalAppState>({
	activeWindow: WindowsList.PRESETS,
	AIActive: false,
	games: [],
	selectedEditGame: null,
	selectedGameIdToDelete: null,
	selectedPlayGameId: null
});

async function writePresets(){
	return fetch('/presets', {
		method: 'POST',
		body: JSON.stringify(state.games),
		headers: {'Content-Type': 'application/json'}
	})
}

async function loadPresets() {
	const res = await fetch('/presets.json', {
		cache: 'no-store'
	});
	if (!res.ok) {
		return writePresets();
	}
	const presets = await res.json();
	state.games = presets;
}
await loadPresets();
export function useGlobalState(){

	function setActiveWindow(window: WindowsList){
		state.activeWindow = window;
	}

	function pushGame(game: EditGame){
		const {tags, id, ...rest} = game;
		state.games.push({
			...rest,
			tags: tags.replace(/\s/g, '').split(',')
		})
		writePresets();
	}
	function updateGame(game: EditGame){
		const {tags, id, ...rest} = game;
		state.games[id] = {
			...rest,
			tags: tags.replace(/\s/g, '').split(',')
		}
		writePresets();
	}
	function deleteGame(id: number){
		state.games.splice(id, 1);
		writePresets();
	}

	return{
		state: state,
		setActiveWindow,
		pushGame,
		updateGame,
		deleteGame,
		checkAI
	}
}