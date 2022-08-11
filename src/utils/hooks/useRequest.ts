import { ref } from 'vue';

export default function useRequest<T extends any>(promise: Promise<T>) {
	const data = ref<T>();

	promise.then((res) => (data.value = res));

	return {
		data,
	};
}
