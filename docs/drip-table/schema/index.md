---
title: 表格配置 Schema
toc: content
---

## 表格配置 Schema

通过配置该对象，控制表格的展示方式。

### 子项

| 参数名 | 描述 | 必填 | 详情 |
| ----- | ---- | ---- | ---- |
| [id](/drip-table/schema/id) | 表格标识符 | × | [🔗 示例](/drip-table/schema/id) |
| [className](/drip-table/schema/class-name) | 自定义表格类名 | × | [🔗 示例](/drip-table/schema/class-name) |
| [style](/drip-table/schema/style) | 自定义表格样式 | × | [🔗 示例](/drip-table/schema/style) |
| [innerClassName](/drip-table/schema/inner-class-name) | 内部表格组件类名 | × | [🔗 示例](/drip-table/schema/inner-class-name) |
| [innerStyle](/drip-table/schema/inner-style) | 内部表格组件样式 | × | [🔗 示例](/drip-table/schema/inner-style) |
| [columns](/drip-table/schema/columns) | 列定义 | √ | [🔗 示例](/drip-table/schema/columns) |
| [bordered](/drip-table/schema/bordered) | 是否展示表格边框 | × | [🔗 示例](/drip-table/schema/bordered) |
| [showHeader](/drip-table/schema/show-header) | 是否显示表头 | × | [🔗 示例](/drip-table/schema/show-header) |
| [header](/drip-table/schema/header) | 是否展示头部以及配置 | × | [🔗 示例](/drip-table/schema/header) |
| [footer](/drip-table/schema/footer) | 是否展示尾部以及配置 | × | [🔗 示例](/drip-table/schema/footer) |
| [pagination](/drip-table/schema/pagination) | 是否展示分页以及配置 | × | [🔗 示例](/drip-table/schema/pagination) |
| [size](/drip-table/schema/size) | 表格大小 | × | [🔗 示例](/drip-table/schema/size) |
| [sticky](/drip-table/schema/sticky) | 冻结表头 | × | [🔗 示例](/drip-table/schema/sticky) |
| [scroll](/drip-table/schema/scroll) | 固定列、固定表头滚动设置 | × | [🔗 示例](/drip-table/schema/scroll) |
| [rowSelection](/drip-table/schema/row-selection) | 是否支持选择栏 | × | [🔗 示例](/drip-table/schema/row-selection) |
| [rowDraggable](/drip-table/schema/row-draggable) | 是否支持行拖拽 | × | [🔗 示例](/drip-table/schema/row-draggable) |
| [editable](/drip-table/schema/editable) | 是否支持数据编辑 | × | [🔗 示例](/drip-table/schema/editable) |
| [tableLayout](/drip-table/schema/table-layout) | 表格布局属性 | × | [🔗 示例](/drip-table/schema/table-layout) |
| [stripe](/drip-table/schema/stripe) | 表格间隔斑马纹 | × | [🔗 示例](/drip-table/schema/stripe) |
| [virtual](/drip-table/schema/virtual) | 是否开启虚拟滚动 | × | [🔗 示例](/drip-table/schema/virtual) |
| [rowHeight](/drip-table/schema/row-height) | 表格行高（虚拟滚动） | × | [🔗 示例](/drip-table/schema/row-height) |
| [rowKey](/drip-table/schema/row-key) | 表格行主键 | × | [🔗 示例](/drip-table/schema/row-key) |
| [rowSlotKey](/drip-table/schema/row-slot-key) | 行插槽键名 | × | [🔗 示例](/drip-table/schema/row-slot-key) |
| [rowHeader](/drip-table/schema/row-header) | 行头部插槽 | × | [🔗 示例](/drip-table/schema/row-header) |
| [rowFooter](/drip-table/schema/row-footer) | 行尾部插槽 | × | [🔗 示例](/drip-table/schema/row-footer) |
| [span](/drip-table/schema/span) | 行列合并设置 | × | [🔗 示例](/drip-table/schema/span) |
| [emptyText](/drip-table/schema/empty-text) | 表格无数据时提示语 | × | [🔗 示例](/drip-table/schema/empty-text) |
| [subtable](/drip-table/schema/subtable) | 子表设置项 | × | [🔗 示例](/drip-table/schema/subtable) |

### 示例

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable from "drip-table";

const schema = {
  stripe: true,
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
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
   {
    id: 2,
    name: "商品二",
    price: 3003,
    status: "onSale",
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
   {
    id: 3,
    name: "商品三",
    price: 567,
    status: "soldOut",
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
   {
    id: 4,
    name: "商品四",
    price: 7999,
    status: "onSale",
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
  },
   {
    id: 5,
    name: "商品五",
    price: 3211,
    status: "soldOut",
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
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
