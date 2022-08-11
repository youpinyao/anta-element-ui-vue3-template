import { queryMenu } from '@/services/menu';
import useRequest from '@hooks/useRequest';
import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', function () {
	const { data: items } = useRequest(queryMenu());

	return {
		items,
	};
});
