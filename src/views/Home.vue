<template>Home {{ time }}</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
	name: 'Home',
	setup() {
		const time = ref(0);

		time.value = Date.now();

		return { time };
	},
});
</script>
