import formItemBase from './formItemBase';

export default {
	...formItemBase,
	component: 'switch',
	props: {
		width: '宽度 number',
		activeText: 'on时文字描述 string',
		inactiveText: 'off时文字描述 string',
		inlinePrompt: '文字在switch内显示 boolean',
	},
};
