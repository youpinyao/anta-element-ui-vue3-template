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
			const { schema: _schema, dataSource } = props;

			const schema: typeof _schema = {
				...(_schema as unknown as any),
				columns: (
					_schema as NonNullable<
						NonNullable<PageGenerator.JSONSchema['table']>['schema']
					>
				).columns.map((item) => {
					if (item.buttons) {
						return {
							...item,
							render(row) {
								return (
									<div>
										{item.buttons?.map((button) => {
											return (
												<AtButton size="small" type={button.type}>
													{button.title}
												</AtButton>
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

			return <AtSchemaTable schema={schema} dataSource={dataSource} />;
		};
	},
});
