const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist')
  // ,
  // build: path.join(__dirname, '../build')
  // assets: 'assets/'
}


module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.src
  },
  output: {
    filename: `js/[name].js`, //`${PATHS.assets}js/[name].[hash].js`
    path: PATHS.dist,
    publicPath: '/'
  },
  // output: {
  //   filename: 'js/[name].js',
  //   path: path.resolve(__dirname, '../dist'),
  //   publicPath: '/dist'
  // },

  devServer: {
    overlay: true,
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: process.env.NODE_ENV === 'development'
          }
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
            // ,
            // config: {
              // path: `${PATHS.build}/[name].js`
            // }
          }
        }
      ]
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
      }
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/[name].css` //`${PATHS.assets}css/[name].[hash].css`
    }),
    // new CopyWebpackPlugin([
    //   { from: PATHS.src + '/img', to: `img` },
    //   { from: PATHS.src + '/static' },
    // ]),

    new CopyWebpackPlugin([{
        from: `${PATHS.src}/img`,
        to: `img`
      },
      {
        from: `${PATHS.src}/static`,
        to: ``
      }
    ]),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.html`,
      filename: './index.html',
      // inject: false //true по default; вставить link/script в конечный index.html 
    })
  ],
}