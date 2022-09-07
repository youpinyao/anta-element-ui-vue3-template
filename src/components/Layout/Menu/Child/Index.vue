<template>
	<div>
		<template v-for="(item, index) in items">
			<AtSubMenu
				:class="{ 'has-icon': item.icon }"
				v-if="item.children && item.children.length"
				popper-class="aside-menu-popper"
				:index="item.path || item.id + '' || index + ''"
				:key="item.path || item.id || index + ''"
			>
				<template #title>
					<i :class="item.icon"></i>
					<span class="user-select-none">{{ item.title }}</span>
				</template>

				<AsideMenuChild :items="item.children" />
			</AtSubMenu>
			<AtMenuItem
				v-else
				:class="{ 'has-icon': item.icon }"
				:index="item.path || item.id + ''"
				:key="item.path || item.id"
				:route="item.path"
			>
				<i :class="item.icon"></i>
				<span class="user-select-none">{{ item.title }}</span>
			</AtMenuItem>
		</template>
	</div>
</template>

<script lang="ts">
export default {
	name: 'AsideMenuChild',
};
</script>

<script lang="ts" setup>
import { AdminApiMenusGetResult } from '@/models/menuApi/AdminApiMenusGetResult';
import { AtMenuItem, AtSubMenu } from 'anta-element-ui-components-next';
import { PropType } from 'vue';

defineProps({
	items: {
		type: Array as PropType<AdminApiMenusGetResult['data']>,
		default: () => [],
	},
});
</script>

<style lang="scss">
@import './index';
</style>
