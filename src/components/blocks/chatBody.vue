<script setup lang="ts">
import { useChat } from "@/composables/useChat.ts";
import ChatMessage from "../ui/chatMessage.vue";

const {chatState} = useChat();

</script>

<template>
	<div class="chat-body__container">
		<div class="chat-body__inner">
			<div class="chat-body__line">
				<ChatMessage 
					v-for="message in chatState.messages"
					:author="message.role === 'user' ? 'User' : 'AI'"
					:is-user="message.role === 'user'"
					:message="message.content"
				/>
			</div>
		</div>
	</div>
</template>

<style>
	.chat-body__container{
		width: 100%;
		height: 100%;
		padding: 24px 460px;
		background: var(--color-main);
		min-height: 0;
	}
	.chat-body__inner{
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}
	.chat-body__line{
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
</style>