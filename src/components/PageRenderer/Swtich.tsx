import { request } from '@/utils/axios';
import { AtSwitch } from 'anta-element-ui-components-next';
import { PropsType } from 'anta-element-ui-components-next/src/utils/propsType';
import { defineComponent, PropType, ref } from 'vue';
import { PageRenderer } from './typing';

export default defineComponent({
	props: {
		url: String,
		method: String as PropType<PageRenderer.Methods>,
		trueValue: {
			type: [String, Number, Boolean, Object],
			default: () => true,
		},
		falseValue: {
			type: [String, Number, Boolean, Object],
			default: () => false,
		},
		props: Object as PropType<PropsType<typeof AtSwitch>>,

		prop: String,
		data: Object as PropType<any>,
	},
	emits: {
		change: (result: string | number | boolean | {}) => true,
	},
	setup(props, ctx) {
		const loading = ref(false);
		return () => {
			const checked = props.data?.status === props.trueValue;
			return (
				<AtSwitch
					modelValue={checked}
					loading={loading.value}
					onUpdate:modelValue={async (value) => {
						loading.value = true;
						const result = value ? props.trueValue : props.falseValue;
						try {
							await request({
								url: props.url,
								method: props.method,
								data: {
									...props.data,
									[props.prop ?? '']: result,
								},
							});
							ctx.emit('change', result);
						} catch (error) {
							console.error(error);
						} finally {
							loading.value = false;
						}
					}}
				/>
			);
		};
	},
});
