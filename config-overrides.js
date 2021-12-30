const path = require("path");
const isProduction = process.env.NODE_ENV === "production";

const {
  override,
  fixBabelImports,
  addWebpackExternals
} = require("customize-cra");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const pathResolve = (pathUrl) => {
  return path.join(__dirname, pathUrl);
};
const myPlugin = [
  new UglifyJsPlugin({
    uglifyOptions: {
      warnings: false,
      compress: {
        drop_debugger: true,
        drop_console: true,
      },
    },
  }),
];

console.log("__dirname");
console.log(__dirname);

module.exports = override(
  // 针对antd 实现按需打包：根据import来打包 (使用babel-plugin-import)
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css", //自动打包相关的样式 默认为 style:'css'
  }),
  addWebpackExternals({
    //不做打包处理配置，如直接以cdn引入的
    // echarts: "window.echarts"
  }),
  // addWebpackAlias({
    //路径别名
    // "@": pathResolve("./src"),
    // "@": path.resolve(__dirname, "src"),
  // }),
  (config) => {
    //暴露webpack的配置 config ,evn
    // 去掉打包生产map 文件
    config.devtool = !isProduction ? "cheap-module-source-map" : false;
    if (isProduction) config.devtool = false;
    if (!isProduction) config.plugins = [...config.plugins, ...myPlugin];
    //1.修改、添加loader 配置 :
    // 所有的loaders规则是在config.module.rules(数组)的第二项
    // 即：config.module.rules[2].oneof  (如果不是，具体可以打印 一下是第几项目)
    // 修改 sass 配置 ，规则 loader 在第五项(具体看配置)
    const loaders = config.module.rules.find((rule) =>
      Array.isArray(rule.oneOf)
    ).oneOf;

    console.log(loaders);
    // loaders[5].use.push({
    //   loader: "sass-resources-loader",
    //   options: {
    //     resources: path.resolve(__dirname, "src/asset/base.scss"), //全局引入公共的scss 文件
    //   },
    // });

    // resolve('./src/assets/sass/architecture/variables/index.sass'),
    // resolve('./src/assets/sass/architecture/mixin/g_placeholder.sass'),
    // resolve('./src/assets/sass/architecture/mixin/g_lineEllipsis.sass')

    return config;
  }
);
