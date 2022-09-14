import { AtButton } from 'anta-element-ui-components-next';
import { defineComponent, PropType } from 'vue';
import { PageGenerator } from '../typing';

export default defineComponent({
	props: {
		type: String as PropType<PageGenerator.FunctionButton['type']>,
		trigger: Object as PropType<PageGenerator.FunctionButton['trigger']>,
		title: String as PropType<PageGenerator.FunctionButton['title']>,
	},
	setup(props, ctx) {
		return () => {
			const { type, title } = props;
			return <AtButton type={type}>{title}</AtButton>;
		};
	},
});
