<template>
	<div class="edit-area">
		<slot />
		<div class="edit-area__mask" @click="handleEdit">
			<div class="edit-area__mask__buttons">
				<AtButton>编辑</AtButton>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { AtButton } from 'anta-element-ui-components-next';

const emit = defineEmits({
	edit() {
		return true;
	},
});

const handleEdit = () => {
	emit('edit');
};
</script>

<style lang="scss" setup>
@import 'anta-element-ui-styles/src/variables';

.edit-area {
	position: relative;

	&__mask {
		position: absolute;
		top: -4px;
		left: -4px;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
		width: calc(100% + 8px);
		height: calc(100% + 8px);
		cursor: pointer;
		visibility: hidden;
		background-color: rgba($--color-black, 0.1);
		border-radius: $--border-radius-small;
		opacity: 0;
		transition: all 300ms ease;

		&__buttons {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	&:hover {
		.edit-area__mask {
			visibility: visible;
			opacity: 1;
		}
	}
}
</style>
