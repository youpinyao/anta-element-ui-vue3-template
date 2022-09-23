import { AdminApiPageGeneratorDetailGetResult } from '@/apis/adminApiPageTemplates';
import { Definition2109f27d03411ab2d387f6d44a00e6a5 } from '@/models/definitions/Definition2109f27d03411ab2d387f6d44a00e6a5';
import { put } from '@/utils/axios';
import { AtSwitch } from 'anta-element-ui-components-next';
import { ArrayType } from 'anta-element-ui-components-next/src/utils/arrayType';
import { ref } from 'vue';

export default {
	schema: {
		title: '页面列表',
		buttons: [
			{
				title: '新增',
				type: 'primary',
				trigger: {
					type: 'route',
					path: '/page-generator/add',
				},
			},
		],
		table: {
			url: '/admin/v1/page-templates',
			method: 'GET',
			schema: {
				columns: [
					{ prop: 'id', label: '主键', width: 100 },
					{ prop: 'alias', label: '别名', minWidth: 200 },
					{ prop: 'title', label: '名称', minWidth: 200 },
					{
						prop: 'status',
						label: '状态',
						width: 100,
						switch: {
							url: '/admin/v1/page-templates',
							method: 'PUT',
							trueValue: 1,
							falseValue: 0,
						},
					},
					{ prop: 'updateTime', label: '更新时间', width: 180 },
					{
						prop: 'id',
						label: '操作',
						width: 140,
						fixed: 'right',
						buttons: [
							{
								title: '编辑',
								type: 'primary',
								trigger: {
									type: 'route',
									path: '/page-generator/{id}',
								},
							},
							{
								title: '删除',
								type: 'danger',
								trigger: {
									type: 'popconfirm',
									url: '/admin/v1/page-templates/{id}',
									method: 'DELETE',
									confirmProps: { title: '确认删除？' },
								},
							},
						],
					},
				],
			},
		},
		pagination: true,
	},
	title: '页面列表',
} as AdminApiPageGeneratorDetailGetResult<
	NonNullable<ArrayType<Definition2109f27d03411ab2d387f6d44a00e6a5['list']>>
>;
