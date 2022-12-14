// import { adminApiMenuGet } from '@/apis/adminApiMenu';
// import { useRequest } from '@/utils/hooks/useRequest';
import { AdminV1MenusGetResult } from '@/models/admin/menuApi/AdminV1MenusGetResult';
import { defineStore } from 'pinia';
import { debounce } from 'throttle-debounce';
import { computed, ref } from 'vue';
import { useUserStore } from './user';

export type AsideMenu = {
	id?: string | number;
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
	const user = useUserStore();
	const loading = computed(() => {
		if (user.user?.menus?.length) {
			return false;
		}
		if (user.loading) {
			return true;
		}
		return false;
	});
	// const { data, run, loading } = useRequest(adminApiMenuGet, {
	// 	immediate: false,
	// });

	const menu = computed<AsideMenus>(() => {
		const userMenus = user.user?.menus ?? [];
		const menus: AsideMenus = [];
		const each = (
			items: NonNullable<AdminV1MenusGetResult['data']>,
			parent: any[] = menus
		) => {
			items.forEach((item) => {
				const menu = {
					id: item.id,
					title: item.title,
					path: item.path,
					icon: item.icon,
					children: [],
				};
				if (item.children) {
					each(item.children, menu.children);
				}
				parent.push(menu);
			});
		};
		each(userMenus);

		return menus;
	});

	// const menu: AsideMenus = [
	// 	{
	// 		title: '首页',
	// 		path: '/home',
	// 		icon: 'at-icon-home',
	// 	},
	// 	{
	// 		id: 'systemTools',
	// 		title: '系统工具',
	// 		icon: 'at-icon-tools',
	// 		children: [
	// 			{
	// 				title: '页面生成器',
	// 				path: '/page-generator',
	// 			},
	// 			{
	// 				title: '菜单管理',
	// 				path: '/menu',
	// 			},
	// 		],
	// 	},
	// ];

	const updateMenu = debounce(100, async () => {
		user.updateUserInfo();
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
