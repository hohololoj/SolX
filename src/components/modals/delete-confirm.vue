<script setup lang="ts">
import { ModalsList, useUIState } from "@/composables/useUIState.ts";
import ButtonClose from "../ui/buttonClose.vue";
import ButtonOk from "../ui/buttonOk.vue";
import ButtonCancel from "../ui/buttonCancel.vue";
import ModalHeader from "../blocks/modalHeader.vue";
import { computed } from "vue";
import { useGlobalState } from "@/composables/useGlobalState.ts";

const {UIState} = useUIState();
const {state, deleteGame} = useGlobalState();

const id = computed(() => {
	const id = state.selectedGameIdToDelete;
	if (id === null) {
		alert("game id to delete is null");
		return -1;
	}
	return id;
})

const name = computed(() => {
	if(!state.games[id.value]){
		alert("game not found");
		return `Не найдено игры по id ${id.value}`;
	}
	return `"${state.games[id.value]!.name}"`;
})

function handleCloseClick(){
	UIState.activeModal = ModalsList.NOTHING;
}

function handleConfirmClick(){
	if(!state.games[id.value]){
		alert("game not found");
		return `Не найдено игры по id ${id.value}`;
	}
	deleteGame(id.value);
	UIState.activeModal = ModalsList.NOTHING;
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