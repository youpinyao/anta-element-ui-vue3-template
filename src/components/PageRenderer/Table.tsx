import { PageRenderer } from '@/components/PageRenderer/typing';
import {
	AtButton,
	AtLoading,
	AtPagination,
} from 'anta-element-ui-components-next';
import { ArrayType } from 'anta-element-ui-components-next/src/utils/arrayType';
import {
	AtSchemaTable,
	AtSchemaTableTypes,
} from 'anta-element-ui-schema-table';
import { computed, defineComponent, PropType, ref, toRaw, watch } from 'vue';
import FunctionButton from './FunctionButton';
import Swtich from './Swtich';

export default defineComponent({
	props: {
		edit: {
			type: Boolean,
			default: false,
		},
		schema: {
			type: Object as PropType<PageRenderer.JSONSchema['table']>,
			required: true,
		},
		dataSource: {
			type: Array as PropType<AtSchemaTableTypes.DataSource>,
			required: true,
		},
	},
	emits: {
		functionButtonCallback: () => true,
		sortChange: (sort?: Record<string, 'ascending' | 'descending'>) => true,
	},
	render() {
		const { tableSchema, loading } = this;
		const { dataSource } = this.$props;

		if (loading) {
			return (
				<AtLoading
					static
					visible={true}
					style={{ padding: '50px 0' }}
				></AtLoading>
			);
		}

		return (
			<AtSchemaTable ref="table" schema={tableSchema} dataSource={dataSource} />
		);
	},
	setup(props, ctx) {
		const loading = ref(false);
		const table = ref<InstanceType<typeof AtSchemaTable>>();
		const onSortChange = (sort: any) => {
			ctx.emit(
				'sortChange',
				sort.prop
					? {
							[sort.prop]: sort.order,
					  }
					: undefined
			);
		};
		const tableSchema = computed<AtSchemaTableTypes.JSONSchema>(() => {
			const schema: NonNullable<PageRenderer.JSONSchema['table']>['schema'] =
				props.schema?.schema || {
					columns: [],
				};
			const columns = [...(schema.columns ?? [])];
			const tableProps = {
				...schema.props,
			};

			// 多选
			if (props.schema?.selection) {
				columns.unshift({
					type: 'selection',
					width: 40,
				});
			}
			// 树结构
			if (props.schema?.tree && !tableProps.treeProps) {
				tableProps.treeProps = {
					children: 'children',
					hasChildren: 'hasChildren',
				};
			}
			return {
				...schema,
				props: {
					rowKey: 'id',
					'onSort-change': onSortChange,
					...tableProps,
				},
				columns: columns
					.map((item) => toRaw(item))
					.map((item) => {
						if (item.type === 'selection') {
							return item;
						}
						if (item?.switch?.url) {
							return {
								...item,
								render(row) {
									const prop = item.switch?.prop ?? item.prop;
									return (
										<Swtich
											{...item.switch}
											prop={prop}
											data={row}
											onChange={(result) => {
												if (prop) {
													row[prop] = result;
												}
											}}
										/>
									);
								},
							};
						} else if (item?.buttons?.length) {
							return {
								...item,
								render(row) {
									return (
										<div>
											{item.buttons?.map((button) => {
												return (
													<FunctionButton
														size="small"
														{...button}
														trigger={{
															...button.trigger,
															data: button.trigger.data ?? row,
															callback() {
																button.trigger.callback?.();
																ctx.emit('functionButtonCallback');
															},
														}}
													/>
												);
											})}
										</div>
									);
								},
							};
						} else {
							return item;
						}
					}),
			};
		});

		watch(
			() => tableSchema.value.columns.map((item) => item.prop),
			(keys) => {
				if (props.edit) {
					loading.value = true;

					setTimeout(() => {
						loading.value = false;
					}, 300);
				}
			}
		);
		return {
			table,
			tableSchema,
			loading,
		};
	},
});
