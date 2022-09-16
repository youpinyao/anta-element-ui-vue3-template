import {
	AtSchemaForm,
	AtSchemaFormTypes,
	components,
} from 'anta-element-ui-schema-form';
import { defineComponent, PropType, reactive, toRaw, ref } from 'vue';
import clone from 'rfdc';
import JsonEditorDialog from '../JsonEditorDialog';

type KeyProperty = AtSchemaFormTypes.Property & {
	key?: string;
};

export type FormEditorModelItem = Pick<
	AtSchemaFormTypes.Property,
	'label' | 'component' | 'span' | 'disabled' | 'display'
> & {
	key?: string;
	field?: string;
	labelWidth: NonNullable<
		AtSchemaFormTypes.Property['formItemProps']
	>['labelWidth'];
	property?: AtSchemaFormTypes.Property;
};

export function transformPropertiesToFormEditorModel(
	properties?: Record<string, KeyProperty>
) {
	// console.log(1);
	const items: FormEditorModelItem[] = [];

	Object.entries(toRaw(properties) ?? {}).forEach(([field, item]) => {
		items.push({
			key: item.key,
			field,
			label: item.label,
			component: item.component,
			span: item.span,
			display: item.display,
			disabled: item.disabled,
			labelWidth: item.formItemProps?.labelWidth as number,
			property: item,
		});
	});
	// return items;
	return clone()(items);
}

export function transformFormEditorModelToProperties(
	items?: FormEditorModelItem[]
) {
	// console.log(2);
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
			...item.property,
			key: item.key,
			label: item.label,
			component: item.component,
			span: item.span,
			display: item.display,
			disabled: item.disabled,
			formItemProps: {
				...item.property?.formItemProps,
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
	},
	emits: {
		'update:modelValue': (items: FormEditorModelItem[]) => true,
	},
	render() {
		const props = this.$props;
		const emit = this.$emit;
		const { formSchema, codeEditorIndex, closeJsonEditor } = this;
		return [
			<AtSchemaForm
				ref="form"
				schema={formSchema}
				model={{ items: props.modelValue }}
				onChange={(model) => {
					emit('update:modelValue', model.items);
				}}
			/>,
			<JsonEditorDialog
				visible={codeEditorIndex !== undefined}
				onClose={closeJsonEditor}
				modeValue={
					codeEditorIndex !== undefined
						? clone()(toRaw(props.modelValue?.[codeEditorIndex]?.property))
						: undefined
				}
				onUpdate:modelValue={(json) => {
					if (codeEditorIndex !== undefined && props.modelValue) {
						props.modelValue[codeEditorIndex].property =
							json as AtSchemaFormTypes.Property;

						emit(
							'update:modelValue',
							props.modelValue.map((item) => {
								return {
									...item,
									label: item?.property?.label,
									component: item?.property?.component,
									span: item?.property?.span,
									display: item?.property?.display,
									disabled: item?.property?.disabled,
									labelWidth: item?.property?.formItemProps
										?.labelWidth as number,
								} as FormEditorModelItem;
							})
						);
					}
				}}
			/>,
		];
	},
	setup(props, ctx) {
		const form = ref<InstanceType<typeof AtSchemaForm>>();
		const codeEditorIndex = ref<number | undefined>(0);
		const closeJsonEditor = () => {
			codeEditorIndex.value = undefined;
		};
		const openJsonEditor = (index?: number) => {
			codeEditorIndex.value = index;
		};
		const formSchema: AtSchemaFormTypes.JSONSchema = {
			properties: {
				items: {
					component: 'array',
					props: {
						sortable: true,
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
						property: {
							component: 'button',
							props: {
								vSlots: {
									default: () => 'JSON',
								},
								type: 'primary',
								onClick(e, index) {
									openJsonEditor(index);
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
			codeEditorIndex,
			closeJsonEditor,
		};
	},
});
