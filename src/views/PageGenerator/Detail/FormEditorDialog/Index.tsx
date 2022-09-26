import { AtButton, AtDialog, AtLoading } from 'anta-element-ui-components-next';

import { defineComponent, nextTick, PropType, ref, toRaw, watch } from 'vue';
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
		const loading = ref(true);
		const items = ref<FormEditorModelItem[]>();
		const formEditor = ref<InstanceType<typeof FormEditor>>();

		watch(
			[() => props.visible, () => props.modelValue],
			() => {
				if (props.visible && props.modelValue) {
					setTimeout(
						() => {
							items.value = clone()(props.modelValue ?? []);
							nextTick(() => {
								loading.value = false;
							});
						},
						loading.value ? 300 : 50
					);
				}
			},
			{
				immediate: true,
			}
		);
		return () => {
			return (
				<AtDialog
					appendToBody={true}
					closeOnClickModal={false}
					title="表单编辑"
					width={1000}
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
					<AtLoading
						static={true}
						visible={loading.value}
						style={{ padding: '50px 0', display: loading.value ? '' : 'none' }}
					></AtLoading>
					<div
						style={{
							display: loading.value ? 'none' : '',
						}}
					>
						<FormEditor
							ref={formEditor}
							modelValue={items.value}
							onUpdate:modelValue={(its) => {
								items.value = its;
							}}
						/>
					</div>
				</AtDialog>
			);
		};
	},
});
