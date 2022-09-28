import JsonEditor, { JsonType } from '@/components/JsonEditor';
import { AtButton, AtDialog } from 'anta-element-ui-components-next';
import { AtSchemaForm, AtSchemaFormTypes } from 'anta-element-ui-schema-form';

import clone from 'rfdc';
import { defineComponent, PropType, reactive, ref, watch } from 'vue';
import { PageRenderer } from '@components/PageRenderer/typing';
import {
	FormEditorModelItem,
	transformFormEditorModelToProperties,
	transformPropertiesToFormEditorModel,
} from '../FormEditor/Index';
import FormEditorDialog from '../FormEditorDialog/Index';
import {
	baseFormProperties,
	dialogFormProperties,
	routeFormProperties,
	linkFormProperties,
	popconfirmFormProperties,
} from './schema';
import { ReadSwaggerPageResult } from '../SwaggerButton/readSwaggerPage';
import SwaggerButton from '../SwaggerButton/Index';

type RouteModel = {
	type: 'route';
	path: string;
};
type LinkModel = {
	type: 'link';
	url: string;
};
type DialogModel = {
	type: 'dialog';
	title: string;
	url: string;
	method: PageRenderer.Methods;
	dataUrl: string;
	dataMethod: PageRenderer.Methods;
	okText: string | boolean;
	cancelText: string | boolean;
	form: PageRenderer.FunctionButtonTriggerDialog['form'];
};
type PopconfirmModel = {
	type: 'popconfirm';
	title: string;
	url: string;
	method: PageRenderer.Methods;
};

export default defineComponent({
	props: {
		visible: Boolean,
		modelValue: Object as PropType<PageRenderer.FunctionButton['trigger']>,
	},
	emits: {
		close: () => true,
		'update:modelValue': (trigger?: PageRenderer.FunctionButton['trigger']) =>
			true,
	},
	setup(props, ctx) {
		const formEditorVisible = ref(false);
		const formEditorModel = ref<FormEditorModelItem[]>();
		const form = ref<InstanceType<typeof AtSchemaForm>>();
		const formModel = reactive<
			Partial<RouteModel | LinkModel | DialogModel | PopconfirmModel>
		>({});
		const formSchema = ref<AtSchemaFormTypes.JSONSchema>({
			properties: {},
		});
		const setFormModelFormSchemProperties = (
			properties: AtSchemaFormTypes.JSONSchema['properties']
		) => {
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
				formModel!.form!.schema.properties = properties;
			}
		};

		const handleGenerate = (result: ReadSwaggerPageResult) => {
			switch (formModel.type) {
				case 'dialog':
					formModel.title = result.title;
					formModel.url = result.url;
					formModel.method = result.method;

					setFormModelFormSchemProperties(result.params);
					break;
				case 'popconfirm':
					formModel.title = result.title;
					formModel.url = result.url;
					formModel.method = result.method;
					break;
			}
		};
		watch(
			() => props.modelValue,
			() => {
				if (!props.modelValue) {
					return;
				}
				// @ts-ignore
				Object.keys(formModel).forEach((key) => delete formModel[key]);
				formModel.type = props.modelValue.type;
				switch (formModel.type) {
					case 'route':
						formModel.path = (
							props.modelValue as PageRenderer.FunctionButtonTriggerRoute
						).path;
						break;

					case 'link':
						formModel.url = (
							props.modelValue as PageRenderer.FunctionButtonTriggerLink
						).url;
						break;
					case 'dialog':
						{
							const dialogModel =
								props.modelValue as PageRenderer.FunctionButtonTriggerDialog;

							formModel.title = dialogModel.dialogProps?.title;
							formModel.url = dialogModel.form?.url;
							formModel.method = dialogModel.form?.method;
							formModel.dataUrl = dialogModel?.form?.dataUrl;
							formModel.dataMethod = dialogModel?.form?.dataMethod;
							formModel.okText = dialogModel.okText;
							formModel.cancelText = dialogModel.cancelText;
							formModel.form = dialogModel.form;
						}
						break;
					case 'popconfirm':
						{
							const dialogModel =
								props.modelValue as PageRenderer.FunctionButtonTriggerPopconfirm;

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
					case 'route':
						formSchema.value = {
							...formSchema.value,
							properties: {
								...baseFormProperties(),
								...routeFormProperties(),
							},
						};
						break;

					case 'link':
						formSchema.value = {
							...formSchema.value,
							properties: {
								...baseFormProperties(),
								...linkFormProperties(),
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
										if (formModel.type === 'dialog') {
											formEditorModel.value =
												transformPropertiesToFormEditorModel(
													formModel.form?.schema.properties ?? {}
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
									{['dialog', 'popconfirm'].includes(formModel.type ?? '') ? (
										<SwaggerButton onGenerate={handleGenerate} />
									) : null}
									<AtButton
										onClick={async () => {
											await form.value?.form?.validate();
											let trigger: PageRenderer.FunctionButton['trigger'];

											switch (formModel.type) {
												case 'route':
													trigger = {
														type: 'route',
														path: formModel.path ?? '',
													};
													break;
												case 'link':
													trigger = {
														type: 'link',
														url: formModel.url ?? '',
													};
													break;
												case 'dialog':
													{
														trigger = {
															type: 'dialog',

															form: {
																url: formModel.url ?? '',
																method: formModel.method ?? 'GET',
																dataUrl: formModel.dataUrl,
																dataMethod: formModel.dataMethod,

																schema: formModel.form?.schema ?? {
																	properties: {},
																},
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
															url: formModel.url ?? '',
															method: formModel.method ?? 'GET',
														};
													}
													break;
												default:
													trigger = {
														type: 'link',
														url: '',
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
				<FormEditorDialog
					visible={formEditorVisible.value}
					onClose={() => {
						formEditorVisible.value = false;
					}}
					modelValue={formEditorModel.value}
					onUpdate:modelValue={(items) => {
						if (formModel.type === 'dialog') {
							setFormModelFormSchemProperties(
								transformFormEditorModelToProperties(items)
							);
						}
					}}
				/>,
			];
		};
	},
});
