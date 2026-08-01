import { NotificationController, NotificationTypes, type Notification } from "./notificationController";
import type { DataPreset } from "./presetsController";
import type { SettingsController } from "./settingsController";
import type { ComposerType } from "./useComposer";

const FILE_SERVER_URL = "";

export class APIController{

	private settingsController: SettingsController;
	private notificationController: NotificationController;

	constructor(composer: ComposerType){
		this.settingsController = composer.settingsController;
		this.notificationController = composer.notificationController;
	}

	async checkAIServer(): Promise<Response | false> {

		if(__DEBUG__){
			console.log(`checkAIServer() call`);
		}

		const baseURL = this.settingsController.getBaseURL();
		if(__DEBUG__){
			console.log(`\tbaseURL: ${baseURL}`);
		}
		if(baseURL === ""){
			return false;
		}

		try {
			const res = await fetch(`${baseURL}/v1/models`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${this.settingsController.getToken()}`
				}
			});
			if(__DEBUG__){
				console.log(`\tres: ${res}`);
			}
			return res;
		}
		catch(err){
			if(__DEBUG__){
				console.log(`\terr: ${err}`);
			}
			return false;
		}
	}

	async writePresets(presets: DataPreset[]): Promise<boolean> {
		if(__DEBUG__){
			console.log(`\twritePresets() call. presets: ${presets}`);
		}
		try {
			const res = await fetch(`${FILE_SERVER_URL}/presets`, {
				method: 'POST',
				body: JSON.stringify(presets),
				headers: { 'Content-Type': 'application/json' }
			});
			if(__DEBUG__){
				console.log(`\tres: ${res}`);
			}
			if(!res.ok){
				const body = await res.text();
				const notification: Notification = {
					title: "Не удалось выполнить запрос",
					message: "Файловый сервер отклонил запрос.\nПолный лог в консоли",
					showTime: 6000,
					type: NotificationTypes.FAILURE
				}
				this.notificationController.pushNotification(notification);
				console.log(`
					${res.status} ${res.statusText}
					URL: ${res.url}
					Сообщение сервера: ${body}
				`);
				return false;
			}
			return true;
		}
		catch (err) {
			const notification: Notification = {
				title: "Не удалось выполнить запрос",
				message: "Соединение с файловым сервером не установлено.\nПроверьте: не выключен ли сервер.",
				showTime: 6000,
				type: NotificationTypes.FAILURE
			}
			this.notificationController.pushNotification(notification);
			return false;
		}
	}
	
	async getSettings(): Promise<Response | false>{
		try{
			const res = await fetch(`${FILE_SERVER_URL}/config.json`,{
				cache: 'no-store'
			});
			return res;
		}
		catch{
			return false;
		}
	}

	async getPresets(): Promise<Response | false>{
		try{
			const res = await fetch(`${FILE_SERVER_URL}/presets.json`, {
				cache: 'no-store'
			});
			return res;
		}
		catch{
			return false;
		}
	}
}