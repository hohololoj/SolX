<script setup lang="ts">
import { ButtonTypes, ModalsList, useUIState } from "@/composables/useUIState";
import PresetControlButton from "./presetControlButton.vue";
import IconStart from "../icons/icon-start.vue";
import IconEdit from "../icons/icon-edit.vue";
import IconDelete from "../icons/icon-delete.vue";
import { useGlobalState, WindowsList, type EditGame } from "@/composables/useGlobalState.ts";
import { useChat } from "@/composables/useChat.ts";

const {UIState} = useUIState();
const {state} = useGlobalState();
const {defineNewChat} = useChat();

const props = defineProps<{id: number}>();

function handleDeleteClick(id: number){
	state.selectedGameIdToDelete = id;
	UIState.activeModal = ModalsList.DELETE_CONFIRM;
}
function handleStartClick(id: number){
	defineNewChat(id);
	state.activeWindow = WindowsList.CHAT;
	state.selectedPlayGameId = id;
}
function handleEditClick(id: number){
	if(!state.games[id]){
		alert("something went wrong, game not found");
		return;
	}
	const {tags, ...rest} = state.games[id];
	const selectedGame: EditGame = {
		...rest,
		tags: tags.join(', '),
		id: id
	};
	state.selectedEditGame = selectedGame;
	UIState.activeModal = ModalsList.EDIT;
}
	
</script>

<template>
	<div class="preset-card__container">

		<div class="preset-card__info">

			<div class="preset-card__header">
				<h2 class="preset-card__header__name">{{ state.games[props.id]!.name }}</h2>
				<p class="preset-card__header__genre">{{ state.games[props.id]!.genre }}</p>
			</div>

			<p class="preset-card__description">{{ state.games[props.id]!.description }}</p>

			<div class="preset-card__categories-container">
				<div v-for="tag in state.games[props.id]!.tags" class="preset-card__category">{{ tag }}</div>
			</div>

		</div>

		<div class="preset-card__control">
			<PresetControlButton @click="() => {handleStartClick(props.id)}" :type="ButtonTypes.START"><IconStart/>Начать игру</PresetControlButton>
			<PresetControlButton @click="() => {handleEditClick(props.id)}" :type="ButtonTypes.EDIT"><IconEdit/></PresetControlButton>
			<PresetControlButton @click="() => {handleDeleteClick(props.id)}" :type="ButtonTypes.DELETE"><IconDelete/></PresetControlButton>
		</div>

	</div>
</template>

<style>
	.preset-card__container{
		width: 100%;
		height: 100%;
		border-radius: 12px;
		background: var(--color-ai-bubble);
		border: 1px solid var(--color-border);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 16px;
	}
	.preset-card__info{
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.preset-card__header{
		display: flex;
		flex-direction: column;
		gap: 2.5px;
	}
	.preset-card__header__name{
		font-size: 15px;
		font-weight: 600;
		color: var(--color-text);
	}
	.preset-card__header__genre{
		font-size: 11px;
		font-weight: 600;
		color: var(--color-accent);
		text-transform: uppercase;
	}
	.preset-card__description{
		font-size: 13px;
		width: 100%;
		color: var(--color-text-placeholder);
	}
	.preset-card__categories-container{
		width: 100%;
		overflow-x: auto;
		display: flex;
		gap: 6px;
	}
	.preset-card__category{
		width: fit-content;
		height: fit-content;
		color: #C8CCD6;
		padding: 3px 8px;
		background: var(--color-input);
		border-radius: 9px;
		font-size: 11px;
		text-transform: lowercase;
	}
	.preset-card__control{
		padding-top: 12px;
		display: grid;
		grid-template: 100% / 1fr 1fr 1fr;
		column-gap: 8px;
		border-top: 1px solid var(--color-border);
	}
</style>