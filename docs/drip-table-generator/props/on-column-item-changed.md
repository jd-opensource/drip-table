---
title: onColumnItemChanged
toc: content
---

## onColumnItemChanged

- 描述：当新增或删除组合组件子组件时触发
- 类型：

```ts
function(
  type: 'table' | 'column' | 'column-item' | 'column-insert-left' | 'column-insert-right' | 'column-delete',
  payload: Record<string, unknown>,
): void;
```

- 默认值：`undefined`

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */

import { message } from "antd";
import { DripTableExtraOptions, DripTableSchema } from "drip-table";
import DripTableGeneratorProvider from "drip-table-generator";
import React, { useState } from "react";

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      component: "text",
      options: {
        mode: "single",
        maxRow: 1,
      },
    },
    {
      key: "mock_2",
      title: "商品详情",
      align: "center",
      dataIndex: "description",
      component: "text",
      options: {
        mode: "single",
        ellipsis: true,
        maxRow: 1,
      },
    },
    {
      key: "18e5076e9e7-12f3",
      title: "商品图名",
      width: 140,
      align: "center",
      verticalAlign: "middle",
      dataIndex: "",
      component: "group",
      options: {
        layout: [1, 1],
        horizontalAlign: "center",
        verticalAlign: "middle",
        gutter: [8, 8],
        wrap: false,
        items: [
          {
            key: "mock_1_1",
            title: "",
            component: "image",
            options: {
              imageWidth: 86,
              imageHeight: 86,
            },
            dataIndex: "demoPic",
          },
          {
            dataIndex: "",
            align: "center",
            verticalAlign: "middle",
            key: "text_18e50ec870b-1e60",
            title: "",
            component: "text",
            options: {
              mode: "single",
              format: "{{rec}}",
              parts: [
                {
                  dataIndexMode: "direct",
                  dataIndex: "id",
                },
              ],
              showTooltip: true,
            },
          },
        ],
      },
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
    <>
      <DripTableGeneratorProvider
        schema={schema}
        dataSource={dataSource}
        mode={"page"}
        height={480}
        onColumnItemChanged={(type, payload) => {
          message.info(`${type} ${JSON.stringify(payload)}`);
          console.log(type, payload);
        }}
      />
    </>
  );
};

export default Demo;
```
