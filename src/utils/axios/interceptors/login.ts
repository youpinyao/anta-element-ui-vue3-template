import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { useRouter } from 'vue-router';
import router from '@/router';
import { ResponseBody } from '../types';

let timer: NodeJS.Timeout;

export function loginInterceptor(instance: AxiosInstance) {
	instance.interceptors.response.use(
		function (response: AxiosResponse<ResponseBody>) {
			return response;
		},
		function (error: AxiosError<ResponseBody>) {
			if (
				error?.response?.status === 401 ||
				error.response?.data.code === 401
			) {
				clearTimeout(timer);
				timer = setTimeout(() => {
					router.replace({
						name: 'Login',
					});
				}, 300);
			}
			return Promise.reject(error);
		}
	);
}
