<script setup lang="ts">
import ButtonOk from "../ui/buttonOk.vue";
import ButtonCancel from "../ui/buttonCancel.vue";
import ModalHeader from "../blocks/modalHeader.vue";
import { computed } from "vue";
import { composer } from "@/composables/useComposer.ts";
import { NotificationTypes, type Notification } from "@/composables/notificationController.ts";

const uiController = composer.uiController;
const presetsController = composer.presetsController;
const notificationController = composer.notificationController;

const presetsState = presetsController.getPresetsState();

const name = computed(() => {
	if(!presetsController.presetsExists(presetsState.selectedDeletePreset)){
		const notification: Notification = {
			title: "Не удалось загрузить пресет",
			message: "Пресет не найден",
			showTime: 6000,
			type: NotificationTypes.FAILURE
		}
		notificationController.pushNotification(notification);
		return `NULL (удаление не произойдет)`;
	}
	return `"${presetsState.presets[presetsState.selectedDeletePreset]!.name}"`;
})

function handleCloseClick(){
	uiController.closeModal();
	presetsController.resetSelectedDeletePreset();
}

function handleConfirmClick(){
	if(!presetsController.presetsExists(presetsState.selectedDeletePreset)){
		const notification: Notification = {
			title: "Не удалось загрузить пресет",
			message: "Пресет не найден",
			showTime: 6000,
			type: NotificationTypes.FAILURE
		}
		notificationController.pushNotification(notification);
		console.log(`Не найдено игры по id ${presetsState.selectedDeletePreset}`);
		return;
	}
	presetsController.deletePreset(presetsState.selectedDeletePreset);
	uiController.closeModal();
}

</script>

<template>
	<div class="delete-confirm">
		<ModalHeader>Удалить {{name}}?</ModalHeader>
		<div class="delete-confirm__body">
			<ButtonCancel @click="handleCloseClick">Отмена</ButtonCancel>
			<ButtonOk :is-ok="true" @click="handleConfirmClick">Да</ButtonOk>
		</div>
	</div>
</template>

<style>
.delete-confirm{
	width: 520px;
	height: fit-content;
	display: flex;
	flex-direction: column;
	background: var(--color-main);
	border-radius: 12px;
	border: 1px solid var(--color-border);
}
.delete-confirm__body{
	width: 100%;
	height: auto;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 8px;
	padding: 16px;
}
</style>