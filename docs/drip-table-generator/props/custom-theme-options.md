---
order: 4
title: customThemeOptions
toc: content
---

# 自定义主题配置

- 描述：自定义主题样式和配置
- 类型：`string`
- 默认值：`undefined`
- 说明：需要配合 `drip-table` 插槽 [`slots`](/drip-table/props/slots) 属性使用。

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
import DripTableGenerator from "drip-table-generator";
import "antd/dist/antd.css";

const schema = {
  rowSelection: true,
  bordered: false,
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
    priceId: "M202221812921",
    status: "onSale",
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
  {
    id: 2,
    name: "商品二",
    price: 7999,
    priceId: "M202221812921",
    status: "onSale",
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
  {
    id: 3,
    name: "商品三",
    price: 7999,
    priceId: "M202221812921",
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
      driver={DripTableDriverAntDesign}
      dataSource={dataSource}
      defaultTheme="custom"
      customThemeOptions={[
        {
          label: "自定义主题",
          value: "custom",
          image:
            "https://img10.360buyimg.com/imagetools/jfs/t1/206517/7/13472/646006/61c17984Ea158ac20/7281cce7d847bd30.jpg",
          style: {
            rowSelection: true,
            bordered: false,
            innerStyle: {
              borderRadius: "8px",
              borderWidth: "0",
            },
            rowHeader: {
              style: {
                padding: "0 18px 0 18px",
                background: "#fafafa",
                borderRadius: "12px 12px 0 0",
                border: "1px solid #f0f1f4",
                marginTop: "12px",
              },
              elements: [
                {
                  type: "slot",
                  slot: "slot-price-id",
                },
                {
                  type: "spacer",
                  span: "flex-auto",
                },
                {
                  type: "text",
                  text: "🛒行头部插槽",
                  style: { marginRight: "20px" },
                },
              ],
            },
          },
        },
      ]}
      defaultMode="preview"
      slots={{
        "slot-price-id": React.memo((props) => (
          <div
            style={{
              fontSize: "14px",
              margin: "12px 20px 12px 16px",
              lineHeight: "22px",
              display: "flex",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "24px",
                background: "rgba(235,237,243,1)",
                borderRadius: "4px",
                padding: "3px 8px",
                color: "#393C5A",
                lineHeight: "18px",
                fontSize: "12px",
              }}
            >
              公开询价
            </div>
            <div
              style={{
                marginLeft: "12px",
                color: "#77798E",
                lineHeight: "24px",
                fontSize: "14px",
              }}
            >
              询价单 ID: {props.record.priceId}
            </div>
          </div>
        )),
        default: (props) => <div>{`未知插槽类型：${props.slotType}`}</div>,
      }}
    />
  );
};

export default Demo;
```
