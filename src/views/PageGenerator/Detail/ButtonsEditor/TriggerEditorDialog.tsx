import JsonEditor, { JsonType } from '@/components/JsonEditor';
import { AtButton, AtDialog } from 'anta-element-ui-components-next';

import { defineComponent, PropType, ref, watch } from 'vue';
import { PageGenerator } from '../../typing';

export default defineComponent({
	props: {
		visible: Boolean,
		modelValue: Object as PropType<PageGenerator.FunctionButton['trigger']>,
	},
	emits: {
		close: () => true,
		'update:modelValue': (trigger?: PageGenerator.FunctionButton['trigger']) =>
			true,
	},
	setup(props, ctx) {
		const trigger = ref<PageGenerator.FunctionButton['trigger']>();

		watch(
			() => props.modelValue,
			() => {
				trigger.value = props.modelValue;
			}
		);
		return () => {
			return (
				<AtDialog
					width={1000}
					appendToBody={true}
					closeOnClickModal={false}
					title="JSON配置编辑"
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
										onClick={() => {
											ctx.emit('update:modelValue', trigger.value);
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
				></AtDialog>
			);
		};
	},
});
