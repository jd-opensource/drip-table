---
order: 1
title: 快速开始
---

# 快速开始

> 本篇主要介绍 `drip-table-generator` 的最基本的能力

## 如何使用

### 安装依赖

drip-table-generator 依赖 `antd`、`drip-table`、 `drip-table-driver-{drivername}` 和 `react`，单独使用不要忘记安装～

> yarn

```sh
yarn add drip-table-generator
```

> npm
```sh
npm install --save drip-table-generator
```

### 依赖引入

```js
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import DripTableGenerator from 'drip-table-generator';
import 'drip-table-generator/index.css';
```

### 页面引入

```js
<DripTableGenerator
  driver={DripTableDriverAntDesign}
/>
```

### 代码演示

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import React from 'react';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import DripTableGenerator from 'drip-table-generator';
import 'drip-table-generator/index.css';

const Demo = () => {
  return (
    <DripTableGenerator
      driver={DripTableDriverAntDesign}
    />
  );
};

export default Demo;
```
