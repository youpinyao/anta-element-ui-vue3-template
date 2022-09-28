import { AdminV1Menus$menuId$DeleteParams } from '@/models/admin/menuApi/AdminV1Menus$menuId$DeleteParams';
import { AdminV1Menus$menuId$DeleteResult } from '@/models/admin/menuApi/AdminV1Menus$menuId$DeleteResult';
import { AdminV1MenusGetParams } from '@/models/admin/menuApi/AdminV1MenusGetParams';
import { AdminV1MenusGetResult } from '@/models/admin/menuApi/AdminV1MenusGetResult';
import { AdminV1MenusPostParams } from '@/models/admin/menuApi/AdminV1MenusPostParams';
import { AdminV1MenusPostResult } from '@/models/admin/menuApi/AdminV1MenusPostResult';
import { AdminV1MenusPutParams } from '@/models/admin/menuApi/AdminV1MenusPutParams';
import { AdminV1MenusPutResult } from '@/models/admin/menuApi/AdminV1MenusPutResult';
import { del, get, post, put } from '@/utils/axios';

export function adminV1MenuGet(data: AdminV1MenusGetParams) {
	return get<AdminV1MenusGetResult['data'], AdminV1MenusGetParams>({
		url: '/admin/v1/menus',
	});
}

export function adminV1MenuPost(data: AdminV1MenusPostParams['req']) {
	return post<AdminV1MenusPostResult['data'], AdminV1MenusPostParams['req']>({
		url: '/admin/v1/menus',
		data,
	});
}

export function adminV1MenuPut(data: AdminV1MenusPutParams['req']) {
	return put<AdminV1MenusPutResult['data'], AdminV1MenusPutParams['req']>({
		url: '/admin/v1/menus',
		data,
	});
}

export function adminV1MenuDel(data: AdminV1Menus$menuId$DeleteParams) {
	return del<
		AdminV1Menus$menuId$DeleteResult['data'],
		AdminV1Menus$menuId$DeleteParams
	>({
		url: `/admin/v1/menus/${data.menuId}`,
		data,
	});
}
