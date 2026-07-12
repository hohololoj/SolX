<script setup lang="ts">
import { ModalsList, useUIState } from "@/composables/useUIState";
import ModalHeader from "../blocks/modalHeader.vue";
import ButtonCancel from "../ui/buttonCancel.vue";
import ButtonOk from "../ui/buttonOk.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useGlobalState, type EditGame, type Game } from "@/composables/useGlobalState.ts";
import ButtonTranslate from "../ui/buttonTranslate.vue";
import { useChat } from "@/composables/useChat.ts";

const {UIState} = useUIState();
const {state, pushGame, updateGame} = useGlobalState();
const {translate} = useChat();

function handleClickClose(){
	UIState.activeModal = ModalsList.NOTHING;
}

function handleClickSave(){
	if(!valid.value){return}
	if(UIState.activeModal === ModalsList.CREATE){
		pushGame(workGame.value);
	}
	else if(UIState.activeModal === ModalsList.EDIT){
		updateGame(workGame.value);
	}
	else{
		alert("Unknown action");
		return;
	}
	UIState.activeModal = ModalsList.NOTHING;
}

async function handleTranslateClick(){
	const str = workGame.value.sysPrompt;
	const translation = await translate(str);
	if(!translation){return}
	workGame.value.sysPrompt = translation;
}

const workGame = ref<EditGame>({
	name: '',
	description: '',
  	genre: '',
  	tags: '',
  	sysPrompt: '',
	id: -1
});

onMounted(() => {
	if (UIState.activeModal === ModalsList.EDIT && state.selectedEditGame) {
		workGame.value = { ...state.selectedEditGame }
	} else if (UIState.activeModal === ModalsList.CREATE) {
		workGame.value = { name: '', description: '', genre: '', tags: '', sysPrompt: '', id: -1 }
	}
	else{
		alert(`unknown work mode, got UIState.activeModal = ${UIState.activeModal} and state.selectedEditGame = ${!!state.selectedEditGame}`);
		return
	}
})

const valid = computed(() => {

	if(workGame.value.name === ''){return false;}
	if(workGame.value.description === ''){return false;}
	if(workGame.value.genre === ''){return false;}
	if(workGame.value.sysPrompt === ''){return false;}
	if(workGame.value.tags === ''){return false;}

	return true;
})

</script>

<template>
	<div class="create-preset__container">
		<ModalHeader>{{ UIState.activeModal === ModalsList.CREATE ? 'Создание пресета' : 'Редактирование пресета' }}</ModalHeader>
		<div class="create-preset__body">

			<div class="create-preset__body__item">
				<p class="create-preset__body__item__label">Название</p>
				<div class="create-preset__body__item__input-container">
					<input type="text" v-model="workGame.name" class="create-preset__body__item__input">
				</div>
			</div>

			<div class="create-preset__body__item">
				<p class="create-preset__body__item__label">Жанр</p>
				<div class="create-preset__body__item__input-container">
					<input type="text" v-model="workGame.genre" class="create-preset__body__item__input">
				</div>
			</div>

			<div class="create-preset__body__item">
				<p class="create-preset__body__item__label">Описание</p>
				<div class="create-preset__body__item__input-container">
					<input type="text" v-model="workGame.description" class="create-preset__body__item__input">
				</div>
			</div>
			
			<div class="create-preset__body__item">
				<p class="create-preset__body__item__label">Теги (через запятую)</p>
				<div class="create-preset__body__item__input-container">
					<input type="text" v-model="workGame.tags" class="create-preset__body__item__input">
				</div>
			</div>
			
			<div class="create-preset__body__item">
				<p class="create-preset__body__item__label">Описание игры</p>
				<div class="create-preset__body__item__input-container create-preset__body__item__sysprompt">
					<textarea v-model="workGame.sysPrompt" class="create-preset__body__item__input create-preset__body__item__textarea"></textarea>
					<ButtonTranslate @click="handleTranslateClick"/>
				</div>
			</div>

		</div>
		<div class="create-preset__control">
			<ButtonCancel @click="handleClickClose">Отмена</ButtonCancel>
			<ButtonOk :is-ok="valid" @click="handleClickSave">Сохранить</ButtonOk>
		</div>
	</div>
</template>

<style>
	.create-preset__container{
		width: 720px;
		display: flex;
		flex-direction: column;
		background: var(--color-main);
		border-radius: 12px;
		border: 1px solid var(--color-border);
	}
	.create-preset__body{
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 16px;
	}
	.create-preset__body__item{
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.create-preset__body__item__label{
		font-size: 12px;
		font-weight: 600;
		color: var(--color-text-placeholder);
	}
	.create-preset__body__item__input-container{
		display: grid;
		grid-template: 38px / 1fr;
	}
	.create-preset__body__item__sysprompt{
		grid-template: 38px / 1fr 38px;
		column-gap: 8px;
	}
	.create-preset__body__item__input{
		background: var(--color-input);
		border: 1px solid var(--color-border);
		border-radius: 8px;
		outline: none;
		color: var(--color-text);
		font-size: 13.5px;
		padding: 9px 12px;
		resize: none;
	}
	.create-preset__control{
		width: 100%;
		padding: 16px;
		display: flex;
		justify-content: flex-end;
		gap: 8px;
	}
	.create-preset__body__item__textarea{

	}
</style>