import { AtButton, AtDialog, AtLoading } from 'anta-element-ui-components-next';
import { AtSchemaForm, AtSchemaFormTypes } from 'anta-element-ui-schema-form';
import clone from 'rfdc';
import {
	defineComponent,
	nextTick,
	PropType,
	reactive,
	ref,
	toRaw,
	watch,
} from 'vue';
import { PageRenderer } from '@components/PageRenderer/typing';
import FormEditor, {
	FormEditorModelItem,
	transformFormEditorModelToProperties,
	transformPropertiesToFormEditorModel,
} from '../FormEditor/Index';
import { ReadSwaggerPageResult } from '../SwaggerButton/readSwaggerPage';
import SwaggerButton from '../SwaggerButton/Index';
import DialogFooter from '@/components/DialogFooter';

export default defineComponent({
	props: {
		visible: {
			type: Boolean,
		},
		schema: {
			type: Object as PropType<PageRenderer.JSONSchema['search']>,
		},
	},
	emits: {
		change: (schema: PageRenderer.JSONSchema['search']) => true,
		close: () => true,
	},
	setup(props, ctx) {
		const { emit } = ctx;
		const loading = ref(true);
		const formEditorModel = ref<FormEditorModelItem[]>();
		const model = reactive<NonNullable<PageRenderer.JSONSchema['search']>>({});
		const formEditor = ref<InstanceType<typeof FormEditor>>();

		const extraFormProps = {
			span: 6,
			formItemProps: {
				labelWidth: 100,
			},
		};
		const setModelFormProperties = (
			properties: AtSchemaFormTypes.JSONSchema['properties']
		) => {
			if (!model.form) {
				model.form = {
					properties: {},
				};
			}
			model.form!.properties = properties;
		};

		const formSchema: AtSchemaFormTypes.JSONSchema = {
			properties: {
				searchButton: {
					label: '显示查询按钮',
					component: 'switch',
					type: Boolean,
					span: 12,
				},
				resetButton: {
					label: '显示重置按钮',
					component: 'switch',
					type: Boolean,
					span: 12,
				},
			},
		};
		const handleGenerate = (result: ReadSwaggerPageResult) => {
			if (!model.form) {
				model.form = {
					properties: {},
				};
			}
			setModelFormProperties(
				Object.fromEntries(
					Object.entries(result.params).map(([field, item]) => {
						return [
							field,
							{
								...item,
								...extraFormProps,
							},
						];
					})
				)
			);

			formEditorModel.value = transformPropertiesToFormEditorModel(
				model.form?.properties
			);
		};

		const handleCancel = () => {
			emit('close');
		};
		const handleSave = async () => {
			try {
				await formEditor.value?.form?.form?.validate();
				setModelFormProperties(
					transformFormEditorModelToProperties(formEditorModel.value)
				);

				emit('change', clone()(toRaw(model)));
				emit('close');
			} catch (error) {
				console.error(error);
			}
		};

		watch(
			[() => props.visible, () => props.schema],
			() => {
				if (props.visible && props.schema) {
					setTimeout(
						() => {
							model.resetButton = props.schema?.resetButton;
							model.searchButton = props.schema?.searchButton;
							model.form = props.schema?.form;
							formEditorModel.value = transformPropertiesToFormEditorModel(
								model.form?.properties
							);
							nextTick(() => {
								loading.value = false;
							});
						},
						loading.value ? 300 : 50
					);
				}
			},
			{
				immediate: true,
			}
		);
		return () => {
			const { visible } = props;

			return (
				<AtDialog
					closeOnClickModal={false}
					appendToBody={true}
					title="搜索条件编辑"
					modelValue={visible}
					onUpdate:modelValue={(e) => {
						emit('close');
					}}
					vSlots={{
						footer() {
							return (
								<DialogFooter>
									<AtButton onClick={handleCancel}>取消</AtButton>
									<SwaggerButton onGenerate={handleGenerate} />
									<AtButton onClick={handleSave} type="primary">
										保存
									</AtButton>
								</DialogFooter>
							);
						},
					}}
				>
					<AtLoading
						static={true}
						visible={loading.value}
						style={{ padding: '50px 0', display: loading.value ? '' : 'none' }}
					></AtLoading>
					<div
						style={{
							display: loading.value ? 'none' : '',
						}}
					>
						<FormEditor
							ref={formEditor}
							modelValue={formEditorModel.value}
							onUpdate:modelValue={(items) => {
								formEditorModel.value = items;
							}}
							extraFormProps={extraFormProps}
						/>
						<AtSchemaForm schema={formSchema} model={model} />
					</div>
				</AtDialog>
			);
		};
	},
});
