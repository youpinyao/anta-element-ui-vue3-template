import { useTokenStore } from '@/store/token';
import { AxiosInstance } from 'axios';
import { RequestConfig } from '../types';

export function tokenInterceptor(instance: AxiosInstance) {
	instance.interceptors.request.use(
		function (config: RequestConfig) {
			return {
				...config,
				headers: {
					...config.headers,
					Authorization: `Bearer ${useTokenStore().token}`,
				},
			};
		},
		function (error) {
			return Promise.reject(error);
		}
	);
}
