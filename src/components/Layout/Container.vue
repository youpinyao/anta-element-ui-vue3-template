<template>
	<div class="layout-container">
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'LayoutContainer',
});
</script>

<style lang="scss" scoped>
.layout-container {
	padding: 16px;
}
</style>
