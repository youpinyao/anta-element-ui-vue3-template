import select from './select';
import tree from './tree';

export default {
	...select,
	component: 'tree-select',
	remote: tree.remote,
	options: tree.options,
	props: {
		...select.props,
		...tree.props,
	},
};
