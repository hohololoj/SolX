<script setup lang="ts">
import NotificationBody from "../blocks/notificationBody.vue";
</script>

<template>
	<div class="notification__container">
		<NotificationBody/>
	</div>
</template>

<style>
	.notification__container{
		position: absolute;
		z-index: 999;
		right: 8px;
		bottom: 8px;
		width: fit-content;
		height: fit-content;
	}
</style>