<script setup lang="ts">

</script>

<template>
	<div class="spinner"></div>
</template>

<style>
	.spinner{
		width: 48px;
		height: 48px;
		border: 5px solid;
		border-color: var(--color-accent) transparent;
		border-radius: 50%;
		display: inline-block;
		box-sizing: border-box;
		animation: rotation 1s ease-in-out infinite;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>