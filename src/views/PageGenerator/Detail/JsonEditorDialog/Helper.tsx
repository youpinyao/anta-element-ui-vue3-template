import {
	AtCol,
	AtOption,
	AtRow,
	AtSelect,
} from 'anta-element-ui-components-next';
import { AtSchemaFormTypes, components } from 'anta-element-ui-schema-form';
import { defineComponent, ref, watch } from 'vue';
import * as documents from './components';

export default defineComponent({
	props: {
		value: {
			type: Object,
		},
	},
	setup(props, ctx) {
		const type = ref('form');
		const component = ref<AtSchemaFormTypes.Components | 'column'>('input');
		const transform = (str: string) => {
			const items = str.split('');
			let mark = false;

			if (str === 'switch') return 'onOff';

			return items
				.map((item) => {
					if (mark) {
						mark = false;
						return item.toUpperCase();
					}
					if (/-/g.test(item)) {
						mark = true;
						return '';
					}
					return item;
				})
				.join('') as keyof typeof documents;
		};
		watch(
			() => props.value,
			() => {
				if (components.includes((props.value as any)?.component)) {
					type.value = 'form';
					component.value = (props.value as any)?.component;
				} else {
					type.value = 'table';
					component.value = 'column';
				}
			},
			{
				immediate: true,
			}
		);

		watch(
			() => type.value,
			() => {
				if (type.value === 'table') {
					component.value = 'column';
				} else {
					component.value = 'input';
				}
			}
		);

		return () => {
			return (
				<AtRow gutter={10}>
					<AtCol span={type.value === 'table' ? 24 : 12}>
						<AtSelect
							modelValue={type.value}
							onUpdate:modelValue={(value) => {
								type.value = value;
							}}
							block
						>
							<AtOption value="form" label="表单"></AtOption>
							<AtOption value="table" label="表格"></AtOption>
						</AtSelect>
					</AtCol>
					<AtCol
						span={12}
						style={{
							display: type.value === 'form' ? '' : 'none',
						}}
					>
						<AtSelect
							filterable
							modelValue={component.value}
							onUpdate:modelValue={(value) => {
								component.value = value;
							}}
							block
						>
							{components
								.filter((item) => !['button', 'code-editor'].includes(item))
								.map((item) => {
									return <AtOption value={item} label={item}></AtOption>;
								})}
						</AtSelect>
					</AtCol>
					<AtCol span={24}>
						<div
							style={{
								whiteSpace: 'pre-wrap',
								backgroundColor: '#272822',
								color: '#ffffff',
								marginTop: '10px',
								padding: '10px',
								boxSizing: 'border-box',
								height: 'calc(500px - 42px)',
								overflow: 'auto',
							}}
						>
							{JSON.stringify(
								documents[transform(component.value)] || {},
								null,
								2
							)}
						</div>
					</AtCol>
				</AtRow>
			);
		};
	},
});
