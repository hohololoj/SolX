<script setup lang="ts">
import { useGlobalState, WindowsList } from "@/composables/useGlobalState.ts";
import IconChat from "../icons/icon-chat.vue";
import IconPresets from "../icons/icon-presets.vue";
import Logo from "../ui/logo.vue";
import MenuItem from "../ui/menuItem.vue";
import IconSettings from "../icons/icon-settings.vue";
import { reactive } from "vue";

const {state, setActiveWindow} = useGlobalState();

const props = defineProps<{state: {collapsed: boolean}}>()

function handleToggleCollapse(){
	props.state.collapsed = !props.state.collapsed;
}

</script>

<template>
	<div class="aside-container">
		<Logo :collapsed="props.state.collapsed" @toggle-collapse="handleToggleCollapse" />
		<div class="aside__menu">
			<MenuItem :collapsed="props.state.collapsed" @click="setActiveWindow(WindowsList.CHAT)" :active="state.activeWindow === WindowsList.CHAT" title="Чат"><IconChat/></MenuItem>
			<MenuItem :collapsed="props.state.collapsed" @click="setActiveWindow(WindowsList.PRESETS)" :active="state.activeWindow === WindowsList.PRESETS" title="Пресеты"><IconPresets/></MenuItem>
		</div>
		<div class="menu-item__settings" @click="setActiveWindow(WindowsList.SETTINGS)" :class="state.activeWindow === WindowsList.SETTINGS ? 'menu-item__settings_active' : ''">
			<IconSettings/>
			<p v-if="!props.state.collapsed" class="menu-item__settings__text">Настройки</p>
		</div>
	</div>
</template>

<style>
.aside-container {
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: min-content 1fr 41px;
	row-gap: 16px;
	padding: 16px 12px;
	background: var(--color-main-side);
	border-right: 1px solid var(--color-border);
}
.aside__menu {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 4px;
}
.menu-item__settings{
	width: 100%;
	height: 100%;
	border-radius: 8px;
	display: flex;
	align-items: center;
	gap: 11px;
	background: transparent;
	border: 1px solid transparent;
	padding: 0px 12px;
	cursor: pointer;
}
.menu-item__settings:hover {
	background: rgba(245, 165, 36, 0.12);
}
.menu-item__settings:hover path{
	fill: var(--color-icon-hover);
}
.menu-item__settings__text{
	font-size: 13.5px;
	color: var(--color-text);
	transition: color 0.2s ease;
}
.menu-item__settings:hover .menu-item__settings__text{
	color: var(--color-icon-hover);
}
.menu-item__settings_active {
	background: rgba(245, 165, 36, 0.12);
	border: 1px solid rgba(245, 165, 36, 0.35);
}
.menu-item__settings_active .menu-item__settings__text{
	color: var(--color-icon-hover);
}
.menu-item__settings_active path{
	fill: var(--color-icon-hover);
}
</style>