import {
	AtSchemaForm,
	AtSchemaFormTypes,
	components,
} from 'anta-element-ui-schema-form';
import { defineComponent, PropType, reactive, toRaw, ref } from 'vue';
import clone from 'rfdc';
import JsonEditorDialog from '../JsonEditorDialog';
import { JsonType } from '@/components/JsonEditor';

type KeyProperty = AtSchemaFormTypes.Property & {
	key?: string;
};

export type FormEditorModelItem = KeyProperty & {
	field?: string;
	labelWidth?: number | string;
};

export function transformPropertiesToFormEditorModel(
	properties?: Record<string, KeyProperty>
) {
	const items: FormEditorModelItem[] = [];

	Object.entries(toRaw(properties) ?? {}).forEach(([field, item]) => {
		items.push({
			...item,
			key: item.key ?? field,
			labelWidth: item.formItemProps?.labelWidth,
			field,
		});
	});

	return clone()(toRaw(items));
}

export function transformFormEditorModelToProperties(
	items?: FormEditorModelItem[]
) {
	const properties: Record<string, KeyProperty> = {};
	const fields: string[] = [];

	items?.forEach((item, index) => {
		let field = item.field;

		if (!field) {
			field = `field_${index}`;
		}
		if (fields.includes(field)) {
			field = `${field}_${index}`;
		}
		fields.push(field);

		properties[field] = {
			...item,
			formItemProps: {
				...item.formItemProps,
				labelWidth: item.labelWidth,
			},
		} as KeyProperty;
	});

	// return properties;
	return clone()(toRaw(properties));
}

export default defineComponent({
	props: {
		modelValue: {
			type: Object as PropType<FormEditorModelItem[]>,
		},
		extraFormProps: {
			type: Object as PropType<Partial<AtSchemaFormTypes.ComponentBase>>,
			default: () => ({
				formItemProps: {
					labelWidth: 100,
				},
			}),
		},
	},
	emits: {
		'update:modelValue': (items: FormEditorModelItem[]) => true,
	},
	render() {
		const props = this.$props;
		const emit = this.$emit;
		const { formSchema, codeEditContent, codeEditIndex, closeJsonEditor } =
			this;
		return [
			<AtSchemaForm
				ref="form"
				schema={formSchema}
				model={{ items: props.modelValue }}
				onChange={(keys, value, model) => {
					emit('update:modelValue', model.items);
				}}
			/>,

			<JsonEditorDialog
				// visible={codeEditContent !== undefined}
				visible={true}
				onClose={closeJsonEditor}
				modelValue={codeEditContent}
				onUpdate:modelValue={(json) => {
					if (codeEditIndex !== undefined && props.modelValue) {
						emit(
							'update:modelValue',
							props.modelValue.map((item, index) => {
								if (json && index === codeEditIndex) {
									return json as KeyProperty;
								}
								return item;
							})
						);
					}
				}}
			/>,
		];
	},
	setup(props, ctx) {
		const form = ref<InstanceType<typeof AtSchemaForm>>();
		const codeEditContent = ref<JsonType | undefined>();
		const codeEditIndex = ref<number>();
		const closeJsonEditor = () => {
			codeEditContent.value = undefined;
		};
		const openJsonEditor = (json?: JsonType) => {
			codeEditContent.value = json;
		};

		const formSchema: AtSchemaFormTypes.JSONSchema = {
			properties: {
				items: {
					component: 'array',
					props: {
						sortable: true,
						handleAdd() {
							const items = props.modelValue ?? [];

							items.push({
								...props.extraFormProps,
							} as FormEditorModelItem);
							ctx.emit('update:modelValue', items);
						},
					},
					children: {
						field: {
							component: 'input',
							type: String,
							formItemProps: {
								required: true,
							},
							props: {
								placeholder: '字段名',
							},
						},
						label: {
							component: 'input',
							type: String,
							formItemProps: {
								required: true,
							},
							props: {
								placeholder: '名称',
							},
						},
						component: {
							component: 'select',
							type: String,
							formItemProps: {
								required: true,
							},
							props: {
								filterable: true,
								placeholder: '组件',
							},
							options: components
								.map((item) => {
									return {
										label: item,
										value: item,
									};
								})
								.filter((item) => item.value !== 'button'),
						},
						span: {
							component: 'input-number',
							type: Number,
							props: {
								placeholder: '布局跨度',
								min: 0,
								max: 24,
								style: {
									width: '110px',
								},
							},
						},
						labelWidth: {
							component: 'input-number',
							type: Number,
							props: {
								placeholder: '名称宽度',
								min: 0,
								style: {
									width: '110px',
								},
							},
						},
						json: {
							component: 'button',
							props: {
								vSlots: {
									default: () => 'JSON',
								},
								type: 'primary',
								onClick(e, index) {
									openJsonEditor(props.modelValue?.[index ?? 0]);
									codeEditIndex.value = index;
								},
							},
						},
					},
				},
			},
		};
		return {
			form,
			formSchema,
			codeEditContent,
			codeEditIndex,
			closeJsonEditor,
		};
	},
});
