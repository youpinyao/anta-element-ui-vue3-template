import formItemBase from './formItemBase';

export default {
	...formItemBase,
	component: 'rate',
	props: {
		max: '最大分值 number',
		allowHalf: '是否允许半选 boolean',
	},
};
