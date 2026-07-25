<script setup lang="ts">
import { composer } from "@/composables/useComposer";
import ButtonClose from "../ui/buttonClose.vue";
import { ref } from "vue";

	const uiController = composer.uiController;
	const uiState = uiController.getUIState();
	const imageRef = ref();

	function handleCloseFullscreen(e: Event){
		if(e.target === imageRef.value){return}
		uiController.closeFullScreenImage();
	}
	
</script>

<template>
	<div @click="handleCloseFullscreen" class="fullscreen-image">
		<div class="button-close__wrapper">
			<ButtonClose @click="handleCloseFullscreen"/>
		</div>
		<img ref="imageRef" :src="uiState.imageToShow_base64" alt="" class="fullscreen-image__img">
	</div>
</template>

<style>
	.fullscreen-image{
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.fullscreen-image__img{
		max-width: 100%;
		max-height: 100%;
		width: auto;
		height: auto;
	}
	.button-close__wrapper{
		position: absolute;
		right: 8px;
		top: 8px;
	}
</style>