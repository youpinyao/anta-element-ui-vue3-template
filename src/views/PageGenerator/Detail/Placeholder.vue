<template>
	<div class="placeholder user-select-none" @click="handleClick">
		{{ props.placeholder }}
		<AtIcon name="plus-circle-o" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
	name: 'Placeholder',
	props: {
		placeholder: {
			type: String as PropType<string>,
			default: '占位',
		},
	},
	emits: {
		click(e: MouseEvent) {
			e;
			return true;
		},
	},
	setup(props, ctx) {
		const handleClick = (e: MouseEvent) => {
			ctx.emit('click', e);
		};
		return {
			handleClick,
			props,
		};
	},
});
</script>

<style lang="scss" scoped>
@import 'anta-element-ui-styles/src/variables';

.placeholder {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 50px 0;
	margin-bottom: 20px;
	font-size: 14px;
	line-height: 1;
	cursor: pointer;
	background-color: $--color-white;
	border-radius: $--border-radius-base;
	transition: all 300ms ease;

	&:last-child {
		margin-bottom: 0;
	}

	:deep(.at-icon-plus-circle-o) {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 2px;
	}

	&:hover {
		box-shadow: 0 0 10px 0 $--border-color-lighter inset;
	}
}
</style>
