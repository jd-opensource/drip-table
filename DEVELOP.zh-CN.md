# DripTable 开发指南

## 开发前

简体中文 | [English](./DEVELOP.md)

**在开发前你需要掌握的知识点**

### 什么是 JSON Schema

1. `JSON Schema` 本身就是一种数据结构，可以清晰的描述 `JSON` 数据的结构。是一种描述 `JSON` 数据的 `JSON` 数据。
2. [JSON Schema 官方文档](http://json-schema.org/)
3. [JSON Schema 入门](https://www.jianshu.com/p/1711f2f24dcf?utm_campaign=hugo)

### 什么是 Lerna

1. `Lerna` 是一个用来优化托管在 `git` / `npm` 上的多 `package` 代码库的工作流的一个管理工具，可以让你在主项目下管理多个子项目，从而解决了多个包互相依赖，且发布时需要手动维护多个包的问题。
2. [Lerna 官方文档](https://lerna.js.org/)
3. [Lerna 入门](https://www.jianshu.com/p/09fd41cdbbc4)

## 环境准备

- 安装 `git`, `node`, `yarn`, 其中 `node` 版本 >=13.14.0，`yarn` 版本 >=1.0.0
- 配置 [NPM](https://registry.npmjs.com/) 源, 如果有必要的话。

  > 配置 NPM 源

  ```sh
  npm config set registry https://registry.npmjs.com/
  ```

  > NPM 登录

  ```shell
  npm adduser (--registry=https://registry.npmjs.com/)
  ```

  > 按照提示输入用户名密码即可

- 源码下载

## 启动

1. 安装依赖

   ```sh
   lerna bootstrap
   ```

2. 构建依赖包

   > yarn

   ```sh
   yarn run build
   ```

   > npm

   ```sh
   npm run build
   ```

3. 启动项目

   ```
   yarn start
   ```

4. 浏览器访问: `http://localhost:8000` 即可。

## 目录结构

- 持续更新

```
├── docs                           // 文档官网
│ ├── drip-table                   // drip-table 子页面
│ │ ├── changelog                  // 日志更新
│ │ │ └── index.md                 // 日志markdown
│ | ├── functions                  // drip-table 文档功能子页面
│ | ├── guide                      // drip-table 文档指南子页面
│ | ├── sample                     // drip-table 案例展示子页面
│ | ├── faq.md                     // drip-table 常见问题页 markdown
│ | └── index.md                   // drip-table 文档介绍页 markdown
│ ├── drip-table-generator         // drip-table-generator 子页面
│ │ ├── changelog                  // 日志更新
│ │ │ └── index.md                 // 日志 markdown
│ | ├── preview                    // drip-table-generator 案例展示子页面
│ | ├── faq.md                     // drip-table-generator 常见问题页 markdown
│ | └── index.md                   // drip-table-generator 文档介绍页 markdown
│ ├── global-configs.ts            // 案例展示页面所用全局配置项
│ ├── index.css                    // 文档官网首页 CSS
│ ├── index.md                     // 文档官网首页入口 markdown
│ ├── index.tsx                    // 文档官网首页
│ └── Loading.js                   // 文档官网 Loading 组件
└── packages                       // 源代码入口
  ├── drip-table                   // drip-table 代码
  ├── drip-table-driver-antd       // drip-table antd 主题包
  └── drip-table-generator         // drip-table 可视化生成器
```

## 开发

1. Fork。
2. 创建一个新分支，分支名表达改动内容即可。
3. 改动，并提交。
4. 创建 PR 请求。

- `drip-table` 开发详情见 [README](./packages/drip-table/README.zh-CN.md) 。
- `drip-table-generator` 开发详情见 [README](./packages/drip-table-generator/README.zh-CN.md) 。

## 官网发布

> 构建打包

```
yarn run build:docs
```
