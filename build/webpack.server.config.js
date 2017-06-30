let commonConfig = require('./webpack.common.config'),
    path = require('path'),
    fs = require('fs'),
    webpack = require('webpack');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) { return ['.bin'].indexOf(x) === -1; })
  .forEach(function(mod) { nodeModules[mod] = 'commonjs ' + mod; });

module.exports = function(env) {
  let clientConfig = {
    target: 'node',
    entry: {
      app: path.resolve(__dirname, '../src/server', 'index.js')
    },
    output: {
      path: path.resolve(__dirname, '../dist/server'),
      publicPath: '',
      filename: '[name].server.bundle.js'
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist/client'),
      port: 24000,
      historyApiFallback: true,
      hot: true,
      host: "0.0.0.0"
    },
    externals: nodeModules
  };

  let config = Object.assign(commonConfig, clientConfig);
  return config;
}
