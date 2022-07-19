---
order: 2
title: 总览
---

# 参数总览

| 参数名 | 描述 | 必填 | 详情 |
| ----- | ---- | ---- | ---- |
| [className](/drip-table/props/class-name) | 样式表类名 | × | [🔗 示例](/drip-table/props/class-name) |
| [style](/drip-table/props/style) | 自定义样式表 | × | [🔗 示例](/drip-table/props/style) |
| [driver](/drip-table/props/driver) | 底层组件驱动 | √ | [🔗 示例](/drip-table/props/driver) |
| [schema](/drip-table/props/schema) | 表单 Schema | √ | [🔗 示例](/drip-table/props/schema) |
| [ref](/drip-table/props/ref) | 引用 | × | [🔗 示例](/drip-table/props/ref) |
| [ajv](/drip-table/props/ajv) | Schema 校验配置项 | × | [🔗 示例](/drip-table/props/ajv) |
| [dataSource](/drip-table/props/data-source) | 数据源 | √ | [🔗 示例](/drip-table/props/data-source) |
| [selectedRowKeys](/drip-table/props/selected-row-keys) | 当前选中的行键 | × | [🔗 示例](/drip-table/props/selected-row-keys) |
| [displayColumnKeys](/drip-table/props/display-column-keys) | 当前显示的列键 | × | [🔗 示例](/drip-table/props/display-column-keys) |
| [total](/drip-table/props/total) | 数据源总条数 | × | [🔗 示例](/drip-table/props/total) |
| [currentPage](/drip-table/props/current-page) | 当前页码 | × | [🔗 示例](/drip-table/props/current-page) |
| [loading](/drip-table/props/loading) | 加载中 | × | [🔗 示例](/drip-table/props/loading) |
| [subtableProps](/drip-table/props/subtable-props) | 子表参数匹配设置 | × | [🔗 示例](/drip-table/props/subtable-props) |
| [components](/drip-table/props/components) | 表格单元格组件库 | × | [🔗 示例](/drip-table/props/components) |
| [slots](/drip-table/props/slots) | 组件插槽，可通过 Schema 控制自定义区域渲染 | × | [🔗 示例](/drip-table/props/slots) |
| [ext](/drip-table/props/ext) | 自定义组件附加透传数据 | × | [🔗 示例](/drip-table/props/ext) |
| [sticky](/drip-table/props/sticky) | 冻结首行和滚动条设置项 | × | [🔗 示例](/drip-table/props/sticky) |
| [defaultExpandAllRows](/drip-table/props/default-expand-all-rows) | 默认展开全部子表 | × | [🔗 示例](/drip-table/props/default-expand-all-rows) |
| [defaultExpandedRowKeys](/drip-table/props/default-expanded-row-keys) | 子表默认展开项 | × | [🔗 示例](/drip-table/props/default-expanded-row-keys) |
| [title](/drip-table/props/title) | 顶部自定义渲染函数 | × | [🔗 示例](/drip-table/props/title) |
| [footer](/drip-table/props/footer) | 底部自定义渲染函数 | × | [🔗 示例](/drip-table/props/footer) |
| [subtableTitle](/drip-table/props/subtable-title) | 子表顶部自定义渲染函数 | × | [🔗 示例](/drip-table/props/subtable-title) |
| [subtableFooter](/drip-table/props/subtable-footer) | 子表底部自定义渲染函数 | × | [🔗 示例](/drip-table/props/subtable-footer) |
| [rowExpandable](/drip-table/props/row-expandable) | 获取指定行是否可展开 | × | [🔗 示例](/drip-table/props/row-expandable) |
| [expandedRowRender](/drip-table/props/expanded-row-render) | 行展开自定义渲染函数 | × | [🔗 示例](/drip-table/props/expanded-row-render) |
| [componentDidMount](/drip-table/props/component-did-mount) | 生命周期：组件加载完成 | × | [🔗 示例](/drip-table/props/component-did-mount) |
| [componentDidUpdate](/drip-table/props/component-did-update) | 生命周期：组件更新完成 | × | [🔗 示例](/drip-table/props/component-did-update) |
| [componentWillUnmount](/drip-table/props/component-will-unmount) | 生命周期：组件即将卸载 | × | [🔗 示例](/drip-table/props/component-will-unmount) |
| [onRowClick](/drip-table/props/on-row-click) | 点击行 | × | [🔗 示例](/drip-table/props/on-row-click) |
| [onRowDoubleClick](/drip-table/props/on-row-double-click) | 双击行 | × | [🔗 示例](/drip-table/props/on-row-double-click) |
| [onSelectionChange](/drip-table/props/on-selection-change) | 选择行变化 | × | [🔗 示例](/drip-table/props/on-selection-change) |
| [onSearch](/drip-table/props/on-search) | 搜索触发 | × | [🔗 示例](/drip-table/props/on-search) |
| [onInsertButtonClick](/drip-table/props/on-insert-button-click) | 点击添加按钮触发 | × | [🔗 示例](/drip-table/props/on-insert-button-click) |
| [onFilterChange](/drip-table/props/on-filter-change) | 过滤器触发 | × | [🔗 示例](/drip-table/props/on-filter-change) |
| [onPageChange](/drip-table/props/on-page-change) | 页码/页大小变化 | × | [🔗 示例](/drip-table/props/on-page-change) |
| [onChange](/drip-table/props/on-change) | 过滤器、分页器 等配置变化 | × | [🔗 示例](/drip-table/props/on-change) |
| [onDisplayColumnKeysChange](/drip-table/props/on-display-column-keys-change) | 用户修改展示的列时 | × | [🔗 示例](/drip-table/props/on-display-column-keys-change) |
| [onEvent](/drip-table/props/on-event) | 通用事件机制 | × | [🔗 示例](/drip-table/props/on-event) |
