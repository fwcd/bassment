const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    rules: [
      // {
      //   test: /\.(tsx|ts|jsx|js|mjs)$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'ts-loader',
      //   },
      // },
      {
        test: /\.(j|t)sx?$/,
        include: [
          path.resolve(rootDir, 'app.json'),
          path.resolve(rootDir, 'App.tsx'),
          path.resolve(rootDir, 'src'),
          path.resolve(rootDir, 'node_modules', 'react-native-gesture-handler'),
          path.resolve(rootDir, 'node_modules', 'react-native-reanimated'),
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
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   loader: 'source-map-loader',
      // },
    ],
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
