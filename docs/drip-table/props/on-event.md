# onEvent

- 描述：通用事件机制
- 类型：`(event: DripTableBuiltInComponentEvent | NonNullable<ExtraOptions['CustomComponentEvent']>, record: RecordType, index: number) => void`
- 默认值：`undefined`

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import { Button, message } from "antd";
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
        tooltip: true,
        ellipsis: true,
        maxRow: 1,
      },
    },
    {
      key: "mock_3",
      title: "自定义事件",
      align: "center",
      dataIndex: "description",
      component: "custom::EventSample",
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
          { name: 'order', label: '订购', event: 'order' },
          { name: 'view', label: '查看', event: 'view' },
          { name: 'edit', label: '编辑', event: 'edit' },
          { name: 'remove', label: '删除', event: 'remove' },
        ],
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
];

const Demo = () => {
  return (
    <DripTable
      driver={DripTableDriverAntDesign}
      schema={schema}
      dataSource={dataSource}
      components={{
        custom: {
          EventSample: (props) => (
            <div>
              <Button onClick={() => { props.fireEvent({ type: 'custom', name: 'sample-event', payload: 'some value' }) }}>发起事件</Button>
            </div>
          ),
        },
      }}
      onEvent={(event, record, index) => {
        if (event.type === 'drip-link-click') {
          const name = event.payload;
          message.info(`你点击了第${index + 1}行“${record.name} (ID: ${record.id})”的"${name}"事件按钮。`);
          console.log(name, record, index);
        } else if (event.type === 'custom') {
          message.info(`自定义事件 “${event.name}”(payload:${JSON.stringify(event.payload)}) 触发于行“${record.name} (ID: ${record.id})”的自定义组件。`);
          console.log(event, record, index);
        }
      }}
    />
  );
};

export default Demo;
```
