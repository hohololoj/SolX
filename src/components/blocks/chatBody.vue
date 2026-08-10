<script setup lang="ts">
import { composer } from "@/composables/useComposer.ts";
import ChatMessage from "../ui/chatMessage.vue";
import { nextTick, ref, watch } from "vue";
import MessageGenerationPlaceholder from "../ui/MessageGenerationPlaceholder.vue";

const chatState = composer.chatController.getChatState();

const chatInner = ref<HTMLElement | null>(null);

watch(
	() => chatState.messages.length,
	async () => {
		await nextTick();
		if (chatInner.value) {
			chatInner.value.scrollTop = chatInner.value.scrollHeight;
		}
	}
);

</script>

<template>
	<div class="chat-body__container">
		<div ref="chatInner" class="chat-body__inner">
			<div class="chat-body__line">
				<ChatMessage 
					v-for="message in chatState.messages"
					:author="message.role === 'user' ? 'User' : 'AI'"
					:is-user="message.role === 'user'"
					:content="message.content"
				/>
				<MessageGenerationPlaceholder v-if="chatState.generationActive"/>
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