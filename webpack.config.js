'use strict'
var webpack = require('webpack');
var path = require('path');

//enviroment variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


module.exports = {
  //webpack reads the entry or entries from here
  context: __dirname + '/src', //__dirname is the root of the project and src is the source
  entry: {
    app: './app.jsx'
  },
  //wepack dumps it compiled output here
  output: {
    path: __dirname + '/dist/assets', // /dist is the destination of the bundle
    filename: '[name].bundle.js',
    publicPath: '/assets', //This works with webpack-dev-server
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, //check for all js files
        use: [{
          loader: 'babel-loader',
          options: {presets: ['react', 'es2015', 'stage-0']}
        }],
        exclude: /(node_modules)/
      },
      {
        test: /\.(sass|scss)$/, //check for sass or scss file names
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
        include: [
          path.resolve(__dirname, './node_modules/foundation-sites/scss')
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff)$/,
        loader: 'url-loader'
      }
    ]

  },
  //finding app modules
  resolve: {
    modules: [
      "node_modules",
      "./src/components"
    ],
    alias: {
      src:'src',
    },
    extensions: [".js", ".jsx"],
  },
  //define externals
  externals: {
    jquery:'jQuery'
  },

  //to run the dev server
  devServer: {
    contentBase: __dirname + '/src',
  },
  //add externals for jquery
  externals: ['window'],
  /*only load the source maps if not production*/
  devtool: process.env.NODE_ENV === 'production' ? undefined : 'cheap-module-eval-source-map',
  //add some plugins
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      jquery: "jquery",
    })
  ],
};
