import { defineStore } from 'pinia';
import { debounce } from 'throttle-debounce';
import { computed, ref } from 'vue';
import { adminApiUserInfoGet } from '@/apis/adminApiUserInfo';
import { useRequest } from '@/utils/hooks/useRequest';

export const useUserStore = defineStore('user', function () {
	const { data, run } = useRequest(adminApiUserInfoGet, {
		immediate: false,
	});
	const user = computed(() => data.value?.data);

	const updateUserInfo = debounce(100, async () => {
		run();
	});

	return {
		user,
		updateUserInfo,
	};
});
