import formItemBase from './formItemBase';

export default {
	...formItemBase,
	component: 'select',
	remote: '远程数据URL地址 string，返回数据结构{msg:"", code: "", data: []}',
	options: [
		{
			label: '选项1',
			value: 1,
		},
		{
			label: '选项2',
			value: 2,
		},
	],
	props: {
		multiple: '是否多选 boolean',
		multipleLimit: '多选数量限制 number',
		placeholder: '占位 string',
		filterable: '搜索 boolean',
	},
};
