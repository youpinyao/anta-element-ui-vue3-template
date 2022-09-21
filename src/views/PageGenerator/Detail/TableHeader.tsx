import { AtTitle } from 'anta-element-ui-components-next';
import { defineComponent, PropType } from 'vue';
import { PageGenerator } from '../typing';
import FunctionButton from './FunctionButton';
import AtTableHeader from '@components/AtTableHeader.vue';

export default defineComponent({
	props: {
		title: {
			type: String as PropType<PageGenerator.JSONSchema['title']>,
		},
		buttons: {
			type: Array as PropType<PageGenerator.JSONSchema['buttons']>,
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
