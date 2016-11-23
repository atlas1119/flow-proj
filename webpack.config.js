var path = require('path');
var webpack = require('webpack');
var dev=process.env.NODE_ENV==='dev';
var glob = require("glob");

var files = glob.sync("./static/script/**/*.entry.js");

function entries(files){
  var ret={};
  files.map((val) => {
    var name=val.slice('./static/'.length, 0 - '.entry.js'.length);
    ret[name]=val;
  });
  return ret;
}

module.exports = {
  devtool: 'eval',
  resolve: {
    extensions:['', '.js', '.jsx'],
    alias: {
        'jquery-ui': "jquery-ui/jquery-ui.js"
    }
  },
  entry: entries(files),
  output: {
    path: __dirname+ '/dist/static',
    filename: '[name].js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loaders: [ 'babel?{"presets": ["es2015", "react", "stage-0", "stage-3"], "plugins": [ "transform-runtime", "syntax-async-functions", "transform-function-bind"]}'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [],
  devServer:{
    proxy: {
      "*": "http://localhost:4700"
    },
    port:4001,
    publicPath: '/static/',
    historyApiFallback: true
  }
};
