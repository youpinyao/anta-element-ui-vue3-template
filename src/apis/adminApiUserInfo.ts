import { AdminApiUserInfoResult } from '@/models/adminApiUserInfo';
import { get } from '@/utils/axios';

export function adminApiUserInfo() {
	return get<AdminApiUserInfoResult>({
		url: '/admin/api/users/info',
	});
}
