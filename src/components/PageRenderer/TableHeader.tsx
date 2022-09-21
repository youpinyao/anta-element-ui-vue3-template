import { AtTitle } from 'anta-element-ui-components-next';
import { defineComponent, PropType } from 'vue';
import AtTableHeader from '@components/AtTableHeader.vue';
import FunctionButton from '@/components/PageRenderer/FunctionButton';
import { PageRenderer } from '@/components/PageRenderer/typing';

export default defineComponent({
	props: {
		title: {
			type: String as PropType<PageRenderer.JSONSchema['title']>,
		},
		buttons: {
			type: Array as PropType<PageRenderer.JSONSchema['buttons']>,
		},
	},
	setup(props, ctx) {
		return () => {
			const { title, buttons } = props;
			if (!title && !buttons?.length) {
				return null;
			}
			return (
				<AtTableHeader title={title}>
					{(buttons ?? []).map((button) => {
						return <FunctionButton {...button} />;
					})}
				</AtTableHeader>
			);
		};
	},
});
