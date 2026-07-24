import { reactive } from "vue";
import type { ComposerType } from "./useComposer";

export const enum WindowsList{
	CHAT = 1,
	PRESETS = 2,
	SETTINGS = 3
}

export const enum ButtonTypes{
	START = 1,
	EDIT = 2,
	DELETE = 3
}

export const enum ModalsList{
	DELETE_CONFIRM = 1,
	EDIT = 2,
	CREATE = 3,
	NOTHING = 4
}

const DEFAULT_ACTIVE_WINDOW = WindowsList.PRESETS;

interface UIState{
	activeWindow: WindowsList,
	createPresetActive: boolean,
	activeModal: ModalsList
}

export class UIController{
	
	private composer: ComposerType;
	private state: UIState;

	constructor(composer: ComposerType){
		this.composer = composer;
		this.state = reactive<UIState>({
			activeWindow: DEFAULT_ACTIVE_WINDOW,
			createPresetActive: false,
			activeModal: ModalsList.NOTHING
		});
	}

	setActiveWindow(window: WindowsList){
		this.state.activeWindow = window;
	}

	toggleCreatePresetActive(){
		this.state.createPresetActive = !this.state.createPresetActive;
	}
	setActiveModal(modalId: ModalsList){
		this.state.activeModal = modalId;
	}
	closeModal(){
		this.state.activeModal = ModalsList.NOTHING;
	}

	getUIState(): Readonly<UIState>{
		return this.state;
	}

}