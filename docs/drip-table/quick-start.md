---
title: 快速开始 Quick Start
toc: content
---

## 快速开始

> 本篇主要介绍 `Drip Table` 的基本使用能力介绍

## 如何使用

### 环境要求

- `Node` >= 10.14.0
- `React` >= 16.9.0

### 安装

> 安装前确保 `Drip Table` 所依赖 `React` 已经安装完毕。

1. 安装渲染器

    ```shell
    npm install --save drip-table
    ```

### 快速上手

1. 引入依赖

    ```js | pure
    import React from 'react';
    import DripTable from 'drip-table';
    import 'drip-table/dist/index.min.css';
    ```

2. 创建组件实例

    ```js | pure
    export default Demo = () => {
      return (
        <DripTable
          schema={schema}
          dataSource={dataSource}
        />
      );
    };
    ```
