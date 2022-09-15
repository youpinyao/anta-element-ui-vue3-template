<template>
	<div class="layout-block">
		<slot />
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'LayoutBlock',
});
</script>

<style lang="scss" scoped>
@import '~anta-element-ui-components-next/src/scss/variables';

.layout-block {
	padding: 24px;
	margin-bottom: 20px;
	background-color: $--color-white;

	&:last-child {
		margin-bottom: 0;
	}
}
</style>
