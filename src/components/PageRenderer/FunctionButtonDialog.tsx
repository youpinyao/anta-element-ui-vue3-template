import { request } from '@/utils/axios';
import { getAxiosMsg } from '@/utils/axios/msg';
import replaceStringParams from '@/utils/replaceStringParams';
import {
	AtButton,
	AtDialog,
	AtLoading,
	AtMessage,
} from 'anta-element-ui-components-next';
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
		const timer = ref();
		const dialogLoading = ref(true);
		const handleClose = () => {
			ctx.emit('close');
		};
		const handleDialogCancel = () => {
			handleClose();
			clearTimeout(timer.value);
			timer.value = setTimeout(() => {
				dialogLoading.value = true;
			}, 300);
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
				handleClose();
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
					clearTimeout(timer.value);
					timer.value = setTimeout(() => {
						dialogLoading.value = false;
					}, 300);

					// 清空
					Object.keys(model).forEach((key) => {
						model[key] = undefined;
					});

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
					}
				}
			}
		);
		return () => {
			return (
				<AtDialog
					closeOnClickModal={false}
					appendToBody={true}
					destroyOnClose={true}
					modelValue={props.visible}
					{...props.config?.dialogProps}
					onUpdate:modelValue={() => {
						handleClose();
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
					{
						<AtLoading
							static
							visible={dialogLoading.value}
							style={{
								padding: '50px 0',
								display: dialogLoading.value ? '' : 'none',
							}}
						></AtLoading>
					}
					{props.config?.form && dialogLoading.value === false ? (
						<SchemaForm schema={props.config?.form.schema} model={model} />
					) : null}
				</AtDialog>
			);
		};
	},
});
