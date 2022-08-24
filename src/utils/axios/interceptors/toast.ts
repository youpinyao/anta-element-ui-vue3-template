import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { ElNotification } from 'anta-element-ui-components-next';
import { RequestConfig, ResponseBody } from '../types';
import { errsMsgToString } from '../error';

export function toastInterceptor(instance: AxiosInstance) {
	instance.interceptors.response.use(
		function (response: AxiosResponse<ResponseBody>) {
			if (![0, 200].includes(response.data.code)) {
				if ((response.config as RequestConfig)?.toast !== false) {
					ElNotification.error({
						title: `${response.request.responseURL} ${response.status}`,
						message:
							response.data.msg ||
							errsMsgToString(response.data.errsMsg) ||
							'接口错误',
					});
				}
				return Promise.reject({
					response,
				});
			}
			return response;
		},
		function (error: AxiosError<ResponseBody>) {
			if ((error.response?.config as RequestConfig)?.toast !== false) {
				ElNotification.error({
					title: error.code,
					message:
						error.response?.data.msg ||
						errsMsgToString(error.response?.data.errsMsg) ||
						error.message,
				});
			}
			return Promise.reject(error);
		}
	);
}
