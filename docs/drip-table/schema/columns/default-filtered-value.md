---
order: 20
title: 过滤器默认值
---

## 过滤器默认值 columns.defaultFilteredValue

- 描述：默认数据过滤器值
- 类型：`React.Key[] | null`
- 默认值：`undefined`

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import { message } from "antd";
import React from "react";
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
    {
      key: 'mock_3',
      title: '库存状态',
      width: 150,
      align: 'center',
      dataIndex: 'status',
      description: '这是一条提示信息',
      hidable: true,
      filters: [
        { text: '售卖中', value: 'onSale' },
        { text: '已售罄', value: 'soldOut' },
      ],
      defaultFilteredValue: ['onSale'],
      component: 'text',
      options: {
        mode: 'single',
        i18n: {
          onSale: '售卖中',
          soldOut: '已售罄',
        },
      },
    },
  ],
};

const dataSource = Array(100).fill(0).map((_, i) => ({
  id: i + 1,
  name: `商品${i + 1}`,
  price: 7999,
  status: Math.random() > 0.5 ? "onSale" : "soldOut",
  description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
}));

const Demo = () => {
  const [ds, setDS] = React.useState(dataSource);
  return (
    <DripTable
      driver={DripTableDriverAntDesign}
      schema={schema}
      dataSource={ds}
      onChange={({ pagination, filters }) => {
        if (filters.status?.length) {
          setDS(dataSource.filter(d => filters.status.includes(d.status)));
        } else {
          setDS(dataSource);
        }
        message.info(`过滤器：${JSON.stringify(filters)}，分页器：current = ${pagination.current}, pageSize = ${pagination.pageSize}。`);
        console.log('onChange', pagination, filters);
      }}
    />
  );
};

export default Demo;
```
