import formItemBase from './formItemBase';
import tree from './tree';

export default {
	...formItemBase,
	component: 'transfer',
	remote: tree.remote,
	options: tree.options,
	props: {
		filterable: '搜索 boolean',
		titles: '自定义列表标题 string[]',
	},
};
