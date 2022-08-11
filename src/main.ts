import { createApp } from 'vue';
import { createPinia } from 'pinia';
import * as icons from '@element-plus/icons-vue';
import 'anta-element-ui-components-next/src/scss/index.scss';
import './app.scss';
import AntaElementUIPlus, {
	ClickOutside,
} from 'anta-element-ui-components-next';

import router from './router';
import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);

Object.keys(icons).forEach((key) => {
	app.component(key, (icons as Record<string, any>)[key]);
});

app.use(router);
app.use(pinia);
app.use(AntaElementUIPlus);
app.directive('ClickOutside', ClickOutside);

app.mount('#app');
