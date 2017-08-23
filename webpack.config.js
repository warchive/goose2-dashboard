const path = require('path')
const debug = process.env.NODE_ENV !== "production"; //eslint-disable-line
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

const extractSass = new ExtractTextPlugin({
  filename: '../dist/[name].css',
  disable: debug
})

const minify = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
})

const prodPlugsin = [
  minify,
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    },
    DEBUG: debug
  })

]

const developPlugins = [
  new webpack.DefinePlugin({
    DEBUG: debug
  })
]

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
          presets: ['env', 'react', 'stage-0']
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
    extractSass
  ].concat(debug ? developPlugins : prodPlugsin),
  devServer: {
    publicPath: '/',
    contentBase: './dist'
  }
}
