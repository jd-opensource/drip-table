---
title: 文本组件 Text
toc: content
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
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
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

| 参数名                                                   | 描述                   | 必填                              | 详情                                                |
| -------------------------------------------------------- | ---------------------- | --------------------------------- | --------------------------------------------------- |
| [mode](/drip-table/components/text#mode)                 | 换行模式               | √                                 | [🔗 示例](/drip-table/components/text#mode)         |
| [fontSize](/drip-table/components/text#fontsize)         | 字体大小               | ×                                 | [🔗 示例](/drip-table/components/text#fontsize)     |
| [fontWeight](/drip-table/components/text#fontweight)     | 字体大小               | ×                                 | [🔗 示例](/drip-table/components/text#fontweight)   |
| [format](/drip-table/components/text#format)             | 自定义渲染格式化字符串 | ×（当 `mode` 为 `custom` 时必填） | [🔗 示例](/drip-table/components/text#format)       |
| [i18n](/drip-table/components/text#i18n)                 | 内容展示翻译文案       | ×                                 | [🔗 示例](/drip-table/components/text#i18n)         |
| [defaultValue](/drip-table/components/text#defaultvalue) | 兜底文案               | ×                                 | [🔗 示例](/drip-table/components/text#defaultvalue) |
| [prefix](/drip-table/components/text#prefix)             | 前缀文案               | ×                                 | [🔗 示例](/drip-table/components/text#prefix)       |
| [suffix](/drip-table/components/text#suffix)             | 后缀文案               | ×                                 | [🔗 示例](/drip-table/components/text#suffix)       |
| [parts](/drip-table/components/text#parts)               | 多行文本段落配置       | ×                                 | [🔗 示例](/drip-table/components/text#parts)        |
| [maxRow](/drip-table/components/text#maxrow)             | 最大行数               | ×                                 | [🔗 示例](/drip-table/components/text#maxrow)       |
| [lineHeight](/drip-table/components/text#lineheight)     | 行高                   | ×                                 | [🔗 示例](/drip-table/components/text#lineheight)   |
| [ellipsis](/drip-table/components/text#ellipsis)         | 超出部分显示省略号     | ×                                 | [🔗 示例](/drip-table/components/text#ellipsis)     |
| [showTooltip](/drip-table/components/text#showtooltip)   | 展示提示框             | ×                                 | [🔗 示例](/drip-table/components/text#showtooltip)  |
| [tooltip](/drip-table/components/text#tooltip)           | 提示框设置项             | ×                                 | [🔗 示例](/drip-table/components/text#tooltip)  |
| [placement](/drip-table/components/text#placement)       | 提示框显示位置         | ×                                 | [🔗 示例](/drip-table/components/text#placement)    |

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

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      component: "text",
      options: {
        mode: "single",
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
    <React.Fragment>
      <DripTable schema={schema} dataSource={dataSource} />
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

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      component: "text",
      options: {
        mode: "multiple",
        parts: [{ dataIndex: "name" }, { dataIndex: "price" }],
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
    <React.Fragment>
      <DripTable schema={schema} dataSource={dataSource} />
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

const schema = {
  pagination: {
    size: 'small',
    pageSize: 2,
    position: 'bottomCenter',
  },
  columns: [
    {
      key: "mock_1",
      title: "序号",
      dataIndex: "name",
      component: "text",
      width: "80px",
      align: "center",
      options: {
        mode: "custom",
        format:
          "{{props.recordIndex + 1}}",
      },
    },
    {
      key: "mock_2",
      title: "商品名称",
      dataIndex: "name",
      component: "text",
      options: {
        mode: "custom",
        format:
          "这是一个自定义渲染，商品名称为“{{props.record.name}}”，价格为“{{props.record.price}}元”。",
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
  {
    id: 2,
    name: "商品二",
    price: 7999,
    status: "onSale",
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
  {
    id: 3,
    name: "商品三",
    price: 7999,
    status: "onSale",
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
  {
    id: 4,
    name: "商品四",
    price: 7999,
    status: "onSale",
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
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

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品名称",
      dataIndex: "name",
      component: "text",
      options: {
        mode: "single",
        fontSize: "32px",
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
    <React.Fragment>
      <DripTable schema={schema} dataSource={dataSource} />
    </React.Fragment>
  );
};

export default Demo;
```

## fontWeight

- 描述：字重大小
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
      options: {
        mode: "single",
        fontWeight: "bold",
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
    <React.Fragment>
      <DripTable schema={schema} dataSource={dataSource} />
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
          onSale: "售卖中",
        },
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
    <React.Fragment>
      <DripTable schema={schema} dataSource={dataSource} />
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

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品价格",
      dataIndex: "price",
      component: "text",
      options: {
        mode: "single",
        defaultValue: "无数据",
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
  {
    id: 2,
    name: "商品二",
    status: "onSale",
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
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

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品价格",
      dataIndex: "price",
      component: "text",
      options: {
        mode: "single",
        prefix: "￥",
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
    <React.Fragment>
      <DripTable schema={schema} dataSource={dataSource} />
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

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品价格",
      dataIndex: "price",
      component: "text",
      options: {
        mode: "single",
        suffix: "元",
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
    <React.Fragment>
      <DripTable schema={schema} dataSource={dataSource} />
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
      },
      width: "100px",
    },
    {
      key: "mock_2",
      title: "商品价格",
      dataIndex: "price",
      component: "text",
      options: {
        mode: "single",
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
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
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

const schema = {
  columns: [
    {
      key: "mock_1",
      title: "商品价格",
      dataIndex: "price",
      component: "text",
      options: {
        mode: "single",
        lineHeight: 5,
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
    <React.Fragment>
      <DripTable schema={schema} dataSource={dataSource} />
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
        ellipsis: true,
      },
      width: "100px",
    },
    {
      key: "mock_2",
      title: "商品价格",
      dataIndex: "price",
      component: "text",
      options: {
        mode: "single",
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
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
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
        ellipsis: true,
      },
      width: "100px",
    },
    {
      key: "mock_2",
      title: "商品价格",
      dataIndex: "price",
      component: "text",
      options: {
        mode: "single",
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
      description:
        "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    },
  ]);
  return (
    <React.Fragment>
      <DripTable
        schema={schema}
        dataSource={dataSource}
        onDataSourceChange={React.useMemo(
          () => (ds) => {
            setDataSource(ds);
          },
          []
        )}
      />
    </React.Fragment>
  );
};

export default Demo;
```

## showTooltip

- 描述：显示或隐藏提示框

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import { Switch } from "antd";
import React from "react";
import DripTable from "drip-table";

const Demo = () => {
  const [dataSource, setDataSource] = React.useState([
    {
      id: 1,
      name: "商品一",
      price: 7999,
      status: "onSale",
      description:
        "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    },
  ]);
  const [showTooltip, setShowTooltip] = React.useState(false);

  const schema = React.useMemo(() => {
    return {
      editable: true,
      columns: [
        {
          key: "mock_1",
          title: "商品描述",
          dataIndex: "description",
          component: "text",
          options: {
            mode: "single",
            maxRow: 1,
            ellipsis: true,
            showTooltip: showTooltip,
          },
          width: "100px",
        },
        {
          key: "mock_2",
          title: "商品价格",
          dataIndex: "price",
          component: "text",
          options: {
            mode: "single",
            showTooltip: showTooltip,
          },
          width: "100px",
        },
      ],
    };
  }, [showTooltip]);
  return (
    <React.Fragment>
      <Switch
        checked={showTooltip}
        onChange={(checked) => setShowTooltip(checked)}
      />
      <DripTable
        schema={schema}
        dataSource={dataSource}
        onDataSourceChange={React.useMemo(
          () => (ds) => {
            setDataSource(ds);
          },
          []
        )}
      />
    </React.Fragment>
  );
};

export default Demo;
```

## tooltip

- 描述：提示框设置项

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import { Switch } from "antd";
import React from "react";
import DripTable from "drip-table";

const Demo = () => {
  const [dataSource, setDataSource] = React.useState([
    {
      id: 1,
      name: "商品一",
      price: 7999,
      status: "onSale",
      description:
        "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    },
  ]);

  const schema = React.useMemo(() => {
    return {
      editable: true,
      columns: [
        {
          key: "mock_1",
          title: "商品描述",
          dataIndex: "description",
          component: "text",
          options: {
            mode: "single",
            maxRow: 1,
            ellipsis: true,
            tooltip: {
              style: {
                background: '#ff4f78',
              },
              content: 'TOOLTIP!!!',
            },
          },
          width: "100px",
        },
        {
          key: "mock_2",
          title: "商品价格",
          dataIndex: "price",
          component: "text",
          options: {
            mode: "single",
            tooltip: {
              style: {
                background: '#ff4f78',
              },
            },
          },
          width: "100px",
        },
      ],
    };
  }, []);
  return (
    <React.Fragment>
      <DripTable
        schema={schema}
        dataSource={dataSource}
        onDataSourceChange={React.useMemo(
          () => (ds) => {
            setDataSource(ds);
          },
          []
        )}
      />
    </React.Fragment>
  );
};

export default Demo;
```

## placement

- 描述：提示框显示位置，位置有 12 个方向。

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import { Button } from "antd";
import React from "react";
import DripTable from "drip-table";

const buttonWidth = 100;

const Demo = () => {
  const [dataSource, setDataSource] = React.useState([
    {
      id: 1,
      name: "商品一",
      price: 7999,
      status: "onSale",
      description:
        "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    },
  ]);
  const [placement, setPlacement] = React.useState("top");

  const schema = React.useMemo(() => {
    return {
      editable: true,
      columns: [
        {
          key: "mock_1",
          title: "商品描述",
          dataIndex: "description",
          component: "text",
          options: {
            mode: "single",
            maxRow: 1,
            ellipsis: true,
            showTooltip: true,
            placement,
          },
          width: "100px",
        },
        {
          key: "mock_2",
          title: "商品价格",
          dataIndex: "price",
          component: "text",
          options: {
            mode: "single",
            showTooltip: true,
            placement,
          },
          width: "100px",
        },
      ],
    };
  }, [placement]);
  return (
    <React.Fragment>
      <div className="demo">
        <div style={{ marginLeft: buttonWidth, whiteSpace: "nowrap" }}>
          <Button
            type={placement === "topLeft" ? "primary" : undefined}
            style={{ width: buttonWidth }}
            onClick={() => setPlacement("topLeft")}
          >
            topLeft
          </Button>
          <Button
            type={placement === "top" ? "primary" : undefined}
            style={{ width: buttonWidth }}
            onClick={() => setPlacement("top")}
          >
            top
          </Button>
          <Button
            type={placement === "topRight" ? "primary" : undefined}
            style={{ width: buttonWidth }}
            onClick={() => setPlacement("topRight")}
          >
            topRight
          </Button>
        </div>
        <div style={{ width: buttonWidth, float: "left" }}>
          <Button
            type={placement === "leftTop" ? "primary" : undefined}
            style={{ width: buttonWidth }}
            onClick={() => setPlacement("leftTop")}
          >
            leftTop
          </Button>
          <Button
            type={placement === "left" ? "primary" : undefined}
            style={{ width: buttonWidth }}
            onClick={() => setPlacement("left")}
          >
            left
          </Button>
          <Button
            type={placement === "leftBottom" ? "primary" : undefined}
            style={{ width: buttonWidth }}
            onClick={() => setPlacement("leftBottom")}
          >
            leftBottom
          </Button>
        </div>
        <div style={{ width: buttonWidth, marginLeft: buttonWidth * 4 }}>
          <Button
            type={placement === "rightTop" ? "primary" : undefined}
            style={{ width: buttonWidth }}
            onClick={() => setPlacement("rightTop")}
          >
            rightTop
          </Button>
          <Button
            type={placement === "right" ? "primary" : undefined}
            style={{ width: buttonWidth }}
            onClick={() => setPlacement("right")}
          >
            right
          </Button>
          <Button
            type={placement === "rightBottom" ? "primary" : undefined}
            style={{ width: buttonWidth, padding: "4px 8px" }}
            onClick={() => setPlacement("rightBottom")}
          >
            rightBottom
          </Button>
        </div>
        <div
          style={{
            marginLeft: buttonWidth,
            clear: "both",
            whiteSpace: "nowrap",
          }}
        >
          <Button
            type={placement === "bottomLeft" ? "primary" : undefined}
            style={{ width: buttonWidth }}
            onClick={() => setPlacement("bottomLeft")}
          >
            bottomLeft
          </Button>
          <Button
            type={placement === "bottom" ? "primary" : undefined}
            style={{ width: buttonWidth }}
            onClick={() => setPlacement("bottom")}
          >
            bottom
          </Button>
          <Button
            type={placement === "bottomRight" ? "primary" : undefined}
            style={{ width: buttonWidth, padding: "4px 8px" }}
            onClick={() => setPlacement("bottomRight")}
          >
            bottomRight
          </Button>
        </div>
      </div>
      <DripTable
        schema={schema}
        dataSource={dataSource}
        onDataSourceChange={React.useMemo(
          () => (ds) => {
            setDataSource(ds);
          },
          []
        )}
      />
    </React.Fragment>
  );
};

export default Demo;
```
