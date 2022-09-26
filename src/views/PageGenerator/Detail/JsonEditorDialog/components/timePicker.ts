import formItemBase from './formItemBase';

export default {
	...formItemBase,
	component: 'time-picker',
	props: {
		placeholder: '占位 string',
		clearable: '是否可清空 boolean',
		isRange: '是否为时间范围选择 boolean',
	},
};
