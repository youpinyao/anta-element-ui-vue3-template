<template>
	<div class="at-search-buttons">
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'AtSearchButtons',
});
</script>

<style lang="scss" scoped>
.at-search-buttons {
	display: flex;
	justify-content: right;
}
</style>
