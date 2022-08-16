import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { adminApiUserInfo } from '@/apis/adminApiUserInfo';
import { useRequest } from '@/utils/hooks/useRequest';

export const useUserStore = defineStore('user', function () {
	const { data, run } = useRequest(adminApiUserInfo);
	const user = computed(() => data.value?.data);

	const updateUserInfo = async () => {
		run();
	};

	return {
		user,
		updateUserInfo,
	};
});
