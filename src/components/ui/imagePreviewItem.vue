<script setup lang="ts">
import { onMounted, onUnmounted, reactive, watch } from "vue";
import ButtonClose from "./buttonClose.vue";
import { composer } from "@/composables/useComposer.ts";

	const uiController = composer.uiController;

	interface ImagePreviewState{
		base64: string
	}

	const emit = defineEmits(['deleteImage']);

	const props = defineProps<{
		image: string
	}>();

	const imagePreviewState = reactive<ImagePreviewState>({
		base64: ''
	})

	function setStateURL(base64: string){
		imagePreviewState.base64 = base64;
	}

	onMounted(() => {
		setStateURL(props.image);
	})
	watch(() => props.image, (newImage) => {
		setStateURL(newImage);
	})

	function handleFullScreenImageOpen(){
		uiController.showImageInFullScreen(imagePreviewState.base64);
	}
	
</script>

<template>
	<div class="image-preview__item">
		<div class="image-preview__item__inner">
			<div class="image-preview__item__control">
				<ButtonClose @click="emit('deleteImage')"/>
			</div>
			<img @click="handleFullScreenImageOpen" class="image-preview__item__image" :src="imagePreviewState.base64" alt="">
		</div>
	</div>
</template>

<style>
	.image-preview__item{
		max-height: 160px;
		max-width: 160px;
		cursor: pointer;
	}
	.image-preview__item .button-close{
		border-radius: 16px;
	}
	.image-preview__item__inner{
		display: inline-block;
		position: relative;
		width: fit-content;
		height: fit-content;
		max-width: 100%;
		max-height: 100%;
	}
	.image-preview__item__control{
		width: fit-content;
		height: fit-content;
		position: absolute;
		right: 0px;
		top: 0px;
		position: absolute;
		z-index: 1;
	}
	.image-preview__item__image{
		width: auto;
		height: auto;
		max-width: 160px;
		max-height: 160px;
		object-fit: cover;
		border-radius: 8px;
		z-index: 1;
		transition: filter 0.3s ease;
	}
	.image-preview__item:hover .image-preview__item__image{
		filter: brightness(0.5);
	}
</style>