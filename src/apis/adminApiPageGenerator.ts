import { del, get, post, put } from '@/utils/axios';
import { PageGenerator } from '@/views/PageGenerator/typing';

export type AdminApiPageGeneratorDetailGetParams = { id: string };
export type AdminApiPageGeneratorDetailGetResult = {
	id?: string;
	title?: string;
	schema?: PageGenerator.JSONSchema;
};

export type AdminApiPageGeneratorGetParams = {
	title?: string;
};

export type AdminApiPageGeneratorGetResult = {
	pageSize?: number;
	page?: number;
	total?: number;
	list?: AdminApiPageGeneratorDetailGetResult[];
};

export function adminApiPageGeneratorGet(data: AdminApiPageGeneratorGetParams) {
	return get<AdminApiPageGeneratorGetResult, AdminApiPageGeneratorGetParams>({
		url: 'https://mockapi.eolink.com/P53yfvi48d34d7911634f79adf81360dff9866c33ced788/admin/api/page/generator',
		data,
	});
}

export function adminApiPageGeneratorPost(data: any) {
	return post<any, any>({
		url: 'https://mockapi.eolink.com/P53yfvi48d34d7911634f79adf81360dff9866c33ced788/admin/api/page/generator',
		data,
	});
}

export function adminApiPageGeneratorPut(data: any) {
	return put<any, any>({
		url: 'https://mockapi.eolink.com/P53yfvi48d34d7911634f79adf81360dff9866c33ced788/admin/api/page/generator',
		data,
	});
}

export function adminApiPageGeneratorDel(data: any) {
	return del<any, any>({
		url: `https://mockapi.eolink.com/P53yfvi48d34d7911634f79adf81360dff9866c33ced788/admin/api/page/generator/${data.id}`,
		data,
	});
}

export function adminApiPageGeneratorDetailGet(
	data: AdminApiPageGeneratorDetailGetParams
) {
	return get<
		AdminApiPageGeneratorDetailGetResult,
		AdminApiPageGeneratorDetailGetParams
	>({
		url: `https://mockapi.eolink.com/P53yfvi48d34d7911634f79adf81360dff9866c33ced788/admin/api/page/generator/${data.id}`,
	});
}
