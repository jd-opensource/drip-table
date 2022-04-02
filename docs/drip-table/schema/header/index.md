# header

- 描述：表格头部展示配置
- 类型：

    ```typescript
    type Header = {
      /**
        * 头部自定义样式
        */
      style?: React.CSSProperties;
      /**
        * 头部展示元素配置
        */
      elements?: DripTableGenericRenderElement[];
    } | boolean;
    ```

- 默认值：`false`

    当传入 `true` 时，显示表头并使用默认表头配置，等价于：

    ```javascript
    {
      schemas: [
        { type: 'display-column-selector', selectorButtonType: 'primary' },
        { type: 'spacer', span: 'flex-auto' },
        { type: 'search' },
        { type: 'insert-button', showIcon: true },
      ],
    }
    ```

- 子属性

    | 参数名 | 描述 | 必填 | 详情 |
    | ----- | ---- | ---- | ---- |
    | [header.style](/drip-table/schema/header/style) | 头部自定义样式 | × | [🔗 示例](/drip-table/schema/header/style) |
    | [header.elements](/drip-table/schema/header/elements) | 头部展示元素配置 | × | [🔗 示例](/drip-table/schema/header/elements) |

- 示例

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
      header: true,
      columns: [
        {
          key: "mock_1",
          title: "商品名称",
          dataIndex: "name",
          component: "text",
          hidable: true,
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
          hidable: true,
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
    ];

    const Demo = () => {
      return (
        <DripTable
          driver={DripTableDriverAntDesign}
          schema={schema}
          dataSource={dataSource}
        />
      );
    };

    export default Demo;
    ```
