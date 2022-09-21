import { AtButton, AtDialog } from 'anta-element-ui-components-next';
import { PropsType } from 'anta-element-ui-components-next/src/utils/propsType';
import { defineComponent, PropType, ref } from 'vue';
import DialogFooter from '../DialogFooter';
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

			switch (trigger?.type) {
				case 'jump':
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
		const handleDialogCancel = () => {
			dialogVisible.value = false;
		};
		const handleDialogSave = () => {
			dialogVisible.value = false;
		};
		return () => {
			const { type, title, size } = props;
			return [
				<AtButton type={type} size={size} onClick={onClick}>
					{title}
				</AtButton>,
				<AtDialog
					closeOnClickModal={false}
					appendToBody={true}
					modelValue={dialogVisible.value}
					{...dialogConfig.value?.dialogProps}
					onUpdate:modelValue={(e) => {
						dialogVisible.value = false;
					}}
					vSlots={{
						footer() {
							return (
								<DialogFooter>
									<AtButton onClick={handleDialogCancel}>取消</AtButton>
									<AtButton onClick={handleDialogSave} type="primary">
										保存
									</AtButton>
								</DialogFooter>
							);
						},
					}}
				></AtDialog>,
			];
		};
	},
});
