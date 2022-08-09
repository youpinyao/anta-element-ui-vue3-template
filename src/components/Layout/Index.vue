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

			<div class="aside__search">
				<AtInput placeholder="菜单搜索" clearable />
			</div>
		</ElAside>
		<ElContainer>
			<ElHeader></ElHeader>
			<ElMain>
				<RouterView v-slot="{ Component }">
					<KeepAlive :include="include" v-if="$route.meta.keepAlive !== false">
						<component :is="Component" />
					</KeepAlive>
					<component v-else :is="Component" />
				</RouterView>
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
	AtInput,
} from 'anta-element-ui-components-next';
import { useTabStore } from '@/store/tab';
import { RouterView } from 'vue-router';
import { computed, ref } from 'vue';

const tabStore = useTabStore();
const include = computed(() => tabStore.items.map((item) => item.name));
const collapse = ref(
	window.localStorage.getItem('anta-aside-menu-collapse') === 'true'
);

const toggleMenu = () => {
	collapse.value = !collapse.value;
	window.localStorage.setItem('anta-aside-menu-collapse', `${collapse.value}`);
};
</script>

<style lang="scss" scoped>
@import './index';
</style>
