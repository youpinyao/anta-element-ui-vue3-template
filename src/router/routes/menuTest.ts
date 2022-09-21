export default function () {
	return {
		path: '/menu-test',
		name: 'MenuTest',
		meta: {
			title: '菜单管理Test',
		},
		component: () => import('@/views/MenuTest/Index'),
	};
}
