<template>
	<div class="login">
		<div class="body">
			<div class="left">
				<div class="left__h1">Anta Design Plus</div>
				<div class="left__h2">ANTA VUE ELEMENT PLUS</div>
			</div>
			<div class="right">
				<div class="form">
					<div class="form__title">账号登录</div>
					<div class="form__content">
						<AtRow>
							<AtCol>
								<div :class="{ show: errorMessage, form__alert: true }">
									<AtAlert
										:closable="false"
										small
										:title="errorMessage"
										type="error"
										show-icon
									>
									</AtAlert>
								</div>
							</AtCol>
							<AtCol style="margin-bottom: 20px">
								<AtInput
									:prefix-icon="atIconUser"
									v-model="user.username"
									size="large"
									block
									placeholder="输入账号"
								/>
							</AtCol>
							<AtCol>
								<AtInput
									type="password"
									v-model="user.password"
									size="large"
									block
									:prefix-icon="atIconLock"
									show-password
									placeholder="输入密码"
								/>
							</AtCol>

							<AtCol class="forget">
								<a href="#" @click.prevent="forgot">忘记密码</a>
							</AtCol>
							<AtCol>
								<AtButton
									block
									:loading="loading"
									@click="login"
									class="login-button"
									type="primary"
									size="large"
									>登 录</AtButton
								>
							</AtCol>
						</AtRow>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { adminApiLogin } from '@/apis/adminApiLogin';
import { useMenuStore } from '@/store/menu';
import { useTokenStore } from '@/store/token';
import { useUserStore } from '@/store/user';
import { getAxiosErrorMsg } from '@axios/error';
import {
	AtIconRender,
	AtMessage,
	AtInput,
	AtAlert,
	AtButton,
	AtRow,
	AtCol,
} from 'anta-element-ui-components-next';
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const atIconUser = AtIconRender({
	name: 'user',
});
const atIconLock = AtIconRender({
	name: 'lock-1',
});
const loading = ref(false);
const errorMessage = ref('');

const user = reactive({
	username: '',
	password: '',
});

const forgot = () => {
	AtMessage.warning('别点我，点了也没用！');
};
const login = async () => {
	const { username, password } = user;
	if (!username || !password) {
		errorMessage.value = '账号或密码错误,请重新输入';
		return;
	}
	loading.value = true;

	try {
		const result = await adminApiLogin({
			username,
			password,
		});
		AtMessage.success('登录成功');
		useTokenStore().setToken(result.data.data?.token);
		useUserStore().updateUserInfo();
		useMenuStore().updateMenu();
		router.push('/');
	} catch (err: any) {
		errorMessage.value = getAxiosErrorMsg(err);
		console.error(err);
	} finally {
		loading.value = false;
	}
};

watch(user, () => {
	errorMessage.value = '';
});
</script>

<style lang="scss" scoped>
@import './index';
</style>
