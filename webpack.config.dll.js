const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const include = [
	path.join(__dirname, 'node_modules/element-plus'),
	path.join(__dirname, 'node_modules/anta-element-ui-components-next'),
	path.join(__dirname, 'node_modules/anta-element-ui-schema-form'),
	path.join(__dirname, 'node_modules/anta-element-ui-schema-table'),
	path.join(__dirname, 'node_modules/anta-element-ui-styles'),
	path.join(__dirname, 'node_modules/element-plus'),
];

const webpackConfig = {
	mode: 'production',
	entry: {
		element: [
			'element-plus',
			'anta-element-ui-components-next',
			'anta-element-ui-components-next/src/scss/index.scss',
			'anta-element-ui-schema-form',
			'anta-element-ui-schema-table',
		],
	},
	output: {
		path: path.join(__dirname, './.dll'),
		filename: '[name].[fullhash].js',
		library: '[name]_[fullhash]',
	},
	resolve: {
		// Add `.ts` and `.tsx` as a resolvable extension.
		extensions: ['.ts', '.tsx', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.(js|ts|tsx)$/,
				loader: 'babel-loader',
				include,
			},
			{
				test: /\.(tsx|ts)?$/,
				loader: 'ts-loader',
				options: {
					allowTsInNodeModules: true,
				},
				include,
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				include,
			},
			// https://juejin.cn/post/7061171808229621774
			// 但是由于最新版本(6之后)中可以对css文件中的url进行解析打包，因此如果是在css文件中通过url（）引入了图片资源，css-loader是可以处理图片资源的。不需要引入其他的loader。
			// 除了在css中使用图片资源，我们还会在js文件中使用图片资源，因此我们还是需要引入file-laoder或者是url-loader的。但是这里出问题了，这两个loader也会处理css中url()引入的图片资源，最终对同一张图片打包出了两张，并且引发了冲突，最终使用了css-loader打包出来的图片，但是由于冲突，导致图片异常，无法正常的在浏览器中显示。
			// 解决方案：
			// 使用webpack5中的asset module type 来处理资源文件，就可以解决问题了。
			// 切记:使用css-loader（6.XX）就不要使用file-laoder和url-loader，只能使用webpack5为我们提供的asset module type。
			{
				test: /.(eot|ttf|woff2?|png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac)$/,
				type: 'asset/resource',
				generator: {
					filename: 'dll_assets/[name].[contenthash][ext]',
				},
			},

			{
				test: /\.(scss|css)$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
				include,
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[fullhash].css',
			chunkFilename: '[name].[fullhash].css',
		}),
		new webpack.DllPlugin({
			context: __dirname,
			name: '[name].[fullhash]',
			path: path.join(__dirname, './.dll', 'element-manifest.json'),
		}),
		new webpack.ProgressPlugin(),
		new VueLoaderPlugin(),
	],
};
module.exports = webpackConfig;
