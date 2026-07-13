<script setup lang="ts">
import { useGlobalState } from "@/composables/useGlobalState";

	const {state, checkAI} = useGlobalState();

	async function handleUpdateAIStatusClick(){
		const res = await checkAI();
		if(res === false){
			alert("BaseURL is not reachable");
			return;
		}
		if(res.ok){
			state.AIActive = true;
			return;
		}
		if(res.status === 401 || res.status === 403){
			alert("Unauthorized error");
		}
		state.AIActive = false;
	}

</script>

<template>
	<div class="ai-status-container" @click="handleUpdateAIStatusClick">
		<div class="ai-status__lamp" :class="state.AIActive ? 'ai-status__lamp_active' : 'ai-status__lamp_inactive'"></div>
		<p v-if="state.AIActive === true" class="ai-status__text">ИИ активен</p>
		<p v-if="state.AIActive === false" class="ai-status__text">ИИ не активен</p>
	</div>
</template>

<style>
	.ai-status-container{
		width: fit-content;
		height: 30px;
		border-radius: 13px;
		border: 1px solid var(--color-border);
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 0px 10px;
		cursor: pointer;
	}
	.ai-status__lamp{
		width: 7px;
		height: 7px;
		border-radius: 50%;
	}
	.ai-status__lamp_active{
		background: var(--color-success);
	}
	.ai-status__lamp_inactive{
		background: var(--color-danger);
	}
	.ai-status__text{
		font-size: 12px;
		color: var(--color-text);
	}
</style>