---
title: 设置展示列 setDisplayColumnKeys
toc: content
---

## 设置表格展示列 setDisplayColumnKeys

- 描述：设置表格展示列，设置当前表格展示的列数据
- 类型：`(displayColumnKeys: string[]) => void`

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import { message, Checkbox } from "antd";
import React from "react";
import DripTable from "drip-table";

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      hidable: true,
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
      hidable: true,
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
    subtableLevel2: [
      { id: '1-1', name: '苹果', description: '是苹果树的果实，一般呈紅色，但需視品種而定，富含矿物质和维生素', status: 'onSale', price: 799 },
    ],
  },
];

const Demo = () => {
  const ref = React.useRef([]);

  return (
    <React.Fragment>
      {
        schema.columns.filter(c => c.hidable).map(c => (
          <Checkbox key={c.key} defaultChecked={true} onChange={(e) => {
            if (!ref.current) {
              return;
            }
            let displayColumnKeys = ref.current.displayColumnKeys.length
              ? ref.current.displayColumnKeys
              : schema.columns.filter(c => c.hidable).map(c => c.key);
            if (e.target.checked && !displayColumnKeys.includes(c.key)) {
              displayColumnKeys = [...displayColumnKeys, c.key];
            } else if (!e.target.checked) {
              displayColumnKeys = displayColumnKeys.filter(k => k !== c.key);
            }
            ref.current.setDisplayColumnKeys(displayColumnKeys);
            message.info(`设置当前展示列为 ${JSON.stringify(displayColumnKeys)}`);
          }}>
            {c.title}
          </Checkbox>
        ))
      }
      <DripTable
        ref={ref}
        schema={schema}
        dataSource={dataSource}
      />
    </React.Fragment>
  );
};

export default Demo;
```
