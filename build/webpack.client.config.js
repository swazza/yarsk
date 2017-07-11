let common = require("./webpack.common.config"),
  path = require("path"),
  webpack = require("webpack"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  UglifyJSPlugin = require("uglifyjs-webpack-plugin"),
  noop = require("noop-webpack-plugin"),
  commonConfig = common.commonConfig,
  getAppConfig = common.getAppConfig;

let devEntries = [
  "react-hot-loader/patch",
  "webpack-dev-server/client?http://localhost:24000/",
  "webpack/hot/only-dev-server"
];
let vendorEntries1 = [
  "react",
  "react-dom",
  "react-router",
  "react-router-dom",
  "history",
  "redux",
  "react-redux",
  "react-router-redux",
  "redux-saga"
];

let vendorEntries2 = ["aphrodite", "graphql-tag", "graphql-anywhere", "react-apollo", "react-motion"];

let appEntries = [path.resolve(__dirname, "../src/client", "index.js")];

module.exports = function(env) {
  let appConfig = getAppConfig(env);
  let entries = {};
  if (env.dev) {
    entries.dev = devEntries;
  }

  entries.vendor1 = vendorEntries1;
  entries.vendor2 = vendorEntries2;
  entries.app = appEntries;

  let clientConfig = {
    target: "web",
    entry: entries,
    output: {
      path: path.resolve(__dirname, "../dist/client"),
      publicPath: env.dev ? "http://localhost:24000/" : "/public",
      filename: "[name].client.bundle-[hash:6].js"
    },
    devServer: {
      contentBase: path.join(__dirname, "../dist/client"),
      port: 24000,
      historyApiFallback: true,
      hot: true,
      host: "0.0.0.0",
      overlay: true,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Book Demo",
        template: path.resolve(__dirname, "../src/client", "index.html"),
        minify: {
          collapseWhitespace: !env.dev,
          minifyJS: !env.dev
        }
      }),
      env.dev ? new webpack.HotModuleReplacementPlugin() : noop(),
      new webpack.optimize.CommonsChunkPlugin({
        name: ["vendor1", "vendor2"],
        minChunks: Infinity
      }),
      new webpack.EnvironmentPlugin(appConfig),
      !env.dev ? new UglifyJSPlugin() : noop()
    ]
  };

  let config = Object.assign(commonConfig, clientConfig);
  return config;
};
