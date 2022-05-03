module.exports = [
  {
    test: /\.(tsx|ts|jsx|js|mjs)$/,
    exclude: /node_modules/,
    loader: 'ts-loader',
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
];
