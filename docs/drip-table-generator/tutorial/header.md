---
title: 头部配置
toc: content
---

## 表格头部配置

> 本篇主要介绍如何利用 `drip-table-generator` 的头部属性配置搭建表格头部组件。

## 表格头部内置组件配置

`drip-table-generator` 的头部目前支持“列展示筛选器”、“空白栏”、“文本框”、“搜索框”、“添加按钮”这几种内置组件，满足大部分业务需求。

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */

import { Input } from "antd";
import { DripTableExtraOptions, DripTableSchema } from "drip-table";
import DripTableGenerator from "drip-table-generator";
import React, { useState } from "react";

const schema = {
  header: {
    style: {
      margin: "0",
      padding: "12px 0",
    },
    elements: [
      {
        type: "display-column-selector",
        selectorButtonText: "列显隐控制",
      },
      {
        type: "text",
        span: 2,
        align: "flex-start",
        text: "表格标题",
      },
      {
        type: "spacer",
        style: {
          width: "360px",
        },
      },
      {
        type: "search",
        wrapperStyle: {},
        align: "flex-end",
        allowClear: true,
        searchButtonText: "搜索",
      },
      {
        type: "insert-button",
        align: "flex-end",
        insertButtonText: "添加商品",
        showIcon: true,
      },
    ],
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
      hidable: true,
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
      hidable: true,
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
  return (
    <DripTableGenerator
      mockDataSource
      schema={schema}
      dataSource={dataSource}
    />
  );
};

export default Demo;
```

## 表格头部插槽配置

针对特殊场景用户可以自己定义插槽，插槽可以放置自定义组件。

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */

import { Button, Input } from "antd";
import { DripTableExtraOptions, DripTableSchema } from "drip-table";
import DripTableGenerator from "drip-table-generator";
import React, { useState } from "react";

const schema = {
  header: {
    style: {
      margin: "0",
      padding: "12px 0",
    },
    elements: [
      {
        type: "slot",
        slot: "header-slot-sample",
        props: {
          title: "Title Click Count",
        },
      },
    ],
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
      hidable: true,
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
      hidable: true,
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
  return (
    <DripTableGenerator
      mockDataSource
      schema={schema}
      dataSource={dataSource}
      slots={{
        "header-slot-sample": React.memo((props) => {
          const [state, setState] = React.useState({ count: 0 });
          return (
            <div
              className={props.className}
              style={{ border: "1px solid #1890ff", borderRadius: "3px" }}
            >
              <Button
                type="primary"
                onClick={() => setState((st) => ({ count: st.count + 1 }))}
              >
                {props.title}
              </Button>
              <span
                style={{ padding: "0 8px", color: "#1890ff" }}
              >{`Count: ${state.count}`}</span>
            </div>
          );
        }),
        default: (props) => <div>{`未知插槽类型：${props.slotType}`}</div>,
      }}
      slotsSchema={{
        "header-slot-sample": [
          {
            name: "title",
            group: "",
            "ui:title": "插槽自定义属性",
            "ui:type": "input",
            "ui:props": {},
            type: "string",
          },
        ],
      }}
    />
  );
};

export default Demo;
```

## 表格头部插槽属性配置

对于自定义插槽，用户需要配置组件，可以通过 `drip-table-generator` 的 `slotsSchema` 属性配置。

具体属性参见属性配置[🔗 示例](/drip-table-generator/props/slots-schema)。
