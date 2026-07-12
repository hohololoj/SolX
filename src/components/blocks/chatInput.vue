<script setup lang="ts">
import { reactive } from "vue";
import IconAttachment from "../icons/icon-attachment.vue";
import IconSend from "../icons/icon-send.vue";
import { useChat } from "@/composables/useChat.ts";

const {chatState, sendMessage, cancelLastMessage} = useChat();

function handleNewLine(){
	return;
}
async function handleSend(){
	const res = await sendMessage(chatState.userInput);
	if(!res.status){
		cancelLastMessage();
		alert(res.message);
		return;
	}
}

</script>

<template>
	<div class="chat-input__container">
		<div class="chat-input__textarea__container">

			<IconAttachment/>
			<textarea class="chat-input__textarea" placeholder="Опишите своё действие или выберите вариант выше"
				@keydown.enter.exact.prevent="handleSend"
    			@keydown.shift.enter="handleNewLine"
    			v-model="chatState.userInput"
			></textarea>
			<!-- <IconSend/> -->

		</div>
		<div class="chat-input__hint__container">
			<p class="chat-input__hint">Enter — отправить · Shift+Enter — новая строка</p>
		</div>
	</div>
</template>

<style>
	.chat-input__container{
		width: 100%;
		height: fit-content;
		padding: 12px 460px 16px 460px;
		display: grid;
		grid-template: 1fr min-content / 100%;
		row-gap: 6px;
		background: var(--color-main-side);
		border-top: 1px solid var(--color-border);
	}
	.chat-input__textarea__container{
		width: 100%;
		height: fit-content;
		display: grid;
		grid-template: 100% / 36px 1fr;
		column-gap: 8px;
		background: var(--color-ai-bubble);
		border: 1px solid var(--color-border);
		border-radius: 12px;
		padding: 8px 12px;
	}
	.chat-input__textarea{
		background: transparent;
		border: none;
		resize: none;
		outline: none;
		padding: 8px 4px;
		font-size: 14px;
		color: var(--color-text);
		min-height: 46px;
		field-sizing: content;
		max-height: 560px;
	}

	.chat-input__textarea::placeholder{
		color: var(--color-text-placeholder);
		font-size: 14px;
	}
	.chat-input__hint__container{
		width: 100%;
		height: fit-content;
		display: flex;
		justify-content: flex-end;
	}
	.chat-input__hint{
		color: var(--color-text-placeholder);
		font-size: 11px;
	}
</style>