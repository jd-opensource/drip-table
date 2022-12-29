---
title: 行头插槽 rowHeader
toc: content
---

## 行头插槽配置 rowHeader

- 描述：行头插槽配置
- 类型：

    ```typescript
    type RowHeader = {
      /**
        * 头部自定义样式
        */
      style?: React.CSSProperties;
      /**
        * 头部展示元素配置
        */
      elements?: DripTableGenericRenderElement[];
    } | boolean;
    ```

- 默认值：`undefined`
- 说明：详细参见：[`DripTableSlot 通用插槽功能`](/drip-table/slot)。

## 使用方法

- 同 [通用插槽渲染器 Schema 配置项文档](/drip-table/scheam/header) 。

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable from "drip-table";
import { Button } from "antd";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";

const schema = {
  rowSelection: true,
  bordered: true,
  rowHeader: {
    style: {
      background: "#dfe8ff",
      border: "1px solid #dfe8ff",
      marginTop: '5px',
      paddingLeft: '10px',
    },
    elements: [
      {
        type: 'slot',
        slot: 'row-slot-sample',
      },
      {
        type: 'spacer',
        span: 'flex-auto',
      },
      {
        type: 'text',
        text: '行头部插槽',
        style: { marginRight: '20px' },
      },
    ],
  },
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      component: "text",
      hidable: true,
      options: { mode: "single", maxRow: 1 },
    },
    {
      key: "mock_2",
      title: "商品详情",
      align: "center",
      dataIndex: "description",
      component: "text",
      hidable: true,
      options: { mode: "single", ellipsis: true, maxRow: 1 },
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
    id: 2,
    name: "商品二",
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
];

const Demo = () => {
  return (
    <DripTable
      style={{ margin: '10px' }}
      driver={DripTableDriverAntDesign}
      schema={schema}
      dataSource={dataSource}
      slots={{
        'row-slot-sample': React.memo((props) => {
          const [state, setState] = React.useState({ count: 0 });
          return (
            <React.Fragment>
              <div style={{ fontSize: '1.17em', margin: '12px 20px 12px 0', lineHeight: '32px' }}>🛒 {props.record?.name}</div>
              <div className={props.className} style={{ border: '1px solid #1890ff', borderRadius: '3px' }}>
                <Button type="primary" onClick={() => setState(st => ({ count: st.count + 1 }))}>Row Slot Sample</Button>
                <span style={{ padding: '0 8px', color: '#1890ff' }}>{ `Count: ${state.count}` }</span>
              </div>
            </React.Fragment>
          );
        }),
        default: props => <div>{ `未知插槽类型：${props.slotType}` }</div>,
      }}
    />
  );
};

export default Demo;
```
