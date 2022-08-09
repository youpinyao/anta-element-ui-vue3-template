module.exports = {
	root: true,
	env: {
		node: true,
		'vue/setup-compiler-macros': true,
	},
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'prettier',
		'@vue/typescript',
	],
	plugins: ['prettier'],
	parserOptions: {
		parser: '@typescript-eslint/parser',
	},
	overrides: [
		{
			files: ['*.tsx'],
			parser: '@typescript-eslint/parser',
		},
	],
	rules: {
		'prettier/prettier': 'error',
		'vue/valid-v-model': [0],
		'vue/multi-word-component-names': [0],
		'vue/no-deprecated-slot-attribute': [0],
		'vue/no-deprecated-slot-scope-attribute': [0],
		'vue/no-deprecated-v-bind-sync': [0],
	},
};
