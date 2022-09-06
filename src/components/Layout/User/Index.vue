<template>
	<AtDropdown trigger="click" @command="handleDropdown">
		<div class="user">
			<AtImage
				v-if="userStore.user?.avatar"
				:size="28"
				:src="userStore.user?.avatar"
			/>
			<AtCustomerImage v-else :size="28" />
			<span>Hi, {{ fullName }}</span>
			<AtIcon name="down"></AtIcon>
		</div>
		<template #dropdown>
			<AtDropdownMenu>
				<AtDropdownItem command="logout">退出</AtDropdownItem>
			</AtDropdownMenu>
		</template>
	</AtDropdown>
</template>

<script lang="ts" setup>
import { useTokenStore } from '@/store/token';
import { useUserStore } from '@/store/user';
import {
	AtCustomerImage,
	AtDropdown,
	AtDropdownMenu,
	AtDropdownItem,
	AtIcon,
	AtImage,
} from 'anta-element-ui-components-next';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const fullName = computed(() => userStore.user?.name || '-');

const handleDropdown = (command: string) => {
	if (command === 'logout') {
		useTokenStore().removeToken();
		router.replace('/login');
	}
};
</script>

<style lang="scss" scoped>
@import './index';
</style>
