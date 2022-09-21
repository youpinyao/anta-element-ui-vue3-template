import { PageGenerator } from '../../typing';
import { ReadSwaggerPageResult } from './readSwaggerPage';

export const swaggerGeneratePageConfig = ({
	params,
	buttons,
	result,
	url,
	method,
	title,
}: ReadSwaggerPageResult) => {
	const schema: PageGenerator.JSONSchema = {
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
	};

	return schema;
};
