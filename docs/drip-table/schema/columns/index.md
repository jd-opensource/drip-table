---
order: 6
title: 列配置 columns
---

## 列配置 columns

- 描述：列定义
- 类型：`(CustomColumnSchema | DripTableBuiltInColumnSchema)[]`
- 默认值：必填

列定义 `columns` 字段为一个由列描述对象组成的数组，数组的每个元素即列描述对象与列组件一一对应。其中列组件分为 DripTable 官方组件与 [用户自定义业务组件](/drip-table/props/components) 两种，它们都继承自列基础属性 [`DripTableColumnSchema`](/drip-table/types/column-schema)，关于各组件自定义属性部分请参照 [官方内置组件文档](/drip-table/components)，通用基础属性参见 [**通用组件基础属性列表 (Schema.Columns)**](/drip-table/schema/columns/all)。
