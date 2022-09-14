import { PageGenerator } from '../typing';
import { ReadSwaggerPageResult } from './SwaggerButton/readSwaggerPage';

export const swaggerGenerateTransform = ({
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
