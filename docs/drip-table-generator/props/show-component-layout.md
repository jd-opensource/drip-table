---
title: showComponentLayout
toc: content
---

## showComponentLayout

- 描述：是否展示组件栏
- 类型：`boolean`
- 默认值：`true`

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */


import { Button } from 'antd';
import { DripTableExtraOptions, DripTableSchema } from 'drip-table';
import DripTableGenerator from 'drip-table-generator';
import React, { useState } from 'react';

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
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
];

const Demo = () => {
  const [showComponentLayout, setShowComponentLayout] = useState(false);
  return (
    <>
    <Button
      onClick={() => setShowComponentLayout(!showComponentLayout) }
      type="primary"
      style={{ margin: '8px 0' }}
    >点击切换组件栏</Button>
    <DripTableGenerator
      showComponentLayout={showComponentLayout}
      schema={schema}
      dataSource={dataSource}
    />
    </>
  );
};

export default Demo;
```
