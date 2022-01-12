---
order: 2
title: Schema 配置项
---

## Schema 配置项

> 通过配置项，我们可以决定开启或关闭某些功能，或者设置表格样式等等。

### bordered

> 添加表格外部边框线。

- 描述: 表格边框
- 类型: `boolean`
- 默认值: `false`

### ellipsis

> 设置是否平均列宽展示。

- 描述: 平均列宽
- 类型: `boolean`
- 默认值: `false`

### innerBordered

> 是否展示表格内部边框线。

- 描述: 表格边框
- 类型: `boolean`
- 默认值: `false`

### placeholder

> 设置当无数据时展示的兜底图案和提示文本。

- 描述: 空提示
- 类型: `{ image: string; text: string; }`
- 默认值: `undefined`

### pagination

> 是否展示分页器以及配置分页器的样式和位置。

- 描述: 分页器配置
- 类型:

  ```ts
  false | {
    size?: 'small' | 'default';
    pageSize?: number;
    position?: "bottomLeft" | "bottomCenter" | "bottomRight";
    showLessItems?: boolean;
    showQuickJumper?: boolean;
    showSizeChanger?: boolean;
  }
  ```

- 默认值: `false`

### rowSelection

> 设置是否支持选择栏。

- 描述: 选择栏
- 类型: `boolean`
- 默认值: `false`

### virtual

> 设置是否开启虚拟列表。

- 描述: 虚拟列表
- 类型: `boolean`
- 默认值: `false`

### scrollY

> 设置开启虚拟列表后的表格高度。

- 描述: 虚拟列表高度
- 类型: `number`
- 默认值: `300`

### header

> 是否展示标题栏以及配置标题栏的样式、位置等基本属性。

- 描述: 标题栏配置
- 类型:

  ```ts
  interface HeaderConfigBase {
    /**
     * 包裹 <Col> 样式名
     */
    className?: string;
    /**
     * 包裹 <Col> 样式
     */
    style?: React.CSSProperties;
    /**
     * 宽度：
     * {number}      跨度，取值 0-24。
     * {'flex-auto'} 自动伸缩。
     * {string}      透传给元素的 width 样式值。
     */
    span?: number | 'flex-auto' | string;
    /**
     * 对齐方式
     * {'flex-start'}    左对齐。
     * {'center'}        居中。
     * {'flex-end'}      右对齐。
     * {'space-between'} 两端对齐。
     * {'space-around'}  等间对齐。
     */
    align?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
    /**
     * 是否可见
     */
    visible?: boolean;
  }

  interface HeaderSpacerElement extends HeaderConfigBase {
    /**
     * 占位区域
     */
    type: 'spacer';
  }

  interface HeaderTextElement extends HeaderConfigBase {
    /**
     * 文本展示
     */
    type: 'text';
    /**
     * 文本内容
     */
    text: string;
  }

  interface HeaderHTMLElement extends HeaderConfigBase {
    /**
     * 富文本展示
     */
    type: 'html';
    /**
     * 富文本内容
     */
    html: string;
  }

  interface HeaderSearchElement extends HeaderConfigBase {
    /**
     * 基本搜索
     */
    type: 'search';
    /**
     * 搜索区域类名
     */
    wrapperClassName?: string;
    /**
     * 搜索区域样式
     */
    wrapperStyle?: React.CSSProperties;
    /**
     * 暗纹提示
     */
    placeholder?: string;
    /**
     * 显示清空按钮
     */
    allowClear?: boolean;
    /**
     * 搜索按钮文字
     */
    searchButtonText?: string;
    /**
     * 搜索按钮大小
     */
    searchButtonSize?: 'large' | 'middle' | 'small';
    /**
     * 多维度搜索维度指定
     */
    searchKeys?: { label: string; value: number | string }[];
    /**
     * 多维度搜索默认维度值
     */
    searchKeyDefaultValue?: number | string;
  }

  interface HeaderAdvanceSearchElement extends HeaderConfigBase {
    /**
     * 高级搜索（用户自定义搜索组件）
     */
    type: 'advance-search';
    /**
     * 透传给自定搜索组件的属性值
     */
    props?: Record<string, unknown>;
  }

  interface HeaderInsertButtonElement extends HeaderConfigBase {
    type: 'insert-button';
    insertButtonClassName?: string;
    insertButtonStyle?: React.CSSProperties;
    insertButtonText?: string;
    showIcon?: boolean;
  }

  interface HeaderDisplayColumnSelectorElement extends HeaderConfigBase {
    /**
     * 展示列选择器
     */
    type: 'display-column-selector';
    /**
     * 展示列选择器提示文案
     */
    selectorButtonText?: string;
    /**
     * 选择器按钮样式
     */
    selectorButtonType?: React.ComponentProps<DripTableDriver<unknown>['components']['Button']>['type'];
  }

  export type DripTableHeaderElement =
    | HeaderSpacerElement
    | HeaderTextElement
    | HeaderHTMLElement
    | HeaderSearchElement
    | HeaderAdvanceSearchElement
    | HeaderInsertButtonElement
    | HeaderDisplayColumnSelectorElement;

  type header = boolean | {
    style: React.CSSProperties;
    elements: DripTableHeaderElement[];
  };
  ```

- 默认值: `false`

### size

> 设置表格尺寸，其中 `'small' | 'middle'` 为紧凑型表格，适用于小页面或者对话框内。

- 描述: 表格尺寸
- 类型: `'small' | 'middle' | 'large' | 'default'`
- 默认值: `'default'`

### sticky

> 对于长表格，需要滚动才能查看表头和滚动条，那么现在可以设置跟随页面固定表头和滚动条。

- 描述: 粘性头部
- 类型: `boolean`
- 默认值: `false`

## columns

表格列配置

### key

> 每一列的唯一标识，React 需要的 key。

- 描述: 唯一标识
- 类型: `string`
- 默认值: (必填)

### ui:type

> 是该列对应的单元格内容所需要的组件类型名称，除内置的几个类型外，自定义类型需要使用 `命名空间::组件名称` 格式，并通过 components 属性传进来。

- 描述: 组件类型
- 类型: `string`
- 默认值: (必填)

### ui:props

> 是该列对应的单元格内容所对应的组件的属性。

- 描述: 组件属性
- 类型: `Record<string, unknown>`
- 默认值: `{}`

### title

> 每一列的标题名称。

- 描述: 表头
- 类型: `string`
- 默认值: (必填)

### width

> 每一列的宽度，支持数字和带单位的字符串，内容同CSS写法。

- 描述: 列宽
- 类型: `string`
- 默认值: `undefined`

### dataIndex

> 列数据在数据项中对应的路径，支持通过数组查询嵌套路径。

- 描述: 数据索引
- 类型: `string | string[]`
- 默认值: `undefined`

### description

> 表头的提示说明，如果设置了值，则会在该列的表头标题后添加?图标，鼠标悬浮可查看表头说明内容。

- 描述: 表头说明
- 类型: `string | string[]`
- 默认值: `""`

### type

> 表示该列每个单元格内所展示的数据的数据格式。

- 描述: 数据类型
- 类型: `string`
- 默认值: `string`

### default

> 表示该列每个单元格内所展示的数据的默认值，如果数据不下发，则展示该兜底数据。

- 描述: 默认值
- 类型: `string`
- 默认值: `undefined`

### hidable

> 表示该列是否允许用户自定义展示状态。

- 描述: 是否可隐藏
- 类型: `boolean`
- 默认值: `false`

### [...props]

> 表示该列的其他属性。

- 描述: `其他属性`
- 类型: `unknown`
- 默认值: (无)
