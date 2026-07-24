import { TokenManager } from "./tokenManager";
import { SettingsController } from "./settingsController";
import { reactive } from "vue";
import { APIController } from "./APIController";
import { UIController } from "./uiController";
import { PresetsController } from "./presetsController";
import { ChatController } from "./chatController";
import { NotificationController, NotificationTypes, type Notification } from "./notificationController";

interface AppState{
	AIActive: boolean,
}

class Composer{

	state!: AppState;
	notificationController!: NotificationController;
	apiController!: APIController;
	tokenManager: TokenManager;
	settingsController!: SettingsController;
	uiController!: UIController;
	presetsController!: PresetsController;
	chatController!: ChatController;

	constructor(){
		this.tokenManager = new TokenManager();
	}

	applyTokenLimits(maxTokens: number, maxTokensPerMessage: number){
		this.tokenManager.setMaxTokens(maxTokens);
		this.tokenManager.setPerMessageLimit(maxTokensPerMessage);
	}


	initAppState(){
		this.state = reactive<AppState>({
			AIActive: false,
		})
	}
	
	private setAIActive(state: boolean){
		this.state.AIActive = state;
	}

	async checkAI(): Promise<boolean>{
		const response = await this.apiController.checkAIServer();
		if(!response){
			const notification: Notification = {
				title: "Не удается соединиться с ИИ провайдером",
				message: `Проверьте соединение c провайдером или BaseURL в настройках`,
				showTime: 6000,
				type: NotificationTypes.FAILURE
			}
			this.notificationController.pushNotification(notification);
			this.setAIActive(false);
			return false;
		}
		if(!response.ok){

			if(response.status === 403 || response.status === 401){
				const notification: Notification = {
					title: "Ошибка авторизации",
					message: `Провайдер отклонил запрос по токену`,
					showTime: 6000,
					type: NotificationTypes.FAILURE
				}
				this.notificationController.pushNotification(notification);
				this.setAIActive(false);
				return false;
			}

			const body = await response.text();
			
			const notification: Notification = {
				title: "Ошибка подключения к провайдеру",
				message: `Провайдер не доступен / Ошибка в URL. Лог в консоли`,
				showTime: 6000,
				type: NotificationTypes.FAILURE
			}
			this.notificationController.pushNotification(notification);

			console.log(`
				Status: ${response.status} ${response.statusText}
				URL: ${response.url}
				Сервер вернул: ${body}
			`);
			this.setAIActive(false);
			return false;
		}
		this.setAIActive(true)
		return true;
	}

	getAppState(): Readonly<AppState>{
		return this.state;
	}
	getAIState(): Readonly<boolean>{
		return this.state.AIActive;
	}

	async init(): Promise<boolean>{

		this.initAppState();
		this.notificationController = new NotificationController();
		this.settingsController = new SettingsController(this);
		this.apiController = new APIController(this);

		let status = await this.settingsController.init();
		if(!status){return false}
		

		this.presetsController = new PresetsController(this);
		status = await this.presetsController.init();
		if(!status){return false}

		this.uiController = new UIController(this);
		this.chatController = new ChatController(this);

		return true;
	}

}
export type ComposerType = Composer
export const composer = new Composer();