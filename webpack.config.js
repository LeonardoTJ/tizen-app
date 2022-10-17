const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/js/main.js'),
    // sn: path.resolve(__dirname, 'src/js/spatial_navigation.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Tizen App',
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, "config.xml"), to: path.resolve(__dirname, 'dist/config.xml') },
        { from: path.resolve(__dirname, ".witsconfig.json"), to: path.resolve(__dirname, 'dist/.witsconfig.json') },
        { from: path.resolve(__dirname, "icon.png"), to: path.resolve(__dirname, 'dist/icon.png') },
      ]
    })
  ],
};