<script setup lang="ts">
import ModalHeader from "../blocks/modalHeader.vue";
import ButtonCancel from "../ui/buttonCancel.vue";
import ButtonOk from "../ui/buttonOk.vue";
import { computed, onMounted, ref } from "vue";
import ButtonTranslate from "../ui/buttonTranslate.vue";
import { composer } from "@/composables/useComposer.ts";
import type { EditPreset, HandlePreset } from "@/composables/presetsController.ts";
import { ModalsList } from "@/composables/uiController.ts";

const presetsController = composer.presetsController;
const chatController = composer.chatController;
const uiController = composer.uiController;

const presetsState = presetsController.getPresetsState();
const uiState = uiController.getUIState();

function handleClickClose(){
	uiController.closeModal();
}

function updateExistingPreset(preset: EditPreset){
	const {tags, ...rest} = preset;
	const hPreset: HandlePreset = {
		tags: tags.replace(/\s/g, '').split(','),
		...rest
	}
	presetsController.updatePreset(hPreset);
}

function createNewPreset(preset: EditPreset){
	const {tags, ...rest} = preset;
	const hPreset: HandlePreset = {
		tags: tags.replace(/\s/g, '').split(','),
		...rest
	}
	presetsController.createPreset(hPreset);
}

function handleClickSave(){
	if(!valid.value){return}
	if(uiState.activeModal === ModalsList.CREATE){
		createNewPreset(workGame.value);
	}
	else if(uiState.activeModal === ModalsList.EDIT){
		updateExistingPreset(workGame.value);
	}
	else{
		alert("Unknown action");
		return;
	}
	uiController.closeModal();
}

async function handleTranslateClick(){
	const str = workGame.value.sysPrompt;
	const translation = await chatController.translate(str);
	if(!translation){return}
	workGame.value.sysPrompt = translation;
}

const workGame = ref<EditPreset>({
	name: '',
	description: '',
  	genre: '',
  	tags: '',
  	sysPrompt: '',
	id: -1
});

onMounted(() => {
	if (uiState.activeModal === ModalsList.EDIT && presetsState.selectedEditPreset){
		const preset = presetsState.presets[presetsState.selectedEditPreset];
		if(!preset){
			alert("Preset not found");
			return;
		}
		const {tags, ...rest} = preset;
		workGame.value = { id: presetsState.selectedEditPreset, tags: tags.join(', '), ...rest };
	} else if (uiState.activeModal === ModalsList.CREATE) {
		workGame.value = { name: '', description: '', genre: '', tags: '', sysPrompt: '', id: -1 }
	}
	else{
		alert(`unknown work mode, got UIState.activeModal = ${uiState.activeModal} and selectedEditPreset = ${presetsState.selectedEditPreset}`);
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
		<ModalHeader>{{ uiState.activeModal === ModalsList.CREATE ? 'Создание пресета' : 'Редактирование пресета' }}</ModalHeader>
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
</style>