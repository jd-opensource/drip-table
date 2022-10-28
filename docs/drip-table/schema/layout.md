# 布局差异性配置属性 layout

- 描述：配置卡片模式等多布局差异性的配置
- 类型：
``` typescript
    /**
   * 卡片布局配置 会对table布局进行覆盖
   */
  layout?: {
    card?: {
      /**
       * 会与覆盖最外层的columns并合并
       */
      columns: DripTableSchema<CustomColumnSchema, SubtableDataSourceKey>['columns'];
      /**
       * 一行多少个
       */
      rowSize: number;
    };
  };
```
- 默认值：`undefined`

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";
import "drip-table/dist/index.css";

const schema = {
  innerStyle: {
    background: "#7088ca",
    border: "1px solid #7088ca",
  },
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
    layout: {
    card: {
      columns: [
        {
          key: 'mock_1',
          component: 'image',
          title: '',
          options: {
            imageWidth: '100%',
          },
          dataIndex: 'demoPic',
        },
        {
          key: 'mock_2',
          style: { padding: '0 10px' },
        },
        {
          key: 'mock_3',
          style: { padding: '0 10px' },
        },
        {
          key: 'date-picker_182e8eea517-1239',
          style: { padding: '0 10px' },
        },
        {
          key: 'date-picker_182e8eea517-1240',
          style: { padding: '0 10px' },
        },
        {
          key: 'link_1828c3251ad-1391',
          style: { padding: '0 10px' },
        },
        {
          key: 'rich-text_1828c32cb02-1392',
          style: { padding: '0 10px' },
        },
        {
          key: 'mock_4',
          style: { padding: '0 10px' },
        },
        {
          key: 'mock_5',
          hideInLayout: true,
          style: { padding: '0 10px' },
        },
        {
          key: 'mock_6',
          hideInLayout: true,
        },
        {
          key: 'mock_7',
          hideInLayout: true,
        },
        {
          key: 'mock_8',
          hideInLayout: true,
        },
      ],
      rowSize: 4,
    },
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
    />
  );
};

export default Demo;
```
