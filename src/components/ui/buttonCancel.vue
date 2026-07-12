<script setup lang="ts">
	const emit = defineEmits(['click'])
</script>

<template>
	<button class="button-cancel" @click="emit('click')">
		<slot/>
	</button>
</template>

<style>
	.button-cancel{
		color: var(--color-text);
		padding: 9px 16px;
		background: var(--color-main);
		transition: background 0.2s ease;
		cursor: pointer;
		border: 1px solid var(--color-border);
		outline: none;
		border-radius: 8px;
	}
	.button-cancel:hover{
		background: var(--color-border);
	}
</style>