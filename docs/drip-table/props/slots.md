---
order: 15
title: 组件插槽
---

## 组件插槽 slots

- 描述：组件插槽，可通过 Schema 控制自定义区域渲染
- 类型：

  ```typescript
  interface {
    [componentType: string]: React.JSXElementConstructor<{
      style?: React.CSSProperties;
      className?: string;
      slotType: string;
      driver: DripTableDriver;
      schema: DripTableSchema<NonNullable<ExtraOptions['CustomColumnSchema']>, NonNullable<ExtraOptions['SubtableDataSourceKey']>>;
      dataSource: readonly RecordType[];
      onSearch: (searchParams: Record<string, unknown>) => void;
    }>;
  };
  ```

- 默认值：`undefined`
- 说明：[表格组件插槽](./slots)

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import React from "react";
import { Button } from "antd";
import DripTable from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";
import "drip-table/dist/index.css";

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
  header: {
    elements: [
      { type: 'spacer', span: 'flex-auto' },
      { type: 'slot', slot: 'header-slot-sample', data: { from: 'Header' } },
    ],
  },
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
  return (
    <DripTable
      driver={DripTableDriverAntDesign}
      schema={schema}
      dataSource={dataSource}
      slots={{
        'header-slot-sample': React.memo((props) => {
          const [state, setState] = React.useState({ count: 0 });
          return (
            <div className={props.className} style={{ border: '1px solid #1890ff', borderRadius: '3px' }}>
              <Button type="primary" onClick={() => setState(st => ({ count: st.count + 1 }))}>{props.data.from} Slot Sample</Button>
              <span style={{ padding: '0 8px', color: '#1890ff' }}>{ `Count: ${state.count}` }</span>
            </div>
          );
        }),
        default: props => <div>{ `未知插槽类型：${props.slotType}` }</div>,
      }}
    />
  );
};

export default Demo;
```
