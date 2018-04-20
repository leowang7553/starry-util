var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './js/base.js',
  output: {
	filename: 'bundle.js',
	path: path.resolve(__dirname, './dist')
  },
  resolve: {
  	extensions: ['js']
  },
  module: {
	rules: [{
	  test: /\.js$/,
	  exclude: /node_modules/,
	  use: {
		loader: 'babel-loader',
		options: {
		  presets: ['es2015']
		}
	  }
	}]
  }
}