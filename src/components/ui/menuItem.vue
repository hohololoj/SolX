<script setup lang="ts">
	const props = defineProps<{title: string, active?: boolean, collapsed: boolean}>();
	const emit = defineEmits<{
		(e: 'click'): void
	}>()
</script>

<template>
	<div @click="emit('click')" class="menu-item" :class="props.active ? 'menu-item_active' : ''">
		<slot />
		<p v-if="!props.collapsed" class="menu-item__value">
			{{ props.title }}
		</p>
	</div>
</template>

<style>
.menu-item {
	width: 100%;
	height: 41px;
	border-radius: 8px;
	display: flex;
	align-items: center;
	gap: 11px;
	background: transparent;
	border: 1px solid transparent;
	padding: 0px 12px;
	cursor: pointer;
}
.menu-item:hover {
	background: rgba(245, 165, 36, 0.12);
}
.menu-item:hover .menu-item__value{
	color: var(--color-icon-hover);
}
.menu-item:hover path {
	stroke: var(--color-icon-hover);
}

.menu-item_active {
	background: rgba(245, 165, 36, 0.12);
	border: 1px solid rgba(245, 165, 36, 0.35);
}
.menu-item_active .menu-item__value{
	color: var(--color-icon-hover);
}
.menu-item_active path {
	stroke: var(--color-icon-hover);
}

.menu-item__value {
	font-size: 13.5px;
	height: fit-content;
	color: var(--color-text);
	transition: color 0.2s ease;
}
</style>