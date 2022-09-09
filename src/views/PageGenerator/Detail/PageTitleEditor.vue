<template>
	<div class="title">
		<span v-show="props.title && !isEditPageTitle">{{ props.title }}</span>
		<span v-show="!props.title && !isEditPageTitle" class="gray"
			>请输入页面标题</span
		>
		<AtInput v-show="isEditPageTitle" v-model="pageTitle" />
		<div class="edit" v-show="!isEditPageTitle" @click="handleEditPageTitle">
			<AtIcon name="edit-o"></AtIcon>
		</div>
		<div class="buttons" v-show="isEditPageTitle">
			<AtButton @click="handleSaveEditPageTitle" type="primary">确认</AtButton>
			<AtButton @click="handleCancelEditPageTitle">取消</AtButton>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { AtButton, AtInput, AtIcon } from 'anta-element-ui-components-next';
import { ref } from 'vue';

const props = defineProps({
	title: {
		type: String,
	},
});
const emit = defineEmits({
	change(title: string) {
		title;
		return true;
	},
});

const isEditPageTitle = ref(false);
const pageTitle = ref('');

const handleSaveEditPageTitle = () => {
	isEditPageTitle.value = false;
	emit('change', pageTitle.value);
};
const handleCancelEditPageTitle = () => {
	isEditPageTitle.value = false;
};
const handleEditPageTitle = () => {
	isEditPageTitle.value = true;
	pageTitle.value = props.title ?? '';
};
</script>

<style lang="scss">
@import 'anta-element-ui-styles/src/variables';

.title {
	display: flex;
	align-items: center;
	font-size: 14px;

	.edit {
		margin-left: 5px;
		cursor: pointer;
	}

	.buttons {
		display: flex;
		align-items: center;
		margin-left: 10px;
	}

	.gray {
		color: $--color-text-placeholder;
	}
}
</style>
