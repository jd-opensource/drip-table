---
order: 3
title: 链接组件
---

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
import { message, Row, Col, Radio } from "antd";
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
    description:
      "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    pictureUrl:
      "https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png",
  },
];

const Demo = () => {
  const [trigger, setTrigger] = React.useState("hover");
  const schema = {
    columns: [
      {
        key: "mock_1",
        title: "链接跳转",
        align: "center",
        hidable: true,
        dataIndex: "operate",
        component: "link",
        options: {
          mode: "single",
          name: "order",
          label: "打开新页面",
          href: "./#order",
          target: "_blank",
        },
      },
      {
        key: "mock_2",
        title: "事件触发",
        align: "center",
        hidable: true,
        dataIndex: "operate",
        component: "link",
        options: {
          mode: "single",
          name: "edit",
          label: "触发‘edit’事件",
          event: "edit",
        },
      },
      {
        key: "mock_3",
        title: "禁用事件",
        align: "center",
        hidable: true,
        dataIndex: "operate",
        component: "link",
        options: {
          mode: "single",
          name: "edit",
          label: "触发‘edit’事件",
          event: "edit",
          disabled: true,
        },
      },
      {
        key: "mock_4",
        title: "多链接模式",
        align: "center",
        hidable: true,
        dataIndex: "operate",
        component: "link",
        options: {
          mode: "multiple",
          operates: [
            {
              name: "order",
              label: "订购",
              href: "./#order",
              target: "_blank",
            },
            { name: "view", label: "查看", href: "./#view" },
            { name: "edit", label: "编辑", event: "edit" },
            { name: "remove", label: "删除", event: "remove" },
          ],
        },
      },
      {
        key: "mock_5",
        title: "带最大展示数量的多链接模式",
        align: "center",
        hidable: true,
        dataIndex: "operate",
        component: "link",
        options: {
          mode: "multiple",
          operates: [
            {
              name: "order",
              label: "订购",
              href: "./#order",
              target: "_blank",
            },
            { name: "view", label: "查看", href: "./#view" },
            { name: "edit", label: "编辑", event: "edit", disabled: true },
            { name: "remove", label: "删除", event: "remove" },
          ],
          maxTiledCount: 1,
          dropdownText: "更多",
          textColor: "#ff0000",
          trigger: trigger,
          placement: "bottomRight",
          suffixIcon: "CaretDownOutlined",
        },
      },
    ],
  };

  return (
    <React.Fragment>
      <Row style={{ marginBottom: 18 }}>
        <Col style={{ marginRight: 18, lineHeight: "32px" }}>
          更多弹出框触发方式选择
        </Col>
        <Col>
          <Radio.Group
            onChange={(e) => setTrigger(e.target.value)}
            value={trigger}
          >
            <Radio value={"hover"}>悬浮</Radio>
            <Radio value={"click"}>点击</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <DripTable
        driver={DripTableDriverAntDesign}
        schema={schema}
        dataSource={dataSource}
        onEvent={(event, tableInfo) => {
          const { record, recordIndex } = event;
          if (event.type === "drip-link-click") {
            const name = event.payload;
            message.info(
              `你点击了第${recordIndex + 1}行“${record.name} (ID: ${
                record.id
              })”的“${name}”事件按钮。`
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

| 参数名        | 描述                                                                          | 类型                                                                                | 是否必填                        | 默认值   | 详情                                                          |
| ------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------- | -------- | ------------------------------------------------------------- |
| mode          | 链接展示模式                                                                  | `single` \| `multiple`                                                              | 是                              | `single` | --                                                            |
| name          | 链接名称，唯一标识                                                            | string                                                                              | 否                              | 无       | --                                                            |
| label         | 链接展示文案                                                                  | string                                                                              | 是                              | 无       | --                                                            |
| href          | 链接地址                                                                      | string                                                                              | 否                              | 无       | --                                                            |
| disabled      | 是否禁用                                                                      | string \| boolean                                                                   | 否                              | 无       | 当为 string 类型时解析为参数含 rec 的代码片段执行并返回布尔值 |
| target        | 打开超链接方式                                                                | string \| `_blank` \| `_self` \| `_parent` \| `_top`                                | 否                              | 无       | --                                                            |
| event         | 事件名，点击时触发，通过属性 `onEvent` 接收事件，事件类型为 `drip-link-click` | string                                                                              | 否                              | 无       | --                                                            |
| operates      | 操作配置列表                                                                  | Array<{name: string; label: string; href: string; target: string; event: string; }> | 否, mode 等于 `multiple` 时必填 | 无       | 数组每一项内容参考上述属性字段                                |
| maxTiledCount | 平铺展示数量，仅适用多选模式                                                  | number                                                                              | 否                              | 无       | --                                                            |
| dropdownText  | 下拉框文案                                                                    | string                                                                              | 否                              | 无       | --                                                            |
| textColor     | 文案字体颜色                                                                  | string                                                                              | 否                              | 无       | --                                                            |
| suffixIcon    | 自定义的选择框后缀图标                                                        | string                                                                              | 否                              | 无       | --                                                            |
| trigger       | 下拉框展示触发方式                                                            | `hover` \| `click`                                                                  | 否                              | 无       | --                                                            |
| placement     | 下拉框弹出位置                                                                | `bottom` \| `bottomLeft` \| `bottomRight` \| `top` \| `topLeft` \| `topRight`       | 否                              | 无       | --                                                            |
