<script setup lang="ts">
import { useChat } from "@/composables/useChat";

	type Actions = string[];

	const props = defineProps<{actions: Actions}>();
	const {sendAction} = useChat();

	async function handleActionClick(action: string){
		const status = await sendAction(action);
		if(!status.status){
			alert(status.message);
			return;
		}
	}

</script>

<template>
	<div class="chat-actions__container">
		<div class="chat-actions__title__container">
			<div class="chat-actions__title__dot"></div>
			<p class="chat-actions__title__text">Варианты действий</p>
		</div>
		<div class="chat-actions__body">

			<div @click="() => {handleActionClick(action)}" v-for="action in props.actions" class="chat-actions__item">
				<p class="chat-actions__item__text">{{action}}</p>
			</div>

		</div>
	</div>
</template>

<style>
	.chat-actions__container{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 14px 460px 16px 460px;
		background: var(--color-main-side);
		border-top: 1px solid var(--color-border);
	}
	.chat-actions__title__container{
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.chat-actions__title__dot{
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--color-accent);
	}
	.chat-actions__title__text{
		font-size: 11px;
		color: var(--color-text-placeholder);
	}
	.chat-actions__body{
		width: 100%;
		height: fit-content;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-auto-rows: 61px;
		column-gap: 8px;
		row-gap: 8px;
	}
	.chat-actions__item{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-ai-bubble);
		border: 1px solid var(--color-border);
		border-radius: 8px;
		padding: 11px 13px;
		cursor: pointer;
		transition: color 0.2s ease;
	}
	.chat-actions__item:hover .chat-actions__item__text{
		color: var(--color-accent);
	}
	.chat-actions__item__text{
		width: fit-content;
		font-size: 13px;
		color: var(--color-icon);
	}
</style>