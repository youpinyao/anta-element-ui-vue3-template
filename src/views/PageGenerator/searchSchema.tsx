import { AtSchemaFormTypes } from 'anta-element-ui-schema-form';

export default function searchSchema() {
	const schema: AtSchemaFormTypes.JSONSchema = {
		formProps: {},
		properties: {
			title: {
				component: 'input',
				label: '名称',
				type: String,
				span: 4,
			},
		},
	};
	return schema;
}
