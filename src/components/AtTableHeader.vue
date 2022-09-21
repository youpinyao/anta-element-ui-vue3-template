<template>
	<div class="at-table-header">
		<AtTitle :border="false">{{ title }}</AtTitle>
		<div>
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import { AtTitle } from 'anta-element-ui-components-next';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'AtTableHeader',
	components: {
		AtTitle,
	},
	props: {
		title: String,
	},
});
</script>

<style lang="scss" scoped>
.at-table-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0 0 16px;

	:deep(.at-title) {
		padding: 0;
	}

	:deep(.at-button + .at-button) {
		margin-left: 12px;
	}
}
</style>
