import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

export const useLoadingStore = defineStore('loading', function () {
	const effects = reactive<Record<string, boolean>>({});

	return {
		effects,
		set(url: string, isLoading: boolean) {
			effects[url] = isLoading;
		},
	};
});
