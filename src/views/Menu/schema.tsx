import { adminV1MenuGet } from '@/apis/adminApiMenu';
import { adminV1PageTemplatesGet } from '@/apis/adminApiPageTemplates';
import { SCHEMA_FORM_MODEL } from '@/components/PageRenderer/typing';
import { AdminV1MenusGetResult } from '@/models/menuApi/AdminV1MenusGetResult';
import { get } from '@/utils/axios';
import { AtIcon } from 'anta-element-ui-components-next';
import { icons } from 'anta-element-ui-components-next/src/components/icon';
import { AtSchemaFormTypes } from 'anta-element-ui-schema-form';
import { inject } from 'vue';

export function formSchema() {
	const schema: AtSchemaFormTypes.JSONSchema = {
		properties: {
			orders: {
				component: 'input-number',
				type: Number,
				label: '排序',
				formItemProps: {
					required: true,
					labelWidth: 100,
				},
			},
			title: {
				component: 'input',
				type: String,
				label: '标题',
				formItemProps: {
					required: true,
					labelWidth: 100,
				},
			},
			pid: {
				component: 'tree-select',
				type: Number,
				label: '父级',
				options: getPidTreeSelectOptions,
				props: {
					checkStrictly: true,
				},
				formItemProps: {
					required: true,
					labelWidth: 100,
				},
			},
			typeFlag: {
				component: 'select',
				type: String,
				label: '类型',
				formItemProps: {
					required: true,
					labelWidth: 100,
				},
				options: [
					{
						label: '模块',
						value: 0,
					},
					{
						label: '菜单',
						value: 1,
					},
					{
						label: '功能',
						value: 2,
					},
				],
			},
			page: {
				component: 'select',
				type: String,
				label: '页面选择',
				span: 8,
				async options() {
					const result = await adminV1PageTemplatesGet({
						page: 1,
						pageSize: 10000,
					});
					return (result.data.data?.list ?? []).map((item) => {
						return {
							label: `${item.title} ${item.alias}`,
							value: item.alias,
						};
					}) as AtSchemaFormTypes.SelectOption[];
				},
				props: {
					filterable: true,
					clearable: true,
				},
				formItemProps: {
					labelWidth: 100,
				},
			},
			icon: {
				component: 'select',
				type: String,
				label: '',
				span: 4,
				options: icons.map((icon) => {
					return {
						value: `at-icon-${icon}`,
						label: icon,
						vSlots: {
							default() {
								return (
									<div>
										<AtIcon name={icon}></AtIcon>
										<span style={{ marginLeft: '5px' }}>{icon}</span>
									</div>
								);
							},
						},
					};
				}),
				props: {
					filterable: true,
					clearable: true,
				},
				formItemProps: {
					labelWidth: 10,
				},
			},
			path: {
				component: 'input',
				type: String,
				span: 12,
				label: '',
				props: {
					placeholder: '页面路径',
				},
				formItemProps: {
					labelWidth: 10,
				},
				watchs: {
					fields: ['page'],
					callback(model, next) {
						if (next?.page) {
							model.path = `/page/${next.page}`;
						}
					},
				},
			},
			remark: {
				component: 'textarea',
				type: String,
				label: '备注',
				formItemProps: {
					labelWidth: 100,
					style: {
						marginBottom: 0,
					},
				},
			},
		},
	};
	return schema;
}

async function getPidTreeSelectOptions() {
	const menus: NonNullable<AdminV1MenusGetResult['data']> =
		(await adminV1MenuGet({})).data.data ?? [];
	const options: AtSchemaFormTypes.SelectOption[] = [
		{
			label: '顶级',
			value: 0,
		},
	];

	const each = (parent: typeof options, items: typeof menus) => {
		items.forEach((item) => {
			const option = {
				label: item.title ?? '',
				value: item.id ?? '',
				children: [],
			};
			parent.push(option);
			each(option.children, item.children ?? []);
		});
	};

	each(options, menus);

	return options;
}
