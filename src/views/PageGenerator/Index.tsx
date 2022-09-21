import Container from '@components/Layout/Container.vue';
import Block from '@components/Layout/Block.vue';
import { AtSchemaForm, AtSchemaFormTypes } from 'anta-element-ui-schema-form';
import {
	AtSchemaTable,
	AtSchemaTableTypes,
} from 'anta-element-ui-schema-table';
import {
	computed,
	ComputedRef,
	defineComponent,
	ref,
	unref,
	toRaw,
	watch,
	reactive,
} from 'vue';
import { useRequest } from '@/utils/hooks/useRequest';
import tableSchema from './tableSchema';
import searchSchema from './searchSchema';
import {
	AtButton,
	AtMessage,
	AtPagination,
	AtTitle,
} from 'anta-element-ui-components-next';
import {
	adminApiPageTemplatesDel,
	adminApiPageTemplatesGet,
} from '@/apis/adminApiPageTemplates';
import { debounce } from 'throttle-debounce';
import { useRoute, useRouter } from 'vue-router';

import AtTableHeader from '@components/AtTableHeader.vue';
import AtSearchButtons from '@components/AtSearchButtons.vue';

export default defineComponent({
	name: 'PageGenerator',
	setup() {
		const router = useRouter();
		const { run, data, loading } = useRequest(adminApiPageTemplatesGet, {
			immediate: false,
		});

		const searchSchemaRef = ref(searchSchema());
		const searchModelRef = reactive<AtSchemaFormTypes.Model>({
			title: '',
		});
		const tableSchemaRef = computed(() => {
			const scheme = tableSchema({
				handleEdit,
				handleDel,
			});
			return {
				...scheme,
				props: {
					...scheme.props,
					loading: loading.value,
				},
			};
		});
		const showSearchForm = computed(
			() => !!Object.keys(searchSchemaRef.value.properties).length
		);

		const tableDataSource = computed<AtSchemaTableTypes.DataSource>(
			() => data.value?.data?.list ?? []
		);

		const total = computed(() => data.value?.data?.total);
		const pageSize = computed(() => data.value?.data?.pageSize);
		const page = computed(() => data.value?.data?.page);

		const skipSearch = ref(false);
		const handleSearch = () => {
			run(toRaw(unref(searchModelRef)));
		};
		const debounceDelay = 300;
		const handleDebounceSearch = debounce(debounceDelay, handleSearch);

		watch(
			() => JSON.stringify(searchModelRef),
			() => {
				skipSearch.value === false && handleDebounceSearch();
				skipSearch.value = false;
			},
			{
				immediate: true,
			}
		);

		const handleAdd = () => {
			router.push({
				name: 'PageGeneratorDetail',
				params: {
					id: 'add',
				},
			});
		};
		const handleEdit = (e: MouseEvent, row: any) => {
			router.push({
				name: 'PageGeneratorDetail',
				params: {
					id: row.id,
				},
			});
		};

		const handleDel = async (e: Event, row: any) => {
			await adminApiPageTemplatesDel({
				pageTemplateId: row?.id,
			});
			AtMessage.success('操作成功');
			handleSearch();
		};

		const handleCurrentChange = (current: number) => {
			searchModelRef.page = current;
		};
		const handleSizeChange = (size: number) => {
			searchModelRef.pageSize = size;
		};

		return () => {
			return (
				<Container>
					{showSearchForm.value ? (
						<Block>
							<AtSchemaForm
								schema={searchSchemaRef.value}
								model={searchModelRef}
							/>
							<AtSearchButtons>
								<AtButton
									type="primary"
									loading={loading.value}
									onClick={() => {
										handleSearch();
									}}
								>
									查询
								</AtButton>
								<AtButton
									loading={loading.value}
									onClick={() => {
										skipSearch.value = true;
										Object.keys(searchModelRef).forEach((key) => {
											searchModelRef[key] = undefined;
										});
										setTimeout(() => {
											skipSearch.value = false;
										}, debounceDelay + 50);
										handleSearch();
									}}
								>
									重置
								</AtButton>
							</AtSearchButtons>
						</Block>
					) : null}
					<Block>
						<AtTableHeader title="页面列表">
							<AtButton type="primary" onClick={handleAdd}>
								新增
							</AtButton>
						</AtTableHeader>

						<AtSchemaTable
							schema={tableSchemaRef.value}
							dataSource={tableDataSource.value}
						/>
						<AtPagination
							total={total.value ?? 0}
							currentPage={page.value ?? 1}
							pageSize={pageSize.value ?? 10}
							onUpdate:current-page={handleCurrentChange}
							onUpdate:page-size={handleSizeChange}
						></AtPagination>
					</Block>
				</Container>
			);
		};
	},
});
