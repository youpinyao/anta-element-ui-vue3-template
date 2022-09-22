import { defineComponent } from 'vue';
import PageRenderer from '@PageRenderer';
import { AdminApiPageGeneratorDetailGetResult } from '@/apis/adminApiPageTemplates';

import config from './config';

export default defineComponent({
	setup(props, ctx) {
		return () => {
			return <PageRenderer config={config} />;
		};
	},
});
