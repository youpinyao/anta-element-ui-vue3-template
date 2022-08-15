<template>
	<AtDropdown trigger="click" @command="handleDropdown">
		<div class="user">
			<AtCustomerImage :size="28" />
			<span>Hi, 游品尧</span>
		</div>
		<template #dropdown>
			<AtDropdownMenu>
				<AtDropdownItem command="logout">退出</AtDropdownItem>
			</AtDropdownMenu>
		</template>
	</AtDropdown>
</template>

<script lang="ts" setup>
import {
	AtCustomerImage,
	AtDropdown,
	AtDropdownMenu,
	AtDropdownItem,
} from 'anta-element-ui-components-next';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleDropdown = (command: string) => {
	if (command === 'logout') {
		router.replace('/login');
	}
};
</script>

<style lang="scss" scoped>
@import './index';
</style>
