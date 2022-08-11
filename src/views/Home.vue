<template>
	<div>result: {{ result }}</div>
	<div>error: {{ error }}</div>
	<div>loading: {{ loading }}</div>
	<div>loading effects: {{ loadingStore.effects }}</div>
</template>

<script lang="ts" setup>
import { useRequest } from '@hooks/useRequest';
import { post } from '@axios';
import { useLoadingStore } from '@/store/loading';

const { result, loading, error } = useRequest(
	post({
		url: 'token',
		data: {
			a: 1,
		},
	})
);

const loadingStore = useLoadingStore();
</script>
