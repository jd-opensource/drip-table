# 子表配置项 subtableProps

- 描述：子表参数匹配设置，可用于覆盖父表参数透传，当存在多个匹配项时，其优先顺序为：`recordKeys 匹配` > `subtableID 匹配` > `default 兜底`，同优先级配置项按顺序后者覆盖前者。
- 类型：

```typescript
interface DripTableSubtableProps {
  /**
   * 指定表是否默认展开所有子表
   */
  defaultExpandAllRows?: boolean;
  /**
   * 指定表默认展开子表键列表
   */
  defaultExpandedRowKeys?: React.Key[];
}

type SubtableProps = {
  /**
   * 根据子表 id 进行匹配
   */
  subtableID?: DripTableID;
  /**
   * 根据子表所在行 KEY 匹配
   */
  recordKeys?: unknown[];
  /**
   * 默认兜底设置
   */
  default?: boolean;
  /**
   * 子表参数
   */
  properties: DripTableSubtableProps;
}[];
```

- 默认值：`undefined`
- 更多内容：[`defaultExpandAllRows`](/drip-table/props/default-expand-all-rows)、[`defaultExpandedRowKeys`](/drip-table/props/default-expanded-row-keys)

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
  id: 'sample-table-root',
  rowKey: "id",
  rowSelection: true,
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
      title: "商品详情",
      align: "center",
      dataIndex: "description",
      component: "text",
      options: { mode: "single", ellipsis: true, maxRow: 1 },
    },
  ],
  subtable: {
    id: 'sample-table-sub-level-1',
    dataSourceKey: 'subtable',
    rowKey: "id",
    rowSelection: true,
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
      rowKey: "id",
      rowSelection: true,
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
          { id: '1-1-1', name: '苹果', description: '是苹果树的果实，一般呈紅色，但需視品種而定，富含矿物质和维生素', status: 'onSale', price: 799 },
        ],
      },
      {
        id: '1-2',
        name: '梨',
        description: '通常是一种落叶乔木或灌木，极少数品种为常绿，属于蔷薇目蔷薇科苹果族',
        status: 'onSale',
        price: 799,
        subtableLevel2: [
          { id: '1-2-1', name: '苹果', description: '是苹果树的果实，一般呈紅色，但需視品種而定，富含矿物质和维生素', status: 'onSale', price: 799 },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "商品二",
    price: 7999,
    status: "onSale",
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    subtable: [
      {
        id: '2-1',
        name: '苹果',
        description: '是苹果树的果实，一般呈紅色，但需視品種而定，富含矿物质和维生素',
        status: 'onSale',
        price: 799,
        subtableLevel2: [
          { id: '2-1-1', name: '苹果', description: '是苹果树的果实，一般呈紅色，但需視品種而定，富含矿物质和维生素', status: 'onSale', price: 799 },
        ],
      },
      {
        id: '2-2',
        name: '梨',
        description: '通常是一种落叶乔木或灌木，极少数品种为常绿，属于蔷薇目蔷薇科苹果族',
        status: 'onSale',
        price: 799,
        subtableLevel2: [
          { id: '2-2-1', name: '苹果', description: '是苹果树的果实，一般呈紅色，但需視品種而定，富含矿物质和维生素', status: 'onSale', price: 799 },
        ],
      },
    ],
  },
];

const Demo = () => {
  return (
    <DripTable
      driver={DripTableDriverAntDesign}
      schema={schema}
      dataSource={dataSource}
      subtableProps={[
        {
          recordKeys: [1],
          properties: {
            defaultExpandAllRows: false,
            defaultExpandedRowKeys: ['1-1'],
          },
        },
        {
          subtableID: 'sample-table-sub-level-1',
          properties: {
            defaultExpandAllRows: true,
          },
        },
        {
          default: true,
          properties: {
            defaultExpandAllRows: false,
          },
        },
      ]}
      defaultExpandedRowKeys={[1]}
    />
  );
};

export default Demo;
```
