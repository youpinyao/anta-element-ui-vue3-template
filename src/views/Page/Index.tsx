import { defineComponent, ref } from 'vue';
import PageRenderer from '@PageRenderer';
import { adminV1PageGeneratorDetailGetByAlias } from '@/apis/adminApiPageTemplates';
import { useRequest } from '@/utils/hooks/useRequest';
import { AtLoading } from 'anta-element-ui-components-next';
import { useRoute } from 'vue-router';

export default defineComponent({
	setup(props, ctx) {
		const route = useRoute();

		const { data, run } = useRequest(adminV1PageGeneratorDetailGetByAlias, {
			immediate: false,
		});

		run({
			alias: route.params.alias as unknown as string,
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
			return <PageRenderer config={data.value.data} />;
		};
	},
});
