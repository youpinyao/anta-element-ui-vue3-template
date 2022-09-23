import { AdminV1UsersInfoGetResult } from '@/models/userApi/AdminV1UsersInfoGetResult';
import { get } from '@/utils/axios';

export function adminV1UserInfoGet() {
	return get<AdminV1UsersInfoGetResult['data']>({
		url: '/admin/v1/users/info',
	});
}
