import { adminApiMenu } from '@/apis/adminApiMenu';
import { useRequest } from '@/utils/hooks/useRequest';
import { defineStore } from 'pinia';
import { debounce } from 'throttle-debounce';
import { computed, ref } from 'vue';

export const useMenuStore = defineStore('menu', function () {
	const { data, run, loading } = useRequest(adminApiMenu, {
		immediate: false,
	});
	const menu = computed(() => data.value?.data);

	const updateMenu = debounce(100, async () => {
		run();
	});

	return {
		menu,
		updateMenu,
		loading,
	};
});
