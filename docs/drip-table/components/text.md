---
order: 1
title: 文本组件 Text
---

## 文本组件 text

- 描述：文本组件

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";

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
];

const Demo = () => {
  return (
    <React.Fragment>
      <DripTable
        driver={DripTableDriverAntDesign}
        schema={schema}
        dataSource={dataSource}
      />
    </React.Fragment>
  );
};

export default Demo;
```

## 参数总览

| 参数名 | 描述 | 必填 | 详情 |
| ----- | ---- | ---- | ---- |
| [mode](/drip-table/components/text#mode) | 换行模式 | √ | [🔗 示例](/drip-table/components/text#mode) |
| [fontSize](/drip-table/components/text#fontsize) | 字体大小 | × | [🔗 示例](/drip-table/components/text#fontsize) |
| [format](/drip-table/components/text#format) | 自定义渲染格式化字符串 | ×（当 `mode` 为 `custom` 时必填） | [🔗 示例](/drip-table/components/text#format) |
| [i18n](/drip-table/components/text#i18n) | 内容展示翻译文案 | × | [🔗 示例](/drip-table/components/text#i18n) |
| [defaultValue](/drip-table/components/text#defaultvalue) | 兜底文案 | × | [🔗 示例](/drip-table/components/text#defaultvalue) |
| [prefix](/drip-table/components/text#prefix) | 前缀文案 | × | [🔗 示例](/drip-table/components/text#prefix) |
| [suffix](/drip-table/components/text#suffix) | 后缀文案 | × | [🔗 示例](/drip-table/components/text#suffix) |
| [parts](/drip-table/components/text#parts) | 多行文本段落配置 | × | [🔗 示例](/drip-table/components/text#parts) |
| [maxRow](/drip-table/components/text#maxrow) | 最大行数 | × | [🔗 示例](/drip-table/components/text#maxrow) |
| [lineHeight](/drip-table/components/text#lineheight) | 行高 | × | [🔗 示例](/drip-table/components/text#lineheight) |
| [ellipsis](/drip-table/components/text#ellipsis) | 超出部分显示省略号 | × | [🔗 示例](/drip-table/components/text#ellipsis) |

## mode

- 渲染模式
- 类型：`'single' | 'multiple' | 'custom'`
- 默认值：`undefined`

### mode = "single"

> 单数据渲染模式，将通过 `dataIndex` 字段获取数据直接用于单元格渲染。

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      component: "text",
      options: {
        mode: "single"
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
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
];

const Demo = () => {
  return (
    <React.Fragment>
      <DripTable
        driver={DripTableDriverAntDesign}
        schema={schema}
        dataSource={dataSource}
      />
    </React.Fragment>
  );
};

export default Demo;
```

### mode = "multiple"

> 多数据渲染模式，将通过 `parts` 字段获取数据列表用于单元格渲染。

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      component: "text",
      options: {
        mode: "multiple",
        parts: [
          { dataIndex: "name" },
          { dataIndex: "price" }
        ]
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
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
];

const Demo = () => {
  return (
    <React.Fragment>
      <DripTable
        driver={DripTableDriverAntDesign}
        schema={schema}
        dataSource={dataSource}
      />
    </React.Fragment>
  );
};

export default Demo;
```

### mode = "custom"

> 自定义渲染模式，将通过 `format` 字段获取格式化字符用于单元格渲染，可通过嵌入双花括号插入代码块通过 `props.record` 获取该行数据。

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      component: "text",
      options: {
        mode: "custom",
        format: "这是一个自定义渲染，商品名称为“{{props.record.name}}”，价格为“{{props.record.price}}元”。"
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
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
];

const Demo = () => {
  return (
    <React.Fragment>
      <DripTable
        driver={DripTableDriverAntDesign}
        schema={schema}
        dataSource={dataSource}
      />
    </React.Fragment>
  );
};

export default Demo;
```

## fontSize

- 描述：字体大小
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
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      component: "text",
      options: {
        mode: "single",
        fontSize: "32px"
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
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
];

const Demo = () => {
  return (
    <React.Fragment>
      <DripTable
        driver={DripTableDriverAntDesign}
        schema={schema}
        dataSource={dataSource}
      />
    </React.Fragment>
  );
};

export default Demo;
```

## format

- 描述：自定义渲染格式化字符串
- 类型：`string`
- 默认值：`undefined`
- 示例参见：[`mode = "custom"`](/drip-table/components/text#mode--custom)

## i18n

- 描述：内容展示翻译文案，当需要对行数据做枚举转换时可配置该字段。
- 类型：`Record<string, string>`
- 默认值：`undefined`

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "status",
      component: "text",
      options: {
        mode: "single",
        i18n: {
          onSale: "售卖中"
        }
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
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
];

const Demo = () => {
  return (
    <React.Fragment>
      <DripTable
        driver={DripTableDriverAntDesign}
        schema={schema}
        dataSource={dataSource}
      />
    </React.Fragment>
  );
};

export default Demo;
```

