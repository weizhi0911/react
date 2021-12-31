const path = require("path");
const isProduction = process.env.NODE_ENV === "production";

const { override, fixBabelImports, addWebpackAlias } = require("customize-cra");

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
const externals = {
  react: "React",
  "react-dom": "ReactDom",
  antd: "antd",
};
const cdn = {
  css: [
    // 'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/theme-chalk/index.css',
    // 'https://cdn.bootcdn.net/ajax/libs/ant-design-vue/1.6.3/antd.min.css'
  ],
  js: [
    "https://cdn.staticfile.org/react/17.0.2/umd/react.production.min.js",
    "https://cdn.staticfile.org/react-dom/17.0.2/umd/react-dom.production.min.js",
    // "https://cdn.staticfile.org/antd/4.18.1/antd.min.js",
  ],
};

module.exports = override(
  // 针对antd 实现按需打包：根据import来打包 (使用babel-plugin-import)
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css", //自动打包相关的样式 默认为 style:'css'
  }),
  // 不做打包处理配置
  // addWebpackExternals({}),
  // disable eslint in webpack
  // disableEsLint({}),
  addWebpackAlias({
    // 路径别名
    "@": pathResolve("src/"),
    "@api/": pathResolve("src/api/"),
    "@archImg/": pathResolve("src/assets/images/architecture/"),
    "@globalImg/": pathResolve("src/assets/images/global/"),
    "@viewsImg/": pathResolve("src/assets/images/views/"),
    "@archSass/": pathResolve("src/assets/sass/architecture/"),
    "@bizSass/": pathResolve("src/assets/sass/business/"),
    "@globalSass/": pathResolve("src/assets/sass/global/"),
    "@bizCmp/": pathResolve("src/components/business/"),
    "@globalCmp/": pathResolve("src/components/global/"),
    "@archConf/": pathResolve("src/config/architecture/"),
    "@bizConf/": pathResolve("src/config/business/"),
    "@archInterface/": pathResolve("src/interface/architecture/"),
    "@bizInterface/": pathResolve("src/interface/business/"),
    "@globalInterface/": pathResolve("src/interface/global/"),
    "@bizMixins/": pathResolve("src/mixins/business/"),
    "@globalMixins/": pathResolve("src/mixins/global/"),
    "@archType/": pathResolve("src/type/architecture/"),
    "@bizType/": pathResolve("src/type/business/"),
    "@globalType/": pathResolve("src/type/global/"),
    "@archUtils/": pathResolve("src/utils/architecture/"),
    "@bizUtils/": pathResolve("src/utils/business/"),
    "@globalUtils/": pathResolve("src/utils/global/"),
  }),
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
    // const loaders = config.module.rules.find((rule) =>
    //   Array.isArray(rule.oneOf)
    // ).oneOf;

    // console.log(loaders);

    // loaders.push({
    //   test: /.html$/,
    //   use: {
    //     loader: "html-loader",
    //   },
    //   exclude: /index.html/, //排除 html-webpack-plugin 使用的模板文件，解决变量不输出问题
    // });
    // loaders[5].use.push({
    //   loader: "sass-resources-loader",
    //   options: {
    //     resources: path.resolve(__dirname, "src/asset/base.scss"), //全局引入公共的scss 文件
    //   },
    // });

    // resolve('./src/assets/sass/architecture/variables/index.sass'),
    // resolve('./src/assets/sass/architecture/mixin/g_placeholder.sass'),
    // resolve('./src/assets/sass/architecture/mixin/g_lineEllipsis.sass')

    // cdn配置
    config.plugins[0].userOptions.cdn = isProduction
      ? cdn
      : {
          css: cdn.css,
        };
    // 生产环境配置
    if (isProduction) {
      //不做打包处理配置，如直接以cdn引入的
      config.externals = externals;
    }

    return config;
  }
);
