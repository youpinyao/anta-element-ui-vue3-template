import { AdminApiMenusGetParams } from '@/models/menuApi/AdminApiMenusGetParams';
import { AdminApiMenusGetResult } from '@/models/menuApi/AdminApiMenusGetResult';
import { get } from '@/utils/axios';

export function adminApiMenu(data: AdminApiMenusGetParams) {
	return get<AdminApiMenusGetResult['data'], AdminApiMenusGetParams>({
		url: '/admin/api/menus',
	});
}
