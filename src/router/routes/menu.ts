export default function () {
	return {
		path: '/menu',
		name: 'Menu',
		meta: {
			title: '菜单管理',
		},
		component: () => import('@/views/Menu/Index.vue'),
	};
}
