<script setup lang="ts">

</script>

<template>
	<div class="icon-send__container">
		<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M33 3L16.5 19.5M16.5 19.5L3 13.5L33 3L22.5 33L16.5 19.5Z" stroke="#8B91A3" stroke-width="3.3" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	</div>
</template>

<style>
	.icon-send__container{
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		border-radius: 9px;
		border: 1px solid var(--color-border);
		padding: 7px 7px 5px 5px;
		transition: stroke 0.2s ease
					background 0.2s ease;
	}
	.icon-send__container:hover{
		background: var(--color-accent);
	}
	.icon-send__container:hover path{
		stroke: var(--color-text-black);
	}
</style>