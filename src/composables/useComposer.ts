import { TokenManager } from "./tokenManager";
import { SettingsController } from "./settingsController";
import { reactive } from "vue";
import { APIController } from "./APIController";
import { UIController } from "./uiController";
import { PresetsController } from "./presetsController";
import { ChatController } from "./chatController";

interface AppState{
	AIActive: boolean,
}

class Composer{

	state!: AppState;
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
			alert(`Не удается соединиться с ИИ провайдером.\nПроверьте соединение и BaseURL в настройках.`);
			this.setAIActive(false);
			return false;
		}
		if(!response.ok){

			if(response.status === 403 || response.status === 401){
				alert("Ошибка доступа: провайдер отклонил доступ по токену");
				this.setAIActive(false);
				return false;
			}

			const body = await response.text();
			alert(`Провайдер не доступен / Ошибка в URL.\nПодробный лог в консоли.`);
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