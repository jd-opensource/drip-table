# 列头 columns.title

- 描述：表头，组件名
- 类型：

    ```typescript
    type Title = string | {
      style?: Record<string, string> | string;
      body: string | {
        style?: Record<string, string> | string;
        content: string;
      };
      header?: {
        /**
         * 头部自定义样式
         */
        style?: React.CSSProperties;
        /**
         * 头部展示元素配置
         */
        elements?: DripTableGenericRenderElement[];
      };
      footer?: {
        /**
         * 尾部自定义样式
         */
        style?: React.CSSProperties;
        /**
         * 尾部展示元素配置
         */
        elements?: DripTableGenericRenderElement[];
      };
    }
    ```

- 默认值：必填

- 说明：详细参见：[`DripTableSlot 通用插槽功能`](/drip-table/slot)。

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import { PlusCircleTwoTone } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import "antd/dist/antd.css";
import "drip-table/dist/index.css";

const initialSchema = {
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
      title: {
        style: {
          borderTop: "1px solid black",
          'border-bottom': "1px solid black",
          borderLeft: "1px solid black",
        },
        body: "商品详情",
      },
      align: "center",
      dataIndex: "description",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
    {
      key: "mock_3",
      title: {
        style: {
          border: "1px solid black",
        },
        body: "Custom Component",
        footer: {
          elements: [
            {
              type: "slot",
              slot: "insert-column-after",
            },
          ],
        },
      },
      align: "center",
      dataIndex: "description",
      component: "custom::Sample",
      options: {
        someCustomConfigure: "configure-sample",
      },
    },
  ],
};

const dataSource = Array(10).fill(0).map((_, i) => ({
  id: i,
  name: "商品" + i,
  price: 7999,
  status: "onSale",
  description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
}));

const SampleComponent = (props) => (
  <div>Sample: {props.schema.options.someCustomConfigure}</div>
);
SampleComponent.componentName = 'Sample';
SampleComponent.schema = { // https://ajv.js.org/json-schema.html
  properties: {
    someCustomConfigure: { type: 'string' },
  },
};

const Demo = () => {
  const [schema, setSchema] = React.useState(initialSchema);
  const [newIndex, setNewIndex] = React.useState(1);

  return (
    <DripTable
      driver={DripTableDriverAntDesign}
      schema={schema}
      dataSource={dataSource}
      components={{
        custom: {
          Sample: SampleComponent,
        },
      }}
      slots={{
        'insert-column-after': (props) => {
          return <div
            style={{ cursor: 'pointer', display: 'flex', justifyContent: "center", alignItems: "center" }}
            onClick={() => {
              setSchema((prevSchema) => {
                return {
                  ...prevSchema,
                  columns: [
                    ...prevSchema.columns.filter((_, i) => i <= props.columnIndex),
                    {
                      key: uuidv4(),
                      title: {
                        style: {
                          border: "1px solid black",
                        },
                        body: `新建列 (${newIndex})`,
                        footer: {
                          elements: [
                            {
                              type: "slot",
                              slot: "insert-column-after",
                            },
                          ],
                        },
                      },
                      dataIndex: "name",
                      component: "custom::Sample",
                      options: { someCustomConfigure: `sample-${newIndex}` },
                    },
                    ...prevSchema.columns.filter((_, i) => i > props.columnIndex),
                  ],
                };
              });
              setNewIndex((c) => c + 1);
            }}
          >
            <PlusCircleTwoTone />
          </div>;
        },
      }}
    />
  );
};

export default Demo;
```
