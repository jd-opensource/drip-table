---
title: slotsSchema
toc: content
---

## slotsSchema

- 描述：配置头部插槽组件的属性
- 类型：`{ [componentType: string]: DTGComponentPropertySchema[]; }`
- 默认值：`{}`

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */

import { Button, Input } from "antd";
import { DripTableExtraOptions, DripTableSchema } from "drip-table";
import DripTableGenerator from "drip-table-generator";
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
      schema={schema}
      dataSource={dataSource}
      slots={{
        "header-slot-sample": React.memo((props) => {
          const [state, setState] = React.useState({ count: 0 });
          console.log(props);
          return (
            <div
              className={props.className}
              style={{ border: "1px solid #1890ff", borderRadius: "3px" }}
            >
              <Button
                type="primary"
                onClick={() => setState((st) => ({ count: st.count + 1 }))}
              >
                {props.title}
              </Button>
              <span
                style={{ padding: "0 8px", color: "#1890ff" }}
              >{`Count: ${state.count}`}</span>
            </div>
          );
        }),
        default: (props) => <div>{`未知插槽类型：${props.slotType}`}</div>,
      }}
      slotsSchema={{
        "header-slot-sample": [
          {
            name: "title",
            group: "",
            "ui:title": "插槽自定义属性",
            "ui:type": "input",
            "ui:props": {},
            type: "string",
          },
        ],
      }}
    />
  );
};

export default Demo;
```
