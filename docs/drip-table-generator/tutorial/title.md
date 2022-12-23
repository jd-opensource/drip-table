---
order: 3
title: 表头自定义配置
---

## 表头自定义配置

> 本篇主要介绍如何利用 `drip-table-generator` 组件的头部属性自定义配置该列的表头。

`drip-table-generator` 的每列的头部支持富文本来展示丰富的头部信息以及支持带 `tooltip` 的描述信息。另外，后续每列的表头还支持通过自定义插槽载入用户自定义组件，敬请期待。

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import "drip-table/dist/index.css";
import "drip-table-generator/dist/index.css";

import { DripTableExtraOptions, DripTableSchema } from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import DripTableGenerator from "drip-table-generator";
import React from "react";

const schema = {
  pagination: false,
  columns: [
    {
      key: "mock_2",
      title:
        '<strong style="background:#ddeeff;padding:4px;">商品名称</strong>',
      width: "156px",
      component: "text",
      options: {
        mode: "single",
        prefix: "",
        suffix: "",
        parts: [],
        defaultValue: "",
        format: "{{rec}}",
        maxRow: 2,
      },
      type: "string",
      dataIndex: "name",
      align: "center",
      dataIndexMode: "direct",
      description:
        '<div><h2 style="color:#fff;">提示标题</h2><p>这是一串提示说明</p></div>',
    },
  ],
};

const dataSource = [
  {
    id: 1,
    name: "商品一",
    price: 7999,
    status: "onSale",
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
];

const Demo = () => {
  return (
    <DripTableGenerator
      mockDataSource
      driver={DripTableDriverAntDesign}
      schema={schema}
      dataSource={dataSource}
    />
  );
};

export default Demo;
```
