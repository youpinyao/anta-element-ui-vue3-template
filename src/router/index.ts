import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/components/Layout/Index.vue';
import Home from '@/views/Home.vue';
import { useTabStore } from '@/store/tab';

const routes = [
	{
		path: '/login',
		name: 'Login',
		meta: {
			keepAlive: false,
		},
		component: () => import('../views/Login/Index.vue'),
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
				component: Home,
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.afterEach((to) => {
	if (to.meta?.keepAlive !== false) {
		useTabStore().add(to);
	}
});

export default router;
