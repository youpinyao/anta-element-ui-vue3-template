import FunctionButton from '@/components/PageRenderer/FunctionButton';
import { AtButton } from 'anta-element-ui-components-next';
import { ArrayType } from 'anta-element-ui-components-next/src/utils/arrayType';
import {
	AtSchemaTable,
	AtSchemaTableTypes,
} from 'anta-element-ui-schema-table';
import { defineComponent, PropType } from 'vue';
import { PageGenerator } from '../typing';

export default defineComponent({
	props: {
		schema: {
			type: Object as PropType<AtSchemaTableTypes.JSONSchema>,
			required: true,
		},
		dataSource: {
			type: Array as PropType<AtSchemaTableTypes.DataSource>,
			required: true,
		},
	},
	setup(props, ctx) {
		return () => {
			const { schema, dataSource } = props;

			const tableSchema: typeof schema = {
				...(schema as unknown as any),
				columns: (
					schema as NonNullable<
						NonNullable<PageGenerator.JSONSchema['table']>['schema']
					>
				).columns.map((item) => {
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

			return <AtSchemaTable schema={tableSchema} dataSource={dataSource} />;
		};
	},
});
