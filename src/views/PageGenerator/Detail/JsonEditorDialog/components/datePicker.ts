import formItemBase from './formItemBase';

export default {
	...formItemBase,
	component: 'date-picker',
	props: {
		placeholder: '占位 string',
		clearable: '是否可清空 boolean',
		type: '类型 year/month/date/dates/datetime/week/datetimerange/daterange/monthrange',
	},
};
