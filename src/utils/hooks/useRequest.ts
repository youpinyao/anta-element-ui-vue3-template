import { AxiosError, AxiosPromise } from 'axios';
import { ref } from 'vue';
import { ResponseBody } from '@axios/types';

export function useRequest<T = any, D = any>(
	promise: AxiosPromise<ResponseBody<T>>
) {
	const result = ref<ResponseBody<T>>();
	const loading = ref(false);
	const error = ref<AxiosError<ResponseBody<T>, D>>();

	const run = () => {
		loading.value = true;
		return promise
			.then((res) => (result.value = res.data))
			.catch((err: AxiosError<ResponseBody<T>, D>) => {
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
