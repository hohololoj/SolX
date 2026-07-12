<script setup lang="ts">

	export interface Message{
		author: string,
		message: string,
		isUser: boolean
	}

	const props = defineProps<Message>()
</script>

<template>
	<div class="chat-message__container">

		<div class="chat-message__avatar" :class="props.isUser ? 'chat-message__avatar_user' : 'chat-message__avatar_ai'">
			{{ props.author[0] }}
		</div>
		
		<div class="chat-message__body">
			<p class="chat-message__from" :class="props.isUser ? 'chat-message__from_user' : 'chat-message__from_ai'">{{ props.author }}</p>
			<p class="chat-message__content" :class="props.isUser ? 'chat-message__content_user' : 'chat-message__content_ai'">{{ props.message }}</p>
		</div>

	</div>
</template>

<style>
	.chat-message__container{
		width: 100%;
		height: fit-content;
		display: grid;
		grid-template: 1fr / 32px 1fr;
		column-gap: 12px;
		
	}
	.chat-message__avatar{
		width: 32px;
		height: 32px;
		border-radius: 9px;
		color: var(--color-text);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
	}
	.chat-message__avatar_ai{
		background: linear-gradient(to bottom right, #6366f1, #8b5cf6);
	}
	.chat-message__avatar_user{
		background: var(--color-input);
	}
	.chat-message__body{
		display: flex;
		flex-direction: column;
		gap: 4px;
		width: 100%;
		height: fit-content;
	}
	.chat-message__from{
		font-size: 12px;
	}
	.chat-message__from_user{
		color: #8B91A3;
	}
	.chat-message__from_ai{
		color: #A5B4FC;
	}
	.chat-message__content{
		width: 100%;
		height: fit-content;
		padding: 12px 14px;
		color: var(--color-text);
		border-radius: 12px;
		font-size: 15px;
	}
	.chat-message__content_ai{
		background: var(--color-ai-bubble);
		border: 1px solid var(--color-border);
	}
	.chat-message__content_user{
		background: var(--color-user-bubble);
	}
</style>