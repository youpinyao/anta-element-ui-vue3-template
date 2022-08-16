<template>
	<AtDropdown trigger="click" @command="handleDropdown">
		<div class="user">
			<AtCustomerImage :size="28" />
			<span>Hi, {{ fullName }}</span>
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
} from 'anta-element-ui-components-next';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const fullName = computed(() => userStore.user?.fullName || '-');

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
