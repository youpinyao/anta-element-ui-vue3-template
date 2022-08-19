import { AxiosPromise, AxiosRequestConfig } from 'axios';

export type RequestConfig<D = any> = AxiosRequestConfig<D> & {
	toast?: boolean;
};
export type ResponseBody<T = any> = {
	data: T;
	code: number;
	msg: string;
	errsMsg?: Record<string, any>;
};

export type Request = <T, D = any>(
	url: string | RequestConfig<D>,
	config?: RequestConfig<D>
) => AxiosPromise<ResponseBody<T>>;
