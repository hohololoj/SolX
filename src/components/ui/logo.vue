<script setup lang="ts">

</script>

<template>
	<div class="logo-container">
		<div class="logo-image">
			<p class="logo-image__content">AI</p>
		</div>
		<div class="logo-text">
			<p class="content__title">SolX</p>
			<p class="content__subtitle">AI Storyteller</p>
		</div>
	</div>
</template>

<style>
.logo-container {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 8px 12px 18px 12px;
	border-bottom: 1px solid var(--color-border);
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
</style>