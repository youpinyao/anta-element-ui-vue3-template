import { AtTitle } from 'anta-element-ui-components-next';
import { defineComponent, PropType } from 'vue';
import { PageGenerator } from '../typing';
import FunctionButton from './FunctionButton';
import Placeholder from './Placeholder.vue';

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
				<div class="at-table-header">
					<AtTitle border={false}>{title}</AtTitle>
					<div>
						{(buttons ?? []).map((button) => {
							return <FunctionButton {...button} />;
						})}
					</div>
				</div>
			);
		};
	},
});
