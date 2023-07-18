---
title: width
toc: content
---

## width

- 描述：生成器宽度
- 类型：`number`
- 默认值：`undefined`

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */

import { Radio } from "antd";
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
  const [width, setWidth] = useState(500);
  return (
    <>
      <Radio.Group onChange={(e) => setWidth(e.target.value)} value={width}>
        <Radio value={500}>500px</Radio>
        <Radio value={700}>700px</Radio>
        <Radio value={800}>800px</Radio>
        <Radio value={1000}>1000px</Radio>
      </Radio.Group>
      <DripTableGeneratorProvider
        schema={schema}
        dataSource={dataSource}
        mode={"page"}
        width={width}
        height={600}
      />
    </>
  );
};

export default Demo;
```
