import { defineComponent, ref } from 'vue';
import PageRenderer from '@PageRenderer';
import {
	adminV1PageGeneratorDetailGet,
	AdminV1PageGeneratorDetailGetResult,
} from '@/apis/adminApiPageTemplates';
import { useRequest } from '@/utils/hooks/useRequest';
import { AtLoading } from 'anta-element-ui-components-next';
import { useRoute } from 'vue-router';

export default defineComponent({
	setup(props, ctx) {
		const route = useRoute();

		const { data, run } = useRequest(adminV1PageGeneratorDetailGet, {
			immediate: false,
		});

		run({
			pageTemplateId: route.params.id as unknown as number,
		});

		return () => {
			if (!data.value?.data) {
				return (
					<AtLoading
						static
						visible={true}
						style={{
							padding: '50px 0',
						}}
					></AtLoading>
				);
			}
			return (
				<div
					class="global-bg-color"
					style={{
						height: '100vh',
					}}
				>
					<PageRenderer config={data.value.data} />
				</div>
			);
		};
	},
});
