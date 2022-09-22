import { request } from '@/utils/axios';
import { getAxiosMsg } from '@/utils/axios/msg';
import replaceStringParams from '@/utils/replaceStringParams';
import { AtButton, AtDialog, AtMessage } from 'anta-element-ui-components-next';
import { AtSchemaFormTypes } from 'anta-element-ui-schema-form';
import { defineComponent, PropType, ref, reactive, watch, toRaw } from 'vue';
import DialogFooter from '../DialogFooter';
import SchemaForm from './SchemaForm';
import { PageRenderer } from './typing';

export default defineComponent({
	props: {
		visible: {
			type: Boolean,
		},
		config: {
			type: Object as PropType<PageRenderer.FunctionButtonTriggerDialog>,
		},
	},
	emits: {
		close: () => true,
	},
	setup(props, ctx) {
		const model = reactive<AtSchemaFormTypes.Model>({});
		const loading = ref(false);
		const handleDialogCancel = () => {
			ctx.emit('close');
		};
		const handleDialogSave = async () => {
			loading.value = true;
			try {
				const result = await request<any>({
					url: replaceStringParams(props.config?.form?.url, toRaw(model)),
					method: props.config?.form.method,
					data: toRaw(model),
				});
				AtMessage.success(getAxiosMsg(result) || '操作成功');
				props.config?.callback?.();
				ctx.emit('close');
			} catch (error) {
				console.error(error);
			} finally {
				loading.value = false;
			}
		};

		watch(
			() => props.visible,
			(visible) => {
				if (visible === true) {
					if (props.config?.form.dataUrl) {
						// get data from url
						loading.value = true;
						request({
							url: replaceStringParams(
								props.config?.form?.dataUrl,
								typeof props.config?.data === 'function'
									? props.config?.data?.()
									: props.config?.data
							),
							method: props.config?.form?.dataMethod,
						})
							.then((result) => {
								Object.assign(model, result.data.data ?? {});
							})
							.finally(() => {
								loading.value = false;
							});
					} else if (props.config?.data) {
						Object.assign(
							model,
							typeof props.config?.data === 'function'
								? props.config?.data?.()
								: props.config?.data
						);
					} else {
						Object.keys(model).forEach((key) => {
							model[key] = undefined;
						});
					}
				}
			}
		);
		return () => {
			return (
				<AtDialog
					closeOnClickModal={false}
					appendToBody={true}
					modelValue={props.visible}
					{...props.config?.dialogProps}
					onUpdate:modelValue={() => {
						ctx.emit('close');
					}}
					vSlots={{
						footer() {
							return (
								<DialogFooter>
									<AtButton
										onClick={handleDialogCancel}
										loading={loading.value}
										style={{
											display:
												props.config?.cancelText === false ? 'none' : 'non',
										}}
									>
										{props.config?.cancelText || '取消'}
									</AtButton>
									<AtButton
										onClick={handleDialogSave}
										loading={loading.value}
										type="primary"
										style={{
											display: props.config?.okText === false ? 'none' : 'non',
										}}
									>
										{props.config?.okText || '保存'}
									</AtButton>
								</DialogFooter>
							);
						},
					}}
				>
					{props.config?.form ? (
						<SchemaForm schema={props.config?.form.schema} model={model} />
					) : null}
				</AtDialog>
			);
		};
	},
});
