import { AtSchemaTableTypes } from 'anta-element-ui-schema-table';
import * as uuid from 'uuid';

export const generateDataSource = (
	columns: AtSchemaTableTypes.JSONSchema['columns'] = [],
	tree?: boolean
) => {
	const items: any[] = [];

	Array(10)
		.fill(0)
		.forEach((_, index) => {
			const item: Record<string, any> = {};
			columns.forEach((column, cIndex) => {
				if (column.prop) {
					if (column.prop === 'id') {
						item.id = `${index}${cIndex}`;
					} else {
						item[column.prop] = 'Empty';
					}
				}
			});
			if (tree) {
				const children: any[] = [];
				item.children = children;
				Array(10)
					.fill(0)
					.forEach((_, childIndex) => {
						const child: Record<string, any> = {};
						columns.forEach((column, cIndex) => {
							if (column.prop) {
								if (column.prop === 'id') {
									child.id = `${index}${childIndex}${cIndex}`;
								} else {
									child[column.prop] = 'Empty';
								}
							}
						});

						children.push(child);
					});
			}
			items.push(item);
		});
	return items;
};
