import { AtButton } from 'anta-element-ui-components-next';
import { AtSchemaForm } from 'anta-element-ui-schema-form';
import { defineComponent, PropType } from 'vue';
import Block from '@components/Layout/Block.vue';
import Placeholder from './Placeholder.vue';
import { PageGenerator } from '../typing';

export default defineComponent({
	props: {
		schema: {
			type: Object as PropType<
				NonNullable<PageGenerator.JSONSchema['search']>['form']
			>,
		},
		resetButton: Boolean as PropType<
			NonNullable<PageGenerator.JSONSchema['search']>['resetButton']
		>,
		searchButton: Boolean as PropType<
			NonNullable<PageGenerator.JSONSchema['search']>['searchButton']
		>,
		model: Object,
	},
	setup(props, ctx) {
		return () => {
			const { schema, searchButton, resetButton, model } = props;
			const formSchema = (schema as any) || {
				properties: {},
			};

			return [
				<AtSchemaForm schema={formSchema} model={model ?? {}} />,
				<div class="at-search-button">
					<AtButton
						style={{
							display: searchButton ? undefined : 'none',
						}}
						type="primary"
					>
						查询
					</AtButton>
					<AtButton
						style={{
							display: resetButton ? undefined : 'none',
						}}
					>
						重置
					</AtButton>
				</div>,
			];
		};
	},
});
