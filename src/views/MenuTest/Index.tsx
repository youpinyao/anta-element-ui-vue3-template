import { defineComponent } from 'vue';
import PageRenderer from '@PageRenderer';
import { AdminApiPageGeneratorDetailGetResult } from '@/apis/adminApiPageTemplates';

const config: AdminApiPageGeneratorDetailGetResult = require('./config.json');

export default defineComponent({
	setup(props, ctx) {
		return () => {
			return <PageRenderer config={config} />;
		};
	},
});
