---
title: 行列合并 span
toc: content
---

## 行列合并设置项 span

- 描述：行列合并设置项
- 类型：

```typescript
type DripTableColumnSchemaSpanConfig = string
  | [
    rowIndex: number,
    columnIndex: number,
    rowSpan: number,
    columnSpan: number,
  ][]
  | {
    rectangles?: [
      rowIndex: number,
      columnIndex: number,
      rowSpan: number,
      columnSpan: number,
    ][];
    generator?: string;
  };
```

- 默认值：`undefined`

## 完整配置

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import { message } from "antd";
import React from "react";
import DripTable from "drip-table";

const schema = {
  rowKey: "id",
  bordered: true,
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
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
    {
      key: "mock_3",
      title: "商品状态",
      align: "center",
      dataIndex: "status",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
    {
      key: "mock_4",
      title: "商品价格",
      align: "center",
      dataIndex: "price",
      component: "text",
      hidable: true,
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
  ],
  span: {
    generator: `
      if (props.record.id == 2 && props.column.key == 'mock_2') {
        return { rowSpan: 2, colSpan: 2 }
      }
    `,
    rectangles: [
      [4, 1, 1, 2],
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
  {
    id: 2,
    name: '商品二',
    price: 6488,
    status: 'onSale',
    description: '商品二、商品三绑定销售中（onSale）',
  },
  {
    id: 3,
    name: '商品三',
    price: 2099,
    status: 'onSale',
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
  {
    id: 4,
    name: '商品四',
    price: 5999,
    status: 'onSale',
    description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。',
  },
  {
    id: 5,
    name: '商品五',
    price: 109.9,
    status: 'onSale',
    description: '商品五不可用',
  },
  {
    id: 6,
    name: '商品六',
    price: 1312.4,
    status: 'onSale',
    description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。',
  },
];

const Demo = () => {
  return (
    <DripTable
      schema={schema}
      dataSource={dataSource}
    />
  );
};

export default Demo;
```

## 简洁配置

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import { message } from "antd";
import React from "react";
import DripTable from "drip-table";

const schema = {
  rowKey: "id",
  bordered: true,
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
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
    {
      key: "mock_3",
      title: "商品状态",
      align: "center",
      dataIndex: "status",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
    {
      key: "mock_4",
      title: "商品价格",
      align: "center",
      dataIndex: "price",
      component: "text",
      hidable: true,
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
  ],
  span: `
    if (props.record.id == 2 && props.column.key == 'mock_2') {
      return { rowSpan: 2, colSpan: 2 }
    }
    if (props.record.id == 5 && props.column.key == 'mock_2') {
      return { rowSpan: 1, colSpan: 2 }
    }
  `,
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
    name: '商品二',
    price: 6488,
    status: 'onSale',
    description: '商品二、商品三绑定销售中（onSale）',
  },
  {
    id: 3,
    name: '商品三',
    price: 2099,
    status: 'onSale',
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
  {
    id: 4,
    name: '商品四',
    price: 5999,
    status: 'onSale',
    description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。',
  },
  {
    id: 5,
    name: '商品五',
    price: 109.9,
    status: 'onSale',
    description: '商品五不可用',
  },
  {
    id: 6,
    name: '商品六',
    price: 1312.4,
    status: 'onSale',
    description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。',
  },
];

const Demo = () => {
  return (
    <DripTable
      schema={schema}
      dataSource={dataSource}
    />
  );
};

export default Demo;
```

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import { message } from "antd";
import React from "react";
import DripTable from "drip-table";

const schema = {
  rowKey: "id",
  bordered: true,
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
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
    {
      key: "mock_3",
      title: "商品状态",
      align: "center",
      dataIndex: "status",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
    {
      key: "mock_4",
      title: "商品价格",
      align: "center",
      dataIndex: "price",
      component: "text",
      hidable: true,
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
  ],
  span: [
    [1, 1, 2, 2],
    [4, 1, 1, 2],
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
    name: '商品二',
    price: 6488,
    status: 'onSale',
    description: '商品二、商品三绑定销售中（onSale）',
  },
  {
    id: 3,
    name: '商品三',
    price: 2099,
    status: 'onSale',
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
  {
    id: 4,
    name: '商品四',
    price: 5999,
    status: 'onSale',
    description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。',
  },
  {
    id: 5,
    name: '商品五',
    price: 109.9,
    status: 'onSale',
    description: '商品五不可用',
  },
  {
    id: 6,
    name: '商品六',
    price: 1312.4,
    status: 'onSale',
    description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。',
  },
];

const Demo = () => {
  return (
    <DripTable
      schema={schema}
      dataSource={dataSource}
    />
  );
};

export default Demo;
```

## 列选择、拖拽

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import { message } from "antd";
import React from "react";
import DripTable from "drip-table";

const schema = {
  rowKey: "id",
  rowSelection: true,
  rowDraggable: true,
  bordered: true,
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
      key: "mock_3",
      title: "商品状态",
      align: "center",
      dataIndex: "status",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
    {
      key: "mock_4",
      title: "商品价格",
      align: "center",
      dataIndex: "price",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
  ],
  span: {
    generator: `
      if (props.record.id == 2 && props.column.key == 'mock_2') {
        return { rowSpan: 2, colSpan: 2 }
      }
    `,
    rectangles: [
      [4, 1, 1, 3],
    ],
  },
  header: {
    elements: [
      { type: 'display-column-selector' },
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
  {
    id: 2,
    name: '商品二',
    price: 6488,
    status: 'onSale',
    description: '商品二、商品三绑定销售中（onSale）',
  },
  {
    id: 3,
    name: '商品三',
    price: 2099,
    status: 'onSale',
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
  {
    id: 4,
    name: '商品四',
    price: 5999,
    status: 'onSale',
    description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。',
  },
  {
    id: 5,
    name: '商品五',
    price: 109.9,
    status: 'onSale',
    description: '商品五不可用',
  },
  {
    id: 6,
    name: '商品六',
    price: 1312.4,
    status: 'onSale',
    description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。',
  },
];

const Demo = () => {
  return (
    <DripTable
      schema={schema}
      dataSource={dataSource}
    />
  );
};

export default Demo;
```

## 列隐藏

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import { message } from "antd";
import React from "react";
import DripTable from "drip-table";

const schema = {
  rowKey: "id",
  bordered: true,
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
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
    {
      key: "mock_3",
      title: "商品状态",
      align: "center",
      dataIndex: "status",
      component: "text",
      hidable: true,
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
    {
      key: "mock_4",
      title: "商品价格",
      align: "center",
      dataIndex: "price",
      component: "text",
      hidable: true,
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
  ],
  span: {
    generator: `
      if (props.record.id == 2 && props.column.key == 'mock_2') {
        return { rowSpan: 2, colSpan: 2 }
      }
    `,
    rectangles: [
      [4, 1, 1, 3],
    ],
  },
  header: {
    elements: [
      { type: 'display-column-selector' },
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
  {
    id: 2,
    name: '商品二',
    price: 6488,
    status: 'onSale',
    description: '商品二、商品三绑定销售中（onSale）',
  },
  {
    id: 3,
    name: '商品三',
    price: 2099,
    status: 'onSale',
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
  {
    id: 4,
    name: '商品四',
    price: 5999,
    status: 'onSale',
    description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。',
  },
  {
    id: 5,
    name: '商品五',
    price: 109.9,
    status: 'onSale',
    description: '商品五不可用',
  },
  {
    id: 6,
    name: '商品六',
    price: 1312.4,
    status: 'onSale',
    description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。',
  },
];

const Demo = () => {
  return (
    <DripTable
      schema={schema}
      dataSource={dataSource}
    />
  );
};

export default Demo;
```

## 行插槽

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import { message } from "antd";
import React from "react";
import DripTable from "drip-table";

const schema = {
  rowKey: "id",
  bordered: true,
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
      key: "mock_3",
      title: "商品状态",
      align: "center",
      dataIndex: "status",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
    {
      key: "mock_4",
      title: "商品价格",
      align: "center",
      dataIndex: "price",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
  ],
  span: {
    generator: `
      if (props.record.id == 2 && props.column.key == 'mock_2') {
        return { rowSpan: 2, colSpan: 2 }
      }
    `,
    rectangles: [
      [4, 1, 1, 3],
    ],
  },
  rowHeader: {
    style: {
      background: "#dfe8ff",
      border: "1px solid #dfe8ff",
      marginTop: '5px',
      paddingLeft: '10px',
    },
    elements: [
      {
        type: 'text',
        text: '行头部插槽',
        style: { marginRight: '20px' },
      },
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
  {
    id: 2,
    name: '商品二',
    price: 6488,
    status: 'onSale',
    description: '商品二、商品三绑定销售中（onSale）',
  },
  {
    id: 3,
    name: '商品三',
    price: 2099,
    status: 'onSale',
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
  {
    id: 4,
    name: '商品四',
    price: 5999,
    status: 'onSale',
    description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。',
  },
  {
    id: 5,
    name: '商品五',
    price: 109.9,
    status: 'onSale',
    description: '商品五不可用',
  },
  {
    id: 6,
    name: '商品六',
    price: 1312.4,
    status: 'onSale',
    description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。',
  },
];

const Demo = () => {
  return (
    <DripTable
      schema={schema}
      dataSource={dataSource}
      rowHeaderVisible={(record, index, parent) => index !== 2}
    />
  );
};

export default Demo;
```
