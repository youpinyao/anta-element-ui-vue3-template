import axios, { AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios';
import { tokenInterceptor } from './interceptors/token';
import { loadingInterceptor } from './interceptors/loading';
import { toastInterceptor } from './interceptors/toast';
import { loginInterceptor } from './interceptors/login';
import { RequestConfig, Request } from './types';

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

export const request: Request = function (url, config) {
	const options = {
		url: typeof url === 'string' ? url : url.url,
		...(typeof url === 'string' ? {} : url),
		...config,
	};

	if (!options.url) return Promise.reject('url is required');

	return instance(options);
};

export const get: Request = function (url, config) {
	return request(url, {
		...config,
		method: 'GET',
	});
};

export const post: Request = function (url, config) {
	return request(url, {
		...config,
		method: 'POST',
	});
};

export const del: Request = function (url, config) {
	return request(url, {
		...config,
		method: 'DELETE',
	});
};

export const put: Request = function (url, config) {
	return request(url, {
		...config,
		method: 'PUT',
	});
};

export const patch: Request = function (url, config) {
	return request(url, {
		...config,
		method: 'PATCH',
	});
};
