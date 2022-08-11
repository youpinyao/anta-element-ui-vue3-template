import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

export const useRouterStore = defineStore('router', function () {
	const routes = reactive<Record<string, boolean>>({});
	const timer = ref<NodeJS.Timeout>();

	return {
		routes,

		routeStart(fullPath: string) {
			timer.value = setTimeout(() => {
				routes[fullPath] = true;
			}, 200);
		},
		routeEnd(fullPath: string) {
			clearTimeout(timer.value);
			routes[fullPath] = false;
		},
	};
});
