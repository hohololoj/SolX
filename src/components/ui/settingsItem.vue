<script setup lang="ts">
	const props = defineProps<{title: string}>();
</script>

<template>
	<div class="settings-item">
		<h3 class="settings-item__title">{{ props.title }}</h3>
		<div class="settings-item__body">
			<slot/>
		</div>
	</div>
</template>

<style>
	.settings-item{
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.settings-item__title{
		font-size: 11px;
		font-weight: bold;
		color: var(--color-text-placeholder);
	}
	.settings-item__body{
		width: 100%;
		height: auto;
	}
</style>