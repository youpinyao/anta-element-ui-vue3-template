<template>
	<div
		class="search"
		v-click-outside="closeSearch"
		:class="{ 'search--focus': searchIsShow }"
	>
		<AtAutocomplete
			ref="autocomplete"
			placeholder="菜单搜索"
			v-model="searchKey"
			:fetch-suggestions="fetchMenu"
			@select="handleSelect"
		>
			<template #suffix>
				<AtIcon name="search"></AtIcon>
			</template>
			<template #default="{ item }">
				<div v-html="item.fullTitle"></div>
			</template>
		</AtAutocomplete>
		<div class="search__icon" @click="showSearch">
			<AtIcon name="search"></AtIcon>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { AdminApiMenusGetResult } from '@/models/menuApi/AdminApiMenusGetResult';
import { ArrayType } from 'anta-element-ui-components-next/src/utils/arrayType';
import { useMenuStore } from '@/store/menu';
import {
	AtAutocomplete,
	AutocompleteFetchSuggestions,
} from 'anta-element-ui-components-next';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const menuStore = useMenuStore();
const menuItems = computed(() => {
	const newItems: (ArrayType<AdminApiMenusGetResult['data']> & {
		fullTitle?: string;
		match?: boolean;
		value?: string;
	})[] = [];

	const flatMenu = (
		items: AdminApiMenusGetResult['data'],
		parents: AdminApiMenusGetResult['data']
	) => {
		items?.forEach((item) => {
			if (item.children && item.children.length) {
				flatMenu(item.children, [...(parents ?? []), item]);
			} else {
				newItems.push({
					...item,
					fullTitle: [...(parents ?? []), item]
						.map((item) => item.title)
						.join(' - '),
					value: '',
				});
			}
		});
	};

	flatMenu(menuStore.menu ?? [], []);

	return newItems;
});
const searchKey = ref('');
const autocomplete = ref<InstanceType<typeof AtAutocomplete>>();
const searchIsShow = ref<boolean>(false);
const closeSearch = () => {
	searchIsShow.value = false;
};
const showSearch = () => {
	searchIsShow.value = true;
	setTimeout(() => {
		autocomplete.value?.focus();
	}, 100);
};
const fetchMenu: AutocompleteFetchSuggestions = (searchKey, cb) => {
	if (!searchKey) {
		cb([]);
		return;
	}
	cb(
		menuItems.value
			.map((item) => {
				const matchs: string[] | undefined | null = item.fullTitle?.match(
					new RegExp(searchKey, 'ig')
				);
				let { fullTitle } = item;
				const keys: string[] = [];

				matchs?.forEach((match, index) => {
					keys.push(`${Date.now()}${index}`);
					fullTitle = fullTitle?.replace(match, `---${keys[index]}---`);
				});
				matchs?.forEach((match, index) => {
					fullTitle = fullTitle?.replace(
						`---${keys[index]}---`,
						`<b style="color: #d40000;">${match}</b>`
					);
				});

				return {
					...item,
					match: !!matchs,
					fullTitle,
				};
			})
			.filter((item) => item.match)
	);
};
const handleSelect = (e: any) => {
	if (e.path) {
		router.push({
			path: e.path,
		});
	}
};
</script>

<style lang="scss" scoped>
@import './index';
</style>
