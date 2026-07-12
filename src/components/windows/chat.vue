<script setup lang="ts">
import { useGlobalState } from "@/composables/useGlobalState.ts";
import ChatActions from "../blocks/chatActions.vue";
import ChatBody from "../blocks/chatBody.vue";
import ChatInput from "../blocks/chatInput.vue";
import Header from "../blocks/header.vue";
import { computed } from "vue";
import { useChat } from "@/composables/useChat.ts";

const {state} = useGlobalState();
const {chatState} = useChat();

const name = computed(() => {
	if(state.selectedPlayGameId === null){return "Выберите игру из списка пресетов"}
	if(!state.games[state.selectedPlayGameId]){
		alert("Chosen game not found");
		return "Chosen game not found"
	}
	return state.games[state.selectedPlayGameId]!.name
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