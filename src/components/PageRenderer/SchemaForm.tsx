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
			return (
				<AtSchemaForm model={props.model} schema={props.schema}></AtSchemaForm>
			);
		};
	},
});

export default SchemaForm;
