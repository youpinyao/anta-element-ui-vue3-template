import { adminV1MenuGet } from '@/apis/adminApiMenu';
import { AdminV1MenusGetResult } from '@/models/menuApi/AdminV1MenusGetResult';
import { AtSchemaFormTypes } from 'anta-element-ui-schema-form';

export function formSchema() {
	const schema: AtSchemaFormTypes.JSONSchema = {
		formProps: {
			labelWidth: 100,
		},
		properties: {
			orders: {
				component: 'input-number',
				type: Number,
				label: '排序',
				formItemProps: {
					required: true,
				},
			},
			title: {
				component: 'input',
				type: String,
				label: '标题',
				formItemProps: {
					required: true,
				},
			},
			permCode: {
				component: 'input',
				type: String,
				label: '权限码',
				formItemProps: {
					required: true,
				},
			},
			pid: {
				component: 'tree-select',
				type: Number,
				label: '父ID',
				display: {
					fields: ['pid'],
					callback(model) {
						return model.pid !== 0 ? 'visible' : 'hidden';
					},
				},
				options: getPidTreeSelectOptions,
				props: {
					checkStrictly: true,
				},
				formItemProps: {
					required: true,
				},
			},
			typeFlag: {
				component: 'select',
				type: String,
				label: '类型',
				formItemProps: {
					required: true,
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
			remark: {
				component: 'textarea',
				type: String,
				label: '备注',
				formItemProps: {
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
	const options: AtSchemaFormTypes.SelectOption[] = [];

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
