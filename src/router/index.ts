import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useTabStore } from '@/store/tab';
import { useLoadingStore } from '@/store/loading';
import Layout from '@/components/Layout/Index.vue';
import NotFound from '@/views/NotFound.vue';
import Login from '@/views/Login/Index.vue';

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
	useLoadingStore().routeStart(guard.fullPath);
	console.time(guard.path);
});

router.afterEach((to) => {
	useLoadingStore().routeEnd(to.fullPath);
	console.timeEnd(to.path);

	if (to.meta?.keepAlive !== false) {
		useTabStore().add(to);
	}
});

export default router;
