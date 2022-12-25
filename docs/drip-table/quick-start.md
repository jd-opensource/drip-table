---
order: 2
title: 快速开始 Quick Start
---

## 快速开始

> 本篇主要介绍 `Drip Table` 的基本使用能力介绍

## 如何使用

### 环境要求

- `Node` >= 10.14.0
- `React` >= 16.9.0
- `Ant Design` >= 4.x

### 安装

> 安装前确保 `Drip Table` 所依赖 `React` 已经安装完毕。

1. 安装渲染器

    ```shell
    npm install --save drip-table
    ```

2. 安装主题包

    ```shell
    npm install --save drip-table-driver-antd
    ```

    或使用项目中的界面库构建符合 `drip-table` 所约定的自定义的主题包。

### 快速上手

1. 引入依赖

    ```js | pure
    import React from 'react';
    import DripTable from 'drip-table';
    import 'drip-table/dist/index.css';
    ```

2. 选择主题包并引入

    ```js | pure
    import DripTableDriverAntDesign from 'drip-table-driver-antd';
    import 'antd/dist/antd.css';
    ```

3. 创建组件实例

    ```js | pure
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
