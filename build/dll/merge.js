const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const manifest = require(path.join(
	process.cwd(),
	'.dll/element-manifest.json'
));

module.exports = {
	plugins: [
		new webpack.DllReferencePlugin({
			context: path.join(process.cwd(), './.dll'),
			manifest,
		}),
		...['css', 'js'].map(
			(typeOfAsset) =>
				new AddAssetHtmlPlugin({
					filepath: path.join(
						process.cwd(),
						'./.dll',
						`${manifest.name}.${typeOfAsset}`
					),
					typeOfAsset,
				})
		),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(process.cwd(), '.dll/dll'),
					to: 'dll',
				},
			],
		}),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, '.dll'),
		},
	},
};
