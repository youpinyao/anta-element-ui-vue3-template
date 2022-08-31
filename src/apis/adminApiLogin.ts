import { AdminApiLoginPostParams } from '@/models/tokenApi/AdminApiLoginPostParams';
import { AdminApiLoginPostResult } from '@/models/tokenApi/AdminApiLoginPostResult';
import { post } from '@/utils/axios';

export function adminApiLogin(data: AdminApiLoginPostParams['req']) {
	return post<AdminApiLoginPostResult['data'], AdminApiLoginPostParams['req']>({
		url: '/admin/api/login',
		data,
		toast: false,
	});
}
