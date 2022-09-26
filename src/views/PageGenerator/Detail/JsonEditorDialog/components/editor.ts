import formItemBase from './formItemBase';

export default {
	...formItemBase,
	component: 'editor',
	props: {
		height: '高度 number',
		config: {
			toolbar: 'wangEditor 配置 object',
			editor: 'wangEditor 配置 object',
		},
	},
};
