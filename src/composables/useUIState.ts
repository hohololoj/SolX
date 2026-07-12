import { reactive } from "vue";

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

interface UIState{
	createPresetActive: boolean,
	activeModal: ModalsList
}

const UIState = reactive<UIState>({
	createPresetActive: false,
	activeModal: ModalsList.NOTHING
});

export function useUIState(){

	function toggleCreatePresetActive(){
		UIState.createPresetActive = !UIState.createPresetActive;
	}

	return {
		UIState,
		toggleCreatePresetActive
	}
}