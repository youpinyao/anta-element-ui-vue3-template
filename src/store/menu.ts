import { MenuItem } from '@/models/menu';
import { queryMenu } from '@/apis/menu';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useMenuStore = defineStore('menu', function () {
	const menu = ref<MenuItem[]>();

	const updateMenu = async () => {
		menu.value = await queryMenu();
	};

	updateMenu();

	return {
		menu,
		updateMenu,
	};
});
