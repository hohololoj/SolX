<script setup lang="ts">
import { useGlobalState } from "@/composables/useGlobalState.ts";
import IconPlus from "../icons/icon-plus.vue";
import IconButton from "../ui/iconButton.vue";
import PresetCard from "../ui/presetCard.vue";
import { ModalsList, useUIState } from "@/composables/useUIState.ts";

	const {state} = useGlobalState();
	const {UIState} = useUIState();

function handleCreateClick(){
	state.selectedEditGame = null;
	UIState.activeModal = ModalsList.CREATE;
}

</script>

<template>
	<div class="presets-body__container">

		<div class="presets-body__header">
			<div class="presets-body__text">
				<h4 class="presets-body__title">Пресеты</h4>
				<p class="presets-body__subtitle">Готовые сценарии для старта новой игры</p>
			</div>
			<IconButton @click="handleCreateClick">
				<IconPlus/>
				Создать пресет
			</IconButton>
		</div>

		<div class="presets-body__inner">
			<PresetCard :id="id" v-for="(game, id) in state.games"/>
		</div>

	</div>
</template>

<style>
	.presets-body__container{
		width: 100%;
		height: 100%;
		background: var(--color-main);
		display: flex;
		flex-direction: column;
		gap: 24px;
		padding: 28px 290px;
	}
	.presets-body__header{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: end;
	}
	.presets-body__text{
		display: flex;
		flex-direction: column;
		gap: 3px;
	}
	.presets-body__title{
		font-size: 22px;
		font-weight: bold;
		line-height: 33px;
		color: var(--color-text);
	}
	.presets-body__subtitle{
		font-size: 13px;
		line-height: 19.5px;
		color: var(--color-text-placeholder);
	}
	.presets-body__inner{
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-auto-rows: 251px;
		column-gap: 14px;
		row-gap: 14px;
	}
</style>