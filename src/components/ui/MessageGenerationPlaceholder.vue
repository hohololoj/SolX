<script setup lang="ts">
import Spinner from "./spinner.vue";


</script>

<template>
	<div class="placeholder-message__container">

		<div class="placeholder-message__avatar">A</div>
		
		<div class="placeholder-message__body">
			<p class="placeholder-message__from placeholder-message__from_ai">AI</p>
			<div class="placeholder-message__content">
				<Spinner/>
			</div>
		</div>

	</div>
</template>

<style>
	.placeholder-message__container{
		width: 100%;
		height: fit-content;
		display: grid;
		grid-template: 1fr / 32px 1fr;
		column-gap: 12px;
		
	}
	.placeholder-message__avatar{
		width: 32px;
		height: 32px;
		border-radius: 9px;
		color: var(--color-text);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		user-select: none;
		background: linear-gradient(to bottom right, #6366f1, #8b5cf6);
	}
	.placeholder-message__body{
		display: flex;
		flex-direction: column;
		gap: 4px;
		width: 100%;
		height: fit-content;
	}
	.placeholder-message__from{
		font-size: 12px;
		color: #A5B4FC;
	}
	.placeholder-message__content{
		width: 100%;
		height: fit-content;
		padding: 12px 14px;
		color: var(--color-text);
		border-radius: 12px;
		font-size: 15px;
		background: var(--color-ai-bubble);
		border: 1px solid var(--color-border);
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>