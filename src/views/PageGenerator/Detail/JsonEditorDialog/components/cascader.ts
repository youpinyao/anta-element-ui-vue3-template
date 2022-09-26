import formItemBase from './formItemBase';
import tree from './tree';

export default {
	...formItemBase,
	component: 'cascader',
	remote: tree.remote,
	options: tree.options,
	props: {
		placeholder: '占位 string',
		filterable: '搜索 boolean',
		showAllLevels: '输入框中是否显示选中值的完整路径 boolean',
		collapseTags: '多选模式下是否折叠Tag boolean',
		props: {
			multiple: '多选 boolean',
			checkStrictly: '是否严格的遵守父子节点不互相关联 boolean',
		},
	},
};
