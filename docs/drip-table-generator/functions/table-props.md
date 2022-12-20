---
order: 1
title: 透传 Table 属性
---

# 透传 Table 属性

> 如何利用 `drip-table-generator` 传递属性给 `drip-table` 实现属性的配置化。

## 代码演示

```tsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable, { DripTableSchema } from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import DripTableGenerator, {
  DripTableGeneratorHandler,
} from "drip-table-generator";
import "antd/dist/antd.css";
import "drip-table-generator/dist/index.css";

const { Modal, notification } = DripTableDriverAntDesign.components;

const CustomGlobalConfigPanel = {
  mode: "replace",
  configs: [
    {
      name: "ext.loading",
      group: "Table 属性透传",
      "ui:title": "设置 Table 加载状态",
      "ui:type": "switch",
      "ui:props": {},
      type: "boolean",
    },
    {
      name: "ext.onEvent",
      group: "Table 属性透传",
      "ui:title": "信息反馈类型",
      "ui:type": "select",
      "ui:props": {
        options: [
          { label: "通知", value: "notification" },
          { label: "对话框", value: "modal" },
        ],
      },
      type: "string",
    },
    {
      name: "ext.rowSelectable",
      group: "Table 属性透传",
      "ui:title": "行可选择判断",
      "ui:type": "code-editor",
      "ui:layout": {
        labelCol: 8,
        wrapperCol: 16,
        extraRow: true,
        customHelpMsg: true,
      },
      "ui:props": {
        style: {
          height: 128,
          marginTop: "-16px",
        },
      },
      type: "string",
      default: "return rec.id % 2 === 1",
    },
  ],
};

const initialSchema: DripTableSchema = {
  pagination: false,
  columns: [
    {
      key: "mock_2",
      title: "商品名称",
      width: "96px",
      component: "text",
      options: {
        mode: "single",
        maxRow: 2,
      },
      dataIndex: "name",
    },
    {
      key: "mock_3",
      dataIndex: "",
      title: "链接",
      description: "",
      component: "link",
      width: "120px",
      options: {
        mode: "single",
        label: "google",
        event: "google",
        tooltip: "toolip示例{{rec.name}}",
      },
      align: "center",
    },
  ],
  ext: {
    rowSelectable: "return rec.id % 2 === 1",
  },
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
  {
    id: 2,
    name: "商品二",
    price: 6999,
    status: "onSale",
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
];

const Demo = () => {
  const [schema, setSchema] = React.useState(initialSchema);

  return (
    <React.Fragment>
      <DripTableGenerator
        mockDataSource
        schema={initialSchema}
        driver={DripTableDriverAntDesign}
        dataSource={dataSource}
        customGlobalConfigPanel={CustomGlobalConfigPanel}
        onSchemaChange={(data) => setSchema(data)}
      />
      <div> 渲染器 </div>
      <DripTable
        driver={DripTableDriverAntDesign}
        dataSource={dataSource}
        schema={schema}
        loading={schema.ext?.loading}
        rowSelectable={
          schema.ext?.rowSelectable
            ? (rec) => {
                try {
                  return new Function("rec", schema.ext?.rowSelectable)(rec);
                } catch (e) {
                  return true;
                }
                return true;
              }
            : void 0
        }
        onEvent={(event, tableInfo) => {
          const { record, recordIndex } = event;
          if (event.type === "drip-link-click") {
            const name = event.payload;
            const type = schema.ext?.onEvent;
            const message = `你点击了第${recordIndex + 1}行“${record.name} (ID: ${
              record.id
            })”的“${name}”事件按钮。`;
            if (type === "modal") {
              Modal.success({ content: message });
            } else if (type === "notification") {
              notification.success({ message: "Title", description: message });
            }
            console.log(name, record, recordIndex);
          }
        }}
        ajv={{ additionalProperties: true }}
      />
    </React.Fragment>
  );
};

export default Demo;
```
