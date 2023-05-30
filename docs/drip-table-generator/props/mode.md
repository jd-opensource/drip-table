---
title: mode
toc: content
---

## mode

- 描述：生成器展示模式，目前支持内置页面组件和弹框两种形式
- 类型：`modal` | `page`
- 默认值：`false`

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */

import { Button } from "antd";
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
  const [mode, setMode] = useState("page");
  return (
    <>
      <Button
        onClick={() => setMode(mode === "page" ? "modal" : "page")}
        type="primary"
        style={{ margin: "8px 0" }}
      >
        点击切换展示形式
      </Button>
      <DripTableGeneratorProvider
        schema={schema}
        dataSource={dataSource}
        mode={mode}
        onClose={() => setMode("page")}
      />
    </>
  );
};

export default Demo;
```
