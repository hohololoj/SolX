<script setup lang="ts">
import { providerPresets, SettingLocalId, useSettings } from "@/composables/useSettings.ts";
import ProviderItem from "../ui/providerItem.vue";
import SettingsItem from "../ui/settingsItem.vue";
import ButtonOk from "../ui/buttonOk.vue";
import { computed } from "vue";
import { useGlobalState, WindowsList } from "@/composables/useGlobalState.ts";

const {settings, setActivePreset, writeConfig} = useSettings();
const {state} = useGlobalState();

function handleSelectProviderClick(id: number){
	setActivePreset(id);
}

async function handleSaveSettingsClick(){
	if(!valid.value){return}
	await writeConfig();
	state.activeWindow = WindowsList.CHAT;
}

const valid = computed(() => {

	if(settings.baseUrl === ''){return false;}
	if(settings.model === ''){return false;}
	if(settings.activePreset != SettingLocalId && settings.token === ''){return false;}

	return true;
})

</script>

<template>
	<div class="settings-body">
		<div class="settings-body__line">
			<h2 class="settings-body__title">Настройки</h2>

			<SettingsItem :title="'Провайдер'">
				<div class="setting-item__providers">
					<ProviderItem @click="() => {handleSelectProviderClick(id)}" v-for="(provider, id) in providerPresets" :active="settings.activePreset === id" :provider="provider.name" :url="provider.url"/>
				</div>
			</SettingsItem>

			<SettingsItem :title="'Подключение'">
				<div class="setting-item__connection">

					<div class="connection__item">
						<h3 class="connection__title">Базовый URL</h3>
						<input type="text" v-model="settings.baseUrl" class="connection__input">
						<p class="connection__label">Базовый адрес API-эндпоинта</p>
					</div>

					<div class="connection__item">
						<h3 class="connection__title">API токен</h3>
						<input type="text" v-model="settings.token" placeholder="sk-..." class="connection__input">
					</div>

					<div class="connection__item">
						<h3 class="connection__title">Модель</h3>
						<input type="text" v-model="settings.model" class="connection__input">
					</div>

				</div>
			</SettingsItem>



			<div class="settings-control">
				<ButtonOk @click="handleSaveSettingsClick" :is-ok="valid">Сохранить</ButtonOk>
			</div>
		</div>
	</div>
</template>

<style>
	.settings-body{
		width: 100%;
		height: 100%;
		max-height: 100%;
		background: var(--color-main);
		padding: 28px 530px;
	}
	.settings-body__line{
		width: 100%;
		height: auto;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 28px;
	}
	.settings-body__title{
		font-size: 22px;
		font-weight: bold;
		color: var(--color-text);
	}
	.setting-item__providers{
		width: 100%;
		display: grid;
		grid-template: auto / 1fr 1fr 1fr 1fr;
		column-gap: 8px;
	}
	.setting-item__connection{
		width: 100%;
		padding: 18px;
		background: var(--color-ai-bubble);
		border: 1px solid var(--color-border);
		border-radius: 12px;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.connection__item{
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.connection__title{
		font-size: 12px;
		font-weight: 600;
		color: var(--color-icon);
	}
	.connection__input{
		width: 100%;
		border: 1px solid var(--color-border);
		outline: none;
		padding: 9px 12px;
		color: var(--color-text);
		font-size: 13.5px;
		background: none;
		border-radius: 8px;
	}
	.connection__input::placeholder{
		color: var(--color-text-placeholder);
	}
	.connection__label{
		font-size: 11px;
		color: var(--color-text-placeholder);
	}
	.settings-control{
		display: flex;
		justify-content: flex-end;
	}
</style>