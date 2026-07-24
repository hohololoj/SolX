<script setup lang="ts">
	import { NotificationTypes, type Notification } from "@/composables/notificationController";

	const emit = defineEmits(['click'])

	const props = defineProps<{notification: Notification}>();
</script>

<template>
	<div class="notification__inner" :class="{
		'notification__inner_success': props.notification.type === NotificationTypes.SUCCESS,
		'notification__inner_warn': props.notification.type === NotificationTypes.WARN,
		'notification__inner_failure': props.notification.type === NotificationTypes.FAILURE,
	}">
		<h4 class="notification__title">{{ props.notification.title }}</h4>
		<p class="notification__message">{{ props.notification.message }}</p>
		<button v-if="props.notification.showTime === undefined" class="notification__close-button" @click="emit('click')">ОК</button>
	</div>
</template>

<style>
	.notification__inner{
		width: 420px;
		height: fit-content;
		padding: 20px 30px;
		display: flex;
		flex-direction: column;
		gap: 15px;
		border: 1px solid var(--color-border);
		border-radius: 16px;
	}
	.notification__inner_success{
		background: var(--color-success);
	}
	.notification__inner_warn{
		background: var(--color-warn);
	}
	.notification__inner_failure{
		background: var(--color-danger);
	}
	.notification__title{
		font-size: 18px;
		color: var(--color-text);
	}
	.notification__message{
		color: var(--color-text);
	}
	.notification__close-button{
		border: none;
		outline: none;
		cursor: pointer;
		padding: 8px 38px;
		color: var(--color-text);
		background: var(--color-input);
		transition: background 0.2s ease;
	}
	.notification__close-button:hover{
		background: var(--color-accent);
	}
</style>