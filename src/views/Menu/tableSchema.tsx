import { AdminApiMenusGetResult } from '@/models/menuApi/AdminApiMenusGetResult';
import { useLoadingStore } from '@/store/loading';
import { reference } from '@popperjs/core';
import { AtButton, AtPopconfirm } from 'anta-element-ui-components-next';
import { ArrayType } from 'anta-element-ui-components-next/src/utils/arrayType';
import { AtSchemaTableTypes } from 'anta-element-ui-schema-table';
import { defineComponent, PropType, ref } from 'vue';

const DelButton = defineComponent({
	props: {
		onConfirm: {
			type: Function as PropType<(e: Event) => Promise<any>>,
			required: true,
		},
	},
	setup(props, context) {
		const loading = ref(false);
		return () => {
			const { onConfirm } = props;
			return (
				<AtPopconfirm
					title="确认删除？"
					onConfirm={async (e) => {
						loading.value = true;
						try {
							await onConfirm?.(e);
						} catch (error) {
							console.error(error);
						} finally {
							loading.value = false;
						}
					}}
					v-slots={{
						reference() {
							return (
								<AtButton loading={loading.value} size="small" type="danger">
									删除
								</AtButton>
							);
						},
					}}
				/>
			);
		};
	},
});

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
			},
			{
				label: '绑定菜单数量',
				prop: 'bindingQuantity',
				width: 120,
			},
			// {
			// 	label: '备注',
			// 	prop: 'remark',
			// 	minWidth: 200,
			// },
			// {
			// 	label: '更新时间',
			// 	prop: 'updateTime',
			// 	width: 100,
			// },
			// {
			// 	label: '更新人',
			// 	prop: 'updatedBy',
			// 	width: 200,
			// },
			// {
			// 	label: '创建时间',
			// 	prop: 'createTime',
			// 	width: 100,
			// },
			// {
			// 	label: '创建人',
			// 	prop: 'createdBy',
			// 	width: 200,
			// },
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
							<DelButton onConfirm={(e) => handleDel(e, row)} />
						</div>
					);
				},
			},
		],
	};

	return schema;
}
