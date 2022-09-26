import formItemBase from './formItemBase';

export default {
	...formItemBase,
	component: 'input-number',
	props: {
		placeholder: '占位 string',
		min: '最小值 number',
		max: '最大值 number',
		step: '计步器长度 number',
		stepStrictly: '是否只能输入 step 的倍数 boolean',
		precision: '数值精度 number',
	},
};
