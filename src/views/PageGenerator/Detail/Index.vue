<template>
	<Container>
		<div
			class="header"
			:class="{
				'header--collapse': menuStore.collapse,
			}"
		>
			<div>
				<InputEditor
					v-show="!loading"
					:content="pageConfig.title"
					placeholder="请输入页面标题"
					@change="handleChangePageTitle"
				/>
				<InputEditor
					v-show="!loading"
					:content="pageConfig.alias"
					placeholder="请输入页面别名"
					@change="handleChangePageAlias"
				/>
			</div>
			<div class="header__buttons">
				<AtButton :loading="loading" @click="handleBack">返回</AtButton>
				<SwaggerButton :buttonProps="{ loading }" @generate="handleGenerate" />
				<AtButton :loading="loading" type="primary" @click="handlePreview"
					>预览</AtButton
				>
				<AtButton
					:loading="loading || saveLoading"
					type="primary"
					@click="handleSave"
					>保存</AtButton
				>
			</div>
		</div>

		<div class="header-space"></div>

		<Block v-if="loading">
			<AtLoading :visible="loading" static></AtLoading>
		</Block>

		<Placeholder
			v-if="!hasSearch && !loading"
			@click="handleSearchEdit"
			placeholder="添加搜索条件"
		/>

		<Block v-show="hasSearch">
			<EditArea @edit="handleSearchEdit">
				<Search :schema="pageConfig.schema?.search" :model="searchModel" />
			</EditArea>
		</Block>

		<Placeholder
			v-if="!hasTable && !loading"
			@click="handleTableEdit"
			placeholder="添加表格"
		/>

		<Block v-show="hasTable">
			<Placeholder
				v-if="!pageConfig.schema?.title && !pageConfig.schema?.buttons?.length"
				placeholder="添加标题"
				@click="handleTableHeaderEdit"
			/>

			<EditArea @click="handleTableHeaderEdit">
				<TableHeader
					:title="pageConfig.schema?.title"
					:buttons="pageConfig.schema?.buttons"
				/>
			</EditArea>
			<EditArea @edit="handleTableEdit">
				<Table
					v-if="pageConfig.schema?.table"
					:schema="pageConfig.schema?.table"
					:dataSource="dataSource"
				></Table>
				<AtPagination
					:total="100"
					v-show="pageConfig.schema?.pagination"
				></AtPagination>
			</EditArea>
		</Block>
	</Container>
	<SearchEditorDialog
		:visible="showSearchEditor"
		:schema="pageConfig.schema?.search"
		@close="handleCloseSearchEdit"
		@change="handleSaveSearchEdit"
	/>
	<TableHeaderEditorDialog
		:visible="showTableHeaderEditor"
		:schema="{
			title: pageConfig.schema?.title,
			buttons: pageConfig.schema?.buttons,
		}"
		@close="handleCloseTableHeaderEdit"
		@change="handleSaveTableHeaderEdit"
	/>
	<TableEditorDialog
		:visible="showTableEditor"
		:schema="{
			pagination: pageConfig.schema?.pagination,
			table: pageConfig.schema?.table,
		}"
		@close="handleCloseTableEdit"
		@change="handleSaveTableEdit"
	/>
</template>

<script lang="ts" setup>
import {
	adminApiPageGeneratorDetailGet,
	adminApiPageTemplatesPut,
	adminApiPageTemplatesPost,
	AdminApiPageGeneratorDetailGetResult,
} from '@/apis/adminApiPageTemplates';
import { useRequest } from '@/utils/hooks/useRequest';
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Container from '@components/Layout/Container.vue';
import Block from '@components/Layout/Block.vue';
import {
	AtButton,
	AtLoading,
	AtMessage,
	AtPagination,
} from 'anta-element-ui-components-next';
import { AtSchemaTableTypes } from 'anta-element-ui-schema-table';
import { useMenuStore } from '@/store/menu';

