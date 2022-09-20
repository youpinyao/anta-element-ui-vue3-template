import JsonEditor, { JsonType } from '@/components/JsonEditor';
import { AtButton, AtDialog } from 'anta-element-ui-components-next';
import { AtSchemaForm, AtSchemaFormTypes } from 'anta-element-ui-schema-form';

import clone from 'rfdc';
import { defineComponent, PropType, reactive, ref, toRaw, watch } from 'vue';
import {
	functionButtonTriggerTypes,
	methods,
	PageGenerator,
} from '../../typing';
import FormEditor, {
	FormEditorModelItem,
	transformFormEditorModelToProperties,
	transformPropertiesToFormEditorModel,
} from '../FormEditor/Index';
import {
	baseFormProperties,
	dialogFormProperties,
	jumpFormProperties,
	popconfirmFormProperties,
} from './schema';

export default defineComponent({
	props: {
		visible: Boolean,
		modelValue: Object as PropType<PageGenerator.FunctionButton['trigger']>,
	},
	emits: {
		close: () => true,
		'update:modelValue': (trigger?: PageGenerator.FunctionButton['trigger']) =>
			true,
	},
	setup(props, ctx) {
		const formEditorVisible = ref(false);
		const formEditor = ref<InstanceType<typeof FormEditor>>();
		const formEditorModel = ref<FormEditorModelItem[]>();
		const form = ref<InstanceType<typeof AtSchemaForm>>();
		const formModel = reactive<AtSchemaFormTypes.Model>({});
		const formSchema = ref<AtSchemaFormTypes.JSONSchema>({
			properties: {},
		});

		watch(
			() => props.modelValue,
			() => {
				if (!props.modelValue) {
					return;
				}
				Object.keys(formModel).forEach((key) => delete formModel[key]);
				formModel.type = props.modelValue.type;
				switch (formModel.type) {
					case 'jump':
						formModel.path = (
							props.modelValue as PageGenerator.FunctionButtonTriggerJump
						).path;
						break;
					case 'dialog':
						{
							const dialogModel =
								props.modelValue as PageGenerator.FunctionButtonTriggerDialog;

							formModel.title = dialogModel.dialogProps?.title;
							formModel.url = dialogModel.form?.url;
							formModel.method = dialogModel.form?.method;
							formModel.dataUrl = dialogModel.form?.data?.url;
							formModel.dataMethod = dialogModel.form?.data?.method;
							formModel.okText = dialogModel.okText;
							formModel.cancelText = dialogModel.cancelText;
							formModel.form = dialogModel.form;
						}
						break;
					case 'popconfirm':
						{
							const dialogModel =
								props.modelValue as PageGenerator.FunctionButtonTriggerPopconfirm;

							formModel.title = dialogModel.confirmProps?.title;
							formModel.url = dialogModel.url;
							formModel.method = dialogModel.method;
						}
						break;
				}
			}
		);
		watch(
			() => formModel.type,
			() => {
				switch (formModel.type) {
					case 'jump':
						formSchema.value = {
							...formSchema.value,
							properties: {
								...baseFormProperties(),
								...jumpFormProperties(),
							},
						};
						break;
					case 'dialog':
						formSchema.value = {
							...formSchema.value,
							properties: {
								...baseFormProperties(),
								...dialogFormProperties({
									onClick() {
										if (props.modelValue?.type === 'dialog') {
											formEditorModel.value =
												transformPropertiesToFormEditorModel(
													props.modelValue?.form?.schema.properties ?? {}
												);
											formEditorVisible.value = true;
										}
									},
								}),
							},
						};
						break;
					case 'popconfirm':
						formSchema.value = {
							...formSchema.value,
							properties: {
								...baseFormProperties(),
								...popconfirmFormProperties(),
							},
						};
						break;
				}
			},
			{
				immediate: true,
			}
		);
		return () => {
			return [
				<AtDialog
					appendToBody={true}
					closeOnClickModal={false}
					title="按钮触发编辑"
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
											let trigger: PageGenerator.FunctionButton['trigger'];

											switch (formModel.type) {
												case 'jump':
													trigger = {
														type: 'jump',
														path: formModel.path,
													};
													break;
												case 'dialog':
													{
														trigger = {
															type: 'dialog',
															form: {
																url: formModel.url,
																method: formModel.method,
																data: formModel.dataUrl
																	? {
																			url: formModel.dataUrl,
																			method: formModel.dataMethod,
																	  }
																	: undefined,
																schema: formModel.form?.schema,
															},
															cancelText: formModel.cancelText,
															okText: formModel.okText,
															dialogProps: {
																title: formModel.title,
															},
														};
													}
													break;
												case 'popconfirm':
													{
														trigger = {
															type: 'popconfirm',
															confirmProps: {
																title: formModel.title,
															},
															url: formModel.url,
															method: formModel.method,
														};
													}
													break;
												default:
													trigger = {
														type: 'jump',
														path: '',
													};
											}

											ctx.emit('update:modelValue', clone()(trigger));
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
					<AtSchemaForm
						ref={form}
						schema={formSchema.value}
						model={formModel}
					/>
				</AtDialog>,
				<AtDialog
					appendToBody={true}
					closeOnClickModal={false}
					title="表单编辑"
					modelValue={formEditorVisible.value}
					onUpdate:modelValue={(visible) => {
						formEditorVisible.value = false;
					}}
					vSlots={{
						footer() {
							return (
								<span>
									<AtButton
										onClick={() => {
											formEditorVisible.value = false;
										}}
									>
										取消
									</AtButton>
									<AtButton
										onClick={async () => {
											await formEditor.value?.form?.form?.validate();
											if (formModel.type === 'dialog') {
												if (!formModel.form) {
													formModel.form = {
														url: '',
														method: 'POST',
														schema: {
															properties: {},
														},
													};
												}
												if (!formModel.form?.schema) {
													formModel.form.schema = {
														properties: {},
													};
												}
												formModel!.form!.schema.properties =
													transformFormEditorModelToProperties(
														formEditorModel.value
													);
											}
											formEditorVisible.value = false;
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
					<FormEditor
						ref={formEditor}
						modelValue={formEditorModel.value}
						onUpdate:modelValue={(items) => {
							formEditorModel.value = items;
						}}
					/>
				</AtDialog>,
			];
		};
	},
});
