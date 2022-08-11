import { AxiosError, AxiosInstance, AxiosInterceptorManager } from 'axios';
import { useLoadingStore } from '@/store/loading';

export function loadingInterceptor(instance: AxiosInstance) {
	instance.interceptors.request.use(
		function (config) {
			useLoadingStore().set(config.url ?? '', true);
			return config;
		},
		function (error) {
			return Promise.reject(error);
		}
	);
	instance.interceptors.response.use(
		function (response) {
			useLoadingStore().set(response.config.url ?? '', false);
			return response;
		},
		function (error: AxiosError) {
			useLoadingStore().set(error.response?.config?.url ?? '', false);
			return Promise.reject(error);
		}
	);
}
