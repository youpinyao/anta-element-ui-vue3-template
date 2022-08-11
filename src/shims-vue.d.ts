/* eslint-disable */
declare module 'vue' {
	export * from '@vue/runtime-dom';
}
declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}