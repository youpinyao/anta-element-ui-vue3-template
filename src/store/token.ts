import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useTokenStore = defineStore('token', function () {
	const key = 'admin_auth_token';
	const token = ref<string>(getToken());

	function getToken() {
		return localStorage.getItem(key) || '';
	}

	function setToken(value: string) {
		localStorage.setItem(key, value);
		token.value = getToken();
	}

	function removeToken() {
		localStorage.removeItem(key);
		token.value = getToken();
	}

	return {
		token,
		setToken,
		removeToken,
	};
});
