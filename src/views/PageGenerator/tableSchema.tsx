import ConfirmButton from '@/components/ConfirmButton';
import { AdminApiMenusGetResult } from '@/models/menuApi/AdminApiMenusGetResult';
import { useLoadingStore } from '@/store/loading';
import { reference } from '@popperjs/core';
import { AtButton, AtPopconfirm } from 'anta-element-ui-components-next';
import { ArrayType } from 'anta-element-ui-components-next/src/utils/arrayType';
import { AtSchemaTableTypes } from 'anta-element-ui-schema-table';
import { defineComponent, PropType, ref } from 'vue';

export default function tableSchema({
	handleEdit,
	handleDel,
}: {
	handleEdit: (
		e: MouseEvent,
		row: ArrayType<AdminApiMenusGetResult['data']>
	) => void;
	handleDel: (
		e: Event,
		row: ArrayType<AdminApiMenusGetResult['data']>
	) => Promise<any>;
}) {
	const schema: AtSchemaTableTypes.JSONSchema<
		NonNullable<ArrayType<AdminApiMenusGetResult['data']>>
	> = {
		columns: [
			{
				label: 'ID',
				prop: 'id',
				width: 200,
			},
			{
				label: '名称',
				prop: 'title',
			},
			{
				label: '操作',
				prop: 'id',
				width: 160,
				render(row) {
					return (
						<div>
							<AtButton
								size="small"
								onClick={(e) => handleEdit(e, row)}
								type="primary"
							>
								编辑
							</AtButton>
							<ConfirmButton
								title="确认删除？"
								onConfirm={(e) => handleDel(e, row)}
							>
								<AtButton size="small" type="danger">
									删除
								</AtButton>
							</ConfirmButton>
						</div>
					);
				},
			},
		],
	};

	return schema;
}
