# 下拉框组件 select

下拉选择器

## 何时使用

 - 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时用。
 - 当选项少时（少于 5 项），建议直接将选项平铺，使用 Radio 是更好的选择。

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
  const schema = {
    columns: [
      {
        key: 'mock_1',
        title: '下拉框基础用法',
        align: 'center',
        hidable: true,
        dataIndex: 'operate',
        component: 'select',
        options: {
          style: { width: 120 },
          options: [{ label: '选项一', value: 'A' }, { label: '选项二', value: 'B' }],
          event: 'selectChange',
          bordered: false,
        },
      },
      {
        key: 'mock_2',
        title: '多选模式',
        align: 'center',
        hidable: true,
        dataIndex: 'operate',
        component: 'select',
        options: {
          style: { width: 120 },
          options: [{ label: '选项一', value: 'A' }, { label: '选项二', value: 'B' }],
          mode: 'multiple',
        },
      },
      {
        key: 'mock_3',
        title: '弹出位置',
        align: 'center',
        hidable: true,
        dataIndex: 'operate',
        component: 'select',
        options: {
          style: { width: 120 },
          options: [{ label: '选项一', value: 'A' }, { label: '选项二', value: 'B' }],
          placement: 'topLeft',
        },
      },
      {
        key: 'mock_3',
        title: '尺寸大小',
        align: 'center',
        hidable: true,
        dataIndex: 'operate',
        component: 'select',
        options: {
          style: { width: 120 },
          options: [{ label: '选项一', value: 'A' }, { label: '选项二', value: 'B' }],
          size: 'large',
        },
      },
      {
        key: 'mock_4',
        title: '允许搜索和清空',
        align: 'center',
        hidable: true,
        dataIndex: 'operate',
        component: 'select',
        options: {
          style: { width: 120 },
          options: [{ label: '选项一', value: 'A' }, { label: '选项二', value: 'B' }],
          showSearch: true,
          allowClear: true
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
          if (event.type === 'drip-select-change') {
            const name = event.value;
            message.info(`你选择了第${index + 1}行“${record.name} (ID: ${record.id})”的“${name}”选项。`);
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
