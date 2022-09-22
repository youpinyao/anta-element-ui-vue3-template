import { PageRenderer } from '@/components/PageRenderer/typing';
import { AtButton, AtPagination } from 'anta-element-ui-components-next';
import { ArrayType } from 'anta-element-ui-components-next/src/utils/arrayType';
import {
	AtSchemaTable,
	AtSchemaTableTypes,
} from 'anta-element-ui-schema-table';
import { computed, defineComponent, PropType, ref } from 'vue';
import FunctionButton from './FunctionButton';

export default defineComponent({
	props: {
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
		const { tableSchema } = this;
		const { dataSource } = this.$props;
		return (
			<AtSchemaTable ref="table" schema={tableSchema} dataSource={dataSource} />
		);
	},
	setup(props, ctx) {
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
			const schema = props.schema?.schema || {
				columns: [],
			};
			const columns = [...(schema.columns ?? [])];
			const tableProps = {
				...schema.props,
			};

			if (props.schema?.selection) {
				columns.unshift({
					type: 'selection',
					width: 40,
				});
			}
			if (props.schema?.tree) {
				tableProps.rowKey = 'id';
				tableProps.treeProps = {
					children: 'children',
					hasChildren: 'hasChildren',
				};
			}
			return {
				...schema,
				props: {
					...schema.props,
					rowKey: 'id',
					treeProps: {
						children: 'children',
						hasChildren: 'hasChildren',
					},
					'onSort-change': onSortChange,
				},
				columns: columns.map((item) => {
					if (item.type === 'selection') {
						return item;
					}
					if (item.buttons && item.buttons.length) {
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
		return {
			table,
			tableSchema,
		};
	},
});
