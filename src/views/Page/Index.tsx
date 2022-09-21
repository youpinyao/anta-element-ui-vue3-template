import { defineComponent } from 'vue';

export default defineComponent({
	setup(props, ctx) {
		return () => {
			return <div>Page</div>;
		};
	},
});
