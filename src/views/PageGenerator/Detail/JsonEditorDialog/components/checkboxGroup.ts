import formItemBase from './formItemBase';

export default {
	...formItemBase,
	component: 'checkbox-group',
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
};
