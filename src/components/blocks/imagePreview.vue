<script setup lang="ts">
import { composer } from "@/composables/useComposer";
import ImagePreviewItem from "../ui/imagePreviewItem.vue";
	
	const chatController = composer.chatController;
	const chatState = chatController.getChatState();

	function handleDeleteImage(idx: number){
		chatController.removeFileByIndex(idx);
	}

</script>

<template>
	<div class="image-preview">
		<ImagePreviewItem v-for="image, idx in chatState.userFiles" :image="image" @delete-image="() => {handleDeleteImage(idx)}"/>
	</div>
</template>

<style>
	.image-preview{
		width: 100%;
		height: fit-content;
		display: flex;
		gap: 15px;
		margin-bottom: 6px;
	}
</style>