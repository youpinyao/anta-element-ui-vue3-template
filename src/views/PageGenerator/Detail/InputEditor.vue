<template>
	<div class="input-editor">
		<span v-show="props.content && !isEdit">{{ props.content }}</span>
		<span v-show="!props.content && !isEdit" class="gray">{{
			placeholder || '空占位'
		}}</span>
		<AtInput v-show="isEdit" v-model="pageTitle" />
		<div class="edit" v-show="!isEdit" @click="handleEdit">
			<AtIcon name="edit-o"></AtIcon>
		</div>
		<div class="buttons" v-show="isEdit">
			<AtButton @click="handleSave" type="primary">确认</AtButton>
			<AtButton @click="handleCancel">取消</AtButton>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { AtButton, AtInput, AtIcon } from 'anta-element-ui-components-next';
import { ref } from 'vue';

const props = defineProps({
	content: {
		type: String,
	},
	placeholder: {
		type: String,
	},
});
const emit = defineEmits({
	change(content: string) {
		content;
		return true;
	},
});

const isEdit = ref(false);
const pageTitle = ref('');

const handleSave = () => {
	isEdit.value = false;
	emit('change', pageTitle.value);
};
const handleCancel = () => {
	isEdit.value = false;
};
const handleEdit = () => {
	isEdit.value = true;
	pageTitle.value = props.content ?? '';
};
</script>

<style lang="scss">
@import 'anta-element-ui-styles/src/variables';

.input-editor {
	display: inline-flex;
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

	+ .input-editor {
		margin-left: 20px;
	}
}
</style>
