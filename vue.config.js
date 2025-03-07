const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    hot: true,
    proxy: {
      "^/api": {
        target: "https://uk.api.just-eat.io",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
});
