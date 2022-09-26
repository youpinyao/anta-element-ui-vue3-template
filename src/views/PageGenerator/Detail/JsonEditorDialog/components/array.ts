import formItemBase from './formItemBase';

export default {
	...formItemBase,
	component: 'array',
	children: '子组件 component[]',
	props: {
		limit: '限制 number',
		sortable: '是否排序 boolean',
	},
};
