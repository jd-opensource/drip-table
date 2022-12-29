---
title: 下拉组件 Select
toc: content
---

## 下拉框组件 select

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
import { message } from "antd";
import React from "react";
import DripTable from "drip-table";
import DripTableDriverAntDesign from "drip-table-driver-antd";
import "antd/dist/antd.css";

const dataSource = [
  {
    id: 1,
    name: "商品一",
    price: 7999,
    status: "onSale",
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    pictureUrl:
      "https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png",
  },
  {
    id: 2,
    name: "商品二",
    price: 7999,
    status: "offSale",
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    pictureUrl:
      "https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png",
  },
];

const Demo = () => {
  const schema = {
    columns: [
      {
        key: "mock_1",
        title: "下拉框基础用法",
        align: "center",
        hidable: true,
        dataIndex: "operate",
        component: "select",
        options: {
          style: { width: 120 },
          options: [
            { label: "选项一", value: "A" },
            { label: "选项二", value: "B" },
          ],
          event: "selectChange",
          bordered: false,
          bindValue: false,
          defaultValue: "A",
        },
      },
      {
        key: "mock_2",
        title: "多选模式",
        align: "center",
        hidable: true,
        dataIndex: "operate",
        component: "select",
        options: {
          style: { width: 120 },
          options: [
            { label: "选项一", value: "A" },
            { label: "选项二", value: "B" },
          ],
          mode: "multiple",
          bindValue: false,
          defaultValue: "A",
        },
      },
      {
        key: "mock_3",
        title: "弹出位置",
        align: "center",
        hidable: true,
        dataIndex: "operate",
        component: "select",
        options: {
          style: { width: 120 },
          options: [
            { label: "选项一", value: "A" },
            { label: "选项二", value: "B" },
          ],
          placement: "topLeft",
          bindValue: false,
        },
      },
      {
        key: "mock_3",
        title: "尺寸大小",
        align: "center",
        hidable: true,
        dataIndex: "operate",
        component: "select",
        options: {
          style: { width: 120 },
          options: [
            { label: "选项一", value: "A" },
            { label: "选项二", value: "B" },
          ],
          size: "large",
          bindValue: false,
        },
      },
      {
        key: "mock_4",
        title: "允许搜索和清空",
        align: "center",
        hidable: true,
        dataIndex: "operate",
        component: "select",
        options: {
          style: { width: 120 },
          options: [
            { label: "选项一", value: "A" },
            { label: "选项二", value: "B" },
          ],
          showSearch: true,
          allowClear: true,
          bindValue: false,
        },
      },
      {
        key: "mock_5",
        title: "自定义ICON",
        align: "center",
        hidable: true,
        dataIndex: "operate",
        component: "select",
        options: {
          style: { width: 120 },
          options: [
            { label: "选项一", value: "A" },
            { label: "选项二", value: "B" },
          ],
          suffixIcon: "CaretDownOutlined",
          bindValue: false,
        },
      },
      {
        key: "mock_6",
        title: "禁用",
        align: "center",
        hidable: true,
        dataIndex: "operate",
        component: "select",
        options: {
          style: { width: 120 },
          disabled: "rec.id === 1",
          options: [
            { label: "选项一", value: "A" },
            { label: "选项二", value: "B", disabled: "rec.id === 2" },
          ],
          bindValue: false,
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
        onEvent={(event, tableInfo) => {
          const { record, recordIndex } = event;
          if (event.type === "drip-select-change") {
            const value = event.payload.value;
            message.info(
              `你选择了第${recordIndex + 1}行“${record.name} (ID: ${
                record.id
              })”的“${value}”选项。`
            );
            console.log(name, record, recordIndex);
          }
        }}
      />
    </React.Fragment>
  );
};

export default Demo;
```

## API

| 参数名      | 描述                                                                             | 类型                                                                          | 是否必填 | 默认值                    | 详情 |
| ----------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------- | ------------------------- | ---- |
| allowClear  | 支持清除                                                                         | boolean                                                                       | 否       | false                     | --   |
| bordered    | 是否有边框                                                                       | boolean                                                                       | 否       | true                      | --   |
| bindValue   | 值回显强制与数据绑定，默认为 true                                                | boolean                                                                       | 否       | true                      | --   |
| style       | 自定义样式                                                                       | React.CSSProperties                                                           | 否       | 无                        | --   |
| mode        | 设置 Select 的模式为多选或标签                                                   | `multiple` \| `tags`                                                          | 否       | 无                        | --   |
| placeholder | 选择框默认文本                                                                   | string                                                                        | 否       | 无                        | --   |
| placement   | 选择框弹出的位置                                                                 | `bottomLeft` \| `bottomRight` \| `topLeft` \| `topRight`                      | 否       | `bottomLeft`              | --   |
| size        | 选择框大小                                                                       | `large` \| `middle` \| `small`                                                | 否       | `middle`                  | --   |
| showArrow   | 是否显示下拉小箭头                                                               | boolean                                                                       | 否       | 单选为 true，多选为 false | --   |
| showSearch  | 配置是否可搜索                                                                   | boolean                                                                       | 否       | 单选为 false，多选为 true | --   |
| suffixIcon  | 自定义的选择框后缀图标                                                           | string                                                                        | 否       | 无                        | --   |
| event       | 事件名，点击时触发，通过属性 `onEvent` 接收事件，事件类型为 `drip-select-change` | string                                                                        | 否       | 无                        | --   |
| disabled    | 是否禁用选择器                                                                   | string \| boolean                                                             | 否       | 无                        | --   |
| options     | 数据化配置选项内容                                                               | Array<{value: string \| number; label: string; boolean: string \| boolean; }> | 否       | 无                        | --   |
