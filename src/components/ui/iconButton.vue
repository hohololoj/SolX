<script setup lang="ts">
	const emit = defineEmits(['click']);

</script>

<template>
	<button class="icon-button" @click="emit('click')"><slot/></button>
</template>

<style>
	.icon-button{
		width: fit-content;
		height: fit-content;
		display: flex;
		gap: 8px;
		align-items: center;
		justify-content: center;
		padding: 10px 16px;
		background: var(--color-accent);
		color: var(--color-text-black);
		cursor: pointer;
		border: none;
		outline: none;
		border-radius: 8px;
	}
	.icon-button:hover{
		background: var(--color-accent-hover);
	}
</style>