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
		props: {
			rowKey: 'id',
			treeProps: {
				children: 'children',
				hasChildren: 'hasChildren',
			},
		},
		columns: [
			{
				label: '主键',
				prop: 'id',
				width: 160,
			},
			{
				label: '父ID',
				prop: 'pid',
				width: 100,
			},
			{
				label: '排序',
				prop: 'orders',
				width: 100,
			},
			{
				label: '标题',
				prop: 'title',
				width: 200,
				showOverflowTooltip: true,
			},
			{
				label: '权限码',
				prop: 'permCode',
				minWidth: 200,
				showOverflowTooltip: true,
			},
			{
				label: '类型',
				prop: 'typeFlag',
				width: 80,
				template: `<div>{{ ['模块', '菜单' ,'功能'][row.typeFlag] || '未知' }}</div>`,
			},
			{
				label: '绑定菜单数量',
				prop: 'bindingQuantity',
				width: 120,
			},
			{
				label: '操作',
				prop: 'id',
				width: 160,
				fixed: 'right',
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
