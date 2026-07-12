<script setup lang="ts">

</script>

<template>
	<div class="icon-translate__container">
		<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M3 3.75H8.25M6.75 2.25V3.75C6.75 7.0635 5.07075 9.75 3 9.75" stroke="var(--color-icon)" stroke-width="1.5"
				stroke-linecap="round" stroke-linejoin="round" />
			<path d="M3.75 6.75C3.75 8.358 5.958 9.75 8.625 9.75" stroke="var(--color-icon)" stroke-width="1.5"
				stroke-linecap="round" stroke-linejoin="round" />
			<path d="M9 15L12 8.25L15 15" stroke="var(--color-icon)" stroke-width="1.5" stroke-linecap="round"
				stroke-linejoin="round" />
			<path d="M10.125 12.75H13.875" stroke="var(--color-icon)" stroke-width="1.5" stroke-linecap="round"
				stroke-linejoin="round" />
		</svg>
	</div>
</template>

<style>
	.icon-translate__container{
		width: fit-content;
		height: fit-content;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.icon-translate__container path{
		transition: stroke 0.2s ease;
	}
</style>