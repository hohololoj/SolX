<script setup lang="ts">
	const props = defineProps<{provider: string, url: string, active: boolean}>();
	const emit = defineEmits(['click']);
</script>

<template>
	<div @click="emit('click')" class="provider-item" :class="props.active ? 'provider-item_active' : ''">
		<p class="provider-item__title">{{ props.provider }}</p>
		<p class="provider-item__url">{{ props.url }}</p>
	</div>
</template>

<style>
	.provider-item{
		width: 100%;
		height: 58px;
		display: flex;
		flex-direction: column;
		gap: 3px;
		padding: 12px 10px;
		border: 1px solid var(--color-border);
		background: var(--color-ai-bubble);
		border-radius: 8px;
		cursor: pointer;
	}
	.provider-item:hover{
		background: var(--color-user-bubble);
	}
	.provider-item_active{
		border-color: var(--color-accent);
		background: var(--color-accent-soft);
	}
	.provider-item_active:hover{
		background: var(--color-accent-soft);
	}
	.provider-item_active .provider-item__title{
		color: var(--color-accent);
	}
	.provider-item__title{
		font-size: 13px;
		font-weight: 600;
		color: var(--color-text);
	}
	.provider-item__url{
		font-size: 11px;
		color: var(--color-text-placeholder);
	}
</style>