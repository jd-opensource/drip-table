---
title: 属性参数 Props
toc: content
---

## 属性参数 Props

通过调整传入表格的各项属性，控制表格的展示方式、实现表格的事件响应。

### 子项

| 参数名 | 描述 | 必填 | 详情 |
| ----- | ---- | ---- | ---- |
| [className](/drip-table/props/class-name) | 样式表类名 | × | [🔗 示例](/drip-table/props/class-name) |
| [style](/drip-table/props/style) | 自定义样式表 | × | [🔗 示例](/drip-table/props/style) |
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
| [sticky](/drip-table/props/sticky) | 冻结表头和滚动条设置项 | × | [🔗 示例](/drip-table/props/sticky) |
| [defaultExpandAllRows](/drip-table/props/default-expand-all-rows) | 默认展开全部子表 | × | [🔗 示例](/drip-table/props/default-expand-all-rows) |
| [defaultExpandedRowKeys](/drip-table/props/default-expanded-row-keys) | 子表默认展开项 | × | [🔗 示例](/drip-table/props/default-expanded-row-keys) |
| [title](/drip-table/props/title) | 顶部自定义渲染函数 | × | [🔗 示例](/drip-table/props/title) |
| [footer](/drip-table/props/footer) | 底部自定义渲染函数 | × | [🔗 示例](/drip-table/props/footer) |
| [emptyText](/drip-table/props/empty-text) | 表格无数据时提示语 | × | [🔗 示例](/drip-table/props/empty-text) |
| [subtableTitle](/drip-table/props/subtable-title) | 子表顶部自定义渲染函数 | × | [🔗 示例](/drip-table/props/subtable-title) |
| [subtableFooter](/drip-table/props/subtable-footer) | 子表底部自定义渲染函数 | × | [🔗 示例](/drip-table/props/subtable-footer) |
| [rowExpandable](/drip-table/props/row-expandable) | 获取指定行是否可展开 | × | [🔗 示例](/drip-table/props/row-expandable) |
| [expandedRowRender](/drip-table/props/expanded-row-render) | 行展开自定义渲染函数 | × | [🔗 示例](/drip-table/props/expanded-row-render) |
| [rowSelectable](/drip-table/props/row-selectable) | 获取指定行是否可选择 | × | [🔗 示例](/drip-table/props/row-selectable) |
| [rowHeaderVisible](/drip-table/schema/row-header-visible) | 行头部插槽是否可见 | × | [🔗 示例](/drip-table/schema/row-header-visible) |
| [rowFooterVisible](/drip-table/schema/row-footer-visible) | 行尾部插槽是否可见 | × | [🔗 示例](/drip-table/schema/row-footer-visible) |
| [componentDidMount](/drip-table/props/component-did-mount) | 生命周期：组件加载完成 | × | [🔗 示例](/drip-table/props/component-did-mount) |
| [componentDidUpdate](/drip-table/props/component-did-update) | 生命周期：组件更新完成 | × | [🔗 示例](/drip-table/props/component-did-update) |
| [componentWillUnmount](/drip-table/props/component-will-unmount) | 生命周期：组件即将卸载 | × | [🔗 示例](/drip-table/props/component-will-unmount) |
| [onRowClick](/drip-table/props/on-row-click) | 点击行 | × | [🔗 示例](/drip-table/props/on-row-click) |
| [onRowDoubleClick](/drip-table/props/on-row-double-click) | 双击行 | × | [🔗 示例](/drip-table/props/on-row-double-click) |
| [onRowExpand](/drip-table/props/on-row-expand) | 行展开触发 | × | [🔗 示例](/drip-table/props/on-row-expand) |
| [onRowCollapse](/drip-table/props/on-row-collapse) | 行收起触发 | × | [🔗 示例](/drip-table/props/on-row-collapse) |
| [onSelectionChange](/drip-table/props/on-selection-change) | 选择行变化 | × | [🔗 示例](/drip-table/props/on-selection-change) |
| [onSearch](/drip-table/props/on-search) | 搜索触发 | × | [🔗 示例](/drip-table/props/on-search) |
| [onInsertButtonClick](/drip-table/props/on-insert-button-click) | 点击添加按钮触发 | × | [🔗 示例](/drip-table/props/on-insert-button-click) |
| [onPageChange](/drip-table/props/on-page-change) | 页码/页大小变化 | × | [🔗 示例](/drip-table/props/on-page-change) |
| [onPaginationChange](/drip-table/props/on-pagination-change) | 分页器变动触发 | × | [🔗 示例](/drip-table/props/on-pagination-change) |
| [onSortChange](/drip-table/props/on-sort-change) | 排序变动触发 | × | [🔗 示例](/drip-table/props/on-sort-change) |
| [onFilterChange](/drip-table/props/on-filter-change) | 过滤器触发 | × | [🔗 示例](/drip-table/props/on-filter-change) |
| [onChange](/drip-table/props/on-change) | 过滤器、分页器 等配置变化 | × | [🔗 示例](/drip-table/props/on-change) |
| [onDisplayColumnKeysChange](/drip-table/props/on-display-column-keys-change) | 用户修改展示的列时 | × | [🔗 示例](/drip-table/props/on-display-column-keys-change) |
| [onEvent](/drip-table/props/on-event) | 通用事件机制 | × | [🔗 示例](/drip-table/props/on-event) |

### 示例

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import { Button, message } from "antd";
import React from "react";
import DripTable from "drip-table";

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
  rowHeader: {
    elements: [
      {
        span: 'flex-auto',
        type: 'slot',
        slot: 'EventSample',
        data: { from: '整行' },
        style: { padding: '10px 20px' },
      },
    ],
  },
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
      schema={schema}
      dataSource={dataSource}
      components={{
        custom: {
          EventSample: (props) => (
            <div>
              <span style={{ marginRight: '5px' }}>单元格插槽</span>
              <Button onClick={() => { props.fireEvent({ type: 'custom', name: 'sample-event', payload: 'some value' }) }}>发起事件</Button>
            </div>
          ),
        },
      }}
      slots={{
        EventSample: (props) => (
          <div style={{ textAlign: 'center' }}>
            <span style={{ marginRight: '5px' }}>{props.data.from}插槽</span>
            <Button onClick={() => { props.fireEvent({ type: 'custom', name: 'sample-event', payload: 'some value' }) }}>发起事件</Button>
          </div>
        ),
      }}
      onEvent={(event, tableInfo) => {
        const { record, recordIndex, columnIndex } = event;
        let from = '';
        if (columnIndex !== void 0) {
          from += `第${columnIndex + 1}列`;
        }
        if (recordIndex !== void 0) {
          from += `第${recordIndex + 1}行`;
        }
        if (record !== void 0) {
          from += `“${record.name} (ID: ${record.id})”`;
        }
        if (event.type === 'drip-link-click') {
          const name = event.payload;
          if (from) {
            from += '的';
          }
          message.info(`你点击了${from}"${name}"事件按钮。`);
          console.log(name, record, recordIndex);
        } else if (event.type === 'custom') {
          if (from) {
            from = `触发与${from}的`;
          }
          message.info(`自定义事件 “${event.type}”(payload:${JSON.stringify(event.payload)}) ${from}自定义组件。`);
          console.log(event, record, recordIndex);
        }
      }}
    />
  );
};

export default Demo;
```
