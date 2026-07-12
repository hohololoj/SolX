<script setup lang="ts">
import AiStatus from "../ui/aiStatus.vue";


</script>

<template>
	<div class="header">
		<p class="header__title"><slot/></p>
		<AiStatus/>
	</div>
</template>

<style>
	.header{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: var(--color-main-side);
		padding: 0px 20px;
		border-bottom: 1px solid var(--color-border);
	}
	.header__title{
		font-size: 15px;
		font-weight: 600;
		color: var(--color-text);
	}
</style>