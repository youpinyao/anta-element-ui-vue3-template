import router from '@/router';
import { request } from '@/utils/axios';
import replaceStringParams from '@/utils/replaceStringParams';
import { AtButton, AtDialog } from 'anta-element-ui-components-next';
import { PropsType } from 'anta-element-ui-components-next/src/utils/propsType';
import { defineComponent, PropType, ref } from 'vue';
import ConfirmButton from '../ConfirmButton';
import DialogFooter from '../DialogFooter';
import FunctionButtonDialog from './FunctionButtonDialog';
import SchemaForm from './SchemaForm';
import { PageRenderer } from './typing';

export default defineComponent({
	props: {
		size: String as PropType<PropsType<typeof AtButton>['size']>,
		type: String as PropType<PageRenderer.FunctionButton['type']>,
		trigger: Object as PropType<PageRenderer.FunctionButton['trigger']>,
		title: String as PropType<PageRenderer.FunctionButton['title']>,
	},
	setup(props, ctx) {
		const dialogVisible = ref(false);
		const dialogConfig = ref<PageRenderer.FunctionButtonTriggerDialog>();
		const onClick = () => {
			const { trigger } = props;
			const data =
				typeof trigger?.data === 'function' ? trigger?.data?.() : trigger?.data;

			switch (trigger?.type) {
				case 'route':
					router.push(replaceStringParams(trigger.path, data));
					break;

				case 'link':
					window.open(replaceStringParams(trigger.url, data));
					break;
				case 'dialog':
					dialogConfig.value = trigger;
					dialogVisible.value = true;
					break;
				case 'popconfirm':
					break;

				default:
					break;
			}
		};
		const onConfirm = async () => {
			const { trigger } = props;
			const data =
				typeof trigger?.data === 'function' ? trigger?.data?.() : trigger?.data;

			switch (trigger?.type) {
				case 'route':
					break;
				case 'link':
					break;
				case 'dialog':
					break;
				case 'popconfirm':
					await request({
						url: replaceStringParams(trigger.url, data),
						method: trigger.method,
						data,
					});
					trigger.callback?.();
					break;
				default:
					break;
			}
		};
		return () => {
			const { type, title, size, trigger } = props;
			const button = (
				<AtButton type={type} size={size} onClick={onClick}>
					{title}
				</AtButton>
			);
			return [
				trigger?.type === 'popconfirm' ? (
					<ConfirmButton
						title={trigger.confirmProps?.title ?? '确认操作？'}
						onConfirm={onConfirm}
					>
						{button}
					</ConfirmButton>
				) : (
					button
				),
				<FunctionButtonDialog
					config={dialogConfig.value}
					visible={dialogVisible.value}
					onClose={() => {
						dialogVisible.value = false;
					}}
				/>,
			];
		};
	},
});
