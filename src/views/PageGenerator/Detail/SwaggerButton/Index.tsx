import { get, post } from '@/utils/axios';
import {
	AtButton,
	AtDialog,
	AtEmpty,
	AtLoading,
} from 'anta-element-ui-components-next';
import { AtSchemaForm, AtSchemaFormTypes } from 'anta-element-ui-schema-form';
import { defineComponent, reactive, ref, toRaw, watch } from 'vue';

import { Resource } from 'anta-cli/lib/commands/swagger/generator/types';
import axios from 'axios';
import {
	pickTag,
	readSwaggerPage,
	ReadSwaggerPageResult,
} from './readSwaggerPage';
import { PageRenderer } from '@components/PageRenderer/typing';
import DialogFooter from '@/components/DialogFooter';

export default defineComponent({
	emits: {
		generate: (result: ReadSwaggerPageResult) => true,
	},
	setup(props, ctx) {
		const visible = ref(false);
		const resourceUrl = 'https://admin-api-dev.atxapi.com/admin/v2/api-docs';
		const resource = ref<Resource>();
		const formModel = reactive<Record<string, any>>({});
		const loading = ref(false);
		const swaggerResult = ref<ReadSwaggerPageResult>();
		const apiOptions = ref<AtSchemaFormTypes.SelectOption[]>([]);
		const apiConfigs = reactive<
			Record<
				string,
				Pick<ReadSwaggerPageResult, 'url' | 'method' | 'title' | 'api' | 'hash'>
			>
		>({});

		const getApiTreeSelectOptions = async function () {
			loading.value = true;
			const options: AtSchemaFormTypes.SelectOption[] = [];
			try {
				resource.value = (await axios.get<Resource>(resourceUrl)).data ?? [];

				Object.entries(resource.value.paths).forEach(([api, methods]) => {
					const option: AtSchemaFormTypes.SelectOption<{
						method?: PageRenderer.Methods;
						url?: string;
					}> = {
						label: api,
						value: api,
						children: [],
					};

					Object.entries(methods).forEach(([method, value]) => {
						const hash = `${resource.value?.basePath}/${value.tags[0]}/${value.operationId}`;
						const tag = `${value.tags.join('_')}_${method}`;
						const extra = {
							method: method.toUpperCase() as PageRenderer.Methods,
							url: `${resource.value?.basePath}${api}`,
							api,
							title: value.summary,
							hash,
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

		const formSchema = ref<AtSchemaFormTypes.JSONSchema>({
			properties: {
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
		watch(
			() => formModel.hash,
			async (hash) => {
				if (hash) {
					loading.value = true;
					try {
						const { params, result, pagination } = await readSwaggerPage(hash);
						const buttons: PageRenderer.FunctionButton[] = [];
						const post = apiConfigs[`${pickTag(hash)}_post`];
						const put = apiConfigs[`${pickTag(hash)}_put`];
						const del = apiConfigs[`${pickTag(hash)}_delete`];

						if (post) {
							buttons.push({
								title: '新增',
								type: 'primary',
								trigger: {
									type: 'dialog',
									form: {
										url: post.url ?? '',
										method: post.method ?? 'POST',
										schema: {
											properties: (await readSwaggerPage(post.hash ?? ''))
												?.params,
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
							result[result.length - 1].buttons?.push({
								title: '编辑',
								type: 'primary',
								trigger: {
									type: 'dialog',
									form: {
										url: put.url ?? '',
										method: put.method ?? 'PUT',
										schema: {
											properties: (await readSwaggerPage(put.hash ?? ''))
												?.params,
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
									url: `${put.url}/{id}`,
									method: put.method ?? 'DELETE',
									confirmProps: {
										title: '确认删除？',
									},
								},
							});
						}

						swaggerResult.value = {
							...apiConfigs[hash],
							params,
							result,
							buttons,
							pagination,
						};
					} catch (error) {
						console.error(error);
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
					apiOptions.value = await getApiTreeSelectOptions();
				}
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
						<AtSchemaForm schema={formSchema.value} model={formModel} />
					</AtLoading>
				</AtDialog>,
			];
		};
	},
});
