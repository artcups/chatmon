const args = process.argv;
var debug = args.indexOf('--prod') !== -1 ? false : true;
var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var path = require('path');

module.exports = {

  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./client.js",
  module: {
    loaders: [
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, "not_exist_path")
        ],
        loader: "style!css"
      },
      {
        test: /(\.css|\.scss)$/,
        exclude: /vendor/,
        loader: "style!css!postcss!sass"
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
        loader: 'url?limit=10000&name=assets/[name].[ext]' },
      {
        test:  /(\.jsx|\.js)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      }
    ]
  },
  postcss: function () {
    return [autoprefixer];
  },
  output: {
    path: __dirname + "/www/",
    filename: "client.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ]
};