import { AtSchemaFormTypes } from 'anta-element-ui-schema-form';

export default function searchSchema() {
	const schema: AtSchemaFormTypes.JSONSchema = {
		formProps: {
			// labelWidth: 100,
		},
		rowProps: {
			gutter: 20,
		},
		properties: {
			title: {
				component: 'input',
				label: '名称：',
				type: String,
				span: 6,
			},
		},
	};
	return schema;
}
