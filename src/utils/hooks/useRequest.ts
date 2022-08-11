import { AxiosError, AxiosPromise } from 'axios';
import { ref } from 'vue';

export function useRequest<T = any, D = any>(promise: AxiosPromise<T>) {
	const result = ref<T>();
	const loading = ref(false);
	const error = ref<AxiosError<T, D>>();

	const run = () => {
		loading.value = true;
		return promise
			.then((res) => (result.value = res.data))
			.catch((err) => {
				error.value = err;
			})
			.finally(() => {
				loading.value = false;
			});
	};

	run();

	return {
		result,
		error,
		loading,
		run,
	};
}
