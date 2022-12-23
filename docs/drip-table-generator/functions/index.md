---
order: 1
title: 基本用法
---

## 基本用法

> 本篇主要介绍 `drip-table-generator` 的基本能力以及常规情况下如何使用

## 一、初始化配置

`drip-table-generator` 提供了 `schema` 属性，允许用户在一开始就传入配置。

### 代码演示

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import React from "react";
import { DripTableSchema } from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import DripTableGenerator, {
  DripTableGeneratorHandler,
} from "drip-table-generator";
import "antd/dist/antd.css";
import "drip-table-generator/dist/index.css";

const initialSchema = {
  pagination: false,
  columns: [
    {
      $id: "mock_1",
      dataIndex: "",
      title: "自定义111",
      description: "",
      component: "render-html",
      width: "200px",
      options: {
        render:
          "if (rec.id == 1) {\r\n  return '<span style=\\\"padding: 2px 4px; border: 1px solid #2baa55; border-radius: 2px; background: #99ffad99\\\">壹</span>';\r\n}\r\nreturn '';",
      },
      type: "string",
    },
  ],
};

const Demo = () => {
  return (
    <DripTableGenerator
      driver={DripTableDriverAntDesign}
      dataSource={[]}
      schema={initialSchema}
    />
  );
};

export default Demo;
```

## 二、更改主题样式

`drip-table-generator` 支持通过修改 `CSS` 变量、传入 `style` 以及手动覆盖样式这三种方式修改样式。

`CSS` 变量目前包括以下四个：

```css
* {
  /** 主题色 */
  --drip-table-primary-color: #ffffff;
  /** 主背景色，宜偏淡，用于主页面背景，下拉框选中背景等 */
  --drip-table-background-color: #ffffff;
  /** 组件边框色 */
  --drip-table-border-color: #ffffff;
  /** 按钮悬浮状态下背景色，较接近主题色 */
  --drip-table-button-hover-color: #ffffff;
}
```

### 代码演示

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import React from "react";
import { DripTableSchema } from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import DripTableGenerator, {
  DripTableGeneratorHandler,
} from "drip-table-generator";
import "antd/dist/antd.css";
import "drip-table-generator/dist/index.css";
import "./theme.module.css";

const Demo = () => {
  return (
    <div>
      <DripTableGenerator driver={DripTableDriverAntDesign} dataSource={[]} />
    </div>
  );
};

export default Demo;
```
