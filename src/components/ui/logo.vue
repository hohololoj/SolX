<script setup lang="ts">
import IconCollapse from "../icons/icon-collapse.vue";

const emit = defineEmits(['toggleCollapse']);
const props = defineProps<{collapsed: boolean}>();

</script>

<template>
	<div class="logo__container" :class="props.collapsed ? 'logo__container_translated' : ''">
		<div v-if="!props.collapsed" class="logo__wrapper">
			<div class="logo-image">
				<p class="logo-image__content">AI</p>
			</div>
			<div class="logo-text">
				<p class="content__title">SolX</p>
				<p class="content__subtitle">AI Storyteller</p>
			</div>
		</div>
		<button class="button-collapse" :class="props.collapsed ? 'button-collapse_translated' : ''" @click="emit('toggleCollapse')"><IconCollapse/></button>
	</div>
</template>

<style>
.logo__container {
	width: 100%;
	height: fit-content;
	display: flex;
	justify-content: space-between;
	padding: 8px 12px 18px 12px;
	border-bottom: 1px solid var(--color-border);
	align-items: center;
}
.logo__container_translated{
	flex-direction: column-reverse;
	padding: 8px 0 18px 0;
	gap: 10px;
}
.logo__wrapper{
	height: 100%;
	display: flex;
	align-items: center;
	gap: 10px;
}
.logo-image {
	width: 32px;
	height: 32px;
	border-radius: 9px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: linear-gradient(to bottom right, #f5a524, #d97706);
}
.logo-image__content {
	font-weight: bold;
	font-size: 16px;
	color: var(--color-black);
}
.logo-text {
	display: flex;
	flex-direction: column;
}
.content__title {
	color: var(--color-text);
	font-weight: 600;
	font-size: 14px;
	line-height: 21px;
}
.content__subtitle {
	color: var(--color-text-placeholder);
	font-size: 11px;
	line-height: 16.5px;
}
.button-collapse{
	width: 20px;
	height: 20px;
	cursor: pointer;
	border: none;
	outline: none;
	background: none;
	transition: transform 0.2s ease,
				width 0.2s ease,
				height 0.2s ease;
}
.button-collapse:hover path{
	fill: var(--color-accent);
}
.button-collapse_translated{
	width: 24px;
	height: 24px;
	transform: scaleX(-1);
}
</style>