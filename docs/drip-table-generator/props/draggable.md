---
title: draggable
toc: content
---

## draggable

- 描述：编辑模式下生成器的列是否允许拖拽
- 类型：`boolean`
- 默认值：`true`

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */

import { Switch } from "antd";
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
  const [draggable, setDraggable] = useState(true);
  return (
    <>
      <span>展示表格工具栏</span>
      <Switch
        checkedChildren="开启"
        unCheckedChildren="关闭"
        checked={!!draggable}
        onChange={(checked) => setShowToolbar(checked)}
      />
      <DripTableGeneratorProvider
        schema={schema}
        dataSource={dataSource}
        mode={"page"}
        draggable={draggable}
        height={480}
      />
    </>
  );
};

export default Demo;
```
