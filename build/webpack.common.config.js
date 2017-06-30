let path = require("path");

module.exports = {
  resolve: {
    alias: {
      common: path.resolve(process.cwd(), "src/common")
    }
  },

  devtool: "inline-source-map",

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: ["babel-loader"]
      }
    ]
  }
};
