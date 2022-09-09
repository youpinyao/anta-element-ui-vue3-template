<template>
	<ElContainer class="container">
		<ElAside class="aside" :class="{ 'aside--collapse': menuStore.collapse }">
			<div class="aside__title">
				<div>ANTA BMS</div>
				<div class="aside__toggle" @click="toggleMenu">
					<AtIcon name="folding" />
				</div>
			</div>
			<Menu :items="menuItems" :collapse="menuStore.collapse" />
			<AtLoading
				text="菜单加载中..."
				:size="20"
				background="transparent"
				static
				:visible="menuStore.loading"
			/>
		</ElAside>
		<ElContainer>
			<ElHeader class="header">
				<div class="header__left"></div>
				<div class="header__right">
					<Search />
					<User />
				</div>
			</ElHeader>
			<ElMain class="main">
				<RouterView v-slot="{ Component, route }">
					<KeepAlive :include="include">
						<component
							:is="Component"
							:key="route.name"
							v-if="route.meta.keepAlive !== false"
						/>
					</KeepAlive>
					<component
						:is="Component"
						:key="route.name"
						v-if="route.meta.keepAlive === false"
					/>
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
	AtLoading,
} from 'anta-element-ui-components-next';
import { useTabStore } from '@/store/tab';
import { RouterView } from 'vue-router';
import { computed } from 'vue';
import Menu from '@/components/Layout/Menu/Index.vue';
import Search from '@/components/Layout/Search/Index.vue';
import User from '@/components/Layout/User/Index.vue';
import { useMenuStore } from '@/store/menu';
import { useRouterStore } from '@/store/router';
import { useUserStore } from '@/store/user';

const tabStore = useTabStore();
const menuStore = useMenuStore();
const userStore = useUserStore();
const menuItems = computed(() => menuStore.menu);
const routerStore = useRouterStore();
const include = computed(() => tabStore.items.map((item) => item.name));
const loading = computed(() =>
	Object.values(routerStore.routes).some((item) => item === true)
);

const toggleMenu = () => {
	menuStore.setCollapse(!menuStore.collapse);
	window.localStorage.setItem(
		'anta-aside-menu-collapse',
		`${menuStore.collapse}`
	);
};

userStore.updateUserInfo();
menuStore.updateMenu();
</script>

<style lang="scss" scoped>
@import './index';
</style>
