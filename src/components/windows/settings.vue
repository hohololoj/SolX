<script setup lang="ts">
import Header from "../blocks/header.vue";
import SettingsBody from "../blocks/settingsBody.vue";


</script>

<template>
	<div class="settings__container">
		<Header>Настройки</Header>
		<SettingsBody/>
	</div>
</template>

<style>
	.settings__container{
		width: 100%;
		height: 100%;
		display: grid;
		grid-template: 56px 1fr / 100%;
	}
</style>