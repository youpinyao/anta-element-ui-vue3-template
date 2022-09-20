import { AtButton, AtDialog } from 'anta-element-ui-components-next';
import { ArrayType } from 'anta-element-ui-components-next/src/utils/arrayType';

import { defineComponent, PropType, ref, toRaw, watch } from 'vue';
import clone from 'rfdc';
import { PageGenerator } from '../../typing';
import ButtonsEditor from '../ButtonsEditor/Index';

export default defineComponent({
	props: {
		visible: Boolean,
		modelValue: Object as PropType<PageGenerator.TableColumn['buttons']>,
	},
	emits: {
		close: () => true,
		'update:modelValue': (buttons?: PageGenerator.TableColumn['buttons']) =>
			true,
	},
	setup(props, ctx) {
		const buttons = ref<PageGenerator.TableColumn['buttons']>();
		const buttonsEditor = ref<InstanceType<typeof ButtonsEditor>>();

		watch(
			() => props.modelValue,
			() => {
				buttons.value = props.modelValue ?? [];
			}
		);
		return () => {
			return (
				<AtDialog
					appendToBody={true}
					closeOnClickModal={false}
					title="按钮编辑"
					modelValue={props.visible}
					onUpdate:modelValue={(visible) => {
						if (visible === false) {
							ctx.emit('close');
						}
					}}
					vSlots={{
						footer() {
							return (
								<span>
									<AtButton
										onClick={() => {
											ctx.emit('close');
										}}
									>
										取消
									</AtButton>
									<AtButton
										onClick={async () => {
											await buttonsEditor.value?.form?.form?.validate();
											ctx.emit(
												'update:modelValue',
												clone()(toRaw(buttons.value))
											);
											ctx.emit('close');
										}}
										type="primary"
									>
										保存
									</AtButton>
								</span>
							);
						},
					}}
				>
					<ButtonsEditor
						ref={buttonsEditor}
						modelValue={buttons.value}
						onUpdate:modelValue={(btns) => {
							buttons.value = btns;
						}}
					/>
				</AtDialog>
			);
		};
	},
});
