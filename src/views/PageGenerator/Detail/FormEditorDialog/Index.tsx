import { AtButton, AtDialog } from 'anta-element-ui-components-next';

import { defineComponent, PropType, ref, toRaw, watch } from 'vue';
import clone from 'rfdc';
import FormEditor, { FormEditorModelItem } from '../FormEditor/Index';

export default defineComponent({
	props: {
		visible: Boolean,
		modelValue: Object as PropType<FormEditorModelItem[]>,
	},
	emits: {
		close: () => true,
		'update:modelValue': (items?: FormEditorModelItem[]) => true,
	},
	setup(props, ctx) {
		const items = ref<FormEditorModelItem[]>();
		const formEditor = ref<InstanceType<typeof FormEditor>>();

		watch(
			() => props.modelValue,
			() => {
				items.value = props.modelValue ?? [];
			}
		);
		return () => {
			return (
				<AtDialog
					appendToBody={true}
					closeOnClickModal={false}
					title="表单编辑"
					modelValue={props.visible}
					onUpdate:modelValue={(visible) => {
						ctx.emit('close');
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
											await formEditor.value?.form?.form?.validate();
											ctx.emit(
												'update:modelValue',
												clone()(toRaw(items.value))
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
					<FormEditor
						ref={formEditor}
						modelValue={items.value}
						onUpdate:modelValue={(its) => {
							items.value = its;
						}}
					/>
				</AtDialog>
			);
		};
	},
});
