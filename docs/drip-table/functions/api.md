---
order: 2
title: API
---

# API

## `<DripTable>` 参数

**DripTable 本质就是一个 React Context，将对应的 `<Table>` 包裹起来，可以很方便在里面插入一些其他东西**

| 属性               | 描述                                                                                  | 类型                                   | 默认值  | 必填 |
| ------------------ | ------------------------------------------------------------------------------------- | -------------------------------------- | ------- | ---- |
| driver             | 用于渲染列表的主题包 | `DripTableDriver`                               | -       | 是   |
| schema             | 用于渲染列表的 schema | `DripTableSchema`                               | -       | 是   |
| dataSource         | 数据列表                                                           | `Array`                  | -       | 是   |
| loading            | 是否加载         | `boolean`                  | -       | 否   |
| totalPage          | 总页数，配置了分页需要         | `number`                  | -       | 否   |
| components         | 自定义组件库         | `Record<string, Record<string, React.Component>>`                  | -       | 否   |
| slots              | 自定义渲染组件插槽，可通过 schema 控制渲染 | `Record<string, React.JSXElementConstructor>`                  | -       | 否   |
| onEvent            | 通用事件回调         | `(event: { type: string; payload: unknown }, record: RecordType; index: number }) => void`                  | -       | 否   |
| onPageChange       | 页面改变回调函数         | `(page, pageSize) => void`                  | -       | 否   |

## `DripTableDriver` 参数

| 属性                  | 描述                                                                      | 类型                | 默认值      |
| --------------------- | ------------------------------------------------------------------------- | ------------------- | ----------- |
| components             | 组件库 | `Record<string, React.ComponentClass \| React.FunctionComponent \| React.ForwardRefExoticComponent>`                               | -       | 是   |
| icons             | 图标库 | `Record<string, React.ComponentClass \| React.FunctionComponent \| React.ForwardRefExoticComponent>`                               | -       | 是   |
| locale             | 国际化设置 | [Locale](https://ant.design/docs/react/i18n-cn)                               | -       | 是   |

## `DripTableSchema` 参数

**设置 drip-table 的 props，另外最基本的使用需要填写 `columns`**

| 属性                  | 描述                                                                      | 类型                | 默认值      |
| --------------------- | ------------------------------------------------------------------------- | ------------------- | ----------- |
| bordered               | 是否展示表格边框              | `boolean`            | `false`     |
| header               | 是否展示标题栏以及配置             | `详见schema配置页说明` \| `boolean`           | `false`     |
| pagination               | 是否展示分页以及配置              | `{ pageSize?: number; position?: "topLeft" | "topCenter" | "topRight" | "bottomLeft" | "bottomCenter" | "bottomRight"; }` \| `false`            | `false`     |
| size               | 表格尺寸              | `small` \| `middle` \| `large` \| `undefined`            | -     |
| sticky               | 粘性头部              | `boolean`            | `false`     |
| rowSelection               | 是否支持选择栏              | `boolean`            | `false`     |
| ellipsis               | 是否平均列宽              | `boolean`            | `false`     |
| sticky               | 粘性头部              | `boolean`            | `false`     |
| placeholder               | 无数据提示              | `{ image: string; text: string; }`            | -     |
| columns               | 列定义                                                                    | `object`            | `false`     |

### `DripTableSchema` 参数 中 Columns 列定义

**columns 为 antd 已有的 props，所以支持 antd 所有的支持的 [columns](https://ant.design/components/table-cn/#Column) 的配置，同时也提供了一些更方便的 api，加快书写**

| 属性      | 描述                                                | 类型                                                  | 默认值 |
| --------- | --------------------------------------------------- | ----------------------------------------------------- | ------ |
| key  | 键值 | string | - |
| dataIndex  | 列数据在数据项中对应的路径，支持通过数组查询嵌套路径 | `string | string[]` | - |
| title  | 表头， 组件名 | string | - |
| width  | 表格列宽 | number | - |
| description  | 表头说明 | string | - |
| ui:type  | 组件名，若自定义开发的业务组件以`命名空间::组件名称`格式填写；通过 components 属性传入组件库实现 | string | - |
| ui:props  | 组件属性 | `object` | - |
| type  | 数据格式 | `string` \| `number` \| `boolean` \| `null` \| `array` \| `object` | - |
| hidable  | 是否允许用户隐藏 | `boolean` | false |
| `[...props]`  | 其他属性 | `unknown` | - |
