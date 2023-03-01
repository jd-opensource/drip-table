---
title: 快速开始
toc: content
---

## 快速开始

> 本篇主要介绍 `drip-table-generator` 的最基本的能力

## 如何使用

### 安装依赖

drip-table-generator 依赖 `antd`、`drip-table` 和 `react`，单独使用不要忘记安装～

> yarn

```sh
yarn add drip-table-generator
```

> npm

```sh
npm install --save drip-table-generator
```

### 依赖引入

```js | pure
import DripTableGenerator from 'drip-table-generator';
import 'drip-table-generator/dist/index.min.css';
```

### 页面引入

```js | pure
<DripTableGenerator />
```

### 代码演示

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import React from 'react';
import DripTableGenerator from 'drip-table-generator';

const Demo = () => {
  return (
    <DripTableGenerator />
  );
};

export default Demo;
```
