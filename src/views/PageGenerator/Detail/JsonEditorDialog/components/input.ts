import formItemBase from './formItemBase';

export default {
	...formItemBase,
	component: 'input',
	props: {
		placeholder: '占位 string',
		minlength: '最小长度 string',
		maxlength: '最大长度 string',
		showWordLimit: '显示字数统计 boolean',
		clearable: '是否可清空 boolean',
		autosize: '高度自适应 boolean',
	},
};
