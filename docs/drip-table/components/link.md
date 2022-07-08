# 链接组件 link

连接样式操作栏组件

## 何时使用

 - 需要当做文本超链接使用。
 - 需要当做表格操作栏绑定事件时使用。

## 代码演示

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import { message } from 'antd';
import React from "react";
import DripTable from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";
import "drip-table/dist/index.css";

const dataSource = [
  {
    id: 1,
    name: "商品一",
    price: 7999,
    status: "onSale",
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png',
  },
];

const Demo = () => {
  const [imageHeight, setImageHeight] = React.useState(96);
  const [imageWidth, setImageWidth] = React.useState(96);
  const schema = {
    columns: [
      {
        key: 'mock_1',
        title: '链接跳转',
        align: 'center',
        hidable: true,
        dataIndex: 'operate',
        component: 'link',
        options: {
          mode: 'single',
          name: 'order',
          label: '打开新页面',
          href: './#order',
          target: '_blank',
        },
      },
      {
        key: 'mock_2',
        title: '事件触发',
        align: 'center',
        hidable: true,
        dataIndex: 'operate',
        component: 'link',
        options: {
          mode: 'single',
          name: 'edit',
          label: '触发‘edit’事件',
          event: 'edit',
        },
      },
      {
        key: 'mock_7',
        title: '多链接模式',
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
  };

  return (
    <React.Fragment>
      <DripTable
        driver={DripTableDriverAntDesign}
        schema={schema}
        dataSource={dataSource}
        onEvent={(event, record, index) => {
          if (event.type === 'drip-link-click') {
            const name = event.payload;
            message.info(`你点击了第${index + 1}行“${record.name} (ID: ${record.id})”的“${name}”事件按钮。`);
            console.log(name, record, index);
          }
        }}
      />
    </React.Fragment>
  );
};

export default Demo;
```

## API

| 参数名 | 描述 | 类型 | 是否必填 | 默认值 | 详情 |
| ----- | ---- | ---- | ------ | ---- | ---- |
| mode | 链接展示模式 | `single` \| `multiple` | 是 | `single` | -- |
| name | 链接名称，唯一标识 | string | 否 | 无 | -- |
| label | 链接展示文案 | string | 是 | 无 | -- |
| href | 链接地址 | string | 否 | 无 | -- |
| target | 打开超链接方式 | string \| `_blank` \| `_self` \| `_parent` \| `_top` | 否 | 无 | -- |
| event | 事件名，点击时触发，通过属性 `onEvent` 接收事件，事件类型为 `drip-link-click` | string | 否 | 无 | -- |
| operates | 操作配置列表 | Array<{name: string; label: string; href: string; target: string; event: string; }> | 否, mode 等于 `multiple` 时必填 | 无 | 数组每一项内容参考上述属性字段 |
