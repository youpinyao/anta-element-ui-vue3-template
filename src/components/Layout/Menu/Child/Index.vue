<template>
	<div>
		<template v-for="(item, index) in items">
			<AtSubMenu
				v-if="item.children && item.children.length"
				popper-class="aside-menu-popper"
				:index="item.path || item.key || index + ''"
				:key="item.path || item.key || index + ''"
			>
				<template #title>
					<i :class="item.icon"></i>
					<span
						class="user-select-none"
						v-if="item.highlightTitle"
						v-html="item.highlightTitle"
					></span>
					<span class="user-select-none" v-else>{{ item.title }}</span>
				</template>

				<AsideMenuChild :items="item.children" />
			</AtSubMenu>
			<AtMenuItem
				v-else
				:index="item.path || item.key"
				:key="item.path || item.key"
				:route="item.path"
			>
				<i :class="item.icon"></i>
				<span
					class="user-select-none"
					v-if="item.highlightTitle"
					v-html="item.highlightTitle"
				></span>
				<span class="user-select-none" v-else>{{ item.title }}</span>
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
import { AtMenuItem, AtSubMenu } from 'anta-element-ui-components-next';
import { PropType } from 'vue';
import { MenuItem } from '@/models/menu';

defineProps({
	items: {
		type: Array as PropType<MenuItem[]>,
		default: () => [],
	},
});
</script>

<style lang="scss">
@import './index';
</style>
