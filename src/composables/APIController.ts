import { NotificationController, NotificationTypes, type Notification } from "./notificationController";
import type { DataPreset } from "./presetsController";
import type { SettingsController } from "./settingsController";
import type { ComposerType } from "./useComposer";

export class APIController{

	private composer: ComposerType;
	private settingsController: SettingsController;
	private notificationController: NotificationController;

	constructor(composer: ComposerType){
		this.composer = composer;
		this.settingsController = composer.settingsController;
		this.notificationController = composer.notificationController;
	}

	async checkAIServer(): Promise<Response | false> {
		const baseURL = this.settingsController.getBaseURL();
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
			return res;
		}
		catch {
			return false;
		}
	}

	async writePresets(presets: DataPreset[]): Promise<boolean> {
		try {
			const res = await fetch('/presets', {
				method: 'POST',
				body: JSON.stringify(presets),
				headers: { 'Content-Type': 'application/json' }
			});
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
			const res = await fetch('/config.json',{
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
			const res = await fetch('/presets.json', {
				cache: 'no-store'
			});
			return res;
		}
		catch{
			return false;
		}
	}
}