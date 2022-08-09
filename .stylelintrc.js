module.exports = {
	plugins: ['stylelint-order'],
	extends: [
		'stylelint-config-standard-scss',
		'stylelint-config-prettier-scss',
		'stylelint-config-recommended-vue/scss',
		'stylelint-config-recess-order',
	],
	overrides: [
		{
			files: ['**/*.{html,vue}'],
			customSyntax: 'postcss-html',
		},
		{
			files: ['**/*.{css,scss}'],
			customSyntax: 'postcss-scss',
		},
	],
	rules: {
		'selector-class-pattern': [
			'^([a-z][a-z0-9]*)((--|-|__)[a-z0-9]+)*$',
			{
				resolveNestedSelectors: true,
			},
		],
	},
};
