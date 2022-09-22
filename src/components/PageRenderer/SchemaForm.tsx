import { request } from '@/utils/axios';
import { AtSchemaForm, AtSchemaFormTypes } from 'anta-element-ui-schema-form';
import { defineComponent, PropType, ref } from 'vue';

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
		return () => {
			const { schema } = props;
			const properties = Object.fromEntries(
				Object.entries(schema.properties).map(([field, item]) => {
					const isSelect =
						item.component === 'select' ||
						item.component === 'virtual-select' ||
						item.component === 'tree-select';
					return [
						field,
						isSelect
							? {
									...item,
									options:
										typeof item.options === 'string'
											? async () => {
													const result = await request<any>({
														url: item.options as unknown as string,
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
