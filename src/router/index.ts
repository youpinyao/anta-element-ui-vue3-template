import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useTabStore } from '@/store/tab';
import { useRouterStore } from '@/store/router';
import Layout from '@/components/Layout/Index.vue';
import NotFound from '@/views/NotFound.vue';
import Login from '@/views/Login/Index.vue';
import PagePreview from '@/views/PagePreview/Index';

// @ts-ignore
const files = require.context('./routes', true, /\.ts$/);
let extraRoutes: RouteRecordRaw[] = [];

files.keys().forEach((key: string) => {
	extraRoutes = extraRoutes.concat(
		[require(`./routes/${key.replace(/^(\.\/)/g, '')}`).default()].flat()
	);
});

const routes: RouteRecordRaw[] = [
	{
		path: '/login',
		name: 'Login',
		meta: {
			keepAlive: false,
		},
		component: Login,
	},
	{
		path: '/page-preview/:id',
		name: 'PagePreview',
		meta: {
			keepAlive: false,
			title: '页面预览',
		},
		component: PagePreview,
	},
	{
		path: '/',
		name: 'Layout',
		component: Layout,
		redirect: '/home',
		children: [
			{
				path: '/home',
				name: 'Home',
				meta: {
					title: '首页',
				},
				component: () => import('@/views/Home.vue'),
			},
			...extraRoutes,
			{
				path: '/:pathMatch(.*)',
				name: 'NotFound',
				component: NotFound,
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((guard) => {
	useRouterStore().start(guard.fullPath);
	console.time(guard.path);
});

router.afterEach((to) => {
	useRouterStore().end(to.fullPath);
	console.timeEnd(to.path);

	if (to.meta?.keepAlive !== false) {
		useTabStore().add(to);
	}
});

export default router;
