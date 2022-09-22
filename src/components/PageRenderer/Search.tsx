import { AtButton } from 'anta-element-ui-components-next';
import { AtSchemaForm } from 'anta-element-ui-schema-form';
import { defineComponent, PropType } from 'vue';
import AtSearchButtons from '@components/AtSearchButtons.vue';
import { PageRenderer } from '@/components/PageRenderer/typing';

export default defineComponent({
	props: {
		schema: {
			type: Object as PropType<NonNullable<PageRenderer.JSONSchema['search']>>,
		},
		model: Object,
		loading: Boolean,
	},
	emits: {
		reset: () => true,
		search: () => true,
	},
	setup(props, ctx) {
		return () => {
			const { schema, model } = props;
			const { searchButton = false, resetButton = false } = schema ?? {};
			const formSchema = schema?.form || {
				properties: {},
			};

			return [
				<AtSchemaForm schema={formSchema} model={model ?? {}} />,

				<AtSearchButtons>
					<AtButton
						loading={props.loading}
						style={{
							display: searchButton ? undefined : 'none',
						}}
						type="primary"
						onClick={() => {
							ctx.emit('search');
						}}
					>
						查询
					</AtButton>
					<AtButton
						loading={props.loading}
						style={{
							display: resetButton ? undefined : 'none',
						}}
						onClick={() => {
							ctx.emit('reset');
						}}
					>
						重置
					</AtButton>
				</AtSearchButtons>,
			];
		};
	},
});
