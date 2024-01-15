/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "/dist"),
    },
    hot: true,
  },
});
