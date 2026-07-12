<script setup lang="ts">
import Header from "../blocks/header.vue";
import PresetsBody from "../blocks/presetsBody.vue";


</script>

<template>
	<div class="presets-container">
		<Header>Пресеты</Header>
		<PresetsBody/>
	</div>
</template>

<style>
	.presets-container{
		width: 100%;
		height: 100%;
		display: grid;
		grid-template: 56px 1fr / 100%;
	}
</style>