import InputEditor from './InputEditor.vue';
import TableHeader from '@components/PageRenderer/TableHeader';
import Search from '@components/PageRenderer/Search';
import Table from '@components/PageRenderer/Table';
import Placeholder from './Placeholder.vue';
import SwaggerButton from './SwaggerButton/Index';
import { swaggerGeneratePageConfig } from './SwaggerButton/swaggerGeneratePageConfig';
import { ReadSwaggerPageResult } from './SwaggerButton/readSwaggerPage';
import EditArea from './EditArea/Index.vue';
import { generateDataSource } from './generateDataSource';
import SearchEditorDialog from './SearchEditorDialog/Index';
import TableHeaderEditorDialog from './TableHeaderEditorDialog/Index';
import TableEditorDialog from './TableEditorDialog/Index';
import { PageRenderer } from '@components/PageRenderer/typing';

const router = useRouter();
const menuStore = useMenuStore();
const route = useRoute();

const pageConfig = reactive<AdminApiPageGeneratorDetailGetResult>({
	schema: {
		search: {
			resetButton: true,
			searchButton: true,
		},
	},
});
const saveLoading = ref(false);
const { run, loading } = useRequest(adminApiPageGeneratorDetailGet, {
	immediate: false,
});
const searchModel = reactive({});
const hasSearch = computed(
	() => !!Object.keys(pageConfig.schema?.search?.form?.properties ?? {}).length
);
const hasTable = computed(
	() => !!pageConfig.schema?.table?.schema?.columns?.length
);
const dataSource = computed<any[]>(() =>
	generateDataSource(
		pageConfig.schema?.table?.schema
			?.columns as AtSchemaTableTypes.JSONSchema['columns'],
		pageConfig.schema?.table?.tree
	)
);

const showSearchEditor = ref(false);
const showTableHeaderEditor = ref(false);
const showTableEditor = ref(false);

if (route.params.id && route.params.id !== 'add') {
	run({
		id: route.params.id as string,
	}).then(({ data }) => {
		Object.assign(pageConfig, data.data);
	});
} else {
	loading.value = false;
}

const handleGenerate = (result: ReadSwaggerPageResult) => {
	pageConfig.title = result.title;
	pageConfig.alias = result.alias;
	pageConfig.schema = {
		...pageConfig.schema,
		...swaggerGeneratePageConfig(result),
	};
};

const handleChangePageTitle = (title: string) => {
	pageConfig.title = title;
};

const handleChangePageAlias = (alias: string) => {
	pageConfig.alias = alias;
};

const handleBack = () => {
	router.back();
};
const handleSave = async () => {
	// console.log(pageConfig);
	// console.log(JSON.stringify(pageConfig));

	saveLoading.value = true;
	try {
		if (pageConfig.id) {
			await adminApiPageTemplatesPut({
				...pageConfig,
				status: 0,
				schema: JSON.stringify(pageConfig.schema),
			});
		} else {
			const result = await adminApiPageTemplatesPost({
				...pageConfig,
				status: 0,
				schema: JSON.stringify(pageConfig.schema),
			});
			pageConfig.id = result.data.data;
		}
		AtMessage.success('保存成功');
	} catch (error) {
		console.error(error);
	} finally {
		saveLoading.value = false;
	}
};
const handleSearchEdit = () => {
	showSearchEditor.value = true;
};
const handleCloseSearchEdit = () => {
	showSearchEditor.value = false;
};
const handleSaveSearchEdit = (model: PageRenderer.JSONSchema['search']) => {
	if (!pageConfig.schema) {
		pageConfig.schema = {};
	}
	pageConfig.schema.search = model;
};

const handleTableHeaderEdit = () => {
	showTableHeaderEditor.value = true;
};
const handleCloseTableHeaderEdit = () => {
	showTableHeaderEditor.value = false;
};
const handleSaveTableHeaderEdit = ({
	title,
	buttons,
}: Pick<PageRenderer.JSONSchema, 'title' | 'buttons'>) => {
	if (!pageConfig.schema) {
		pageConfig.schema = {};
	}
	pageConfig.schema.title = title;
	pageConfig.schema.buttons = buttons;
};

const handleTableEdit = () => {
	showTableEditor.value = true;
};
const handleCloseTableEdit = () => {
	showTableEditor.value = false;
};
const handleSaveTableEdit = ({
	table,
	pagination,
}: Pick<PageRenderer.JSONSchema, 'table' | 'pagination'>) => {
	if (!pageConfig.schema) {
		pageConfig.schema = {};
	}
	pageConfig.schema.table = table;
	pageConfig.schema.pagination = pagination;
};
const handlePreview = () => {};
</script>

<style lang="scss" scoped>
@import './index';
</style>
