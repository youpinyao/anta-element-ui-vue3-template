import Container from '@components/Layout/Container.vue';
import Block from '@components/Layout/Block.vue';
import { AtSchemaForm, AtSchemaFormTypes } from 'anta-element-ui-schema-form';
import {
	AtSchemaTable,
	AtSchemaTableTypes,
} from 'anta-element-ui-schema-table';
import { computed, ComputedRef, defineComponent, ref, toRaw } from 'vue';
import { useRequest } from '@/utils/hooks/useRequest';
import { adminApiMenuDel, adminApiMenuGet } from '@/apis/adminApiMenu';
import tableSchema from './tableSchema';
import searchSchema from './searchSchema';
import { AtButton, AtTitle } from 'anta-element-ui-components-next';
import Dialog from './Dialog/Index';
import { ArrayType } from 'anta-element-ui-components-next/src/utils/arrayType';
import { AdminApiMenusGetResult } from '@/models/menuApi/AdminApiMenusGetResult';

export default defineComponent({
	setup() {
		const handleAdd = () => {
			dialog.value?.show();
		};
		const handleEdit = (
			e: MouseEvent,
			row: ArrayType<AdminApiMenusGetResult['data']>
		) => {
			dialog.value?.show(row);
		};
		const handleDel = async (
			e: Event,
			row: ArrayType<AdminApiMenusGetResult['data']>
		) => {
			await adminApiMenuDel({
				menuId: row?.id as any,
			});
			run();
		};

		const searchSchemaRef = ref(searchSchema());
		const searchModelRef = ref<AtSchemaFormTypes.Model>({});
		const tableSchemaRef = ref(
			tableSchema({
				handleEdit,
				handleDel,
			})
		);
		const showSearchForm = computed(
			() => !!Object.keys(searchSchemaRef.value.properties).length
		);

		const { run, data } = useRequest(adminApiMenuGet);

		const tableDataSource: ComputedRef<AtSchemaTableTypes.DataSource> =
			computed(() => data.value?.data ?? []);

		const dialog = ref<InstanceType<typeof Dialog>>();

		return () => {
			return (
				<Container>
					{showSearchForm.value ? (
						<Block>
							<AtSchemaForm
								schema={searchSchemaRef.value}
								model={searchModelRef.value}
							/>
						</Block>
					) : null}
					<Block>
						<div class="at-table-header">
							<AtTitle border={false}>菜单</AtTitle>
							<div>
								<AtButton type="primary" onClick={handleAdd}>
									新增
								</AtButton>
							</div>
						</div>
						<AtSchemaTable
							schema={tableSchemaRef.value}
							dataSource={tableDataSource.value}
						/>
					</Block>
					<Dialog
						ref={dialog}
						onReload={() => {
							run();
						}}
					/>
				</Container>
			);
		};
	},
});
