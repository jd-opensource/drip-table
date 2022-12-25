---
order: 3
title: 引用实例 ref
---

## 引用实例 ref

> 引用实例，利用 `ref` 引用可以在外部主动改变 `drip-table` 的状态。

## 获取表格实例

利用 `react` 的 `ref` 属性可以获取表格内部开放的状态和函数从而改变 `drip-table` 实例

> hook写法

```js
const table = useRef(null);
```

> component 写法:

```js
const table = React.createRef();

<DripTable ref={table}>
```

## 开放属性

### selectedRowKeys

- 描述: `选中行的键`
- 类型: `Array<number | string>`
- 默认值: `[]`
如果 `<DripTable />` 组件设置了属性 `rowKey`，则存储每条记录 `record` 的 `rowKey` 的值，否则存储每条记录对应的整数序号(从0开始记)。

### pagination

- 描述: `分页配置`
- 类型: `Pagination`
- 默认值: `{current: 1, pageSize: 10, total: 0}`
`<DripTable />` 内部的分页器的基本配置，默认情况包含当前页 `current`，页面大小 `pageSize`，总记录数 `total` 三个属性。

### loading

- 描述: `是否加载`
- 类型: `boolean`
- 默认值: `false`
用于判断 `<DripTable />` 当前是否处在加载状态。

## 开放函数

### select

- 描述: `选中列`
- 类型: `function(keys: Array<number | string>): void`
- 返回值: `void`
主动调用 `drip-table` 实例的 `select` 函数可以从组件外部手动触发选中某些列、全选和全不选的状态。

## 代码示例

<code src='./ref.tsx'></code>
