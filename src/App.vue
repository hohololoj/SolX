<script setup lang="ts">
import Aside from "./components/blocks/aside.vue";
import Chat from "./components/windows/chat.vue";
import Modal from "./components/windows/modal.vue";
import Presets from "./components/windows/presets.vue";
import Settings from "./components/windows/settings.vue";
import { useGlobalState, WindowsList } from "./composables/useGlobalState.ts";
import { ModalsList, useUIState } from "./composables/useUIState.ts";

const {state} = useGlobalState();
const {UIState} = useUIState();

</script>

<template>
	<Aside/>
	<div class="windows-container">
		<Chat v-if="state.activeWindow === WindowsList.CHAT"/>
		<Presets v-if="state.activeWindow === WindowsList.PRESETS"/>
		<Settings v-if="state.activeWindow === WindowsList.SETTINGS"/>
	</div>
	<Modal v-if="UIState.activeModal !== ModalsList.NOTHING"/>
</template>

<style>
	#app{
		width: 100%;
		height: 100vh;
		display: grid;
		grid-template: 100% / 240px 1fr;
	}
	.windows-container{
		width: 100%;
		height: 100%;
	}
</style>