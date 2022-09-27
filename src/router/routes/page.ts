export default function () {
	return [
		{
			path: '/page/:alias',
			name: 'Page',
			meta: {
				title: '动态页面',
			},
			component: () => import('@/views/Page/Index'),
		},
	];
}
