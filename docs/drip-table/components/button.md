---
title: 按钮组件 Button
toc: content
---

## 按钮组件 button

按钮用于开始一个即时操作。

## 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。
在 Drip Table 中我们提供了五种按钮。

- 主按钮：用于主行动点，一个操作区域只能有一个主按钮。
- 默认按钮：用于没有主次之分的一组行动点。
- 虚线按钮：常用于添加操作。
- 文本按钮：用于最次级的行动点。
- 链接按钮：一般用于链接，即导航至某位置。

以及两种状态属性与上面配合使用。

- 危险：删除/移动/修改权限等危险操作，一般需要二次确认。
- 幽灵：用于背景色比较复杂的地方，常用在首页/产品页等展示场景。

## 代码演示

### 设置按钮模式

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import { message } from 'antd';
import React from "react";
import DripTable from "drip-table";

const dataSource = [
  {
    id: 1,
    name: "商品一",
    price: 7999,
    status: 1,
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png',
  },
];

const Demo = () => {
  const schema = {
    columns: [
      {
        key: 'mock_1',
        title: '单按钮模式',
        align: 'center',
        hidable: true,
        dataIndex: 'name',
        component: 'button',
        options: {
          mode: 'single',
          label: '新增',
          icon: 'PlusOutlined',
        },
      },
      {
        key: 'mock_1',
        title: '多按钮展示模式',
        align: 'center',
        hidable: true,
        dataIndex: 'name',
        component: 'button',
        options: {
          mode: 'multiple',
          margin: 16,
          buttons: [
            {
              label: '编辑',
            },
            {
              label: '删除',
              danger: true
            }
          ]
        },
      },
    ],
  };

  return (
    <React.Fragment>
      <DripTable
        schema={schema}
        dataSource={dataSource}
      />
    </React.Fragment>
  );
};

export default Demo;
```

### 设置按钮样式

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import { message } from 'antd';
import React from "react";
import DripTable from "drip-table";

const dataSource = [
  {
    id: 1,
    name: "商品一",
    price: 7999,
    status: 1,
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png',
  },
];

const Demo = () => {
  const schema = {
    columns: [
      {
        key: 'mock_1',
        title: '设置按钮类型',
        align: 'center',
        hidable: true,
        dataIndex: 'name',
        component: 'button',
        options: {
          mode: 'multiple',
          margin: 8,
          buttons: [
            { label: '按钮', buttonType: 'primary' },
            { label: '按钮', buttonType: 'dashed' },
            { label: '按钮', buttonType: 'link' },
            { label: '按钮', buttonType: 'text' },
          ]
        },
      },
      {
        key: 'mock_2',
        title: '设置按钮形状',
        align: 'center',
        hidable: true,
        dataIndex: 'name',
        component: 'button',
        options: {
          mode: 'multiple',
          margin: 8,
          buttons: [
            { shape: 'circle', icon: 'PlusOutlined' },
            { label: '新增按钮', shape: 'round' },
          ]
        },
      },
      {
        key: 'mock_3',
        title: '设置按钮大小',
        align: 'center',
        hidable: true,
        dataIndex: 'name',
        component: 'button',
        options: {
          mode: 'multiple',
          margin: 8,
          buttons: [
            { label: '按钮', size: 'large' },
            { label: '按钮', size: 'middle' },
            { label: '按钮', size: 'small' },
          ]
        },
      },
      {
        key: 'mock_4',
        title: '危险按钮',
        align: 'center',
        hidable: true,
        dataIndex: 'name',
        component: 'button',
        options: {
          mode: 'single',
          label: '删除',
          danger: true
        },
      },
      {
        key: 'mock_5',
        title: '幽灵按钮',
        align: 'center',
        hidable: true,
        dataIndex: 'name',
        component: 'button',
        options: {
          mode: 'single',
          label: 'GHOST',
          ghost: true
        },
      },
      {
        key: 'mock_6',
        title: '事件绑定',
        align: 'center',
        hidable: true,
        dataIndex: 'name',
        component: 'button',
        options: {
          mode: 'single',
          label: 'EDIT事件',
          event: 'edit'
        },
      },
    ],
  };

  return (
    <React.Fragment>
      <DripTable
        schema={schema}
        dataSource={dataSource}
        onEvent={(event, tableInfo) => {
          const { record, recordIndex } = event;
          if (event.type === 'drip-button-click') {
            const name = event.payload;
            message.info(`你点击了第${recordIndex + 1}行“${record.name} (ID: ${record.id})”的“${name}”事件按钮。`);
            console.log(name, record, recordIndex);
          }
        }}
      />
    </React.Fragment>
  );
};

export default Demo;
```

