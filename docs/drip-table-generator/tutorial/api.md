---
order: 2
title: API
---

## API

### `<DripTableGenerator>` 参数

**DripTable 本质就是一个 React Component，将对应的 `<DripTable>` 包裹起来，利用页面组件将 `DripTable` 的 `schema` 进行可视化加工和生产**

| 属性               | 描述                                                                                  | 类型                                   | 默认值  | 必填 |
| ------------------ | ------------------------------------------------------------------------------------- | -------------------------------------- | ------- | ---- |
| style             | 组件的表单样式 | `React.CSSProperties`                               | -       | 否   |
| showComponentLayout                | 是否展示组件栏                                  | `boolean`                  | `true`       | 否   |
| showToolLayout                | 是否展示工具栏                                       | `boolean`                  | `true`       | 否   |
| mockDataSource                | 属性栏是否展示表格数据输入框                           | `boolean`                  | `false`       | 否   |
| schema                | 初始化载入的schema配置数据                                                           | [DripTableSchema](/drip-table/props/schema#driptableschema-参数)                  | -       | 否   |
| dataSource                | 初始化载入的表格示例数据                                                           | `Record<string, unknown>[]`                  | -       | 否   |
| dataFields                | 后端API默认的字段名                                                           | `string[]`                  | -       | 否   |
| onExportSchema                | 导出配置回调                                                           | `(schema: DripTableSchema): void`                  | -       | 否   |
| customComponents                | 自定义组件，透传至render                                                           | [DripTableProps['components']](/drip-table/props/components)                  | -       | 否   |
| customComponentPanel                | 自定义组件面板    | `{ mode: 'add' \| 'replace', components: DripTableComponentAttrConfig[] }`                  | -       | 否   |

### `DripTableComponentAttrConfig` 参数
**当自定义表单后，需要通过该参数配置相应的配置信息展示在页面的组件栏中**

| 属性               | 描述                                                                                  | 类型                                   | 默认值  | 必填 |
| ------------------ | ------------------------------------------------------------------------------------- | -------------------------------------- | ------- | ---- |
| key             | 唯一标识 | `string`                               | -       | 否   |
| ui:type             | 组件类型 | `string`                               | -       | 否   |
| type             | 数据类型 | `string`                               | -       | 否   |
| group             | 组名称 | `string`                               | -       | 否   |
| title             | 组件名称 | `string`                               | -       | 否   |
| attrSchema             | 属性配置 | `AttrSchema[]`                               | -       | 否   |
| `[...props]`  | 其他属性 | `unknown` | - |

#### `DripTableComponentAttrConfig` 中 `AttrSchema` 参数
| 属性               | 描述                                                                                  | 类型                                   | 默认值  | 必填 |
| ------------------ | ------------------------------------------------------------------------------------- | -------------------------------------- | ------- | ---- |
| name             | 属性名 | `string`                               | -       | 否   |
| required             | 属性是否必填 | `boolean`                               | `false`       | 否   |
| ui:title             | 属性标题 | `string`                               | -       | 是   |
| ui:type             | 属性组件类型, 默认属性组件类型包括：`input`、 `text`、 `switch`、 `number`、 `checkbox`、 `radio`、 `select`、 `cascader`、 `render-html`、 `array-list`、 `color-picker`。当组件类型为 `custom::` 开头时可以通过`ui:externalComponent` 属性传入外部组件。 | `string`                               | -       | 是   |
| ui:externalComponent             | 外部组件 | `React.ComponentClass \| React.FunctionComponent`                               | -       | 否   |
| ui:props             | 属性组件的属性 | `Record`                               | -       | 否   |
| type             | 属性数据类型 | `string`                               | -       | 否   |
| `[...props]`  | 其他属性 | `unknown` | - |
