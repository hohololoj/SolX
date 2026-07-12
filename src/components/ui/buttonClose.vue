<script setup lang="ts">
import IconClose from "../icons/icon-close.vue";

const emit = defineEmits(['click'])

</script>

<template>
	<button class="button-close" @click="emit('click')">
		<IconClose/>
	</button>
</template>

<style>
	.button-close{
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.2s ease;
		cursor: pointer;
		border: none;
		outline: none;
		border-radius: 8px;
		background: transparent;
	}
	.button-close:hover{
		background: var(--color-input);
	}
</style>