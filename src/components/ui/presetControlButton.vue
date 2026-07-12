<script setup lang="ts">
import { ButtonTypes } from "@/composables/useUIState";
const props = defineProps<{type: ButtonTypes}>();
const emit = defineEmits(['click']);
</script>

<template>
	<button class="preset-control-button" @click="emit('click')" :class="{
		'preset-control-button__start': props.type === ButtonTypes.START,
		'preset-control-button__edit': props.type === ButtonTypes.EDIT,
		'preset-control-button__delete': props.type === ButtonTypes.DELETE
	}">
		<slot/>
	</button>
</template>

<style>
	.preset-control-button{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 8px;
		min-height: 48px;
		cursor: pointer;
		border: 1px solid var(--color-border);
		background: transparent;
		border-radius: 8px;
		transition: background 0.2s ease,
					border-color 0.2s ease;
		color: var(--color-text);
		font-size: 12.5px;
	}

	.preset-control-button__start{
		background: var(--color-accent);
		color: var(--color-text-black);
		border: none;
	}
	.preset-control-button__start:hover{
		background: var(--color-accent-hover);
	}

	.preset-control-button__edit:hover path{
		stroke: var(--color-accent);
	}
	.preset-control-button__edit:hover rect{
		fill: var(--color-accent)
	}
	.preset-control-button__edit:hover{
		border-color: var(--color-accent);
	}

	.preset-control-button__delete:hover path{
		stroke: var(--color-danger);
	}
	.preset-control-button__delete:hover rect{
		fill: var(--color-danger);
	}
	.preset-control-button__delete:hover{
		border-color: var(--color-danger);
	}
</style>