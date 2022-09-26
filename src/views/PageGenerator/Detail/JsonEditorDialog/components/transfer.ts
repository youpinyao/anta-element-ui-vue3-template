import formItemBase from './formItemBase';
import select from './select';

export default {
	...formItemBase,
	component: 'transfer',
	remote: select.remote,
	options: select.options,
	props: {
		filterable: '搜索 boolean',
		titles: '自定义列表标题 string[]',
	},
};
