---
title: 自定义多选 renderSelection
toc: content
---

## 自定义多选 renderSelection

- 描述：使用自定义多选替换表格多选。
- 类型：`React.ComponentType`
- 默认值：`undefined`

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable from "drip-table";
import { Checkbox } from "antd";

const schema = {
  rowSelection: true,
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      component: "text",
      options: { mode: "single", maxRow: 1 },
    },
    {
      key: "mock_2",
      title: "商品详情",
      align: "center",
      dataIndex: "description",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
  ],
};

const dataSource = Array(200).fill(0).map((_, i) => ({
  id: i,
  name: "商品" + i,
  price: 7999,
  status: "onSale",
  description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
}));

const Demo = () => {
  return (
    <DripTable
      schema={schema}
      dataSource={dataSource}
      renderSelection={(props) => (
        <div>
          <div>自定义多选：</div>
          <div>{ JSON.stringify(props) }</div>
          <Checkbox
            checked={props.checked}
            disabled={props.disabled}
            onChange={(e) => { props.onChange(e.target.checked); }}
          />
        </div>
      )}
    />
  );
};

export default Demo;
```