## popconfirm

- 按钮弹出确认
- 类型：

```typescript
{
  title: string;
  content: string;
  placement?: string;
  cancelText?: string;
  confirmText?: string;
}
```

- 默认值：`undefined`

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import { message } from 'antd';
import React from "react";
import DripTable from "drip-table";

const dataSource = [
  {
    id: 1,
    name: "商品一",
    price: 7999,
    status: 1,
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png',
  },
];

const Demo = () => {
  const schema = {
    columns: [
      {
        key: 'mock_1',
        title: '按钮弹出确认',
        align: 'center',
        hidable: true,
        dataIndex: 'name',
        component: 'button',
        options: {
          mode: 'single',
          label: '删除',
          danger: true,
          event: 'delete',
          popconfirm: {
            title: '确认要删除“{{props.record.name}}”？',
            content: '您确认要执行删除“{{props.record.name}}”这个操作吗？该操作将无法撤销！',
            placement: 'top',
            cancelText: '取消',
            confirmText: '确认',
          },
        },
      },
    ],
  };

  return (
    <React.Fragment>
      <DripTable
        schema={schema}
        dataSource={dataSource}
        onEvent={(event, tableInfo) => {
          const { record, recordIndex } = event;
          if (event.type === 'drip-button-click') {
            const name = event.payload;
            message.info(`你点击了第${recordIndex + 1}行“${record.name} (ID: ${record.id})”的“${name}”事件按钮。`);
            console.log(name, record, recordIndex);
          }
        }}
      />
    </React.Fragment>
  );
};

export default Demo;
```

## closePopover

- 按钮点击时关闭指定 key 的弹出层
- 类型：```string```
- 默认值：`undefined`

```jsx
/**
 * transform: true
 * defaultShowCode: false
 * hideActions: ["CSB"]
 */
import { message } from 'antd';
import * as AntIcons from '@ant-design/icons';
import React from "react";
import DripTable from "drip-table";

const dataSource = [
  {
    id: 1,
    name: "商品一",
    price: 7999,
    status: 1,
    description: "商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。",
    pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png',
  },
];

