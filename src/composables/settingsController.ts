import { providerPresets, SettingLocalId } from "@/consts/providers";
import { reactive } from "vue"
import type { ComposerType } from "./useComposer";

export interface Settings{
	baseUrl: string,
	token: string,
	model: string,
	usedProvider: number,
	temperature: number,
	maxTokens: number,
	maxTokensPerMessage: number
}

type ParseSettingsResult = Settings | false;

type ObjectLike = Record<string, unknown>;
type SettingsLike = Record<keyof Settings, unknown>;

export class SettingsController{

	state!: Settings;
	composer: ComposerType
	constructor(composer: ComposerType){
		this.composer = composer;
	}

	private validateSettingsStructure(obj: ObjectLike): boolean{
		const presentKeys = new Set(Object.keys(obj));
		const neededKeys = Object.keys(this.state);
		for(const neededKey of neededKeys){
			if(!presentKeys.has(neededKey)){
				console.log(`WARN: Отсутствует обязательное поле ${neededKey} в сохраненных настройках`);
				return false;
			}
		}
		return true;
	}

	private validateSettingsValues(settings: SettingsLike): boolean{
		
		const settingsValidators: Record<keyof Settings, (v: unknown) => boolean> = {
			baseUrl: (v): v is string => typeof v === "string",
			usedProvider: (v): v is number => (typeof v === "number") && (v > 0 && v < providerPresets.length),
			maxTokens: (v): v is number => (typeof v === "number") && Number.isInteger(v) && v >= 0,
			maxTokensPerMessage: (v): v is number => (typeof v === "number") && Number.isInteger(v) && v >= 0,
			model: (v): v is string => typeof v === "string",
			temperature: (v): v is number => (typeof v === "number") && (v <= 1 && v >= 0),
			token: (v): v is string => (typeof v === "string")
		}
		
		for(const key of (Object.keys(settingsValidators) as unknown as (keyof Settings)[])){
			if(!settingsValidators[key](settings[key])){return false}
		}
		return true;
	}

	private async parseSettings(res: Response): Promise<ParseSettingsResult>{
		const settings = await (async () => {
			try{
				return await res.json() as ObjectLike;
			}
			catch{
				return false;
			}
		})();
		if(!settings){
			return false;
		}

		let valid = this.validateSettingsStructure(settings);
		if(!valid){return false;}

		valid = this.validateSettingsValues(settings as unknown as SettingsLike);
		if(!valid){return false}
		else{
			return settings as unknown as Settings
		}
	}

	initSettingsState(){
		this.state = reactive<Settings>({
			baseUrl: '',
			token: '',
			model: '',
			usedProvider: SettingLocalId,
			temperature: 0.7,
			maxTokens: 0,
			maxTokensPerMessage: 0
		});
		return this.state
	}

	async saveSettingsFromState(): Promise<boolean>{
		const res = await fetch('/config', {
			method: 'POST',
			body: JSON.stringify(this.state),
			headers: { 'Content-Type': 'application/json' }
		})
		if(!res.ok){
			const body = await res.text();
			alert(`
				Не удалось сохранить файл настроек.
				Проверьте: не выключен ли сервер.
				Подробный лог ошибки в консоли
			`);
			console.log(`
				Ошибка saveSettingsFromState()
				${res.status} ${res.statusText}
				URL: ${res.url}
				Ответ сервера: ${body}
			`);
			return false;
		}
		return true;
	}
	
	async checkSettings(): Promise<boolean> {
		const res = await this.composer.apiController.getSettings();
		if(res === false){
			alert(`
				Соединение с файловым сервером не установлено.
				Проверьте: не выключен ли сервер.	
			`);
			console.error(`checkSettings(): не удалось соединиться с сервером`);
			return false;
		}
		if (!res.ok) {
			if (res.status !== 404) {
				const body = await res.text();
				alert(`
					Случилась странная ошибка requestSettings().
					Статус: ${res.status} ${res.statusText}
					URL: ${res.url}
					Ответ сервера: ${body}
				`);
				return false;
			}
			return await this.saveSettingsFromState();
		}

		const validSettings = await this.parseSettings(res);
		if (!validSettings) {
			alert(`
					Структура файла настроек нарушена.
					Настройки были сброшены.
					Подробный лог в консоли.	
				`);
			return this.saveSettingsFromState();
		}

		Object.assign(this.state, validSettings);

		return true;
	}

	applyTokenLimits(){
		this.composer.applyTokenLimits(this.state.maxTokens, this.state.maxTokensPerMessage);
	}

	setUsedProvider(id: number){
		const preset = providerPresets[id];
		if(!preset){
			alert(`Provider with id = ${id} doesn't exists`);
			return;
		}
		this.state.baseUrl = preset.url;
		this.state.token = '';
		this.state.model = preset.model;
		this.state.usedProvider = id;
	}

	getSettings(){
		return this.state;
	}

	getBaseURL(): string{
		return this.state.baseUrl;
	}
	getModel(): string{
		return this.state.model;
	}
	getToken(): string{
		return this.state.token;
	}
	getTemperature(): number{
		return this.state.temperature;
	}

	async init(): Promise<boolean>{
		this.initSettingsState();
		let status = await this.checkSettings();
		
		this.applyTokenLimits();

		return status;
	}

}