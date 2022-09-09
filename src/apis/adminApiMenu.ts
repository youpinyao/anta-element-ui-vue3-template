import { AdminApiMenus$menuId$DeleteParams } from '@/models/menuApi/AdminApiMenus$menuId$DeleteParams';
import { AdminApiMenus$menuId$DeleteResult } from '@/models/menuApi/AdminApiMenus$menuId$DeleteResult';
import { AdminApiMenusGetParams } from '@/models/menuApi/AdminApiMenusGetParams';
import { AdminApiMenusGetResult } from '@/models/menuApi/AdminApiMenusGetResult';
import { AdminApiMenusPostParams } from '@/models/menuApi/AdminApiMenusPostParams';
import { AdminApiMenusPostResult } from '@/models/menuApi/AdminApiMenusPostResult';
import { AdminApiMenusPutParams } from '@/models/menuApi/AdminApiMenusPutParams';
import { AdminApiMenusPutResult } from '@/models/menuApi/AdminApiMenusPutResult';
import { del, get, post, put } from '@/utils/axios';

export function adminApiMenuGet(data: AdminApiMenusGetParams) {
	return get<AdminApiMenusGetResult['data'], AdminApiMenusGetParams>({
		url: '/admin/api/menus',
	});
}

export function adminApiMenuPost(data: AdminApiMenusPostParams['req']) {
	return post<AdminApiMenusPostResult['data'], AdminApiMenusPostParams['req']>({
		url: '/admin/api/menus',
		data,
	});
}

export function adminApiMenuPut(data: AdminApiMenusPutParams['req']) {
	return put<AdminApiMenusPutResult['data'], AdminApiMenusPutParams['req']>({
		url: '/admin/api/menus',
		data,
	});
}

export function adminApiMenuDel(data: AdminApiMenus$menuId$DeleteParams) {
	return del<
		AdminApiMenus$menuId$DeleteResult['data'],
		AdminApiMenus$menuId$DeleteParams
	>({
		url: `/admin/api/menus/${data.menuId}`,
		data,
	});
}
