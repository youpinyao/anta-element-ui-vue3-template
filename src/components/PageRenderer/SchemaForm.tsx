import { request } from '@/utils/axios';
import { AtSchemaForm, AtSchemaFormTypes } from 'anta-element-ui-schema-form';
import { defineComponent, PropType, provide, ref } from 'vue';
import { SCHEMA_FORM_MODEL } from './typing';

const SchemaForm = defineComponent({
	props: {
		schema: {
			type: Object as PropType<AtSchemaFormTypes.JSONSchema>,
			required: true,
		},
		model: {
			type: Object as PropType<AtSchemaFormTypes.Model>,
			required: true,
		},
	},
	setup(props, ctx) {
		provide(SCHEMA_FORM_MODEL, props.model);
		return () => {
			const { schema } = props;
			const properties = Object.fromEntries(
				Object.entries(schema.properties).map(([field, item]) => {
					const isOptions =
						item.component === 'select' ||
						item.component === 'virtual-select' ||
						item.component === 'tree-select' ||
						item.component === 'tree' ||
						item.component === 'cascader' ||
						item.component === 'transfer';
					return [
						field,
						isOptions
							? {
									...item,
									options:
										typeof (item as any).remote === 'string'
											? async () => {
													const result = await request<any>({
														url: (item as any).remote as unknown as string,
														method: 'GET',
													});

													return result.data.data ?? [];
											  }
											: item.options,
							  }
							: item,
					];
				})
			) as AtSchemaFormTypes.JSONSchema['properties'];

			return (
				<AtSchemaForm
					model={props.model}
					schema={{
						...schema,
						properties,
					}}
				></AtSchemaForm>
			);
		};
	},
});

export default SchemaForm;
