---
order: 2
title: 总览
---

## 参数总览

### `<DripTableGenerator>` 参数

**DripTableGenerator 将对应的 `<DripTable>` 组件包裹起来，利用页面组件将 `DripTable` 的 `schema` 进行可视化加工和生产**

| 参数名 | 描述 | 必填 | 详情 |
| ----- | ---- | ---- | ---- |
| [style](/drip-table/props/style) | 自定义样式表 | × | [🔗 示例](/drip-table/props/style) |
| [showComponentLayout](/drip-table-generator/props/show-component-layout) | 是否展示组件栏 | × | [🔗 示例](/drip-table-generator/props/show-component-layout) |
| [showToolLayout](/drip-table-generator/props/show-tool-layout) | 是否展示工具栏 | × | [🔗 示例](/drip-table-generator/props/show-tool-layout) |
| [mockDataSource](/drip-table-generator/props/mock-data-source) | 属性栏是否展示表格数据输入框 | × | [🔗 示例](/drip-table-generator/props/mock-data-source) |
| [noDataFeedback](/drip-table-generator/props/no-data-feedback) | 自定义 Generator 无数据时的反馈提示 | × | [🔗 示例](/drip-table-generator/props/no-data-feedback) |
| [dataFields](/drip-table-generator/props/data-fields) | 接口API默认字段名 | × | [🔗 示例](/drip-table-generator/props/data-fields) |
| [customComponentPanel](/drip-table-generator/props/custom-component-panel) | 自定义组件面板 | × | [🔗 示例](/drip-table-generator/props/custom-component-panel) |
| [customGlobalConfigPanel](/drip-table-generator/props/custom-global-config-panel) | 自定义全局属性面板 | × | [🔗 示例](/drip-table-generator/props/custom-global-config-panel) |
| [onExportSchema](/drip-table-generator/props/on-export-schema) | 导出表格 Schema | × | [🔗 示例](/drip-table-generator/props/on-export-schema) |
| [driver](/drip-table/props/driver) | 底层组件驱动 | √ | [🔗 示例](/drip-table/props/driver) |
| [schema](/drip-table/props/schema) | 初始化载入的表单 Schema | √ | [🔗 示例](/drip-table/props/schema) |
| [dataSource](/drip-table/props/data-source) | 数据源 | √ | [🔗 示例](/drip-table/props/data-source) |
| [customComponents](/drip-table/props/components) | 自定义表格单元格组件库 | × | [🔗 示例](/drip-table/props/components) |
| [slots](/drip-table/props/slots) | 组件插槽，可通过 Schema 控制自定义区域渲染 | × | [🔗 示例](/drip-table/props/slots) |
| [slotsSchema](/drip-table-generator/props/slots-schema) | 组件插槽属性配置，定义插槽的属性编辑框 | × | [🔗 示例](/drip-table-generator/props/slots-schema) |
| [ext](/drip-table/props/ext) | 自定义组件附加透传数据 | × | [🔗 示例](/drip-table/props/ext) |
| [sticky](/drip-table/props/sticky) | 粘性头部和滚动条设置项 | × | [🔗 示例](/drip-table/props/sticky) |
| [title](/drip-table/props/title) | 顶部自定义渲染函数 | × | [🔗 示例](/drip-table/props/title) |
| [footer](/drip-table/props/footer) | 底部自定义渲染函数 | × | [🔗 示例](/drip-table/props/footer) |
| [subtableTitle](/drip-table/props/subtable-title) | 子表顶部自定义渲染函数 | × | [🔗 示例](/drip-table/props/subtable-title) |
| [subtableFooter](/drip-table/props/subtable-footer) | 子表底部自定义渲染函数 | × | [🔗 示例](/drip-table/props/subtable-footer) |
| [rowExpandable](/drip-table/props/row-expandable) | 获取指定行是否可展开 | × | [🔗 示例](/drip-table/props/row-expandable) |
| [expandedRowRender](/drip-table/props/expanded-row-render) | 行展开自定义渲染函数 | × | [🔗 示例](/drip-table/props/expanded-row-render) |

> tips: `driver`, `schema`, `dataSource`, `customComponents`, `slots`, `ext`, `sticky`, `title`, `footer`, `subtableTitle`, `subtableFooter`, `rowExpandable`, `expandedRowRender` 属性均继承自 `drip-table`。
