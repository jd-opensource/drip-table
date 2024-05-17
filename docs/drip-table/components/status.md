---
title: 状态组件 Status
toc: content
---

## 状态组件 status

- 描述：状态组件

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable from "drip-table";

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      component: "text",
      align: "center",
      options: {
        mode: "single",
        maxRow: 1,
      },
    },
    {
      key: "mock_2",
      title: "状态",
      dataIndex: "status",
      component: "status",
      align: "center",
      options: {
        dotSize: 5,
        statuses: [
          { value: "onSale", color: "green", text: "在售" },
          { value: "soldOut", color: "red", text: "售罄" },
        ],
      },
    },
  ],
};

const dataSource = [
  { id: 1, name: "商品一", status: "onSale" },
  { id: 2, name: "商品二", status: "soldOut" },
  { id: 3, name: "商品三", status: "unknown" },
];

const Demo = () => {
  return (
    <React.Fragment>
      <DripTable schema={schema} dataSource={dataSource} />
    </React.Fragment>
  );
};

export default Demo;
```

## 参数总览

| 参数名                                                      | 描述                   | 必填                              | 详情                                                  |
| ---------------------------------------------------------- | ---------------------- | --------------------------------- | ---------------------------------------------------- |
| [color](/drip-table/components/status#color)               | 颜色                    | ×                                 | [🔗 示例](/drip-table/components/status#color)    |
| [statuses](/drip-table/components/status#statuses)         | 不同状态的差异性配置     | ×                                 | [🔗 示例](/drip-table/components/status#statuses)    |

## color

- 颜色
- 类型：`string`
- 默认值：`undefined`

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable from "drip-table";

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      component: "text",
      align: "center",
      options: {
        mode: "single",
        maxRow: 1,
      },
    },
    {
      key: "mock_2",
      title: "状态",
      dataIndex: "status",
      component: "status",
      align: "center",
      options: {
        color: "gray",
        dotSize: 5,
        statuses: [
          { value: "onSale", color: "green", text: "在售" },
          { value: "soldOut", color: "red", text: "售罄" },
        ],
      },
    },
  ],
};

const dataSource = [
  { id: 1, name: "商品一", status: "onSale" },
  { id: 2, name: "商品二", status: "soldOut" },
  { id: 3, name: "商品三", status: "unknown" },
];

const Demo = () => {
  return (
    <React.Fragment>
      <DripTable schema={schema} dataSource={dataSource} />
    </React.Fragment>
  );
};

export default Demo;
```

## dotSize

- 颜色
- 类型：`string`
- 默认值：`undefined`

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable from "drip-table";

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      component: "text",
      align: "center",
      options: {
        mode: "single",
        maxRow: 1,
      },
    },
    {
      key: "mock_2",
      title: "状态",
      dataIndex: "status",
      component: "status",
      align: "center",
      options: {
        color: "gray",
        dotSize: 5,
        statuses: [
          { value: "onSale", color: "green", text: "在售" },
          { value: "soldOut", color: "red", text: "售罄" },
        ],
      },
    },
  ],
};

const dataSource = [
  { id: 1, name: "商品一", status: "onSale" },
  { id: 2, name: "商品二", status: "soldOut" },
  { id: 3, name: "商品三", status: "unknown" },
];

const Demo = () => {
  return (
    <React.Fragment>
      <DripTable schema={schema} dataSource={dataSource} />
    </React.Fragment>
  );
};

export default Demo;
```

## statuses

- 不同状态的差异性配置
- 类型：

```typescript
type Statuses = (Omit<DTCStatusColumnSchemaOptions, 'statuses'> & {
  /**
   * 匹配的状态值
   */
  value?: unknown;
  /**
   * 展示文案
   */
  text?: string;
})[]
```

- 默认值：`undefined`

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable from "drip-table";

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      component: "text",
      align: "center",
      options: {
        mode: "single",
        maxRow: 1,
      },
    },
    {
      key: "mock_2",
      title: "状态",
      dataIndex: "status",
      component: "status",
      align: "center",
      options: {
        dotSize: 5,
        statuses: [
          { value: "onSale", color: "green", text: "在售" },
          { value: "soldOut", color: "red", text: "售罄" },
        ],
      },
    },
  ],
};

const dataSource = [
  { id: 1, name: "商品一", status: "onSale" },
  { id: 2, name: "商品二", status: "soldOut" },
  { id: 3, name: "商品三", status: "unknown", dotSize: 0 },
];

const Demo = () => {
  return (
    <React.Fragment>
      <DripTable schema={schema} dataSource={dataSource} />
    </React.Fragment>
  );
};

export default Demo;
```