const Demo = () => {
  const schema = {
    id: 'sample-table',
    size: 'middle',
    rowKey: 'id',
    columns: [
      {
        key: '18f0f4c4125-11e1',
        title: '商品详情',
        width: 200,
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
      {
        key: '18f0f4c4125-11e3',
        title: '操作',
        width: 140,
        align: 'center',
        verticalAlign: 'middle',
        dataIndex: '',
        component: 'group',
        options: {
          layout: [
            1,
          ],
          wrap: false,
          horizontalAlign: 'center',
          verticalAlign: 'middle',
          gutter: [
            8,
            8,
          ],
          items: [
            {
              align: 'center',
              verticalAlign: 'middle',
              key: 'popover_18f0f03d7a6-13b6',
              dataIndex: '',
              title: '',
              component: 'popover',
              options: {
                placement: 'left',
                trigger: 'click',
                popover: {
                  align: 'center',
                  verticalAlign: 'middle',
                  key: 'group_18f0f03d7a7-13b7',
                  dataIndex: '',
                  title: '',
                  component: 'group',
                  options: {
                    layout: [
                      1,
                      1,
                    ],
                    wrap: false,
                    horizontalAlign: 'start',
                    items: [
                      {
                        align: 'center',
                        verticalAlign: 'middle',
                        key: 'group_18f0f071b8b-195d',
                        dataIndex: '',
                        title: '',
                        component: 'group',
                        options: {
                          layout: [
                            2,
                          ],
                          wrap: false,
                          horizontalAlign: 'start',
                          items: [
                            {
                              schema: {
                                align: 'center',
                                verticalAlign: 'middle',
                                key: 'icon_18f0f09db8b-1c57',
                                dataIndex: '',
                                title: '',
                                component: 'icon',
                                options: {
                                  event: '',
                                  icon: 'InfoCircleOutlined',
                                },
                              },
                              style: {
                                marginRight: '5px',
                              },
                            },
                            {
                              schema: {
                                dataIndex: ' ',
                                align: 'center',
                                verticalAlign: 'middle',
                                key: 'text_18f0f0a75f5-1d62',
                                title: '',
                                component: 'text',
                                options: {
                                  mode: 'single',
                                  showTooltip: true,
                                  format: '{{rec}}',
                                  parts: [
                                    {
                                      dataIndex: 'id',
                                    },
                                  ],
                                  defaultValue: '确认删除该用户吗？',
                                },
                              },
                              style: {},
                            },
                          ],
                        },
                      },
                      {
                        align: 'center',
                        verticalAlign: 'middle',
                        key: 'group_18f0f0737dd-1997',
                        dataIndex: '',
                        title: '',
                        component: 'group',
                        options: {
                          layout: [
                            2,
                          ],
                          wrap: false,
                          horizontalAlign: 'end',
                          items: [
                            {
                              schema: {
                                align: 'center',
                                verticalAlign: 'middle',
                                key: 'button_18f0f0c00db-2283',
                                dataIndex: '',
                                title: '',
                                component: 'button',
                                options: {
                                  mode: 'single',
                                  label: '确定',
                                  size: 'middle',
                                  ghost: false,
                                  danger: false,
                                  event: 'delete-confirm',
                                  buttonType: 'primary',
                                  buttons: [],
                                  closePopover: 'popover_18f0f03d7a6-13b6',
                                },
                              },
                              style: {},
                            },
                            {
                              schema: {
                                align: 'center',
                                verticalAlign: 'middle',
                                key: 'button_18f0f0bf074-2249',
                                dataIndex: '',
                                title: '',
                                component: 'button',
                                options: {
                                  mode: 'single',
                                  label: '取消',
                                  size: 'middle',
                                  ghost: false,
                                  danger: false,
                                  event: 'delete-cancel',
                                  buttons: [],
                                  closePopover: 'popover_18f0f03d7a6-13b6',
                                },
                              },
                              style: {
                                marginLeft: '10px',
                              },
                            },
                          ],
                          style: {
                            padding: '10px',
                          },
                        },
                      },
                    ],
                  },
                },
                content: {
                  align: 'center',
                  verticalAlign: 'middle',
                  key: 'button_18f0f03d7a7-13b8',
                  dataIndex: '',
                  title: '',
                  component: 'button',
                  options: {
                    mode: 'single',
                    label: '删除',
                    size: 'middle',
                    buttonType: 'link',
                  },
                },
                overlayInnerStyle: {
                  borderRadius: '5px',
                },
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <React.Fragment>
      <DripTable
        schema={schema}
        dataSource={dataSource}
        onEvent={(event, tableInfo) => {
          const { record, recordIndex } = event;
          if (event.type === 'drip-button-click') {
            const name = event.payload;
            message.info(`你点击了第${recordIndex + 1}行“${record.name} (ID: ${record.id})”的“${name}”事件按钮。`);
            console.log(name, record, recordIndex);
          }
        }}
        icons={AntIcons}
      />
    </React.Fragment>
  );
};

export default Demo;
```

## API

| 参数名 | 描述 | 类型 | 是否必填 | 默认值 | 详情 |
| ----- | ---- | ---- | ------ | ---- | ---- |
| mode | 展示模式：分为单按钮、多按钮 展示模式 | `single` \| `multiple` | 是 | `single` | - |
| label | 按钮展示文案 | string | 否 | - | - |
| buttonType | 设置按钮类型	 | `primary` \| `dashed` \| `link` \| `text` \| `default` | 否 | - | - |
| shape | 设置按钮形状 | `circle` \| `round` | 否 | - | - |
| size | 设置按钮大小	 | `large` \| `middle` \| `small` | 否 | - | - |
| danger | 设置危险按钮	 | boolean | 否 | false | - |
| ghost | 幽灵属性，使按钮背景透明 | boolean | 否 | false | - |
| icon | 设置按钮的图标组件 | string | 否 | - | - |
| event | 事件名，点击时触发，通过属性 `onEvent` 接收事件，事件类型为 `drip-button-click` | string | 否 | - | - |
| margin | 按钮间间隔，用于多按钮模式  | number | 否 | - | - |
| popconfirm | 按钮弹出确认  | - | 否 | - | - |
| buttons | 多按钮模式下每个按钮的属性配置, 各字段属性同上 | { label: string; shape: string; size: string; danger: boolean; ghost: boolean; icon: string; event: string; buttonType: string; }[] | 否 | - | - |
