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
import { methods, PageGenerator } from '../../typing';
import { AtSchemaTableTypes } from 'anta-element-ui-schema-table';
import { ArrayType } from 'anta-element-ui-components-next/src/utils/arrayType';
import ButtonsEditorDialog from '../ButtonsEditorDialog/Index';
import JsonEditorDialog from '../JsonEditorDialog';

export default defineComponent({
	props: {
		visible: {
			type: Boolean,
		},
		schema: {
			type: Object as PropType<
				Pick<PageGenerator.JSONSchema, 'pagination' | 'table'>
			>,
		},
	},
	emits: {
		change: (schema: Pick<PageGenerator.JSONSchema, 'pagination' | 'table'>) =>
			true,
		close: () => true,
	},
	setup(props, ctx) {
		const { emit } = ctx;
		const loading = ref(true);
		const model = reactive<{
			pagination?: boolean;
			selection?: boolean;
			url?: string;
			method?: PageGenerator.Methods;
			columns?: NonNullable<
				NonNullable<PageGenerator.JSONSchema['table']>['schema']
			>['columns'];
		}>({});
		const formEditor = ref<InstanceType<typeof AtSchemaForm>>();

		const columnButtonEditorIndex = ref<number>();
		const columnJsonEditorIndex = ref<number>();
		const columnButtonEditorContent = ref<PageGenerator.TableColumn>();
		const columnJsonEditorContent = ref<PageGenerator.TableColumn>();

		const formSchema: AtSchemaFormTypes.JSONSchema = {
			properties: {
				url: {
					label: '数据地址',
					component: 'input',
					formItemProps: {
						required: true,
						labelWidth: 100,
					},
				},
				method: {
					component: 'radio-button',
					label: '数据方法',
					formItemProps: {
						required: true,
						labelWidth: 100,
					},
					options: methods.map((item) => {
						return {
							value: item,
							label: item,
						};
					}),
				},
				columns: {
					label: '列',
					component: 'array',
					formItemProps: {
						labelWidth: 100,
						required: true,
					},
					children: {
						label: {
							component: 'input',
							props: {
								placeholder: '名称',
							},
							formItemProps: {
								required: true,
							},
						},
						prop: {
							component: 'input',
							props: {
								placeholder: '字段名',
							},
							formItemProps: {
								required: true,
							},
						},
						width: {
							component: 'input-number',
							props: {
								placeholder: '列宽',
							},
							formItemProps: {},
						},
						sortable: {
							component: 'checkbox',
							option: {
								label: '排序',
							},
						},
						buttons: {
							component: 'button',
							watchs: ['buttons'],
							props: {
								type: 'primary',
								vSlots: {
									default: () => '按钮编辑',
								},
								onClick(evt, index?) {
									columnButtonEditorIndex.value = index;
									columnButtonEditorContent.value =
										model?.columns?.[index ?? 0];
								},
								badge(model) {
									return model?.buttons?.length > 0;
								},
							},
							formItemProps: {},
						},
						property: {
							component: 'button',
							props: {
								vSlots: {
									default: () => 'JSON',
								},
								type: 'primary',
								onClick(evt, index?) {
									columnJsonEditorIndex.value = index;
									const column = {
										...model?.columns?.[index ?? 0],
									};
									delete column.buttons;
									columnJsonEditorContent.value = column;
								},
							},
						},
					},
				},
				selection: {
					label: '多选',
					component: 'switch',
					type: Boolean,
					formItemProps: {
						labelWidth: 100,
					},
				},
				pagination: {
					label: '分页',
					component: 'switch',
					type: Boolean,
					formItemProps: {
						labelWidth: 100,
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

				emit(
					'change',
					clone()(
						toRaw({
							pagination: model.pagination,
							table: {
								...props.schema?.table,
								url: model.url,
								method: model.method,
								selection: model.selection,
								schema: {
									...props.schema?.table?.schema,
									columns: model.columns ?? [],
								},
							},
						})
					)
				);
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
							model.pagination = props.schema?.pagination;
							model.url = props.schema?.table?.url;
							model.method = props.schema?.table?.method;
							model.selection = props.schema?.table?.selection;
							model.columns = clone()(
								toRaw(props.schema?.table?.schema?.columns)
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

			return [
				<AtDialog
					closeOnClickModal={false}
					appendToBody={true}
					title="表格编辑"
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
					</div>
				</AtDialog>,
				<ButtonsEditorDialog
					visible={columnButtonEditorIndex.value !== undefined}
					modelValue={columnButtonEditorContent.value?.buttons}
					onClose={() => {
						columnButtonEditorIndex.value = undefined;
					}}
					onUpdate:modelValue={(buttons) => {
						if (
							model.columns &&
							model.columns[columnButtonEditorIndex.value ?? 0]
						) {
							model.columns[columnButtonEditorIndex.value ?? 0].buttons =
								buttons;
						}
					}}
				/>,
				<JsonEditorDialog
					visible={columnJsonEditorIndex.value !== undefined}
					onClose={() => {
						columnJsonEditorIndex.value = undefined;
					}}
					modelValue={columnJsonEditorContent.value}
					onUpdate:modelValue={(json) => {
						if (
							model.columns &&
							model.columns[columnJsonEditorIndex.value ?? 0]
						) {
							model.columns[columnJsonEditorIndex.value ?? 0] = {
								...json,
								buttons:
									model.columns[columnJsonEditorIndex.value ?? 0].buttons,
							};
						}
					}}
				/>,
			];
		};
	},
});
