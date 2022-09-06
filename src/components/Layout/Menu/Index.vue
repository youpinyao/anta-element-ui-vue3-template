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
import AsideMenuChild from './Child/Index.vue';
import { useRoute } from 'vue-router';
import { AdminApiMenusGetResult } from '@/models/menuApi/AdminApiMenusGetResult';

const props = defineProps({
	collapse: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	items: {
		type: Array as PropType<AdminApiMenusGetResult['data']>,
		default: () => [],
	},
});

const defaultActive = computed(() => {
	const { fullPath } = useRoute();
	let active = '';
	const eachMenu = (items: AdminApiMenusGetResult['data']) => {
		items?.forEach((item) => {
			const key = item.path || item.id;
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
