import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { useLoadingStore } from '@/store/loading';
import { RequestConfig, ResponseBody } from '../types';

export function loadingInterceptor(instance: AxiosInstance) {
	instance.interceptors.request.use(
		function (config: RequestConfig) {
			useLoadingStore().set(config.url ?? '', true);
			return config;
		},
		function (error) {
			return Promise.reject(error);
		}
	);
	instance.interceptors.response.use(
		function (response: AxiosResponse<ResponseBody>) {
			useLoadingStore().set(response.config.url ?? '', false);
			return response;
		},
		function (error: AxiosError<ResponseBody>) {
			useLoadingStore().set(error.response?.config?.url ?? '', false);
			return Promise.reject(error);
		}
	);
}
