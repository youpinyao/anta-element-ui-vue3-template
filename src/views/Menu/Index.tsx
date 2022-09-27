import { defineComponent, inject } from 'vue';
import PageRenderer from '@PageRenderer';

import config from './config';

export default defineComponent({
	setup(props, ctx) {
		return () => {
			return <PageRenderer config={config} />;
		};
	},
});
