var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'web/public');
var APP_DIR = path.resolve(__dirname);

var config = {
  entry: APP_DIR + '/index.web.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  devServer:{
    contentBase: 'web/public'
  },
  module: {
    loaders: [
      {
        // Standard js/jsx compilation
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: { 
            cacheDirectory: true,
            presets: ['react-native']
          }
        }
      },
      {
        // Most react-native libraries include uncompiled ES6 JS.
        test: /\.js$/,
        include: /node_modules\/react-native-/,
        use : {
          loader: 'babel-loader',
          query: { 
            cacheDirectory: true,
            presets: ['react-native']
          }
        }
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: {
          loader: 'url-loader',
          query: { name: '[name].[ext]' }
        }
      }
    ]
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    }
  }
};

module.exports = config;