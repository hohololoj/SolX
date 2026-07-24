import { reactive } from "vue";
import type { ComposerType } from "./useComposer";
import { NotificationController, NotificationTypes, type Notification } from "./notificationController";

export interface DataPreset{
	name: string;
	genre: string;
	description: string;
	tags: string[];
	sysPrompt: string;
}
export interface HandlePreset extends DataPreset{
	id: number;
}
export interface EditPreset{
	name: string;
	genre: string;
	description: string;
	tags: string;
	sysPrompt: string;
	id: number;
}

interface PresetsState{
	presets: DataPreset[];
	activePreset: number;
	selectedEditPreset: number;
	selectedDeletePreset: number;
	selectedPlayPreset: number;
}

export class PresetsController{

	state!: PresetsState;
	composer: ComposerType;
	notificationController: NotificationController;

	constructor(composer: ComposerType){
		this.composer = composer;
		this.notificationController = composer.notificationController;
	}

	private initState(){
		this.state = reactive<PresetsState>({
			presets: [],
			activePreset: -1,
			selectedEditPreset: -1,
			selectedDeletePreset: -1,
			selectedPlayPreset: -1,
		});
	}

	private async parsePresets(res: Response): Promise<DataPreset[] | false>{

		const presets = await (async () => {
			try{
				const data = await res.json();
				return data as DataPreset[];
			}
			catch{
				return false
			}
		})();
		if(presets === false){
			const notification: Notification = {
				title: "Не удалось загрузить пресеты из файла.",
				message: `Структура нарушена / Файл не существует. Пресеты будут сброшены`,
				showTime: 6000,
				type: NotificationTypes.WARN
			}
			this.notificationController.pushNotification(notification);
			console.error("parseSettings(): фэйл .json()");
			return false
		}

		return presets;
	}

	private async loadPresets(): Promise<boolean>{
		const res = await this.composer.apiController.getPresets();
		if(res === false){
			const notification: Notification = {
				title: "Соединение с сервером не установлено",
				message: `Проверьте: не выключен ли сервер. Окно консоли должно быть открыто`,
				showTime: 6000,
				type: NotificationTypes.FAILURE
			}
			this.notificationController.pushNotification(notification);
			console.error(`loadPresets(): не удалось соединиться с сервером`);
			return false;
		}

		const validPresets = await this.parsePresets(res);
		if(!validPresets){
			return this.composer.apiController.writePresets(this.state.presets);
		}
		this.state.presets = validPresets;
		return true;
	}

	async createPreset(preset: DataPreset): Promise<boolean>{
		const saved = await this.composer.apiController.writePresets([...this.state.presets, preset]);
		if(!saved){
			return false;
		}

		this.state.presets.push(preset);

		return true;
	}

	async updatePreset(hPreset: HandlePreset): Promise<boolean>{

		const id = hPreset.id;
		if(this.state.presets[id] === undefined){
			const notification: Notification = {
				title: "Пресет не найден",
				message: `Запрашиваемый на обновление пресет не найден. Подробный лог в консоли.`,
				showTime: 6000,
				type: NotificationTypes.FAILURE
			}
			this.notificationController.pushNotification(notification);
			console.log(`
				Пресеты в памяти: ${this.state.presets}\n
				Пресет запрошен: id = ${hPreset.id}
			`);
			return false;
		}
		
		let cpyPresets: DataPreset[];
		cpyPresets = this.state.presets;
		const {id: hPresetId, ...rest} = hPreset;
		cpyPresets.push(rest);
		const saveStatus = await this.composer.apiController.writePresets(cpyPresets);
		if(!saveStatus){
			return false;
		}
		
		this.state.presets.push(rest);
		
		return true;
	}

	async deletePreset(id: number){
		const presetsCpy = this.state.presets;
		
		let status = (() => {
			try{
				presetsCpy.splice(id, 1);
				return true;
			}
			catch(err){
				return err;
			}
		})();
		if(status instanceof Error){
			const notification: Notification = {
				title: "Ошибка удаления",
				message: `Что-то пошло не так. Полный лог в консоли`,
				showTime: 6000,
				type: NotificationTypes.FAILURE
			}
			this.notificationController.pushNotification(notification);
			console.log(`
				Ошибка удаления:
				${status}
			`);
			return false;
		}
		
		status = await this.composer.apiController.writePresets(presetsCpy);
		if(!status){
			return false;
		}
		
		this.state.presets = presetsCpy;
	}

	getPresetsState(): Readonly<PresetsState>{
		return this.state;
	}
	getPresetById(id: number): Readonly<DataPreset | undefined>{
		return this.state.presets[id];
	}

	resetSelectedToEditPreset(){
		this.state.selectedEditPreset = -1;
	}
	isSetPresetToEdit(){
		return this.state.selectedEditPreset >= 0;
	}
	setSelectedToEditPreset(id: number){
		this.state.selectedEditPreset = id;
	}

	resetSelectedDeletePreset(){
		this.state.selectedDeletePreset = -1;
	}
	isSetPresetToDelete(){
		return this.state.selectedDeletePreset >= 0;
	}
	setSelectedToDeletePreset(id: number){
		this.state.selectedDeletePreset = id;
	}

	presetsExists(id: number){
		return !!this.state.presets[id];
	}

	selectPresetToEdit(id: number){
		this.state.selectedEditPreset = id;
	}
	selectPresetToDelete(id: number){
		this.state.selectedDeletePreset = id;
	}

	selectPresetToPlay(id: number){
		this.state.selectedPlayPreset = id;
	}

	async init(): Promise<boolean>{
		
		this.initState();

		let status = await this.loadPresets();

		return status;
	}

}