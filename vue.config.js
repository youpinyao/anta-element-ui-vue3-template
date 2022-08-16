const path = require('path');

const { defineConfig } = require('@vue/cli-service');
const { merge } = require('webpack-merge');
const dllMerge = require('./build/dll/merge');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = defineConfig({
	filenameHashing: true,
	runtimeCompiler: true,
	devServer: {
		proxy: {
			'/admin/api': {
				target: 'http://10.131.128.107:31093',
				changeOrigin: true,
			},
		},
	},
	pages: {
		index: {
			entry: 'src/main.ts',
			template: 'public/index.html',
			filename: 'index.html',
			title: 'Vue3 Template',
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
	configureWebpack: merge(
		{
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
				},
			},
			plugins: [
				new StylelintPlugin({
					configFile: path.resolve(__dirname, '.stylelintrc.js'),
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
		dllMerge
	),
});
