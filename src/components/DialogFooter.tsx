import { defineComponent } from 'vue';

export default defineComponent({
	setup(props, ctx) {
		return () => {
			return (
				<div
					class="dialog-footer"
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<div></div>
					<div>{ctx.slots?.default?.()}</div>
				</div>
			);
		};
	},
});
