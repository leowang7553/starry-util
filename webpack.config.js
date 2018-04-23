var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './js/base.js',
  output: {
	filename: 'base-es5.js',
	path: path.resolve(__dirname, './es5')
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