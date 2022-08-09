import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'anta-element-ui-components-next/src/scss/index.scss';
import './app.scss';
import AntaElementUIPlus from 'anta-element-ui-components-next';

import router from './router';
import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(AntaElementUIPlus);

app.mount('#app');
