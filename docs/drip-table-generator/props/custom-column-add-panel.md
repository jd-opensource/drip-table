---
title: customColumnAddPanel
toc: content
---

## customColumnAddPanel

- 描述：自定义表格列添加面板
- 类型：

```ts
function(props: {
    tableConfig?: DTGTableConfig;
    components: DripTableComponentAttrConfig[];
  }): ReactNode;
```

- 默认值：`undefined`

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */

import { Input } from "antd";
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
        customColumnAddPanel={(...args) => {
          console.log(args);
          return (
            <div
              style={{
                padding: "6px",
                background: "#efefef",
                boxShadow: "0 0 4px 0 #333",
              }}
            >
              <h3>添加面板</h3>
              <Input />
            </div>
          );
        }}
      />
    </>
  );
};

export default Demo;
```
