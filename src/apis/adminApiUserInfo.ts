import { AdminApiUsersInfoGetResult } from '@/models/userApi/AdminApiUsersInfoGetResult';
import { get } from '@/utils/axios';

export function adminApiUserInfoGet() {
	return get<AdminApiUsersInfoGetResult['data']>({
		url: '/admin/v1/users/info',
	});
}
