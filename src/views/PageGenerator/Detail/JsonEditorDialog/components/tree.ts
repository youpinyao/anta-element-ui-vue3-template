import formItemBase from './formItemBase';

export default {
	...formItemBase,
	component: 'tree',
	remote: '远程数据URL地址 string，返回数据结构{msg:"", code: "", data: []}',
	options: [
		{
			label: '选项1',
			value: 1,
			children: [
				{
					label: '选项11',
					value: 11,
				},
				{
					label: '选项12',
					value: 12,
				},
			],
		},
		{
			label: '选项2',
			value: 2,
		},
	],
	props: {
		checkStrictly: '是否严格的遵循父子不互相关联 boolean',
	},
};
