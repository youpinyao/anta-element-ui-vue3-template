import { AdminV1LoginPostParams } from '@/models/admin/tokenApi/AdminV1LoginPostParams';
import { AdminV1LoginPostResult } from '@/models/admin/tokenApi/AdminV1LoginPostResult';
import { post } from '@/utils/axios';

export function adminV1LoginPost(data: AdminV1LoginPostParams['req']) {
	return post<AdminV1LoginPostResult['data'], AdminV1LoginPostParams['req']>({
		url: '/admin/v1/login',
		data,
		toast: false,
	});
}
