import { Definition2109f27d03411ab2d387f6d44a00e6a5 } from '@/models/definitions/Definition2109f27d03411ab2d387f6d44a00e6a5';
import { del, get, post, put } from '@/utils/axios';
import { PageRenderer } from '@/components/PageRenderer/typing';
import { ArrayType } from 'anta-element-ui-components-next/src/utils/arrayType';
import { AdminV1Page$Templates$pageTemplateId$DeleteParams } from '@/models/pageTemplateApi/AdminV1Page$Templates$pageTemplateId$DeleteParams';
import { AdminV1Page$TemplatesPutParams } from '@/models/pageTemplateApi/AdminV1Page$TemplatesPutParams';
import { AdminV1Page$TemplatesPutResult } from '@/models/pageTemplateApi/AdminV1Page$TemplatesPutResult';
import { AdminV1Page$Templates$pageTemplateId$DeleteResult } from '@/models/pageTemplateApi/AdminV1Page$Templates$pageTemplateId$DeleteResult';
import { AdminV1Page$TemplatesPostParams } from '@/models/pageTemplateApi/AdminV1Page$TemplatesPostParams';
import { AdminV1Page$TemplatesPostResult } from '@/models/pageTemplateApi/AdminV1Page$TemplatesPostResult';
import { AdminV1Page$Templates$pageTemplateId$GetParams } from '@/models/pageTemplateApi/AdminV1Page$Templates$pageTemplateId$GetParams';

export function adminV1PageTemplatesPost(
	data: AdminV1Page$TemplatesPostParams['req']
) {
	return post<
		AdminV1Page$TemplatesPostResult['data'],
		AdminV1Page$TemplatesPostParams['req']
	>({
		url: '/admin/v1/page-templates',
		data,
	});
}

export function adminV1PageTemplatesPut(
	data: AdminV1Page$TemplatesPutParams['req']
) {
	return put<
		AdminV1Page$TemplatesPutResult['data'],
		AdminV1Page$TemplatesPutParams['req']
	>({
		url: '/admin/v1/page-templates',
		data,
	});
}

export function adminV1PageTemplatesDel(
	data: AdminV1Page$Templates$pageTemplateId$DeleteParams
) {
	return del<
		AdminV1Page$Templates$pageTemplateId$DeleteResult['data'],
		AdminV1Page$Templates$pageTemplateId$DeleteParams
	>({
		url: `/admin/v1/page-templates/${data.pageTemplateId}`,
		data,
	});
}

export type AdminV1PageGeneratorDetailGetResult<
	T extends Record<string, any> = any
> = Omit<
	NonNullable<ArrayType<Definition2109f27d03411ab2d387f6d44a00e6a5['list']>>,
	'schema'
> & {
	schema?: PageRenderer.JSONSchema<T>;
};

export async function adminV1PageGeneratorDetailGet(
	data: AdminV1Page$Templates$pageTemplateId$GetParams
) {
	const result = await get<
		AdminV1PageGeneratorDetailGetResult,
		AdminV1Page$Templates$pageTemplateId$GetParams
	>({
		url: `/admin/v1/page-templates/${data.pageTemplateId}`,
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
			} as AdminV1PageGeneratorDetailGetResult,
		},
	};
}
