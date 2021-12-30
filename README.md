## react

### Ant Design 样式按需加载

```js
npm install antd --save
yarn add antd
cnpm install antd --save
```

安装（react-app-rewired）一个对 create-react-app 进行自定义配置的社区解决方案

将 package.json 的 scripts 命令**react-scripts**替换为**react-app-rewired**

安装 babel-plugin-import（一个用于按需加载组件代码和样式的 babel 插件）

```js
yarn add babel-plugin-import
cnpm install babel-plugin-import --save
```

根目录创建 config-overrides.js并写入

```js
const { injectBabelPlugin } = require("react-app-rewired");

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ["import", { libraryName: "antd", libraryDirectory: "es", style: "css" }],
    config
  );
  return config;
};
```

如：The "injectBabelPlugin" helper has been deprecated as of v2.0
问题原因：react-app-rewired 升级到 2.x 以后直接干掉了所有 helpers

出现以上报错需将 react-app-rewired 进行降级

```js
npm install react-app-rewired@2.0.2-next.0
```

把全局引入的import 'antd/dist/antd.css'删除
