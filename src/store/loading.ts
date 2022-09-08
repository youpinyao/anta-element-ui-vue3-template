import { defineStore } from 'pinia';
import chalk from 'chalk';
import { reactive, ref } from 'vue';

export const useLoadingStore = defineStore('loading', function () {
	const effects = reactive<Record<string, boolean>>({});

	return {
		effects,
		set(url: string, isLoading: boolean) {
			// console.log(chalk.bgBlackBright('loading effect'), url, isLoading);
			effects[url] = isLoading;
		},
	};
});
