import { PageRenderer } from '@components/PageRenderer/typing';
import { ReadSwaggerPageResult } from './readSwaggerPage';

export const swaggerGeneratePageConfig = ({
	params,
	buttons,
	pagination,
	result,
	url,
	method,
	title,
}: ReadSwaggerPageResult) => {
	const schema: PageRenderer.JSONSchema = {
		title,
		search: {
			form: {
				properties: Object.fromEntries(
					Object.entries(params).map(([field, item]) => {
						return [
							field,
							{
								...item,
								span: 6,
								formItemProps: {
									labelWidth: 100,
								},
							},
						];
					})
				),
			},

			resetButton: Object.keys(params).length > 0,
			searchButton: Object.keys(params).length > 0,
		},
		buttons,
		table: {
			url,
			method,
			schema: {
				columns: result,
			},
		},
		pagination,
	};

	return schema;
};
