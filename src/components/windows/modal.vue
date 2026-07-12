<script setup lang="ts">
import { ModalsList, useUIState } from "@/composables/useUIState.ts";
import DeleteConfirm from "../modals/delete-confirm.vue";
import CreatePreset from "../modals/create-preset.vue";

const {UIState} = useUIState();

</script>

<template>
	<div class="modal__container">
		<DeleteConfirm v-if="UIState.activeModal === ModalsList.DELETE_CONFIRM"/>
		<CreatePreset v-if="UIState.activeModal === ModalsList.CREATE || UIState.activeModal === ModalsList.EDIT"/>
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