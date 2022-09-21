import { AtButton } from 'anta-element-ui-components-next';
import { PropsType } from 'anta-element-ui-components-next/src/utils/propsType';
import { defineComponent, PropType } from 'vue';
import { PageGenerator } from '../../views/PageGenerator/typing';

export default defineComponent({
	props: {
		size: String as PropType<PropsType<typeof AtButton>['size']>,
		type: String as PropType<PageGenerator.FunctionButton['type']>,
		trigger: Object as PropType<PageGenerator.FunctionButton['trigger']>,
		title: String as PropType<PageGenerator.FunctionButton['title']>,
	},
	setup(props, ctx) {
		const onClick = () => {
			const { trigger } = props;

			switch (trigger?.type) {
				case 'jump':
					break;
				case 'dialog':
					break;
				case 'popconfirm':
					break;

				default:
					break;
			}
		};
		return () => {
			const { type, title, size } = props;
			return (
				<AtButton type={type} size={size} onClick={onClick}>
					{title}
				</AtButton>
			);
		};
	},
});
