<script setup lang="ts">
import { reactive } from "vue";
import Aside from "./components/blocks/aside.vue";
import Chat from "./components/windows/chat.vue";
import Modal from "./components/windows/modal.vue";
import Presets from "./components/windows/presets.vue";
import Settings from "./components/windows/settings.vue";
import { composer } from "./composables/useComposer.ts";
import { ModalsList, WindowsList } from "./composables/uiController.ts";

const uiState = composer.uiController.getUIState();

interface AsideState{
	collapsed: boolean
}

const asideState = reactive<AsideState>({collapsed: false});

</script>

<template>
	<div class="app__inner" :class="asideState.collapsed ? 'app__inner_collapsed' : ''">
		<Aside :state="asideState" />
		<div class="windows-container">
			<Chat v-if="uiState.activeWindow === WindowsList.CHAT" />
			<Presets v-if="uiState.activeWindow === WindowsList.PRESETS" />
			<Settings v-if="uiState.activeWindow === WindowsList.SETTINGS" />
		</div>
		<Modal v-if="uiState.activeModal !== ModalsList.NOTHING" />
	</div>
</template>

<style>
	.app__inner{
		width: 100vw;
		height: 100vh;
		display: grid;
		grid-template: 100% / 240px 1fr;
		transition: grid-template-columns 0.2s ease;
	}
	.app__inner_collapsed{
		grid-template: 100% / 69px 1fr;
	}
	.windows-container{
		width: 100%;
		height: 100%;
	}
</style>