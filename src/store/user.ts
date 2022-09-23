import { defineStore } from 'pinia';
import { debounce } from 'throttle-debounce';
import { computed, ref } from 'vue';
import { useRequest } from '@/utils/hooks/useRequest';
import { adminV1UserInfoGet } from '@/apis/adminApiUserInfo';

export const useUserStore = defineStore('user', function () {
	const { data, run } = useRequest(adminV1UserInfoGet, {
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
