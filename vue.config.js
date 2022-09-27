const path = require('path');
const { defineConfig } = require('anta-cli');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = defineConfig({
	filenameHashing: true,
	runtimeCompiler: true,
	// transpileDependencies: [
	// 	'anta-element-ui-components-next',
	// 	'anta-element-ui-schema-form',
	// 	'anta-element-ui-schema-table',
	// 	'element-plus',
	// ],

	// dll: {
	// 	element: [
	// 		'element-plus',
	// 		'anta-element-ui-components-next',
	// 		'anta-element-ui-components-next/src/scss/index.scss',
	// 		'anta-element-ui-schema-form',
	// 		'anta-element-ui-schema-table',
	// 	],
	// },

	devServer: {
		proxy: {
			'/admin/v1': {
				target: 'https://admin-api-dev.atxapi.com/',
				changeOrigin: true,
				// pathRewrite: { '^/admin/api': '/admin/v1' },
			},
		},
	},
	pages: {
		index: {
			entry: 'src/main.ts',
			template: 'public/index.html',
			filename: 'index.html',
			title: 'ANTA BMS',
			// 提取出来的通用 chunk 和 vendor chunk。
			chunks: ['chunk-vendors', 'chunk-common', 'index'],
		},
	},
	css: {
		loaderOptions: {
			sass: {
				sassOptions: {
					outputStyle: 'expanded',
				},
			},
		},
	},
	configureWebpack: {
		resolve: {
			alias: {
				'@': path.resolve('./src'),
				'@components': path.resolve('./src/components'),
				'@store': path.resolve('./src/store'),
				'@utils': path.resolve('./src/utils'),
				'@apis': path.resolve('./src/apis'),
				'@models': path.resolve('./src/models'),
				'@axios': path.resolve('./src/utils/axios'),
				'@hooks': path.resolve('./src/utils/hooks'),
				'@PageRenderer': path.resolve(
					'./src/components/PageRenderer/Index.tsx'
				),
			},
		},
		plugins: [
			new StylelintPlugin({
				// configFile: path.resolve(__dirname, '.stylelintrc.js'),
				files: ['**/*.{html,vue,scss}'],
				lintDirtyModulesOnly: false,
				fix: false,
				cache: false,
				emitError: true,
				emitWarning: true,
			}),
		],
		module: {
			rules: [],
		},
	},
});
