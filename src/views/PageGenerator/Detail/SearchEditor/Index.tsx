import { AtButton, AtDialog } from 'anta-element-ui-components-next';
import { AtSchemaForm, AtSchemaFormTypes } from 'anta-element-ui-schema-form';
import { defineComponent, PropType, reactive, ref, watch } from 'vue';
import { PageGenerator } from '../../typing';
import FormEditor from '../FormEditor/Index';

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
		const model = ref<NonNullable<PageGenerator.JSONSchema['search']>>();

		const formSchema: AtSchemaFormTypes.JSONSchema = {
			properties: {
				searchButton: {
					label: '查询按钮',
					component: 'switch',
					type: Boolean,
				},
				resetButton: {
					label: '重置按钮',
					component: 'switch',
					type: Boolean,
				},
			},
		};

		const handleCancel = () => {};
		const handleSave = () => {};

		watch(
			() => props.visible,
			() => {
				if (props.visible) {
					model.value = props.schema;
				}
			}
		);
		return () => {
			const { visible, schema } = props;
			return (
				<AtDialog
					title="搜索条件编辑"
					modelValue={visible}
					onUpdate:modelValue={(e) => {
						emit('close');
					}}
					vSlots={{
						footer() {
							return (
								<span class="dialog-footer">
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
								</span>
							);
						},
					}}
				>
					<FormEditor schema={schema?.form} />
					<AtSchemaForm schema={formSchema} model={model} />
				</AtDialog>
			);
		};
	},
});
