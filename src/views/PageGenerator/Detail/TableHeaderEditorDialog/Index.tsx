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
import ButtonsEditor from '../ButtonsEditor/Index';
import { PageGenerator } from '../../typing';

export default defineComponent({
	props: {
		visible: {
			type: Boolean,
		},
		schema: {
			type: Object as PropType<
				Pick<PageGenerator.JSONSchema, 'title' | 'buttons'>
			>,
		},
	},
	emits: {
		change: (schema: Pick<PageGenerator.JSONSchema, 'title' | 'buttons'>) =>
			true,
		close: () => true,
	},
	setup(props, ctx) {
		const { emit } = ctx;
		const loading = ref(true);
		const model = reactive<Pick<PageGenerator.JSONSchema, 'title' | 'buttons'>>(
			{}
		);
		const buttonsEditor = ref<InstanceType<typeof ButtonsEditor>>();
		const formEditor = ref<InstanceType<typeof AtSchemaForm>>();

		const formSchema: AtSchemaFormTypes.JSONSchema = {
			properties: {
				title: {
					label: '标题',
					component: 'input',
					type: String,
					formItemProps: {
						labelWidth: 100,
						required: true,
					},
				},
			},
		};

		const handleCancel = () => {
			emit('close');
		};
		const handleSave = async () => {
			try {
				await formEditor.value?.form?.validate();
				await buttonsEditor.value?.form?.form?.validate();

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
							model.title = props.schema?.title;
							model.buttons = clone()(toRaw(props.schema?.buttons));
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
					title="表格顶部编辑"
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
						<AtSchemaForm ref={formEditor} schema={formSchema} model={model} />
						<ButtonsEditor
							ref={buttonsEditor}
							modelValue={model.buttons}
							onUpdate:modelValue={(buttons) => {
								model.buttons = buttons;
							}}
						/>
					</div>
				</AtDialog>
			);
		};
	},
});
