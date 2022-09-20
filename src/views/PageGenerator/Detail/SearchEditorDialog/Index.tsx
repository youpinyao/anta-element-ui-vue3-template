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
import { PageGenerator } from '../../typing';
import FormEditor, {
	FormEditorModelItem,
	transformFormEditorModelToProperties,
	transformPropertiesToFormEditorModel,
} from '../FormEditor/Index';

export default defineComponent({
	props: {
		visible: {
			type: Boolean,
		},
		schema: {
			type: Object as PropType<PageGenerator.JSONSchema['search']>,
		},
	},
	emits: {
		change: (schema: PageGenerator.JSONSchema['search']) => true,
		close: () => true,
	},
	setup(props, ctx) {
		const { emit } = ctx;
		const loading = ref(true);
		const formEditorModel = ref<FormEditorModelItem[]>();
		const model = reactive<NonNullable<PageGenerator.JSONSchema['search']>>({});
		const formEditor = ref<InstanceType<typeof FormEditor>>();

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

		const handleCancel = () => {
			emit('close');
		};
		const handleSave = async () => {
			try {
				await formEditor.value?.form?.form?.validate();
				if (!model.form) {
					model.form = {
						properties: {},
					};
				}
				model.form!.properties = transformFormEditorModelToProperties(
					formEditorModel.value
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
								<div
									class="dialog-footer"
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<div></div>
									<div>
										<AtButton onClick={handleCancel}>取消</AtButton>
										<AtButton onClick={handleSave} type="primary">
											保存
										</AtButton>
									</div>
								</div>
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
						/>
						<AtSchemaForm schema={formSchema} model={model} />
					</div>
				</AtDialog>
			);
		};
	},
});
