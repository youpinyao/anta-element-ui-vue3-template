import { AxiosError, AxiosInstance } from 'axios';
import { ElNotification } from 'anta-element-ui-components-next';

export function toastInterceptor(instance: AxiosInstance) {
	instance.interceptors.response.use(
		function (response) {
			if (response.data.code !== 0) {
				ElNotification.error({
					title: `${response.request.responseURL} ${response.status}`,
					message: response.data.msg || '接口错误',
				});
				return Promise.reject({
					response,
				});
			}
			return response;
		},
		function (error: AxiosError) {
			ElNotification.error({
				title: error.code,
				message: error.message,
			});
			return Promise.reject(error);
		}
	);
}
