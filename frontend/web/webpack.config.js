const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RULES = require('./webpack.rules');
const rootDir = path.join(__dirname, '..');
const webpackEnv = process.env.NODE_ENV || 'development';

module.exports = {
  mode: webpackEnv,
  entry: {
    app: path.join(rootDir, './index.ts'),
  },
  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: 'app-[fullhash].bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: RULES,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
    }),
  ],
  resolve: {
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.tsx',
      '.ts',
      '.web.jsx',
      '.web.js',
      '.jsx',
      '.js',
    ],
    alias: {
      'react-native$': 'react-native-web',
      '@bassment': path.join(__dirname, '..', 'src'),
    },
  },
};
