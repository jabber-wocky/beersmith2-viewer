var webpack = require('webpack');
var path = require('path');
var rootPath = path.resolve(__dirname);

var config = module.exports = {
	entry: {
		'app': './src/app.js'
	},
	output: {
		path: path.join(__dirname, './public/bin'),
		filename: '[name].bundle.js'
	},
};

config.resolve = {
	root: path.join(__dirname, 'src'),
	modulesDirectory: ["node_modules","web_modules"]
}

config.module = {
  loaders: [
  	{
  		test: /\.xsl$/,
  		loader: 'raw-loader'
  	},
	{
		test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
		loader: "url-loader?limit=10000&minetype=application/font-woff"
	},
	{
		test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
		loader: "file-loader"
	},
	{
		test: /\.jpe?g$|\.gif$|\.png$|\.wav$|\.mp3$/,
		loader: "file-loader"
	},
	{ 
		test: /\.es6$/, 
		loader: 'babel-loader' 
	},
	{ 
		test: /\.jsx$/, 
		loader: 'babel-loader'
	},
	{ 
		test: /\.css$/, 
		loader: 'style-loader!css-loader'
	},
  ],
};