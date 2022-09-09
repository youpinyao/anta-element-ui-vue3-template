import { adminApiMenuGet } from '@/apis/adminApiMenu';
import { useRequest } from '@/utils/hooks/useRequest';
import { defineStore } from 'pinia';
import { debounce } from 'throttle-debounce';
import { computed, ref } from 'vue';

export const useMenuStore = defineStore('menu', function () {
	const collapse = ref(
		window.localStorage.getItem('anta-aside-menu-collapse') === 'true'
	);
	const { data, run, loading } = useRequest(adminApiMenuGet, {
		immediate: false,
	});
	const menu = computed(() => [
		// ...(data.value?.data ?? []),
		{
			title: '首页',
			path: '/home',
			icon: 'at-icon-home',
		},
		{
			title: '页面生成器',
			path: '/page-generator',
			icon: 'at-icon-tools',
		},
	]);

	const updateMenu = debounce(100, async () => {
		run({});
	});

	return {
		menu,
		updateMenu,
		loading,
		collapse,
		setCollapse(bool: boolean) {
			collapse.value = bool;
		},
	};
});
