import { AxiosRequestConfig } from 'axios';

export type RequestConfig<D = any> = AxiosRequestConfig<D> & {
	toast?: boolean;
};
export type ResponseBody<T = any> = {
	data: T;
	code: number;
	msg: string;
	errsMsg?: Record<string, any>;
};
