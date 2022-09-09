import { AxiosError, AxiosPromise } from 'axios';
import { ref } from 'vue';
import { ResponseBody } from '@axios/types';

type Options = {
	immediate?: boolean;
};

export function useRequest<T = any, D = any, K extends any[] = any>(
	promise: (...args: K) => AxiosPromise<ResponseBody<T>>,
	options?: Options
) {
	const data = ref<ResponseBody<T>>();
	const loading = ref(false);
	const error = ref<AxiosError<ResponseBody<T>, D>>();

	const run: typeof promise = (...args) => {
		loading.value = true;

		return promise(...args).then(
			(res) => {
				data.value = res.data;
				error.value = undefined;
				loading.value = false;
				return res;
			},
			(err) => {
				error.value = err;
				loading.value = false;
				return err;
			}
		);
	};

	if (options?.immediate !== false) {
		run(...([] as unknown as K));
	}

	return {
		data,
		error,
		loading,
		run,
	};
}
