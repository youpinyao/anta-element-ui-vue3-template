import { AtButton, AtDialog } from 'anta-element-ui-components-next';
import { AtSchemaForm, AtSchemaFormTypes } from 'anta-element-ui-schema-form';
import clone from 'rfdc';
import { defineComponent, PropType, reactive, ref, toRaw, watch } from 'vue';
import { PageGenerator } from '../../typing';
import FormEditor, {
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
		const loading = ref(false);
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
		const handleSave = () => {
			formEditor.value?.form?.form?.validate((valid) => {
				if (valid) {
					emit('change', clone()(toRaw(model)));
					emit('close');
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		};

		watch(
			[() => props.visible, () => props.schema],
			() => {
				if (props.visible && props.schema) {
					model.resetButton = props.schema?.resetButton;
					model.searchButton = props.schema?.searchButton;
					model.form = props.schema?.form;
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
					title="搜索条件编辑"
					closeOnClickModal={false}
					width={1000}
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
										<AtButton onClick={handleCancel} loading={loading.value}>
											取消
										</AtButton>
										<AtButton
											onClick={handleSave}
											loading={loading.value}
											type="primary"
										>
											保存
										</AtButton>
									</div>
								</div>
							);
						},
					}}
				>
					<FormEditor
						ref={formEditor}
						modelValue={transformPropertiesToFormEditorModel(
							model.form?.properties
						)}
						onUpdate:modelValue={(items) => {
							if (!model.form) {
								model.form = {
									properties: {},
								};
							}
							model.form = {
								...toRaw(model.form),
								properties: transformFormEditorModelToProperties(items),
							};
						}}
					/>
					<AtSchemaForm schema={formSchema} model={model} />
				</AtDialog>
			);
		};
	},
});
