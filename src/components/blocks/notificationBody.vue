<script setup lang="ts">
import { composer } from "@/composables/useComposer";
import { computed } from "vue";
import NotificationInner from "../ui/notificationInner.vue";

	const notificationController = composer.notificationController;
	const notificationState = notificationController.getState();

	const currentNotification = computed(() => {
		return notificationState.notifications[0];
	})
	
	function handleCloseNotificationClick(){
		notificationController.clickCloseFirstNotification();
	}

</script>

<template>
	<div class="notification__body">
		<NotificationInner v-if="currentNotification !== undefined" :notification="currentNotification" @click="handleCloseNotificationClick"/>
	</div>
</template>

<style>
	.notification__body{
		width: fit-content;
		height: fit-content;
	}
</style>