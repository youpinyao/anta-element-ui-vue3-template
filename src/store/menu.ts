// import { adminApiMenuGet } from '@/apis/adminApiMenu';
// import { useRequest } from '@/utils/hooks/useRequest';
import { defineStore } from 'pinia';
import { debounce } from 'throttle-debounce';
import { computed, ref } from 'vue';

export type AsideMenu = {
	id?: string;
	title?: string;
	path?: string;
	icon?: string;
	children?: AsideMenu[];
};

export type AsideMenus = AsideMenu[];

export const useMenuStore = defineStore('menu', function () {
	const collapse = ref(
		window.localStorage.getItem('anta-aside-menu-collapse') === 'true'
	);
	const loading = ref(false);
	// const { data, run, loading } = useRequest(adminApiMenuGet, {
	// 	immediate: false,
	// });
	const menu = computed<AsideMenus>(() => [
		// ...(data.value?.data ?? []),
		{
			title: '首页',
			path: '/home',
			icon: 'at-icon-home',
		},
		{
			id: 'systemTools',
			title: '系统工具',
			icon: 'at-icon-tools',
			children: [
				{
					title: '页面生成器',
					path: '/page-generator',
				},
				{
					title: '菜单管理',
					path: '/menu',
				},
			],
		},
	]);

	const updateMenu = debounce(100, async () => {
		// run({});
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
