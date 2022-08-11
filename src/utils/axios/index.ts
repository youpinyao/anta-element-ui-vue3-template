import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { loadingInterceptor } from './interceptors/loading';
import { toastInterceptor } from './interceptors/toast';
import { loginInterceptor } from './interceptors/login';

const defaultConfig: AxiosRequestConfig = {
	timeout: 100000,
	responseType: 'json',
	baseURL: '/admin/api',
};
const instance = axios.create(defaultConfig);

loadingInterceptor(instance);
toastInterceptor(instance);
loginInterceptor(instance);

export type RequestConfig<D> = AxiosRequestConfig<D>;
export type RequestBody<T> = {
	data: T;
	code: number;
	msg: string;
};

export function request<T = any, D = any>(
	url: string | RequestConfig<D>,
	config?: RequestConfig<D>
) {
	const options = {
		url: typeof url === 'string' ? url : url.url,
		...(typeof url === 'string' ? {} : url),
		...config,
	};

	if (!options.url) return Promise.reject('url is required');

	return instance(options) as AxiosPromise<RequestBody<T>>;
}

export function get<T = any, D = any>(
	url: string | RequestConfig<D>,
	config?: RequestConfig<D>
) {
	return request<T, D>(url, {
		...config,
		method: 'GET',
	});
}

export function post<T = any, D = any>(
	url: string | RequestConfig<D>,
	config?: RequestConfig<D>
) {
	return request<T, D>(url, {
		...config,
		method: 'POST',
	});
}
