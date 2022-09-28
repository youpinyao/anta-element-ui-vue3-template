import { get, post } from '@/utils/axios';
import {
	AtButton,
	AtDialog,
	AtEmpty,
	AtLoading,
} from 'anta-element-ui-components-next';
import { AtSchemaForm, AtSchemaFormTypes } from 'anta-element-ui-schema-form';
import { defineComponent, reactive, ref, toRaw, watch, PropType } from 'vue';

import {
	ResourceDetail,
	ResourceItem,
} from 'anta-cli/lib/commands/swagger/generator/types';
import axios from 'axios';
import {
	pickTag,
	readSwaggerPage,
	ReadSwaggerPageResult,
} from './readSwaggerPage';
import { PageRenderer } from '@components/PageRenderer/typing';
import DialogFooter from '@/components/DialogFooter';
import { PropsType } from 'anta-element-ui-components-next/src/utils/propsType';

export default defineComponent({
	props: {
		buttonProps: {
			type: Object as PropType<PropsType<typeof AtButton>>,
		},
	},
	emits: {
		generate: (result: ReadSwaggerPageResult) => true,
	},
	setup(props, ctx) {
		const visible = ref(false);
		const baseUrl = 'https://admin-api-dev.atxapi.com';
		const resourceUrl = '/swagger-resources';

		const resourceOptions = ref<AtSchemaFormTypes.SelectOption[]>([]);
		const apiOptions = ref<AtSchemaFormTypes.SelectOption[]>([]);
		const formSchema = ref({
			properties: {
				resource: {
					component: 'select',
					type: String,
					options: resourceOptions,
					props: {
						placeholder: '请选择资源',
						filterable: true,
					},
				},
				hash: {
					component: 'tree-select',
					type: String,
					options: apiOptions,
					props: {
						placeholder: '请选择接口',
						filterable: true,
					},
				},
			},
		});
		const formModel = reactive<
			AtSchemaFormTypes.ModelTypes<typeof formSchema.value>
		>({});
		const loading = ref(false);
		const swaggerResult = ref<ReadSwaggerPageResult>();
		const apiConfigs = reactive<
			Record<
				string,
				Pick<
					ReadSwaggerPageResult,
					'url' | 'method' | 'title' | 'alias' | 'api' | 'hash'
				>
			>
		>({});

		const getApiResourceSelectOptions = async function () {
			loading.value = true;
			const options: AtSchemaFormTypes.SelectOption[] = [];
			try {
				const resources =
					(await axios.get<ResourceItem[]>(`${baseUrl}${resourceUrl}`)).data ??
					[];

				resources.forEach((item) => {
					options.push({
						label: item.name,
						value: item.url,
					});
				});
			} catch (error) {
				console.error(error);
			} finally {
				loading.value = false;
			}

			return options;
		};

		const getApiTreeSelectOptions = async function () {
			loading.value = true;
			const options: AtSchemaFormTypes.SelectOption[] = [];
			if (!formModel.resource) {
				console.error('please select resource');
				return [];
			}
			try {
				const resource =
					(await axios.get<ResourceDetail>(`${baseUrl}${formModel.resource}`))
						.data ?? [];

				Object.entries(resource.paths).forEach(([api, methods]) => {
					const option: AtSchemaFormTypes.SelectOption<{
						method?: PageRenderer.Methods;
						url?: string;
					}> = {
						label: api,
						value: api,
						children: [],
					};

					Object.entries(methods).forEach(([method, value]) => {
						const hash = `${resource?.basePath}/${value.tags[0]}/${value.operationId}`;
						const tag = `${value.tags.join('_')}_${api}_${method}`;
						const url = `${resource?.basePath}${api}`;
						const extra = {
							method: method.toUpperCase() as PageRenderer.Methods,
							url,
							api,
							title: value.summary,
							hash,
							alias: url.replace(/\//g, '.').replace(/^(\.)/g, ''),
						};
						option!.children!.push({
							label: `${api} ${method} ${value.summary}`,
							value: hash,
							...extra,
						});
						apiConfigs[hash] = extra;
						apiConfigs[tag] = extra;
					});

					options.push(option);
				});
			} catch (error) {
				console.error(error);
			} finally {
				loading.value = false;
			}

			return options;
		};

		watch(
			() => formModel.hash,
			async (hash) => {
				if (hash) {
					loading.value = true;
					try {
						const { params, result, pagination } = await readSwaggerPage(
							formModel.resource,
							hash
						);
						const apiConfig = apiConfigs[hash];
						const buttons: PageRenderer.FunctionButton[] = [];
						const post = apiConfigs[`${pickTag(hash)}_${apiConfig.api}_post`];
						const put = apiConfigs[`${pickTag(hash)}_${apiConfig.api}_put`];
						const del = apiConfigs[`${pickTag(hash)}_${apiConfig.api}_delete`];

						if (post) {
							const properties = (
								await readSwaggerPage(formModel.resource, post.hash ?? '')
							)?.params;
							delete properties.id;
							buttons.push({
								title: '新增',
								type: 'primary',
								trigger: {
									type: 'dialog',
									form: {
										url: post.url ?? '',
										method: post.method ?? 'POST',
										schema: {
											properties,
										},
									},
									dialogProps: {
										title: post.title,
									},
								},
							});
						}

						if (put || del) {
							result.push({
								prop: 'id',
								label: '操作',
								width: 140,
								buttons: [],
							});
						}
						if (put) {
							const properties = (
								await readSwaggerPage(formModel.resource, put.hash ?? '')
							)?.params;
							delete properties.id;
							result[result.length - 1].buttons?.push({
								title: '编辑',
								type: 'primary',
								trigger: {
									type: 'dialog',
									form: {
										url: put.url ?? '',
										method: put.method ?? 'PUT',
										schema: {
											properties,
										},
									},
									dialogProps: {
										title: put.title,
									},
								},
							});
						}
						if (del) {
							result[result.length - 1].buttons?.push({
								title: '删除',
								type: 'danger',
								trigger: {
									type: 'popconfirm',
									url: `${del.url?.replace(/{.*?}/g, '')}{id}`,
									method: del.method ?? 'DELETE',
									confirmProps: {
										title: '确认删除？',
									},
								},
							});
						}

						swaggerResult.value = {
							...apiConfig,
							params,
							result,
							buttons,
							pagination,
						};
					} catch (error) {
						console.error(error);
						formModel.hash = '';
					} finally {
						loading.value = false;
					}
				} else {
					swaggerResult.value = undefined;
				}
			}
		);
		watch(
			() => visible.value,
			async () => {
				if (visible.value === true) {
					resourceOptions.value = await getApiResourceSelectOptions();
					apiOptions.value = [];
					formModel.resource = '';
					formModel.hash = '';
				}
			}
		);

		watch(
			() => formModel.resource,
			async () => {
				if (!formModel.resource) return;
				apiOptions.value = await getApiTreeSelectOptions();
				formModel.hash = '';
			}
		);

		const handleCancel = () => {
			visible.value = false;
		};
		const handleSave = () => {
			swaggerResult.value && ctx.emit('generate', toRaw(swaggerResult.value));
			visible.value = false;
		};

		return () => {
			return [
				<AtButton
					{...props.buttonProps}
					onClick={() => {
						visible.value = true;
					}}
					type="primary"
				>
					Swagger
				</AtButton>,
				<AtDialog
					title="Swagger"
					closeOnClickModal={false}
					modelValue={visible.value}
					onUpdate:modelValue={(e) => {
						visible.value = e;
					}}
					appendToBody={true}
					vSlots={{
						footer() {
							return (
								<DialogFooter>
									<AtButton onClick={handleCancel} loading={loading.value}>
										取消
									</AtButton>
									<AtButton
										onClick={handleSave}
										loading={loading.value}
										type="primary"
										disabled={!swaggerResult.value}
									>
										生成
									</AtButton>
								</DialogFooter>
							);
						},
					}}
				>
					<AtLoading visible={loading.value}>
						<AtSchemaForm
							schema={formSchema.value as AtSchemaFormTypes.JSONSchema}
							model={formModel}
						/>
					</AtLoading>
				</AtDialog>,
			];
		};
	},
});
