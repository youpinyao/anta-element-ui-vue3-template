import { request } from '@/utils/axios';
import { getAxiosErrorMsg } from '@/utils/axios/msg';
import { AtSwitch } from 'anta-element-ui-components-next';
import { PropsType } from 'anta-element-ui-components-next/src/utils/propsType';
import { defineComponent, PropType, ref } from 'vue';
import { PageRenderer } from './typing';

export default defineComponent({
	props: {
		url: String,
		method: String as PropType<PageRenderer.Methods>,
		trueValue: {
			type: [String, Number, Boolean],
			default: () => true,
		},
		falseValue: {
			type: [String, Number, Boolean],
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
		const transformValue = (value: any) => {
			if (value == parseFloat(value)) {
				return parseFloat(value);
			}
			if (value === 'true') {
				return true;
			}
			if (value === 'false') {
				return false;
			}
			return value;
		};
		return () => {
			const trueValue = transformValue(props.trueValue);
			const falseValue = transformValue(props.falseValue);
			const checked = props.data?.[props.prop ?? ''] == trueValue;
			return (
				<AtSwitch
					modelValue={checked}
					loading={loading.value}
					onUpdate:modelValue={async (value) => {
						loading.value = true;
						const result = value ? trueValue : falseValue;
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
						} catch (error: any) {
							console.error(getAxiosErrorMsg(error));
						} finally {
							loading.value = false;
						}
					}}
				/>
			);
		};
	},
});
