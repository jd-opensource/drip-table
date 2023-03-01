---
title: 布局差异化 Layout
toc: content
---

## 布局差异化 Layout

通过布局差异化，控制表格的整体模式，如相册模式。

### 子项

| 布局名 | 描述 | 必填 | 详情 |
| ----- | ---- | ---- | ---- |
| [卡片布局](/drip-table/layout/card-layout) | 表格布局方式配置 | × | [🔗 示例](/drip-table/layout/card-layout) |

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
  innerStyle: {
    background: "#7088ca",
    border: "1px solid #7088ca",
  },
  columns: [
    {
      key: 'mock_1',
      title: '商品图名',
      width: 140,
      align: 'center',
      verticalAlign: 'middle',
      dataIndex: '',
      component: 'group',
      options: {
        layout: [1, 1],
        horizontalAlign: 'center',
        verticalAlign: 'middle',
        gutter: [16, 8],
        wrap: false,
        items: [
          {
            component: 'image',
            options: {
              imageWidth: 86,
              imageHeight: 86,
            },
            dataIndex: 'demoPic',
          },
          {
            component: 'text',
            options: {
              mode: 'single',
            },
            dataIndex: 'name',
          },
        ],
      },
    },
    {
      key: 'mock_2',
      title: '商品详情',
      width: 200,
      align: 'center',
      hidable: true,
      dataIndex: 'description',
      component: 'text',
      clipboard: true,
      options: {
        mode: 'single',
        ellipsis: true,
        maxRow: 3,
      },
    },
    {
      key: 'link_1828c3251ad-1391',
      dataIndex: '',
      title: '链接',
      description: '',
      component: 'link',
      options: {
        mode: 'single',
        label: 'google',
        href: 'www.google.com',
        target: '',
        event: '',
        operates: [],
        tooltip: 'toolip示例{{rec.name}}',
      },
      align: 'center',
    },
    {
      key: 'rich-text_1828c32cb02-1392',
      dataIndex: '',
      title: '富文本',
      description: '',
      component: 'rich-text',
      options: {
        render: '<p><strong>{{rec.name}}</strong></p>',
        tooltip: 'toolip示例{{rec.name}}',
      },
      align: 'center',
    },
    {
      key: 'mock_3',
      title: '库存状态',
      width: 150,
      align: 'center',
      dataIndex: 'status',
      description: '这是一条提示信息',
      hidable: true,
      filters: [
        { text: '售卖中', value: 'onSale' },
        { text: '已售罄', value: 'soldOut' },
      ],
      defaultFilteredValue: ['onSale', 'soldOut'],
      component: 'text',
      options: {
        mode: 'single',
        i18n: {
          onSale: '售卖中',
          soldOut: '已售罄',
        },
      },
    },
    {
      key: 'date-picker_182e8eea517-1239',
      dataIndex: 'startDate',
      title: '日期',
      width: 120,
      description: '',
      component: 'date-picker',
      options: {
        mode: 'basic',
        format: 'YYYY-MM-DD',

      },
      align: 'center',
    },
    {
      key: 'date-picker_182e8eea517-1240',
      dataIndex: 'dateRange',
      width: 120,
      title: '日期范围',
      description: '',
      component: 'date-picker',
      options: {
        mode: 'range',
        format: 'YYYY-MM-DD',
      },
      align: 'center',
    },
    {
      key: 'mock_8',
      title: '状态选择',
      width: 120,
      dataIndex: 'status',
      component: 'select',
      options: {
        style: { width: 120 },
        options: [{ label: '售卖中', value: 'onSale' }, { label: '已售罄', value: 'soldOut' }],
        event: 'statusToggle',
      },
    },
    {
      key: 'mock_4',
      title: '商品价格',
      width: 150,
      align: 'center',
      hidable: true,
      dataIndex: 'price',
      component: 'text',
      options: {
        mode: 'single',
        prefix: '￥',
      },
    },
    {
      key: 'mock_5',
      title: '渲染组件',
      width: 150,
      align: 'center',
      hidable: true,
      dataIndex: 'render',
      component: 'render-html',
      options: {
        render: "if (rec.id == 1) {\n  return '<button onclick=\"alert(\\'123\\');\" style=\\\"padding: 2px 4px;color:#52c41a; border: 1px solid #b7eb8f; border-radius: 3px; background: #f6ffed\\\">进行中</button>';\n}\nif (rec.id == 2) {\n  return '<span style=\\\"padding: 2px 4px;color:#999; border: 1px solid #999; border-radius: 3px; background: #f2f2f2\\\">已完成</span>';\n}\nreturn '';",
      },
    },
    {
      key: 'mock_6',
      title: '自定义组件',
      width: 200,
      hidable: true,
      dataIndex: 'custom',
      component: 'custom::CustomComponentSample',
      options: {
        customSchema: 'custom schema value',
      },
    },
    {
      key: 'mock_7',
      title: '操作',
      width: 200,
      align: 'center',
      fixed: 'right',
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
  defaultTableLayout: 'card',
  layout: {
    card: {
      columns: [
        {
          key: 'mock_1',
          component: 'image',
          title: '',
          options: {
            imageWidth: '100%',
          },
          dataIndex: 'demoPic',
        },
        {
          key: 'mock_2',
          style: { padding: '0 10px' },
        },
        {
          key: 'mock_3',
          style: { padding: '0 10px' },
        },
        {
          key: 'date-picker_182e8eea517-1239',
          style: { padding: '0 10px' },
        },
        {
          key: 'date-picker_182e8eea517-1240',
          style: { padding: '0 10px' },
        },
        {
          key: 'link_1828c3251ad-1391',
          style: { padding: '0 10px' },
        },
        {
          key: 'rich-text_1828c32cb02-1392',
          style: { padding: '0 10px' },
        },
        {
          key: 'mock_4',
          style: { padding: '0 10px' },
        },
        {
          key: 'mock_5',
          hideInLayout: true,
          style: { padding: '0 10px' },
        },
        {
          key: 'mock_6',
          hideInLayout: true,
        },
        {
          key: 'mock_7',
          hideInLayout: true,
        },
        {
          key: 'mock_8',
          hideInLayout: true,
        },
      ],
      rowSize: 4,
    },
  },
};

const dataSource = [
  { id: 3, demoPic: 'https://img14.360buyimg.com/n1/jfs/t1/171364/34/30862/62588/6345485eEa1d63dd2/c6e755dfe92f3675.jpg.avif', name: '商品三', startDate: '2022-09-23', endDate: '2022-09-30', dateRange: ['2022-09-23', '2022-09-25'], pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 2099 },
  { id: 4, demoPic: 'https://img14.360buyimg.com/n1/jfs/t1/162280/14/31288/70554/634548bbEedadb392/6ec54168429838c3.jpg.avif', name: '商品四', startDate: '2022-09-24', endDate: '2022-09-30', dateRange: ['2022-09-23', '2022-09-26'], pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 5999 },
  { id: 5, demoPic: 'https://img13.360buyimg.com/n1/jfs/t1/78098/3/22575/242034/6345952bE55daf87a/4860b8f422cf6dcd.jpg.avif', name: '商品五', startDate: '2022-09-25', endDate: '2022-09-30', dateRange: ['2022-09-23', '2022-09-27'], pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 109.9 },
  { id: 6, demoPic: 'https://img13.360buyimg.com/n1/jfs/t1/24167/17/19633/44533/634548a1E9aeafcaf/8c722d784bd8c51e.jpg.avif', name: '商品六', startDate: '2022-09-24', endDate: '2022-09-30', dateRange: ['2022-09-23', '2022-09-28'], pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'soldOut', price: 178 },
  { id: 7, demoPic: 'https://img11.360buyimg.com/n1/jfs/t1/87718/30/29483/81120/631b15afE2fd4603d/1a86cbddeb88b92e.jpg.avif', name: '商品七', startDate: '2022-09-25', endDate: '2022-09-30', dateRange: ['2022-09-23', '2022-09-29'], pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'soldOut', price: 9999 },
  { id: 8, demoPic: 'https://img13.360buyimg.com/n1/jfs/t1/175174/18/30442/104946/63422ca4E91ff254b/41e61f84b9617acd.jpg.avif', name: '商品八', startDate: '2022-09-26', endDate: '2022-09-30', dateRange: ['2022-09-23', '2022-09-30'], pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 7999 },

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
