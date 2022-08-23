# 子表顶部渲染函数 subtableTitle

- 描述：子表顶部自定义渲染函数
- 类型：

```typescript
  type SubtableTitle = (
    record: RecordType,
    recordIndex: number,
    tableInfo: DripTableTableInformation<RecordType, ExtraOptions>,
  ) => React.ReactNode;
```

- 默认值：`undefined`
- 更多内容：[`DripTableTableInformation<RecordType, ExtraOptions>`](/drip-table/types/table-information)

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import React from "react";
import DripTable from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";
import "drip-table/dist/index.css";

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
  subtable: {
    id: 'sample-table-sub-level-1',
    dataSourceKey: 'subtable',
    columns: [
      {
        key: 'mock_1',
        title: '页面名称',
        align: 'center',
        dataIndex: 'name',
        component: 'text',
        options: {
          mode: 'single',
          maxRow: 1,
        },
      },
      {
        key: 'mock_2',
        title: '开始/结束时间',
        align: 'center',
        hidable: true,
        dataIndex: 'description',
        component: 'text',
        options: {
          mode: 'single',
          ellipsis: true,
          maxRow: 3,
        },
      },
    ],
    showHeader: false,
    bordered: true,
    subtable: {
      id: 'sample-table-sub-level-2',
      dataSourceKey: 'subtableLevel2',
      columns: [
        {
          key: 'mock_1',
          title: '页面名称',
          align: 'center',
          dataIndex: 'name',
          component: 'text',
          options: {
            mode: 'single',
            maxRow: 1,
          },
        },
        {
          key: 'mock_7',
          title: '操作',
          align: 'center',
          hidable: true,
          dataIndex: 'operate',
          component: 'link',
          options: {
            mode: 'multiple',
            operates: [
              { name: 'order', label: '订购', href: './#order', target: '_blank' },
              { name: 'view', label: '查看', href: './#view' },
              { name: 'edit', label: '编辑', event: 'edit' },
              { name: 'remove', label: '删除', event: 'remove' },
            ],
          },
        },
      ],
    },
  },
};

const dataSource = [
  {
    id: 1,
    name: "商品一",
    price: 7999,
    status: "onSale",
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    subtable: [
      {
        id: '1-1',
        name: '苹果',
        description: '是苹果树的果实，一般呈紅色，但需視品種而定，富含矿物质和维生素',
        status: 'onSale',
        price: 799,
        subtableLevel2: [
          { id: '1-1', name: '苹果', description: '是苹果树的果实，一般呈紅色，但需視品種而定，富含矿物质和维生素', status: 'onSale', price: 799 },
        ],
      },
      { id: '1-2', name: '梨', description: '通常是一种落叶乔木或灌木，极少数品种为常绿，属于蔷薇目蔷薇科苹果族', status: 'onSale', price: 799 },
    ],
  },
];

const Demo = () => {
  return (
    <DripTable
      driver={DripTableDriverAntDesign}
      schema={schema}
      dataSource={dataSource}
      subtableTitle={(record, index, tableInfo) => <div style={{ textAlign: 'center' }}>{ `“表格(id:${tableInfo.parent.schema.id})”行“${tableInfo.parent.record.name}”的子表 （${tableInfo.dataSource.length} 条）` }</div>}
    />
  );
};

export default Demo;
```
