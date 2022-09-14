import { AtSchemaForm, AtSchemaFormTypes } from 'anta-element-ui-schema-form';
import { defineComponent, PropType, reactive } from 'vue';
import { PageGenerator } from '../../typing';

export default defineComponent({
	props: {
		schema: {
			type: Object as PropType<
				NonNullable<PageGenerator.JSONSchema['search']>['form']
			>,
		},
	},
	setup(props, ctx) {
		const model = reactive<AtSchemaFormTypes.Model>({
			items: [],
		});
		const formSchema: AtSchemaFormTypes.JSONSchema = {
			properties: {
				items: {
					component: 'array',
					type: {
						field: String,
						label: String,
						component: String,
						labelWidth: Number,
						span: String,
					},
					children: {
						field: {
							component: 'input',
							type: String,
							props: {
								placeholder: '字段名',
							},
						},
					},
				},
			},
		};
		return () => {
			const {
				schema = {
					properties: {},
				},
			} = props;
			return <AtSchemaForm schema={formSchema} model={model}></AtSchemaForm>;
		};
	},
});
