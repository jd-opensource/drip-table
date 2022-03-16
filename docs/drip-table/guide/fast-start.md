---
order: 1
title: 快速开始
---

# 快速开始

> 本篇主要介绍 `drip-table` 的基本使用能力介绍

## 如何使用

### 环境要求

- `Node.js` 版本大于 10.14.0
- `React` 版本大于 16.9.0
- `antd` 版本 4.X

### 设置 `npm` 源

`drip-table` 发布在 `npm` 上。可以设置 `npm` 源，如果需要镜像的话。

> 配置NPM源
```sh
npm config set registry https://registry.npmjs.com/
```

> NPM 登录
```sh
npm adduser (--registry=https://registry.npmjs.com/)
```
> 按照提示输入用户名密码即可

### 安装

> 安装前确保 `drip-table` 所依赖 `react` 已经安装完毕。

1. 安装 `DripTable` 渲染引擎

    ```shell
    npm install --save drip-table
    ```

2. 选择安装主题包

    `drip-table` 目前支持 `antd` 主题，支持组件覆盖绝大多数使用场景。

    antd

    ```shell
    npm install --save drip-table-driver-antd
    ```

    或使用项目中的界面库构建符合 `drip-table` 所约定的自定义的主题包。

### 快速上手

1. 引入依赖

    ```js
    import React from 'react';
    import DripTable from 'drip-table';
    import 'drip-table/dist/index.css';
    ```

2. 选择主题包并引入

    引入主题包 `drip-table-driver-${driverName}`，或根据要求传入自定义的主题包。

    目前可选列表如下：

    * drip-table-driver-antd

    引入antd主题包：

    ```js
    import DripTableDriverAntDesign from 'drip-table-driver-antd';
    import 'antd/dist/antd.css';
    ```

3. 创建组件实例

    ```js
    export default Demo = () => {
      return (
        <DripTable
          driver={DripTableDriverAntDesign}
          schema={schema}
          dataSource={dataSource}
        />
      );
    };
    ```
