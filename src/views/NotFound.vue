<template>
	<div class="empty">
		<AtEmpty description="Not Found" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { AtEmpty } from 'anta-element-ui-components-next';

export default defineComponent({
	name: 'NotFound',
	components: {
		AtEmpty,
	},
	setup() {
		const time = ref(0);

		time.value = Date.now();

		return { time };
	},
});
</script>

<style lang="scss" scoped>
.empty {
	display: flex;
	align-items: center;
	justify-content: center;
	height: calc(100vh - 48px);
}
</style>
