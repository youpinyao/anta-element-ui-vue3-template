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
					:title="pageConfig.title"
					@change="handleChangePageTitle"
				/>
			</div>
			<div>
				<AtButton type="primary">Swagger</AtButton>
				<AtButton :loading="loading" @click="handleBack">返回</AtButton>
				<AtButton :loading="loading" type="primary">保存</AtButton>
			</div>
		</div>

		<div class="header-space"></div>

		<Block>
			<AtSchemaForm :schema="formSchema" :model="formModel" />
			<div class="at-search-button">
				<AtButton
					v-show="pageConfig.schema?.search.searchButton"
					type="primary"
				>
					查询
				</AtButton>
				<AtButton v-show="pageConfig.schema?.search.resetButton">
					重置
				</AtButton>
			</div>
		</Block>
		<Block>
			<div class="at-table-header">
				<AtTitle :border="false">{{ pageConfig.schema?.title }}</AtTitle>
				<div>
					<AtButton type="primary"> 新增 </AtButton>
				</div>
			</div>
			<Table :schema="tableSchema" :dataSource="dataSource" />
			<AtPagination
				:total="100"
				v-show="pageConfig.schema?.pagination"
			></AtPagination>
		</Block>
	</Container>
</template>

<script lang="ts" setup>
import {
	adminApiPageGeneratorDetailGet,
	AdminApiPageGeneratorDetailGetResult,
} from '@/apis/adminApiPageGenerator';
import { useRequest } from '@/utils/hooks/useRequest';
import { computed, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Container from '@components/Layout/Container.vue';
import Block from '@components/Layout/Block.vue';
import { AtButton, AtPagination } from 'anta-element-ui-components-next';
import { AtSchemaForm, AtSchemaFormTypes } from 'anta-element-ui-schema-form';
import { AtSchemaTableTypes } from 'anta-element-ui-schema-table';
import { useMenuStore } from '@/store/menu';

import PageTitleEditor from './PageTitleEditor.vue';
import Table from './Table';

const router = useRouter();
const menuStore = useMenuStore();
const route = useRoute();
const pageConfig = reactive<AdminApiPageGeneratorDetailGetResult>({});
const { run, loading } = useRequest(adminApiPageGeneratorDetailGet, {
	immediate: false,
});

if (route.params.id && route.params.id !== 'add') {
	run({
		id: route.params.id as string,
	}).then(({ data }) => {
		pageConfig.id = data.data.id;
		pageConfig.title = data.data.title;
		pageConfig.schema = data.data.schema as any;
	});
}

const formSchema = computed<AtSchemaFormTypes.JSONSchema>(() => {
	return (
		(pageConfig.schema?.search.form as any) || {
			properties: {},
		}
	);
});
const formModel = reactive({});
const tableSchema = computed<AtSchemaTableTypes.JSONSchema>(() => {
	const schema = pageConfig.schema?.table.schema || {
		columns: [],
	};
	return schema;
});
const dataSource = ref<any[]>([]);
const generateDataSource = (
	columns: AtSchemaTableTypes.JSONSchema['columns']
) => {
	const items: any[] = [];

	Array(10)
		.fill(0)
		.forEach(() => {
			const item: Record<string, any> = {};
			columns.forEach((column) => {
				item[column.prop ?? '_'] = 1;
			});
			items.push(item);
		});
	dataSource.value = items;
};

watch(
	() => tableSchema.value,
	() => {
		generateDataSource(tableSchema.value.columns);
	}
);

const handleChangePageTitle = (title: string) => {
	pageConfig.title = title;
};
const handleBack = () => {
	router.back();
};
</script>

<style lang="scss" scoped>
@import './index';
</style>
