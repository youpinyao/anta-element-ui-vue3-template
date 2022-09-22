import { defineComponent, PropType } from 'vue';
import AtTableHeader from '@components/AtTableHeader.vue';
import FunctionButton from '@/components/PageRenderer/FunctionButton';
import { PageRenderer } from '@/components/PageRenderer/typing';
import Table from './Table';

export default defineComponent({
	props: {
		title: {
			type: String as PropType<PageRenderer.JSONSchema['title']>,
		},
		buttons: {
			type: Array as PropType<PageRenderer.JSONSchema['buttons']>,
		},
		table: {
			type: Object as PropType<InstanceType<typeof Table>>,
		},
	},
	emits: {
		functionButtonCallback: () => true,
	},
	setup(props, ctx) {
		return () => {
			const { title, buttons } = props;
			if (!title && !buttons?.length) {
				return null;
			}
			return (
				<AtTableHeader title={title}>
					{(buttons ?? []).map((button) => {
						return (
							<FunctionButton
								{...button}
								trigger={{
									...button.trigger,
									data: () => {
										return {
											...button.trigger.data,
											selectionIds: props.table?.table?.table
												?.getSelectionRows()
												?.map((item: any) => item.id),
										};
									},
									callback() {
										button.trigger.callback?.();
										ctx.emit('functionButtonCallback');
									},
								}}
							/>
						);
					})}
				</AtTableHeader>
			);
		};
	},
});
