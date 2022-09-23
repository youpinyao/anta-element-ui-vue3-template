import { AtPopconfirm } from 'anta-element-ui-components-next';
import { defineComponent, PropType, ref } from 'vue';

const ConfirmButton = defineComponent({
	props: {
		title: {
			type: String,
			required: true,
		},
		onConfirm: {
			type: Function as PropType<(e: Event) => Promise<any>>,
			required: true,
		},
	},
	setup(props, context) {
		const loading = ref(false);
		return () => {
			const { onConfirm } = props;
			return (
				<AtPopconfirm
					title={props.title}
					onConfirm={async (e) => {
						if (loading.value) {
							return;
						}
						loading.value = true;
						try {
							await onConfirm?.(e);
						} catch (error) {
							console.error(error);
						} finally {
							setTimeout(() => {
								loading.value = false;
							}, 100);
						}
					}}
					v-slots={{
						reference() {
							return context.slots?.default?.({ loading: loading.value });
						},
					}}
				/>
			);
		};
	},
});

export default ConfirmButton;
