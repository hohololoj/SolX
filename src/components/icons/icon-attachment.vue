<script setup lang="ts">

</script>

<template>
	<div class="icon-attachment__container">
		<svg width="33" height="34" viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M30.6575 15.9933L16.8725 29.7783C15.1837 31.4671 12.8933 32.4158 10.505 32.4158C8.11673 32.4158 5.82627 31.4671 4.1375 29.7783C2.44874 28.0896 1.5 25.7991 1.5 23.4108C1.5 21.0226 2.44874 18.7321 4.1375 17.0433L17.9225 3.25834C19.0483 2.13249 20.5753 1.5 22.1675 1.5C23.7597 1.5 25.2867 2.13249 26.4125 3.25834C27.5384 4.38418 28.1708 5.91115 28.1708 7.50334C28.1708 9.09552 27.5384 10.6225 26.4125 11.7483L12.6125 25.5333C12.0496 26.0963 11.2861 26.4125 10.49 26.4125C9.69391 26.4125 8.93043 26.0963 8.36751 25.5333C7.80458 24.9704 7.48834 24.2069 7.48834 23.4108C7.48834 22.6147 7.80458 21.8513 8.36751 21.2883L21.1025 8.56834"
				stroke="#8B91A3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</div>
</template>

<style>
.icon-attachment__container{
	width: 36px;
	height: 36px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: stroke 0.2s ease;
	padding: 6px;
}
.icon-attachment__container:hover path{
	stroke: var(--color-accent);
}
</style>