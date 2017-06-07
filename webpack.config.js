var debug = process.env.NODE_ENV !== "production";
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractSass = new ExtractTextPlugin({
  filename: "../dist/[name].css",
  disable: debug
});

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : false,
  entry: [
    "./main.jsx",
    "./main.scss"
  ],
  output: {
    path: __dirname + "/dist/",
    filename: "main.min.js"
  },
  module: {
    loaders: [{
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: ['transform-async-to-generator']
          }
        }
      },
      {
        test: /\.s?css$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [
    extractSass
  ],
  devServer: {
    publicPath: "/",
    contentBase: "./dist"
  },
}
