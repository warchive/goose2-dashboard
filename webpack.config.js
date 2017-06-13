const path = require('path')
const debug = process.env.NODE_ENV !== "production";  //eslint-disable-line
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

const extractSass = new ExtractTextPlugin({
  filename: '../dist/[name].css',
  disable: debug
})

const loaderOptions = new webpack.DefinePlugin({
  DEBUG: debug
})

module.exports = {
  context: path.join(__dirname, "src"), //eslint-disable-line
  devtool: debug ? 'inline-sourcemap' : false,
  entry: [
    './main.jsx',
    './main.scss'
  ],
  output: {
    path: __dirname + "/dist/", //eslint-disable-line
    filename: 'main.min.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
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
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }],
        // use style-loader in development
        fallback: 'style-loader'
      })
    }
    ]
  },
  plugins: [
    extractSass,
    loaderOptions
  ],
  devServer: {
    publicPath: '/',
    contentBase: './dist'
  }
}
