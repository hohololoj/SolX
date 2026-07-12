import { reactive } from "vue";

export const providerPresets = [
	{
		name: 'OpenAI',
		url: 'api.openai.com',
		model: 'gpt-4o'
	},
	{
		name: 'Anthropic',
		url: 'api.anthropic.com',
		model: 'claude-3-5-sonnet-20241022'
	},
	{
		name: 'Gemini',
		url: 'generativelanguage.googleapis.com',
		model: 'gemini-1.5-pro'
	},
	{
		name: 'Local',
		url: 'localhost:1234',
		model: ''
	}
]
export const SettingLocalId = 3;

export interface Settings{
	baseUrl: string,
	token: string,
	model: string,
	activePreset: number,
	port: string,
	temperature: number
}

const getPort = () => window.location.port;

const settings = reactive<Settings>({
	baseUrl: 'localhost:1234',
	token: '',
	model: '',
	activePreset: SettingLocalId,
	port: getPort(),
	temperature: 0.7
});

async function writeConfig() {
	return fetch('/config', {
		method: 'POST',
		body: JSON.stringify(settings),
		headers: { 'Content-Type': 'application/json' }
	})
}

async function compareSettings(resSettings: Settings){
	const {port: savedPort, ...savedRest} = resSettings;
	const newSettings = {
		...savedRest,
		port: settings.port
	};
	Object.assign(settings, newSettings);
	if(savedPort !== settings.port){
		return writeConfig();
	}
	return;
}

async function loadSettings(){
	const response = await fetch('/config.json');
	if(!response.ok){
		return writeConfig();
	}
	const resSettings = await response.json() as Settings;
	await compareSettings(resSettings);
}
await loadSettings();


export function useSettings(){

	function setActivePreset(id: number){
		const preset = providerPresets[id];
		if(!preset){
			alert(`Preset with id = ${id} doesn't exists`);
			return;
		}
		settings.baseUrl = preset.url;
		settings.token = '';
		settings.model = preset.model;
		settings.activePreset = id;
	}

	return {
		settings,
		setActivePreset,
		writeConfig
	}
}