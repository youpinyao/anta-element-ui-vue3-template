import formItemBase from './formItemBase';

export default {
	...formItemBase,
	component: 'radio-button',
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
