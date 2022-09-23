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
import { methods, PageRenderer } from '@components/PageRenderer/typing';
import { AtSchemaTableTypes } from 'anta-element-ui-schema-table';
import { ArrayType } from 'anta-element-ui-components-next/src/utils/arrayType';
import ButtonsEditorDialog from '../ButtonsEditorDialog/Index';
import JsonEditorDialog from '../JsonEditorDialog';
import { ReadSwaggerPageResult } from '../SwaggerButton/readSwaggerPage';
import SwaggerButton from '../SwaggerButton/Index';
import { swaggerGeneratePageConfig } from '../SwaggerButton/swaggerGeneratePageConfig';
import DialogFooter from '@/components/DialogFooter';

export default defineComponent({
	props: {
		visible: {
			type: Boolean,
		},
		schema: {
			type: Object as PropType<
				Pick<PageRenderer.JSONSchema, 'pagination' | 'table'>
			>,
		},
	},
	emits: {
		change: (schema: Pick<PageRenderer.JSONSchema, 'pagination' | 'table'>) =>
			true,
		close: () => true,
	},
	setup(props, ctx) {
		const { emit } = ctx;
		const loading = ref(true);
		const model = reactive<{
			pagination?: boolean;
			selection?: boolean;
			tree?: boolean;
			url?: string;
			method?: PageRenderer.Methods;
			columns?: NonNullable<
				NonNullable<PageRenderer.JSONSchema['table']>['schema']
			>['columns'];
		}>({});
		const formEditor = ref<InstanceType<typeof AtSchemaForm>>();

		const columnButtonEditorIndex = ref<number>();
		const columnJsonEditorIndex = ref<number>();
		const columnSwitchEditorIndex = ref<number>();
		const columnButtonEditorContent = ref<PageRenderer.TableColumn>();
		const columnJsonEditorContent = ref<PageRenderer.TableColumn>();
		const columnSwitchEditorContent = ref<PageRenderer.TableColumn>();

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
					props: {
						sortable: true,
					},
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
						switch: {
							component: 'button',
							props: {
								type: 'primary',
								vSlots: {
									default: () => 'switch编辑',
								},
								onClick(evt, index?) {
									columnSwitchEditorIndex.value = index;
									columnSwitchEditorContent.value =
										model?.columns?.[index ?? 0];
								},
								badge: {
									fields: ['switch'],
									callback(model) {
										return model?.switch?.url;
									},
								},
							},
							formItemProps: {},
						},
						buttons: {
							component: 'button',
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
								badge: {
									fields: ['buttons'],
									callback(model) {
										return model?.buttons?.length > 0;
									},
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
				pagination: {
					label: '分页',
					component: 'switch',
					span: 8,
					type: Boolean,
					formItemProps: {
						labelWidth: 100,
					},
				},
				selection: {
					label: '多选',
					component: 'switch',
					span: 8,
					type: Boolean,
					formItemProps: {
						labelWidth: 100,
					},
				},
				tree: {
					label: '树结构',
					component: 'switch',
					span: 8,
					type: Boolean,
					formItemProps: {
						labelWidth: 100,
					},
				},
			},
		};

		const handleGenerate = (result: ReadSwaggerPageResult) => {
			const pageConfig = swaggerGeneratePageConfig(result);
			model.pagination = pageConfig.pagination;
			model.url = pageConfig.table?.url;
			model.method = pageConfig.table?.method;
			model.columns = pageConfig.table?.schema?.columns;
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
								tree: model.tree,
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
							model.tree = props.schema?.table?.tree;
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
