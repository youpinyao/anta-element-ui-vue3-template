import { AtSchemaFormTypes } from 'anta-element-ui-schema-form';
import { functionButtonTriggerTypes, methods } from '../../typing';
import { transformPropertiesToFormEditorModel } from '../FormEditor/Index';

export const jumpFormProperties: () => AtSchemaFormTypes.JSONSchema['properties'] =
	() => ({
		path: {
			component: 'input',
			label: '跳转路径',
			props: {
				placeholder: 'vue路由地址',
			},
			formItemProps: {
				required: true,
				labelWidth: 100,
			},
		},
	});
export const dialogFormProperties: ({
	onClick,
}: {
	onClick?: () => void;
}) => AtSchemaFormTypes.JSONSchema['properties'] = ({ onClick }) => ({
	title: {
		component: 'input',
		label: '弹窗标题',
		formItemProps: {
			required: true,
			labelWidth: 100,
		},
	},
	url: {
		component: 'input',
		label: '提交地址',
		formItemProps: {
			required: true,
			labelWidth: 100,
		},
	},
	method: {
		component: 'radio-button',
		label: '提交方法',
		formItemProps: {
			required: true,
			labelWidth: 100,
		},
		options: methods.map((item) => {
			return {
				value: item,
				label: item,
			};
		}),
	},
	dataUrl: {
		component: 'input',
		label: '预填数据地址',
		formItemProps: {
			labelWidth: 100,
		},
	},
	dataMethod: {
		component: 'radio-button',
		label: '预填数据方法',
		formItemProps: {
			labelWidth: 100,
		},
		options: methods.map((item) => {
			return {
				value: item,
				label: item,
			};
		}),
	},
	okText: {
		component: 'input',
		label: '保存按钮文案',
		formItemProps: {
			labelWidth: 100,
		},
		props: {
			placeholder: '保存',
		},
	},
	cancelText: {
		component: 'input',
		label: '取消按钮文案',
		formItemProps: {
			labelWidth: 100,
		},
		props: {
			placeholder: '取消',
		},
	},
	form: {
		component: 'button',
		props: {
			type: 'primary',
			vSlots: {
				default: () => '表单编辑',
			},
			onClick() {
				onClick?.();
			},
		},
	},
});
export const popconfirmFormProperties: () => AtSchemaFormTypes.JSONSchema['properties'] =
	() => ({
		url: {
			component: 'input',
			label: '提交地址',
			formItemProps: {
				required: true,
				labelWidth: 100,
			},
		},
		method: {
			component: 'radio-button',
			label: '提交方法',
			formItemProps: {
				required: true,
				labelWidth: 100,
			},
			options: methods.map((item) => {
				return {
					value: item,
					label: item,
				};
			}),
		},
		title: {
			component: 'input',
			label: '提示文案',
			formItemProps: {
				labelWidth: 100,
			},
			props: {
				placeholder: '确认删除？',
			},
		},
	});
export const baseFormProperties: () => AtSchemaFormTypes.JSONSchema['properties'] =
	() => ({
		type: {
			component: 'select',
			label: '类型',
			formItemProps: {
				required: true,
				labelWidth: 100,
			},
			options: functionButtonTriggerTypes.map((item) => {
				return {
					value: item,
					label: item,
				};
			}),
		},
	});
