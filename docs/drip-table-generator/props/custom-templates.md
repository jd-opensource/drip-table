---
title: customTemplates
toc: content
---

## customTemplates

- 描述：自定义模板，可传入多个
- 类型：`DripTableGeneratorTemplate[]`
- 默认值：`[]`

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */

import { Switch } from "antd";
import { DripTableExtraOptions, DripTableSchema } from "drip-table";
import DripTableGeneratorProvider from "drip-table-generator";
import React, { useState } from "react";

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
    <>
      <DripTableGeneratorProvider
        schema={schema}
        dataSource={dataSource}
        mode={"page"}
        showTemplate
        customTemplates={[
          {
            key: "custom-template",
            label: "自定义模板",
            previewImg:
              "https://img12.360buyimg.com/imagetools/jfs/t1/110370/7/39274/1039/642e347aFb6fa2807/d43cfbb9a1bda8cf.png",
            schema: {
              pagination: {
                pageSize: 20,
                position: "bottomRight",
              },
              columns: [
                {
                  key: "text_18722ec0161-1323",
                  dataIndex: "id",
                  title: "标识",
                  component: "text",
                  options: {
                    mode: "single",
                    format: "{{rec}}",
                    parts: [
                      {
                        dataIndex: "id",
                      },
                    ],
                  },
                  align: "center",
                  verticalAlign: "middle",
                },
                {
                  key: "text_18722ec0683-132a",
                  dataIndex: "name",
                  title: "名称",
                  component: "text",
                  options: {
                    mode: "single",
                    format: "{{rec}}",
                    parts: [
                      {
                        dataIndex: "id",
                      },
                    ],
                  },
                  align: "center",
                  verticalAlign: "middle",
                },
              ],
            },
          },
        ]}
        height={480}
      />
    </>
  );
};

export default Demo;
```
