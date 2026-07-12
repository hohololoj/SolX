<script setup lang="ts">
	const emit = defineEmits(['click']);
	const props = defineProps<{isOk: boolean}>();
</script>

<template>
	<button class="button-ok" :class="props.isOk ? '' : 'button-ok_not-ok'" @click="emit('click')">
		<slot/>
	</button>
</template>

<style>
	.button-ok{
		color: var(--color-text-black);
		padding: 9px 16px;
		background: var(--color-accent);
		transition: background 0.2s ease;
		cursor: pointer;
		border: none;
		outline: none;
		border-radius: 8px;
		border: 1px solid transparent;
	}
	.button-ok_not-ok{
		cursor: not-allowed;
		background: transparent;
		border: 1px solid var(--color-accent);
		color: var(--color-text);
	}
	.button-ok_not-ok:hover{
		background: transparent !important;
	}
	.button-ok:hover{
		background: var(--color-accent-hover);
	}
</style>