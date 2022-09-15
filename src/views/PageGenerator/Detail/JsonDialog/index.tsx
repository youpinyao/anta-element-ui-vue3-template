import JsonEditor, { JsonType } from '@/components/JsonEditor';
import { AtButton, AtDialog } from 'anta-element-ui-components-next';

import { defineComponent, PropType, ref, watch } from 'vue';

export default defineComponent({
	props: {
		visible: Boolean,
		modeValue: Object as PropType<JsonType>,
	},
	emits: {
		close: () => true,
		'update:modelValue': (json?: JsonType) => true,
	},
	setup(props, ctx) {
		const json = ref<JsonType>();
		const valid = ref(true);

		watch(
			() => props.modeValue,
			() => {
				json.value = props.modeValue;
			}
		);
		return () => {
			return (
				<AtDialog
					title="JSON配置编辑"
					closeOnClickModal={false}
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
										disabled={!valid.value}
										onClick={() => {
											ctx.emit('update:modelValue', json.value);
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
					<JsonEditor
						modelValue={json.value}
						onChange={(str) => {
							try {
								JSON.parse(str ?? '');
								valid.value = true;
							} catch (error) {
								valid.value = false;
							}
						}}
						onUpdate:modelValue={(e) => {
							json.value = e;
						}}
					/>
				</AtDialog>
			);
		};
	},
});
