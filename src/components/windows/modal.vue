<script setup lang="ts">
import DeleteConfirm from "../modals/delete-confirm.vue";
import CreatePreset from "../modals/create-preset.vue";
import { composer } from "@/composables/useComposer.ts";
import { ModalsList } from "@/composables/uiController.ts";
import FullscreenImage from "../modals/fullscreen-image.vue";

const uiState = composer.uiController.getUIState();

</script>

<template>
	<div class="modal__container">
		<DeleteConfirm v-if="uiState.activeModal === ModalsList.DELETE_CONFIRM"/>
		<CreatePreset v-if="uiState.activeModal === ModalsList.CREATE || uiState.activeModal === ModalsList.EDIT"/>
		<FullscreenImage v-if="uiState.activeModal === ModalsList.FULLSCREEN_IMAGE"/>
	</div>
</template>

<style>
	.modal__container{
		width: 100vw;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 1;
		background: rgba(0,0,0,0.5);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>