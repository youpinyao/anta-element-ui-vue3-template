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
				if (column.prop) {
					item[column.prop] = 'Empty';
				}
			});
			items.push(item);
		});
	return items;
};
