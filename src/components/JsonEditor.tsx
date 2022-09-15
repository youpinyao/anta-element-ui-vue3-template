import { defineComponent, ref, watchEffect, watch, PropType } from 'vue';
import ace, { Ace } from 'ace-builds';

import 'ace-builds/webpack-resolver';

export type JsonType = Record<string, any> | any[];

export default defineComponent({
	props: {
		modelValue: Object as PropType<JsonType>,
	},
	emits: {
		'update:modelValue': (json: JsonType) => true,
		change: (json?: string) => true,
	},
	setup(props, ctx) {
		const el = ref<Element>();
		const editor = ref<Ace.Editor>();

		watch(el, () => {
			if (editor.value) {
				editor.value?.destroy();
				editor.value?.container.remove();
				editor.value = undefined;
			}
			if (el.value) {
				editor.value = ace.edit(el.value, {
					enableAutoIndent: true,
					highlightActiveLine: true,
					highlightSelectedWord: false,
					showPrintMargin: false,
					tabSize: 2,
				});
				editor.value.setTheme('ace/theme/monokai');
				editor.value?.session.setMode('ace/mode/json');
				editor.value?.setValue(JSON.stringify(props.modelValue, null, 2) ?? '');
				editor.value?.clearSelection();

				editor.value.on('change', () => {
					ctx.emit('change', editor.value?.getValue());
					try {
						const json = JSON.parse(editor.value?.getValue() ?? '');
						ctx.emit('update:modelValue', json);
					} catch (error) {
						// error
					}
				});
			}
		});

		watch(
			() => props.modelValue,
			() => {
				const str = JSON.stringify(props.modelValue, null, 2) ?? '';

				if (str !== editor.value?.getValue()) {
					editor.value?.setValue(str);
					editor.value?.clearSelection();
				}
			}
		);

		return () => {
			return (
				<div
					ref={el}
					style={{
						height: '500px',
					}}
				></div>
			);
		};
	},
});