## defaultValue

- 描述：兜底文案
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
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品价格",
      dataIndex: "price",
      component: "text",
      options: {
        mode: "single",
        defaultValue: "无数据"
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
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
  {
    id: 2,
    name: "商品二",
    status: "onSale",
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
];

const Demo = () => {
  return (
    <React.Fragment>
      <DripTable
        driver={DripTableDriverAntDesign}
        schema={schema}
        dataSource={dataSource}
      />
    </React.Fragment>
  );
};

export default Demo;
```

## prefix

- 描述：前缀文案
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
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品价格",
      dataIndex: "price",
      component: "text",
      options: {
        mode: "single",
        prefix: "￥"
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
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
];

const Demo = () => {
  return (
    <React.Fragment>
      <DripTable
        driver={DripTableDriverAntDesign}
        schema={schema}
        dataSource={dataSource}
      />
    </React.Fragment>
  );
};

export default Demo;
```

## suffix

- 描述：后缀文案
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
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品价格",
      dataIndex: "price",
      component: "text",
      options: {
        mode: "single",
        suffix: "元"
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
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
];

const Demo = () => {
  return (
    <React.Fragment>
      <DripTable
        driver={DripTableDriverAntDesign}
        schema={schema}
        dataSource={dataSource}
      />
    </React.Fragment>
  );
};

export default Demo;
```

## parts

- 描述：多行文本段落配置
- 类型：

```typescript
 type Parts = {
  dataIndex: string | string[];
  /**
    * 内容展示翻译文案
    */
  i18n?: Record<string, string>;
  /**
    * 前缀文案
    */
  prefix?: string;
  /**
    * 后缀文案
    */
  suffix?: string;
}[];
```

- 默认值：`undefined`
- 示例参见： [`dataIndex`](/drip-table/components/text#mode--multiple)、[`i18n`](/drip-table/components/text#i18n)、[`prefix`](/drip-table/components/text#prefix)、[`suffix`](/drip-table/components/text#suffix)

## maxRow

- 描述：最大行数
- 类型：`number`
- 默认值：`undefined`

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品描述",
      dataIndex: "description",
      component: "text",
      options: {
        mode: "single",
        maxRow: 1
      },
      width: "100px",
    },
    {
      key: "mock_2",
      title: "商品价格",
      dataIndex: "price",
      component: "text",
      options: {
        mode: "single"
      },
      width: "100px",
    },
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
];

const Demo = () => {
  return (
    <React.Fragment>
      <DripTable
        driver={DripTableDriverAntDesign}
        schema={schema}
        dataSource={dataSource}
      />
    </React.Fragment>
  );
};

export default Demo;
```

## lineHeight

- 描述：行高
- 类型：`number`
- 默认值：`undefined`

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品价格",
      dataIndex: "price",
      component: "text",
      options: {
        mode: "single",
        lineHeight: 5
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
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
];

const Demo = () => {
  return (
    <React.Fragment>
      <DripTable
        driver={DripTableDriverAntDesign}
        schema={schema}
        dataSource={dataSource}
      />
    </React.Fragment>
  );
};

export default Demo;
```

## ellipsis

- 描述：超出部分显示省略号
- 类型：`boolean`
- 默认值：`undefined`

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品描述",
      dataIndex: "description",
      component: "text",
      options: {
        mode: "single",
        maxRow: 1,
        ellipsis: true
      },
      width: "100px",
    },
    {
      key: "mock_2",
      title: "商品价格",
      dataIndex: "price",
      component: "text",
      options: {
        mode: "single"
      },
      width: "100px",
    },
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
];

const Demo = () => {
  return (
    <React.Fragment>
      <DripTable
        driver={DripTableDriverAntDesign}
        schema={schema}
        dataSource={dataSource}
      />
    </React.Fragment>
  );
};

export default Demo;
```

## schema.editable

- 描述：支持编辑模式

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";

const schema = {
  editable: true,
  columns: [
    {
      key: "mock_1",
      title: "商品描述",
      dataIndex: "description",
      component: "text",
      options: {
        mode: "single",
        maxRow: 2,
        ellipsis: true
      },
      width: "100px",
    },
    {
      key: "mock_2",
      title: "商品价格",
      dataIndex: "price",
      component: "text",
      options: {
        mode: "single"
      },
      width: "100px",
    },
  ],
};

const Demo = () => {
  const [dataSource, setDataSource] = React.useState([
    {
      id: 1,
      name: "商品一",
      price: 7999,
      status: "onSale",
      description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    },
  ]);
  return (
    <React.Fragment>
      <DripTable
        driver={DripTableDriverAntDesign}
        schema={schema}
        dataSource={dataSource}
        onDataSourceChange={React.useMemo(() => (ds) => {
          setDataSource(ds);
        }, [])}
      />
    </React.Fragment>
  );
};

export default Demo;
```
