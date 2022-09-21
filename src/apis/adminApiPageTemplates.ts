import { Definition2109f27d03411ab2d387f6d44a00e6a5 } from '@/models/definitions/Definition2109f27d03411ab2d387f6d44a00e6a5';
import { AdminApiPage$Templates$pageTemplateId$DeleteParams } from '@/models/pageTemplateApi/AdminApiPage$Templates$pageTemplateId$DeleteParams';
import { AdminApiPage$Templates$pageTemplateId$DeleteResult } from '@/models/pageTemplateApi/AdminApiPage$Templates$pageTemplateId$DeleteResult';
import { AdminApiPage$TemplatesGetParams } from '@/models/pageTemplateApi/AdminApiPage$TemplatesGetParams';
import { AdminApiPage$TemplatesGetResult } from '@/models/pageTemplateApi/AdminApiPage$TemplatesGetResult';
import { AdminApiPage$TemplatesPostParams } from '@/models/pageTemplateApi/AdminApiPage$TemplatesPostParams';
import { AdminApiPage$TemplatesPostResult } from '@/models/pageTemplateApi/AdminApiPage$TemplatesPostResult';
import { AdminApiPage$TemplatesPutParams } from '@/models/pageTemplateApi/AdminApiPage$TemplatesPutParams';
import { AdminApiPage$TemplatesPutResult } from '@/models/pageTemplateApi/AdminApiPage$TemplatesPutResult';
import { del, get, post, put } from '@/utils/axios';
import { PageRenderer } from '@/components/PageRenderer/typing';
import { ArrayType } from 'anta-element-ui-components-next/src/utils/arrayType';

export function adminApiPageTemplatesGet(
	data: AdminApiPage$TemplatesGetParams
) {
	return get<
		AdminApiPage$TemplatesGetResult['data'],
		AdminApiPage$TemplatesGetParams
	>({
		url: '/admin/api/page-templates',
		data,
	});
}

export function adminApiPageTemplatesPost(
	data: AdminApiPage$TemplatesPostParams['req']
) {
	return post<
		AdminApiPage$TemplatesPostResult['data'],
		AdminApiPage$TemplatesPostParams['req']
	>({
		url: '/admin/api/page-templates',
		data,
	});
}

export function adminApiPageTemplatesPut(
	data: AdminApiPage$TemplatesPutParams['req']
) {
	return put<
		AdminApiPage$TemplatesPutResult['data'],
		AdminApiPage$TemplatesPutParams['req']
	>({
		url: '/admin/api/page-templates',
		data,
	});
}

export function adminApiPageTemplatesDel(
	data: AdminApiPage$Templates$pageTemplateId$DeleteParams
) {
	return del<
		AdminApiPage$Templates$pageTemplateId$DeleteResult['data'],
		AdminApiPage$Templates$pageTemplateId$DeleteParams
	>({
		url: `/admin/api/page-templates/${data.pageTemplateId}`,
		data,
	});
}

export type AdminApiPageGeneratorDetailGetResult = Omit<
	NonNullable<ArrayType<Definition2109f27d03411ab2d387f6d44a00e6a5['list']>>,
	'schema'
> & {
	schema?: PageRenderer.JSONSchema;
};

export async function adminApiPageGeneratorDetailGet(data: any) {
	const result = await get<AdminApiPageGeneratorDetailGetResult, any>({
		url: `https://mockapi.eolink.com/P53yfvi48d34d7911634f79adf81360dff9866c33ced788/admin/api/page/generator/${data.id}`,
	});

	return {
		...result,
		data: {
			...result.data,
			data: {
				...result.data.data,
				schema:
					typeof result.data.data.schema === 'string'
						? JSON.parse(
								(result.data.data.schema as unknown as string) ?? null
						  ) || undefined
						: result.data.data.schema,
			} as AdminApiPageGeneratorDetailGetResult,
		},
	};
}
