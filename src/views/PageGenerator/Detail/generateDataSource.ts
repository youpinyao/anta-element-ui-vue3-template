import { AtSchemaTableTypes } from 'anta-element-ui-schema-table';

export const generateDataSource = (
	columns: AtSchemaTableTypes.JSONSchema['columns']
) => {
	const items: any[] = [];

	Array(10)
		.fill(0)
		.forEach(() => {
			const item: Record<string, any> = {};
			columns.forEach((column) => {
				item[column.prop ?? '_'] = 'Empty';
			});
			items.push(item);
		});
	return items;
};
