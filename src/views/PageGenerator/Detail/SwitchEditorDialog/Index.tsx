import { AtButton, AtDialog } from 'anta-element-ui-components-next';
import { ArrayType } from 'anta-element-ui-components-next/src/utils/arrayType';

import { defineComponent, PropType, reactive, ref, toRaw, watch } from 'vue';
import clone from 'rfdc';
import { methods, PageRenderer } from '@components/PageRenderer/typing';
import { AtSchemaForm, AtSchemaFormTypes } from 'anta-element-ui-schema-form';

export default defineComponent({
	props: {
		visible: Boolean,
		modelValue: Object as PropType<PageRenderer.Swtich>,
	},
	emits: {
		close: () => true,
		'update:modelValue': (buttons?: PageRenderer.Swtich) => true,
	},
	setup(props, ctx) {
		const switchModel = reactive<Partial<PageRenderer.Swtich>>({});
		const form = ref<InstanceType<typeof AtSchemaForm>>();

		const schema: AtSchemaFormTypes.JSONSchema = {
			properties: {
				prop: {
					component: 'input',
					label: '字段名',
					props: {
						placeholder: '默认 对应列字段名',
					},
					formItemProps: {
						labelWidth: 100,
					},
				},
				trueValue: {
					component: 'input',
					label: '开启值',
					props: {
						placeholder: '默认 true',
					},
					formItemProps: {
						labelWidth: 100,
					},
				},
				falseValue: {
					component: 'input',
					label: '关闭值',
					props: {
						placeholder: '默认 false',
					},
					formItemProps: {
						labelWidth: 100,
					},
				},
				url: {
					component: 'input',
					label: '地址',

					formItemProps: {
						// required: true,
						labelWidth: 100,
					},
				},
				method: {
					component: 'radio-button',
					label: '方法',
					formItemProps: {
						// required: true,
						labelWidth: 100,
					},
					options: methods.map((item) => {
						return {
							value: item,
							label: item,
						};
					}),
				},
			},
		};

		watch(
			() => props.modelValue,
			() => {
				Object.keys(switchModel as any).forEach((key: any) => {
					(switchModel as any)[key] = undefined;
				});
				Object.assign(switchModel, props.modelValue);
			}
		);
		return () => {
			return (
				<AtDialog
					appendToBody={true}
					closeOnClickModal={false}
					destroyOnClose={true}
					title="switch编辑"
					modelValue={props.visible}
					onUpdate:modelValue={(visible) => {
						if (visible === false) {
							ctx.emit('close');
						}
					}}
					vSlots={{
						footer() {
							return (
								<span>
									<AtButton
										onClick={() => {
											ctx.emit('close');
										}}
									>
										取消
									</AtButton>
									<AtButton
										onClick={async () => {
											await form.value?.form?.validate();
											ctx.emit(
												'update:modelValue',
												clone()(toRaw(switchModel)) as PageRenderer.Swtich
											);
											ctx.emit('close');
										}}
										type="primary"
									>
										保存
									</AtButton>
								</span>
							);
						},
					}}
				>
					<AtSchemaForm ref={form} schema={schema} model={switchModel} />
				</AtDialog>
			);
		};
	},
});
