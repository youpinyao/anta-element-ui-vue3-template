import formItemBase from './formItemBase';

export default {
	...formItemBase,
	component: 'slider',
	props: {
		min: '最小值 number',
		max: '最大值 number',
		step: '步长 number',
	},
};
