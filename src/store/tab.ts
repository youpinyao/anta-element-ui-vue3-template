import { defineStore } from 'pinia';
import { ref } from 'vue';
import { RouteLocationNormalized } from 'vue-router';

type TabItem = {
	name: string;
	path: string;
	title: string;
	closable: boolean;
};

export const useTabStore = defineStore('tab', () => {
	const items = ref<TabItem[]>([
		{
			name: 'Home',
			path: '/home',
			title: '首页',
			closable: false,
		},
	]);
	const active = ref<TabItem>();

	const add = (route: RouteLocationNormalized) => {
		const tab: TabItem = {
			name: route.name as string,
			path: route.path,
			title: route.meta?.title as string,
			closable: route.meta?.closable !== false,
		};
		const match = items.value.filter((item) => item.path === route.path)[0];

		if (match) {
			active.value = match;
		} else {
			active.value = tab;
			items.value.push(tab);
		}
	};

	return { add, items, active };
});
