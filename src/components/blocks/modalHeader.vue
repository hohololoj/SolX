<script setup lang="ts">
import { ModalsList, useUIState } from "@/composables/useUIState.ts";
import ButtonClose from "../ui/buttonClose.vue";

const {UIState} = useUIState();

function handleCloseClick(){
	UIState.activeModal = ModalsList.NOTHING;
}

</script>

<template>
	<div class="delete-confirm__header">
		<h2 class="delete-confirm__title"><slot/></h2>
		<ButtonClose @click="handleCloseClick" />
	</div>
</template>

<style>
.delete-confirm__header{
	padding: 16px;
	border-bottom: 1px solid var(--color-border);
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.delete-confirm__title{
	font-size: 16px;
	font-weight: 600;
	color: var(--color-text);
}
</style>