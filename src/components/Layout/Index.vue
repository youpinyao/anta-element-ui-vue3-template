<template>
	<ElContainer class="container">
		<ElAside
			class="aside"
			:class="{ 'aside--collapse': collapse }"
			width="208px"
		>
			<div class="aside__title">
				<div>ANTA BMS</div>
				<div class="aside__toggle" @click="toggleMenu">
					<AtIcon name="folding" />
				</div>
			</div>
			<Menu :items="menuItems" :collapse="collapse" />
		</ElAside>
		<ElContainer>
			<ElHeader class="header">
				<div></div>
				<div class="header__user">
					<Search />
					<AtCustomerImage :size="28" />
					<span>Hi, 游品尧</span>
				</div>
			</ElHeader>
			<ElMain class="main">
				<RouterView v-slot="{ Component }">
					<KeepAlive :include="include" v-if="$route.meta.keepAlive !== false">
						<component :is="Component" />
					</KeepAlive>
					<component v-else :is="Component" />
				</RouterView>
				<AtLoading text="资源加载中..." :visible="loading" />
			</ElMain>
		</ElContainer>
	</ElContainer>
</template>

<script lang="ts" setup>
import {
	ElContainer,
	ElAside,
	ElHeader,
	ElMain,
	AtIcon,
	AtCustomerImage,
	AtLoading,
} from 'anta-element-ui-components-next';
import { useTabStore } from '@/store/tab';
import { RouterView } from 'vue-router';
import { computed, ref } from 'vue';
import Menu from '@/components/Menu/Index.vue';
import Search from '@/components/Search/Index.vue';
import { useMenuStore } from '@/store/menu';
import { useLoadingStore } from '@/store/loading';

const tabStore = useTabStore();
const menuStore = useMenuStore();
const menuItems = computed(() => menuStore.items);
const loadingStore = useLoadingStore();
const include = computed(() => tabStore.items.map((item) => item.name));
const collapse = ref(
	window.localStorage.getItem('anta-aside-menu-collapse') === 'true'
);
const loading = computed(() =>
	Object.values(loadingStore.routes).some((item) => item === true)
);

const toggleMenu = () => {
	collapse.value = !collapse.value;
	window.localStorage.setItem('anta-aside-menu-collapse', `${collapse.value}`);
};
</script>

<style lang="scss" scoped>
@import './index';
</style>
