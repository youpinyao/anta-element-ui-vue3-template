import { AdminV1PageGeneratorDetailGetResult } from '@/apis/adminApiPageTemplates';
import { Definition2109f27d03411ab2d387f6d44a00e6a5 } from '@/models/definitions/Definition2109f27d03411ab2d387f6d44a00e6a5';
import { AdminV1MenusGetResult } from '@/models/menuApi/AdminV1MenusGetResult';
import { put } from '@/utils/axios';
import { AtSwitch } from 'anta-element-ui-components-next';
import { ArrayType } from 'anta-element-ui-components-next/src/utils/arrayType';
import { ref } from 'vue';
import { formSchema } from './schema';

export default {
	schema: {
		title: '菜单列表',
		buttons: [
			{
				title: '新增',
				type: 'primary',
				trigger: {
					type: 'dialog',
					form: {
						url: '/admin/v1/menus',
						method: 'POST',
						schema: formSchema(),
					},
					dialogProps: {
						title: '菜单新增',
					},
				},
			},
		],
		table: {
			url: '/admin/v1/menus',
			method: 'GET',
			tree: true,
			schema: {
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
						label: '路径',
						prop: 'path',
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
						buttons: [
							{
								type: 'primary',
								title: '编辑',
								trigger: {
									type: 'dialog',
									form: {
										url: '/admin/v1/menus',
										method: 'PUT',
										schema: formSchema(),
									},
									dialogProps: {
										title: '菜单更新',
									},
								},
							},
							{
								type: 'danger',
								title: '删除',
								trigger: {
									type: 'popconfirm',
									url: '/admin/v1/menus/{id}',
									method: 'DELETE',
								},
							},
						],
					},
				],
			},
		},
	},
	title: '菜单列表',
} as AdminV1PageGeneratorDetailGetResult<
	NonNullable<ArrayType<AdminV1MenusGetResult['data']>>
>;
