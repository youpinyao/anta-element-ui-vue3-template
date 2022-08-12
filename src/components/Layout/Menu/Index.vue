<template>
	<AtMenu
		class="aside-menu"
		:router="true"
		:collapse="collapse"
		text-color="#fff"
		active-text-color="#fff"
		:collapse-transition="false"
		:default-active="defaultActive"
		background-color="transparent"
	>
		<AsideMenuChild :items="items" />
	</AtMenu>
</template>

<script lang="ts" setup>
import { AtMenu } from 'anta-element-ui-components-next';
import { computed, PropType } from 'vue';
import { MenuItem } from '@/models/menu';
import AsideMenuChild from './Child/Index.vue';
import { useRoute } from 'vue-router';

const props = defineProps({
	collapse: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	items: {
		type: Array as PropType<MenuItem[]>,
		default: () => [],
	},
});

const defaultActive = computed(() => {
	const { fullPath } = useRoute();
	let active = '';
	const eachMenu = (items: MenuItem[]) => {
		items.forEach((item) => {
			const key = item.path || item.key;
			if (key === fullPath) {
				active = key;
			} else if (item.children) {
				eachMenu(item.children);
			}
		});
	};
	eachMenu(props.items);

	return active;
});
</script>

<style lang="scss">
@import './index';
</style>
