export default function () {
	return [
		{
			path: '/page-generator',
			name: 'PageGenerator',
			meta: {
				title: '页面生成器',
			},
			component: () => import('@/views/PageGenerator/Index'),
		},
		{
			path: '/page-generator/:id',
			name: 'PageGeneratorDetail',
			meta: {
				title: '页面生成器详情',
			},
			component: () => import('@/views/PageGenerator/Detail/Index.vue'),
		},
	];
}
