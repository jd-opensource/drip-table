---
title: 排序器 sorter
toc: content
---

## 表格排序器 sorter

- 描述：表格排序器，获取当前表格排序器数据
- 类型：`IDripTableContext<RecordType, ExtraOptions>['state']['sorter']`

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import { message, Button } from "antd";
import React from "react";
import DripTable from "drip-table";

const schema = {
  columns: [
    {
      key: "mock_0",
      title: "商品ID",
      dataIndex: "id",
      sorter: 'return props.leftValue > props.rightValue',
      sortDirections: ['ascend', 'descend'],
      component: "text",
      options: {
        mode: "single",
        maxRow: 1,
      },
    },
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      sorter: 'return props.leftValue > props.rightValue',
      sortDirections: ['ascend'],
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
  {
    id: 3,
    name: "商品三",
    price: 7999,
    status: "onSale",
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
  {
    id: 2,
    name: "商品二",
    price: 7999,
    status: "onSale",
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
];

const Demo = () => {
  const [ds, setDS] = React.useState(dataSource);
  const ref = React.useRef(null);

  const onClick = React.useCallback(() => {
    if (!ref.current) {
      return;
    }
    if (!ref.current.sorter.key) {
      message.info(`当前排序为 默认排序`);
    } else {
      message.info(`当前排序为 ${ref.current.sorter.key} 列 ${ref.current.sorter.direction === 'ascend' ? '升序' : '降序'}`);
    }
  }, []);

  return (
    <React.Fragment>
      <DripTable
        ref={ref}
        schema={schema}
        dataSource={ds}
        onSorterChange={(sorter) => {
          if (sorter.comparer) {
            setDS([...dataSource].sort(sorter.comparer));
          } else {
            setDS(dataSource);
          }
        }}
      />
      <div style={ { display: 'flex', justifyContent: 'center', margin: '10px 0' } }>
        <Button type="primary" onClick={onClick}>获取排序状态</Button>
      </div>
    </React.Fragment>
  );
};

export default Demo;
```
