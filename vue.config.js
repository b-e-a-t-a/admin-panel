var path = require("path");

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set("theme", path.resolve("src/theme"));
  },
  configureWebpack: {
    resolve: {
      extensions: [".js", ".vue"],
      modules: [path.resolve("./src"), "node_modules"]
    }
  }
}