import { AtCodeEditor } from 'anta-element-ui-components-next';
import { defineComponent, ref, watchEffect, watch, PropType } from 'vue';

import 'ace-builds/src-noconflict/ext-language_tools.js';

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
		const code = ref<string>();
		const editor = ref<InstanceType<typeof AtCodeEditor>>();

		const onChange = (e: string) => {
			code.value = e;
			ctx.emit('change', e);
			try {
				const json = JSON.parse(e ?? '');
				ctx.emit('update:modelValue', json);
			} catch (error) {
				// error
			}
		};

		watch(
			() => props.modelValue,
			() => {
				const str = JSON.stringify(props.modelValue, null, 2) ?? '';

				if (str !== code.value) {
					code.value = str;
				}
			},
			{
				immediate: true,
			}
		);

		watch(editor, () => {
			editor.value?.editor?.setOptions({
				enableBasicAutocompletion: true,
				enableSnippets: true,
				enableLiveAutocompletion: true,
			});
			// 自定义自动补全
			// https://blog.csdn.net/qq_38950073/article/details/125855637
			// editor.value?.editor?.completers
		});

		return () => {
			return (
				<AtCodeEditor
					height={500}
					modelValue={code.value}
					onUpdate:modelValue={onChange}
					mode="ace/mode/json"
					ref={editor}
				/>
			);
		};
	},
});
