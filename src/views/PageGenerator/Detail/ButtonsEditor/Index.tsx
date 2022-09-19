import { AtSchemaForm, AtSchemaFormTypes } from 'anta-element-ui-schema-form';
import { defineComponent, PropType, ref } from 'vue';
import { PageGenerator } from '../../typing';
import TriggerEditorDialog from './TriggerEditorDialog';

export default defineComponent({
	props: {
		modelValue: {
			type: Object as PropType<PageGenerator.FunctionButton[]>,
		},
	},
	emits: {
		'update:modelValue': (items: PageGenerator.FunctionButton[]) => true,
	},
	render() {
		const props = this.$props;
		const emit = this.$emit;
		const {
			formSchema,
			triggerEditContent,
			closeTriggerEditor,
			triggerEditIndex,
		} = this;
		return [
			<AtSchemaForm
				ref="form"
				schema={formSchema}
				model={{ items: props.modelValue }}
				onChange={(keys, value, model) => {
					emit('update:modelValue', model.items);
				}}
			/>,

			<TriggerEditorDialog
				visible={triggerEditContent !== undefined}
				modelValue={triggerEditContent}
				onClose={closeTriggerEditor}
				onUpdate:modelValue={(trigger) => {
					if (triggerEditIndex !== undefined && props.modelValue) {
						emit(
							'update:modelValue',
							props.modelValue.map((item, index) => {
								if (trigger && index === triggerEditIndex) {
									return {
										...item,
										trigger: trigger as PageGenerator.FunctionButton['trigger'],
									};
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
		const triggerEditContent = ref<PageGenerator.FunctionButton['trigger']>();
		const triggerEditIndex = ref<number>();
		const closeTriggerEditor = () => {
			triggerEditContent.value = undefined;
		};
		const openTriggerEditor = (
			trigger?: PageGenerator.FunctionButton['trigger']
		) => {
			triggerEditContent.value = trigger;
		};
		const formSchema: AtSchemaFormTypes.JSONSchema = {
			properties: {
				items: {
					formItemProps: {
						labelWidth: 100,
					},
					label: '按钮',
					component: 'array',
					props: {
						sortable: true,
					},
					children: {
						title: {
							component: 'input',
							type: String,
							props: {
								placeholder: '名称',
							},
							formItemProps: {
								required: true,
							},
						},
						type: {
							component: 'select',
							type: String,
							props: {
								placeholder: '类型',
							},
							formItemProps: {
								required: true,
							},
							options: [
								'default',
								'primary',
								'success',
								'warning',
								'info',
								'danger',
								'text',
							].map((type) => {
								return {
									label: type,
									value: type,
								};
							}),
						},
						button: {
							component: 'button',
							props: {
								type: 'primary',
								vSlots: {
									default: () => '触发编辑',
								},
								onClick(evt, index?) {
									triggerEditIndex.value = index;
									openTriggerEditor(props.modelValue?.[index ?? 0]?.trigger);
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
			closeTriggerEditor,
			triggerEditIndex,
			triggerEditContent,
		};
	},
});
