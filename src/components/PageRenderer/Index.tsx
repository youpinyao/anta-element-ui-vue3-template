import { AdminApiPageGeneratorDetailGetResult } from '@/apis/adminApiPageTemplates';
import {
	computed,
	defineComponent,
	PropType,
	reactive,
	ref,
	toRaw,
	watch,
} from 'vue';
import Block from '@components/Layout/Block.vue';
import Container from '@components/Layout/Container.vue';

import Search from './Search';
import Table from './Table';
import TableHeader from './TableHeader';
import { useRequest } from '@/utils/hooks/useRequest';
import { request } from '@axios';
import { PageRenderer } from '@/components/PageRenderer/typing';
import { AtLoading, AtPagination } from 'anta-element-ui-components-next';
import { PropsType } from 'anta-element-ui-components-next/src/utils/propsType';
import { debounce } from 'throttle-debounce';

export default defineComponent({
	name: 'PageRenderer',
	props: {
		config: {
			type: Object as PropType<AdminApiPageGeneratorDetailGetResult>,
			required: true,
		},
	},
	setup(props, ctx) {
		const table = ref<InstanceType<typeof Table>>();
		const flatSort = (sort: Record<string, any> = {}) => {
			return (
				Object.entries(sort)
					.map((item) => `${item[0]}|${item[1]}`)
					.join(',') || undefined
			);
		};
		const searchModel = reactive<Record<string, any>>({
			sort: flatSort(props.config.schema?.table?.schema?.props?.defaultSort),
			...Object.fromEntries(
				Object.entries(props.config.schema?.search?.form?.properties ?? {})
					.filter(([field, item]) => (item as any).defaultValue !== undefined)
					.map(([field, item]) => {
						return [field, (item as any).defaultValue];
					})
			),
		});
		const hasTable = computed(
			() => !!props.config.schema?.table?.schema?.columns?.length
		);
		const hasSearch = computed(
			() =>
				!!Object.keys(props.config.schema?.search?.form?.properties ?? {})
					.length
		);
		const tableSchema = computed(() => {
			return {
				...props.config.schema?.table,
				schema: {
					...props.config.schema?.table?.schema,
					props: {
						...props.config.schema?.table?.schema?.props,
						loading: loading.value,
					},
				},
			} as PageRenderer.JSONSchema['table'];
		});
		const dataSource = computed(() => {
			return props.config.schema?.pagination
				? data.value?.data.list ?? []
				: data.value?.data ?? [];
		});
		const { data, run, loading } = useRequest(
			(params: any) =>
				request<any>({
					url: props.config.schema?.table?.url,
					method: props.config.schema?.table?.method,
					data: params,
				}),
			{
				immediate: false,
			}
		);
		const pagination = computed<PropsType<typeof AtPagination>>(() => {
			return {
				total: data.value?.data?.total ?? 0,
			};
		});
		const handleSearch = async () => {
			const data = await run(toRaw(searchModel));

			if (props.config.schema?.pagination) {
				searchModel.page = data.data.data.page;
				searchModel.pageSize = data.data.data.pageSize;
			}
		};
		const handleCurrentChange = (page: number) => {
			searchModel.page = page;
			handleSearch();
		};
		const handleSizeChange = (pageSize: number) => {
			searchModel.pageSize = pageSize;
			handleSearch();
		};
		const onSortChange = (sort: any) => {
			searchModel.sort = flatSort(sort);
			handleSearch();
		};
		const skipSearch = ref(false);
		const debounceDelay = 300;
		const handleDebounceSearch = debounce(debounceDelay, handleSearch);

		watch(
			() => {
				const params = {
					...searchModel,
				};
				delete params.page;
				delete params.pageSize;
				delete params.sort;
				return JSON.stringify(params);
			},
			() => {
				skipSearch.value === false && handleDebounceSearch();
				skipSearch.value = false;
			},
			{
				immediate: true,
			}
		);

		return () => {
			const { config } = props;
			const searchStyle = {
				display: hasSearch.value ? '' : 'none',
			};
			const tableStyle = {
				display: hasTable.value ? '' : 'none',
			};

			return [
				<Container>
					<Block style={searchStyle}>
						<Search
							schema={config.schema?.search}
							model={searchModel}
							loading={loading.value}
							onSearch={() => {
								handleSearch();
							}}
							onReset={() => {
								skipSearch.value = true;
								Object.keys(searchModel).forEach((key) => {
									searchModel[key] = undefined;
								});
								setTimeout(() => {
									skipSearch.value = false;
								}, debounceDelay + 50);
								handleSearch();
							}}
						/>
					</Block>
					<Block style={tableStyle}>
						<AtLoading visible={loading.value && dataSource.value.length !== 0}>
							<TableHeader
								table={table.value}
								title={config.schema?.title}
								buttons={config.schema?.buttons}
								onFunctionButtonCallback={handleSearch}
							/>
							<Table
								ref={table}
								onSortChange={onSortChange}
								schema={tableSchema.value}
								dataSource={dataSource.value}
								onFunctionButtonCallback={handleSearch}
							/>
							{config.schema?.pagination ? (
								<AtPagination
									total={pagination.value.total}
									currentPage={searchModel.page ?? 1}
									pageSize={searchModel.pageSize ?? 10}
									pageSizes={[10, 15, 20, 30, 40, 50]}
									onUpdate:current-page={handleCurrentChange}
									onUpdate:page-size={handleSizeChange}
								></AtPagination>
							) : null}
						</AtLoading>
					</Block>
				</Container>,
			];
		};
	},
});
