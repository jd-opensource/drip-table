# 插槽配置 slot.elements

- 描述：插槽展示元素配置
- 类型：[`DripTableSlotElementSchema[]`](/drip-table/types/slot-schema)
- 默认值：`undefined`

## 使用方法

- 该属性为通用插槽 Schema 控制渲染系统的配置部分，其数据类型为若干个对象组成的数组，每个子元素即为一个插槽渲染块。
- 表格通用插槽渲染器将对该配置项从左向右依次渲染，根据分析每个子元素配置项的宽度对齐方式等通用属性，通过栅格系统进行布局。
- 具体数据类型，参见 [通用插槽渲染器 Schema 配置项文档](/drip-table/types/slot-schema) 。

### 占位区域 (SpacerSlot)

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
import "drip-table/dist/index.css";

const schema = {
  header: {
    style: {
      background: "#dfe8ff",
      border: "1px solid #dfe8ff",
    },
    elements: [{ type: 'spacer' }],
  },
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

### 文本展示 (TextSlot)

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
import "drip-table/dist/index.css";

const schema = {
  header: {
    style: {
      background: "#dfe8ff",
      border: "1px solid #dfe8ff",
    },
    elements: [{
      type: 'text',
      text: '自定义文本样例',
    }],
  },
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

### 富文本展示 (HTMLSlot)

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
import "drip-table/dist/index.css";

const schema = {
  header: {
    style: {
      background: "#dfe8ff",
      border: "1px solid #dfe8ff",
    },
    elements: [{
      type: 'html',
      html: '<span style="font-size: 20px; color: #2a64ff; border: 1px solid #2a64ff">自定义富文本样例</span>',
    }],
  },
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

### 基本搜索 (SearchSlot)

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
import "drip-table/dist/index.css";

const schema = {
  header: {
    style: {
      background: "#dfe8ff",
      border: "1px solid #dfe8ff",
    },
    elements: [{
      type: 'search',
      wrapperClassName: 'demo-search-wrapper',
      wrapperStyle: {
        border: '1px solid #2a64ff',
      },
      placeholder: '输入关键字开始搜索',
      allowClear: true,
      searchButtonText: '搜索',
      searchButtonSize: 'middle',
      searchKeys: [
        { label: '商品名称', value: 'product_name' },
        { label: '店铺名称', value: 'store_name' },
      ],
      searchKeyDefaultValue: 'product_name',
    }],
  },
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

### 自定义组件插槽 Sample1 (CustomSlot)

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
import "drip-table/dist/index.css";

const schema = {
  header: {
    style: {
      background: "#dfe8ff",
      border: "1px solid #dfe8ff",
    },
    elements: [{
      type: 'slot',
      slot: 'CustomSlotComponentSample1',
    }],
  },
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
      slots={{
        CustomSlotComponentSample1: (props) => <div className={props.className}>CustomSlotComponentSample1</div>,
        CustomSlotComponentSample2: (props) => <div className={props.className}>CustomSlotComponentSample2: {props.text}</div>,
        default: (props) => (
          <span
            className={props.className}
            style={{
              padding: "3px 8px",
              fontSize: "14px",
              color: "#ff0000",
              background: "#feebeb",
              border: "1px solid #ff0000",
              boxSizing: "border-box",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >{ `错误提示：自定义插槽组件渲染函数 tableProps.slots['${props.slotType}'] 不存在` }</span>
        ),
      }}
    />
  );
};

export default Demo;
```

### 自定义组件插槽 Sample2 (CustomSlot)

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
import "drip-table/dist/index.css";

const schema = {
  header: {
    style: {
      background: "#dfe8ff",
      border: "1px solid #dfe8ff",
    },
    elements: [{
      type: 'slot',
      slot: 'CustomSlotComponentSample2',
      props: { text: '自定义数据属性' },
    }],
  },
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
      slots={{
        CustomSlotComponentSample1: (props) => <div className={props.className}>CustomSlotComponentSample1</div>,
        CustomSlotComponentSample2: (props) => <div className={props.className}>CustomSlotComponentSample2: {props.text}</div>,
        default: (props) => (
          <span
            className={props.className}
            style={{
              padding: "3px 8px",
              fontSize: "14px",
              color: "#ff0000",
              background: "#feebeb",
              border: "1px solid #ff0000",
              boxSizing: "border-box",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >{ `错误提示：自定义插槽组件渲染函数 tableProps.slots['${props.slotType}'] 不存在` }</span>
        ),
      }}
    />
  );
};

export default Demo;
```

### 自定义组件插槽 SampleUnknown (CustomSlot)

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
import "drip-table/dist/index.css";

const schema = {
  header: {
    style: {
      background: "#dfe8ff",
      border: "1px solid #dfe8ff",
    },
    elements: [{
      type: 'slot',
      slot: 'CustomSlotComponentSampleUnknown',
    }],
  },
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
      slots={{
        CustomSlotComponentSample1: (props) => <div className={props.className}>CustomSlotComponentSample1</div>,
        CustomSlotComponentSample2: (props) => <div className={props.className}>CustomSlotComponentSample2: {props.text}</div>,
        default: (props) => (
          <span
            className={props.className}
            style={{
              padding: "3px 8px",
              fontSize: "14px",
              color: "#ff0000",
              background: "#feebeb",
              border: "1px solid #ff0000",
              boxSizing: "border-box",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >{ `错误提示：自定义插槽组件渲染函数 tableProps.slots['${props.slotType}'] 不存在` }</span>
        ),
      }}
    />
  );
};

export default Demo;
```

### 插入按钮 (InsertButtonSlot)

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
import "drip-table/dist/index.css";

const schema = {
  header: {
    style: {
      background: "#dfe8ff",
      border: "1px solid #dfe8ff",
    },
    elements: [{
      type: 'insert-button',
      insertButtonClassName: 'demo-insert-button',
      insertButtonStyle: {
        fontSize: '12px',
      },
      insertButtonText: '插入',
      showIcon: true,
    }],
  },
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

### 展示列选择器 (DisplayColumnSelectorSlot)

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
import "drip-table/dist/index.css";

const schema = {
  header: {
    style: {
      background: "#dfe8ff",
      border: "1px solid #dfe8ff",
    },
    elements: [{
      type: 'display-column-selector',
      selectorButtonText: '请选择展示列',
      selectorButtonType: 'primary',
    }],
  },
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

### 伸缩布局

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
import "drip-table/dist/index.css";

const schema = {
  header: {
    style: {
      background: "#dfe8ff",
      border: "1px solid #dfe8ff",
    },
    elements: [
      {
        type: 'html',
        html: '<span style="font-size: 20px; color: #2a64ff; border: 1px solid #2a64ff">靠左</span>',
      },
      {
        type: 'html',
        html: '<span style="font-size: 20px; color: #2a64ff; border: 1px solid #2a64ff">居中伸缩</span>',
        span: 'flex-auto',
      },
      {
        type: 'html',
        html: '<span style="font-size: 20px; color: #2a64ff; border: 1px solid #2a64ff">靠右</span>',
      },
    ],
  },
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
