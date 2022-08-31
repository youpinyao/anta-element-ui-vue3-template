import { AdminApiUsersInfoGetResult } from '@/models/userApi/AdminApiUsersInfoGetResult';
import { get } from '@/utils/axios';

export function adminApiUserInfo() {
	return get<AdminApiUsersInfoGetResult['data']>({
		url: '/admin/api/users/info',
	});
}
