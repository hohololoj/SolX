<script setup lang="ts">
import IconTranslate from "../icons/icon-translate.vue";

const emit = defineEmits(['click']);

</script>

<template>
	<button class="button-translate" @click="emit('click')">
		<IconTranslate/>
	</button>
</template>

<style>
	.button-translate{
		background: var(--color-input);
		border: 1px solid var(--color-border);
		cursor: pointer;
		outline: none;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: border-color 0.2s ease;
	}
	.button-translate:hover{
		border-color: var(--color-accent);
	}
	.button-translate:hover path{
		stroke: var(--color-accent);
	}
</style>