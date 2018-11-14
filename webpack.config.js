const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
	template: "./src/index.html",
	filename: "./index.html"
});

module.exports = {
	devtool: 'source-map',
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.css']
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ["source-map-loader"],
				enforce: "pre"
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			}
		]
	},
	plugins: [htmlPlugin]
};