const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rootDir = path.join(__dirname, '..');
const webpackEnv = process.env.NODE_ENV || 'development';

module.exports = {
  mode: webpackEnv,
  entry: {
    app: path.join(rootDir, './index.web.js'),
  },
  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: 'app-[fullhash].bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: [
          path.resolve(rootDir, 'app.json'),
          path.resolve(rootDir, 'App.tsx'),
          path.resolve(rootDir, 'src'),
          path.resolve(rootDir, 'node_modules', 'react-native-gesture-handler'),
          path.resolve(rootDir, 'node_modules', 'react-native-reanimated'),
          path.resolve(rootDir, 'node_modules', 'react-native-vector-icons'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['module:metro-react-native-babel-preset'],
            plugins: ['react-native-web'],
          },
        },
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            esModule: false,
          },
        },
      },
      {
        test: /\.ttf$/,
        include: [
          path.resolve(rootDir, 'node_modules', 'react-native-vector-icons'),
        ],
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      favicon: path.join(__dirname, 'favicon.ico'),
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      __DEV__: webpackEnv === 'development',
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
      process: 'process/browser',
    },
  },
};
