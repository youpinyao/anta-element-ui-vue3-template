import { PageRenderer } from '@/components/PageRenderer/typing';
import { AtButton, AtPagination } from 'anta-element-ui-components-next';
import { ArrayType } from 'anta-element-ui-components-next/src/utils/arrayType';
import {
	AtSchemaTable,
	AtSchemaTableTypes,
} from 'anta-element-ui-schema-table';
import { computed, defineComponent, PropType } from 'vue';
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
	setup(props, ctx) {
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
											return <FunctionButton size="small" {...button} />;
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
		return () => {
			const { dataSource } = props;

			return [
				<AtSchemaTable schema={tableSchema.value} dataSource={dataSource} />,
			];
		};
	},
});
