---
title: 列配置 columns
toc: content
---

## 列配置 columns

- 描述：列定义
- 类型：`(CustomColumnSchema | DripTableBuiltInColumnSchema)[]`
- 默认值：必填

列定义 `columns` 字段为一个由列描述对象组成的数组，数组的每个元素即列描述对象与列组件一一对应。其中列组件分为 DripTable 官方组件与 [用户自定义业务组件](/drip-table/props/components) 两种，它们都继承自列基础属性 [`DripTableColumnSchema`](/drip-table/types/column-schema)，关于各组件自定义属性部分请参照 [官方内置组件文档](/drip-table/components)。

| 参数名 | 描述 | 必填 | 详情 |
| ----- | ---- | ---- | ---- |
| [column.key](/drip-table/schema/columns/key) | 唯一标识，不做展示用，React 需要的 key | √ | [🔗 示例](/drip-table/schema/columns/key) |
| [column.title](/drip-table/schema/columns/title) | 表头，组件名 | √ | [🔗 示例](/drip-table/schema/columns/title) |
| [column.dataIndex](/drip-table/schema/columns/data-index) | 列数据在数据项中对应的路径 | √ | [🔗 示例](/drip-table/schema/columns/data-index) |
| [column.dataTranslation](/drip-table/schema/columns/data-translation) | 列数据处理 | √ | [🔗 示例](/drip-table/schema/columns/data-translation) |
| [column.defaultValue](/drip-table/schema/columns/default-value) | 默认数据 | × | [🔗 示例](/drip-table/schema/columns/default-value) |
| [column.style](/drip-table/schema/columns/style) | 单元格样式 | × | [🔗 示例](/drip-table/schema/columns/style) |
| [column.hoverStyle](/drip-table/schema/columns/hover-style) | 鼠标悬浮单元格样式 | × | [🔗 示例](/drip-table/schema/columns/hover-style) |
| [column.rowHoverStyle](/drip-table/schema/columns/row-hover-style) | 鼠标悬浮当前行时单元格样式 | × | [🔗 示例](/drip-table/schema/columns/row-hover-style) |
| [column.columnHoverStyle](/drip-table/schema/columns/column-hover-style) | 鼠标悬浮当前列时单元格样式 | × | [🔗 示例](/drip-table/schema/columns/column-hover-style) |
| [column.width](/drip-table/schema/columns/width) | 表格列宽 | × | [🔗 示例](/drip-table/schema/columns/width) |
| [column.align](/drip-table/schema/columns/align) | 表格列对齐 | × | [🔗 示例](/drip-table/schema/columns/align) |
| [column.verticalAlign](/drip-table/schema/columns/vertical-align) | 表格列垂直对齐 | × | [🔗 示例](/drip-table/schema/columns/vertical-align) |
| [column.description](/drip-table/schema/columns/description) | 表头说明 | × | [🔗 示例](/drip-table/schema/columns/description) |
| [column.fixed](/drip-table/schema/columns/fixed) | 是否固定列 | × | [🔗 示例](/drip-table/schema/columns/fixed) |
| [column.hidden](/drip-table/schema/columns/hidden) | 根据行数据控制当前单元格组件是否隐藏不可见 | × | [🔗 示例](/drip-table/schema/columns/hidden) |
| [column.disable](/drip-table/schema/columns/disable) | 根据行数据控制当前单元格组件是否禁用 | × | [🔗 示例](/drip-table/schema/columns/disable) |
| [column.editable](/drip-table/schema/columns/editable) | 根据行数据控制当前单元格组件是否隐藏不可见 | × | [🔗 示例](/drip-table/schema/columns/editable) |
| [column.hidable](/drip-table/schema/columns/hidable) | 用户可控制该列显示隐藏 | × | [🔗 示例](/drip-table/schema/columns/hidable) |
| [column.sorter](/drip-table/schema/columns/sorter) | 排序设置 | × | [🔗 示例](/drip-table/schema/columns/sorter) |
| [column.filters](/drip-table/schema/columns/filters) | 数据过滤器设置 | × | [🔗 示例](/drip-table/schema/columns/filters) |
| [column.filtersMaxSelect](/drip-table/schema/columns/filters-max-select) | 数据过滤器最大选择数量 | × | [🔗 示例](/drip-table/schema/columns/filters-max-select) |
| [column.defaultFilteredValue](/drip-table/schema/columns/default-filtered-value) | 默认数据过滤器值 | × | [🔗 示例](/drip-table/schema/columns/default-filtered-value) |
| [column.component](/drip-table/schema/columns/component) | 组件类型标识符，自定义开发的业务组件以 `命名空间::组件名称` 格式填写 | √ | [🔗 示例](/drip-table/schema/columns/component) |
| [column.options](/drip-table/schema/columns/options) | 组件类型的对应配置项 | √ | [🔗 示例](/drip-table/schema/columns/options) |
