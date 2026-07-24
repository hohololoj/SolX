<script setup lang="ts">
import ChatActions from "../blocks/chatActions.vue";
import ChatBody from "../blocks/chatBody.vue";
import ChatInput from "../blocks/chatInput.vue";
import Header from "../blocks/header.vue";
import { computed } from "vue";
import { composer } from "@/composables/useComposer.ts";

const presetsState = composer.presetsController.getPresetsState();
const appState = composer.getAppState();
const chatState = composer.chatController.getChatState();

const name = computed(() => {
	if(presetsState.selectedPlayPreset === -1){return "Выберите игру из списка пресетов"}
	if(!presetsState.presets[presetsState.selectedPlayPreset]){
		alert("Chosen game not found");
		return "Chosen game not found";
	}
	return presetsState.presets[presetsState.selectedPlayPreset]!.name;
})

</script>

<template>
	<div class="chat-container" :class="chatState.actions.length !== 0 ? 'chat-container_actions' : 'chat-container_no-actions'">
		<Header>{{ name }}</Header>
		<ChatBody/>
		<ChatActions :actions="chatState.actions" v-if="chatState.actions.length !== 0"/>
		<ChatInput/>
	</div>
</template>

<style>
	.chat-container{
		width: 100%;
		height: 100%;
		display: grid;
	}
	.chat-container_no-actions{
		grid-template: 56px 1fr min-content / 100%;
	}
	.chat-container_actions{
		grid-template: 56px 1fr auto min-content / 100%;
	}
	.placeholder{
		height: 100%;
	}
</style>