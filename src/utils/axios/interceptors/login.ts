import { AxiosError, AxiosInstance } from 'axios';
import { useRouter } from 'vue-router';
import router from '@/router';

let timer: NodeJS.Timeout;

export function loginInterceptor(instance: AxiosInstance) {
	instance.interceptors.response.use(
		function (response) {
			return response;
		},
		function (error: AxiosError) {
			if (error?.response?.status === 401) {
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
