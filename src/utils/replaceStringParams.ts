export default function replaceStringParams(
	str: string = '',
	params: Record<string, any> = {}
) {
	let result = str;
	Object.keys(params).forEach((key) => {
		result = result.replace(RegExp(`{${key}}`, 'g'), params[key]);
	});
	return result;
}
