import formItemBase from './formItemBase';

export default {
	...formItemBase,
	component: 'time-select',
	props: {
		placeholder: '占位 string',
		clearable: '是否可清空 boolean',
		start: '开始时间 09:00',
		end: '结束时间 18:00',
		step: '间隔时间 00:30',
	},
};
