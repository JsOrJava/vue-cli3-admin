# vue-cli-3.0

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# YOUR_PROJECT_NAME

## 项目介绍
- vue-manage-system-master 参考文献github

PROJECT INTRODUCE

![YOUR_PROJECT_NAME](https://via.placeholder.com/600x400.jpg)

## 技术栈

- vue`@2.6.10`
- vuex`@3.1.1`
- axios@`0.19.0`
- vue-router`@3.0.6`
- vuex-persist`@2.0.1`
- ...

## 部署环境

|  环境    |   指令   |   服务器地址   |
| ---- | ---- | ---- |
|   开发服务器   |   npm run build:inner   |   http://example.dev   |
|   提测服务器   |   npm run build:test   |   http://example.test   |
|    生产服务器  |   npm run build:release   |  http://example.release    |

## 模块划分

YOUR PROJECT MODULES

## MOCK

> 使用 [Easy Mock](http://192.168.1.171:7301/) 进行数据 Mock。

1. Easy Mock 中建立个人项目，添加项目成员及前端负责人。
2. 根据服务端提供的 API 文档 Mock 数据。
3. Mock 数据完成后，修改 `.env.inner`  中的 `VUE_APP_BASE_URL` 为 Mock 服务地址。
4. 上述步骤完成后，进行开发。

## Git 提交规范

项目内已配置 `commitizen`，配合 `husky` 和 `commitlint` 对提交信息进行检测。(准备引入)

运行 `yarn commit` 或者 `npm run commit` 指令，可通过 `commitizen` 进行规范化提交。

## 版本更新提醒

**webot.config.js** 中可配置不同环境的版本更新提醒。


### inner/test/release

对应 **开发/提测/生产** 环境，可以为每个环境配置不同的标题信息及地址。

- title 为通知信息标题。
- url 为对应服务器地址，可在消息提醒中直接点击跳转。

## 开发人员

| 姓名 | 负责模块 | 开发/维护时间 |
|---|---|---|
| namknat | moduleA moduleB | 2019-08-04 - 2019-08- |

## Webpack优化--将你的构建效率提速翻倍

- webpack-bundle-analyzer // webpack打包体积优化 - 性能分析

- speed-measure-webpack-plugin // 它能够测量出在你的构建过程中，每一个 Loader 和 Plugin 的执行时长

- cache-loader // 缓存加载器

- uglifyjs-webpack-plugin // 这个插件使用uglify-js来缩小你的JavaScript

- optimize-css-assets-webpack-plugin // css压缩

- happypack // 多核 多线程打包

- webpack-build-notifier // 打包成功通知

- vue-cli-plugin-i18n // 国际化道路

- babel-plugin-dynamic-import-node // 热更新速度
