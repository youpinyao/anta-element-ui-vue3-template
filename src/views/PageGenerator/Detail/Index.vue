<template>
	<Container>
		<div
			class="header"
			:class="{
				'header--collapse': menuStore.collapse,
			}"
		>
			<div>
				<PageTitleEditor
					v-show="!loading"
					:title="pageConfig.title"
					@change="handleChangePageTitle"
				/>
			</div>
			<div class="header__buttons">
				<AtButton :loading="loading" @click="handleBack">返回</AtButton>
				<SwaggerButton @generate="handleGenerate" />
				<AtButton :loading="loading" type="primary" @click="handlePreview"
					>预览</AtButton
				>
				<AtButton :loading="loading" type="primary" @click="handleSave"
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
		<Placeholder
			v-if="!hasTable && !loading"
			@click="handleTableEdit"
			placeholder="添加表格"
		/>

		<Block v-show="hasSearch">
			<EditArea @edit="handleSearchEdit">
				<TableSearch
					:schema="searchFormSchema"
					:resetButton="pageConfig.schema?.search?.resetButton"
					:searchButton="pageConfig.schema?.search?.searchButton"
					:model="searchModel"
				/>
			</EditArea>
		</Block>

		<Block v-show="hasTable">
			<EditArea @click="handleTableHeaderEdit">
				<TableHeader
					:title="pageConfig.schema?.title"
					:buttons="pageConfig.schema?.buttons"
				/>
			</EditArea>
			<EditArea @edit="handleTableEdit">
				<Table :schema="tableSchema" :dataSource="dataSource"></Table>

				<AtPagination
					:total="100"
					v-show="pageConfig.schema?.pagination"
				></AtPagination>
			</EditArea>
		</Block>
	</Container>
	<SearchEditor
		:visible="showSearchEditor"
		:schema="pageConfig.schema?.search"
	/>
</template>

<script lang="ts" setup>
import {
	adminApiPageGeneratorDetailGet,
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
	AtPagination,
} from 'anta-element-ui-components-next';
import { AtSchemaTableTypes } from 'anta-element-ui-schema-table';
import { useMenuStore } from '@/store/menu';

import PageTitleEditor from './PageTitleEditor.vue';
import TableHeader from './TableHeader';
import TableSearch from './TableSearch';
import Table from './Table';
import Placeholder from './Placeholder.vue';
import SwaggerButton from './SwaggerButton/Index';
import { swaggerGenerateTransform } from './swaggerGenerateTransform';
import { ReadSwaggerPageResult } from './SwaggerButton/readSwaggerPage';
import EditArea from './EditArea/Index.vue';
import { generateDataSource } from './generateDataSource';
import SearchEditor from './SearchEditor/Index';

const router = useRouter();
const menuStore = useMenuStore();
const route = useRoute();

const pageConfig = reactive<AdminApiPageGeneratorDetailGetResult>({});
const { run, loading } = useRequest(adminApiPageGeneratorDetailGet, {
	immediate: false,
});
const searchFormSchema = computed<any>(() => pageConfig.schema?.search?.form);
const searchModel = reactive({});
const hasSearch = computed(
	() => !!Object.keys(pageConfig.schema?.search?.form?.properties ?? {}).length
);

const tableSchema = computed<AtSchemaTableTypes.JSONSchema>(() => {
	const schema = pageConfig.schema?.table?.schema || {
		columns: [],
	};
	return schema;
});
const hasTable = computed(() => !!tableSchema.value.columns.length);
const dataSource = computed<any[]>(() =>
	generateDataSource(tableSchema.value.columns)
);

const showSearchEditor = ref(true);
const showTableEditor = ref(false);
const showTableHeaderEditor = ref(false);

if (route.params.id && route.params.id !== 'add') {
	run({
		id: route.params.id as string,
	}).then(({ data }) => {
		pageConfig.id = data.data.id;
		pageConfig.title = data.data.title;
		pageConfig.schema = data.data.schema;
	});
}

const handleGenerate = (result: ReadSwaggerPageResult) => {
	pageConfig.title = result.title;
	pageConfig.schema = {
		...pageConfig.schema,
		...swaggerGenerateTransform(result),
	};
};

const handleChangePageTitle = (title: string) => {
	pageConfig.title = title;
};

const handleBack = () => {
	router.back();
};
const handleSave = () => {
	console.log(pageConfig);
	console.log(JSON.stringify(pageConfig));
};
const handleSearchEdit = () => {
	showSearchEditor.value = true;
};
const handleTableEdit = () => {
	showTableEditor.value = true;
};
const handleTableHeaderEdit = () => {
	showTableHeaderEditor.value = true;
};
const handlePreview = () => {};
</script>

<style lang="scss" scoped>
@import './index';
</style>
