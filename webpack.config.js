const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
	template: './src/index.html',
	filename: './index.html',
});

module.exports = {
	devtool: 'source-map',
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
		alias: {
			Icons: path.resolve(__dirname, 'src/assets/icons'),
		},
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['source-map-loader'],
				enforce: 'pre',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.svg$/,
				exclude: /node_modules/,
				loader: 'svg-react-loader',
			},
		],
	},
	plugins: [htmlPlugin],
};
