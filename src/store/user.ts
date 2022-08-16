import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { AdminApiUserInfoResult } from '@/models/adminApiUserInfo';
import { adminApiUserInfo } from '@/apis/adminApiUserInfo';

export const useUserStore = defineStore('user', function () {
	const user = ref<AdminApiUserInfoResult>();

	const updateUserInfo = async () => {
		const result = await adminApiUserInfo();

		user.value = result.data.data;
	};

	updateUserInfo();

	return {
		user,
		updateUserInfo,
	};
});
