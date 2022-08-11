import { MenuItem } from '@/models/menu';
import { queryMenu } from '@/services/menu';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useMenuStore = defineStore('menu', function () {
	const result = ref<MenuItem[]>();
	const items = computed(() => result.value);

	queryMenu().then((res) => (result.value = res));

	return {
		items,
	};
});
