import axios, { AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios';
import { tokenInterceptor } from './interceptors/token';
import { loadingInterceptor } from './interceptors/loading';
import { toastInterceptor } from './interceptors/toast';
import { loginInterceptor } from './interceptors/login';
import { RequestConfig, ResponseBody } from './types';

const defaultConfig: AxiosRequestConfig = {
	timeout: 100000,
	responseType: 'json',
	withCredentials: true,
};
const instance = axios.create(defaultConfig);

tokenInterceptor(instance);
loadingInterceptor(instance);
toastInterceptor(instance);
loginInterceptor(instance);

export function get<T, D = any>(
	url: string | RequestConfig<D>,
	config?: RequestConfig<D>
) {
	return request<T, D>(url, {
		...config,
		method: 'GET',
	});
}

export function post<T, D = any>(
	url: string | RequestConfig<D>,
	config?: RequestConfig<D>
) {
	return request<T, D>(url, {
		...config,
		method: 'POST',
	});
}

export function del<T, D = any>(
	url: string | RequestConfig<D>,
	config?: RequestConfig<D>
) {
	return request<T, D>(url, {
		...config,
		method: 'DELETE',
	});
}

export function put<T, D = any>(
	url: string | RequestConfig<D>,
	config?: RequestConfig<D>
) {
	return request<T, D>(url, {
		...config,
		method: 'PUT',
	});
}

export function patch<T, D = any>(
	url: string | RequestConfig<D>,
	config?: RequestConfig<D>
) {
	return request<T, D>(url, {
		...config,
		method: 'PATCH',
	});
}

export function request<T, D = any>(
	url: string | RequestConfig<D>,
	config?: RequestConfig<D>
) {
	const options = {
		url: typeof url === 'string' ? url : url.url,
		...(typeof url === 'string' ? {} : url),
		...config,
	};

	if (!options.url) return Promise.reject('url is required');

	return instance(options) as AxiosPromise<ResponseBody<T>>;
}
