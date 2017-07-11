let path = require("path");

module.exports = {
  commonConfig: {
    resolve: {
      alias: {
        utils: path.resolve(process.cwd(), "src/common", "utils"),
        hoc: path.resolve(process.cwd(), "src/common", "hoc"),
        resolvers: path.resolve(process.cwd(), "src/common", "resolvers"),
        components: path.resolve(process.cwd(), "src/common", "components"),
        screens: path.resolve(process.cwd(), "src/common", "screens"),
        pods: path.resolve(process.cwd(), "src/common", "pods"),
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
        },
        {
          test: /\.css$/,
          use: ["style-loader?insertInto:'#normalize'", "css-loader"]
        }
      ]
    }
  },
  getAppConfig: env => {
    let environment = "";
    if (env.dev) environment = "dev";
    if (env.test) environment = "test";
    if (env.prod) environment = "prod";
    let appConfigPath = path.resolve(process.cwd(), "config", environment + ".config.js");
    let config = require(appConfigPath);
    return config;
  }
};
