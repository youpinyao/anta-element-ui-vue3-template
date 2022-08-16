import { AxiosError, AxiosPromise } from 'axios';
import { ref } from 'vue';
import { ResponseBody } from '@axios/types';

export function useRequest<T = any, D = any, K = any>(
	promise: (...args: K[]) => AxiosPromise<ResponseBody<T>>,
	options?: {
		immediate?: boolean;
	}
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
				return res.data;
			},
			(err) => {
				error.value = err;
				loading.value = false;
				return err;
			}
		) as unknown as ReturnType<typeof promise>;
	};

	if (options?.immediate !== false) {
		run();
	}

	return {
		data,
		error,
		loading,
		run,
	};
}
