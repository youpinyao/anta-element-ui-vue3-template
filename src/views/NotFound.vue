<template>
	<div class="empty">
		<AtEmpty description="Not Found" />
	</div>
</template>

<script lang="ts" setup>
import { AtEmpty } from 'anta-element-ui-components-next';
</script>

<style lang="scss" scoped>
.empty {
	display: flex;
	align-items: center;
	justify-content: center;
	height: calc(100vh - 48px);
}
</style>
