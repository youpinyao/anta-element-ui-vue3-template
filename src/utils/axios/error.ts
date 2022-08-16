import { AxiosError } from 'axios';
import { ResponseBody } from './types';

export function getAxiosErrorMsg<T extends ResponseBody, D>(
	err: AxiosError<T, D>
) {
	let message;
	if (err.response?.data?.errsMsg) {
		message = errsMsgToString(err.response?.data?.errsMsg);
	} else if (err.response?.data?.msg) {
		message = err.response?.data?.msg;
	} else {
		message = err.message;
	}

	return message || '';
}

export function errsMsgToString(errsMsg: ResponseBody['errsMsg']) {
	return Object.values(errsMsg || {})
		.flat()
		.join(' ')
		.trim();
}
