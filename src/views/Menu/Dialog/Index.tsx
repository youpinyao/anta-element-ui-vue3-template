import { adminApiMenuPost, adminApiMenuPut } from '@/apis/adminApiMenu';
import { AdminApiMenusGetResult } from '@/models/menuApi/AdminApiMenusGetResult';
import { AtButton, AtDialog } from 'anta-element-ui-components-next';
import { ArrayType } from 'anta-element-ui-components-next/src/utils/arrayType';
import { AtSchemaForm } from 'anta-element-ui-schema-form';
import { defineComponent, ref, toRaw, unref } from 'vue';
import { formSchema } from './schema';

const dialog = defineComponent({
	emits: ['reload'],
	render() {
		const {
			formModelRef,
			formSchemaRef,
			isEdit,
			handleSave,
			handleCancel,
			loading,
			visible,
		} = this;

		return (
			<AtDialog
				title={`${isEdit ? '编辑' : '新增'}菜单`}
				modelValue={visible}
				destroyOnClose={true}
				onClose={() => {
					handleCancel();
				}}
				v-slots={{
					footer() {
						return (
							<span class="dialog-footer">
								<AtButton onClick={handleCancel} loading={loading}>
									取消
								</AtButton>
								<AtButton onClick={handleSave} loading={loading} type="primary">
									保存
								</AtButton>
							</span>
						);
					},
				}}
			>
				<AtSchemaForm
					ref="formRef"
					schema={formSchemaRef}
					model={formModelRef}
				/>
			</AtDialog>
		);
	},
	setup(props, context) {
		const formRef = ref<InstanceType<typeof AtSchemaForm>>();
		const visible = ref(false);
		const formSchemaRef = ref(formSchema());
		const formModelRef = ref({});
		const loading = ref(false);
		const isEdit = ref(false);

		const handleSave = () => {
			formRef.value?.form?.validate(async (valid) => {
				if (valid) {
					// console.log('submit!', toRaw(unref(formModelRef)));
					loading.value = true;
					try {
						if (isEdit.value) {
							await adminApiMenuPut(toRaw(unref(formModelRef)));
						} else {
							await adminApiMenuPost(toRaw(unref(formModelRef)));
						}
						visible.value = false;
						context.emit('reload');
					} catch (error) {
						console.error(error);
					} finally {
						loading.value = false;
					}
				} else {
					console.log('validate error');
					return false;
				}
			});
		};
		const handleCancel = () => {
			visible.value = false;
		};

		return {
			formRef,
			formSchemaRef,
			formModelRef,
			visible,
			handleCancel,
			handleSave,
			isEdit,
			loading,
			show: (row?: ArrayType<AdminApiMenusGetResult['data']>) => {
				if (row) {
					formModelRef.value = { ...row };
					isEdit.value = true;
				} else {
					formModelRef.value = {};
					isEdit.value = false;
				}
				visible.value = true;
			},
		};
	},
});

export default dialog;
