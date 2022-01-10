---
order: 2
title: schema配置项
---

# schema配置项

> 通过配置项，我们可以决定开启或关闭某些功能，或者设置表格样式等等。

## configs
表格全局配置

### bordered
- 描述: `表格边框`
- 类型: `boolean`
- 默认值: `false`
添加表格外部边框线。

### ellipsis
- 描述: `平均列宽`
- 类型: `boolean`
- 默认值: `false`
设置是否平均列宽展示。

### innerBordered
- 描述: `表格边框`
- 类型: `boolean`
- 默认值: `false`
是否展示表格内部边框线。

### placeholder
- 描述: `空提示`
- 类型: `{ image: string; text: string; }`
- 默认值: `undefined`
设置当无数据时展示的兜底图案和提示文本。

### pagination
- 描述: `分页器配置`
- 类型:
  ```js
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
是否展示分页器以及配置分页器的样式和位置。

### rowSelection
- 描述: `选择栏`
- 类型: `boolean`
- 默认值: `false`
设置是否支持选择栏。

### virtual
- 描述: `虚拟列表`
- 类型: `boolean`
- 默认值: `false`
设置是否开启虚拟列表。

### scrollY
- 描述: `虚拟列表高度`
- 类型: `number`
- 默认值: `300`
设置开启虚拟列表后的表格高度。

### header
- 描述: `标题栏配置`
- 类型:
  ```js
    boolean | {
      title?: {
          type: 'title';
          title: string;
          html?: boolean;
          width: string | number;
          position: 'topLeft' | 'topCenter' | 'topRight';
      };
      search?: {
        type: 'search';
        placeholder?: string;
        allowClear?: boolean;
        searchBtnText?: string;
        searchStyle?: React.CSSProperties;
        searchClassName?: string;
        size?: 'large' | 'middle' | 'small';
        typeOptions?: { label: string; value: number | string }[];
        defaultSelectedKey?: number | string;
        width: string | number;
        position: 'topLeft' | 'topCenter' | 'topRight';
      };
      addButton?: {
        type: 'addButton';
        showIcon?: boolean;
        addBtnText?: string;
        addBtnStyle?: React.CSSProperties;
        addBtnClassName?: string;
        width: string | number;
        position: 'topLeft' | 'topCenter' | 'topRight';
      };
    }
  ```
- 默认值: `false`
是否展示标题栏以及配置标题栏的样式、位置等基本属性。

### size
- 描述: `表格尺寸`
- 类型: `'small' | 'middle' | 'large' | 'default'`
- 默认值: `'default'`
设置表格尺寸，其中`'small' | 'middle'`为紧凑型表格，适用于小页面或者对话框内。

### sticky
- 描述: `粘性头部`
- 类型: `boolean`
- 默认值: `false`
对于长表格，需要滚动才能查看表头和滚动条，那么现在可以设置跟随页面固定表头和滚动条。


## columns
表格列配置

### key
- 描述: `唯一标识`
- 类型: `string`
- 默认值: `必填`
每一列的唯一标识，React 需要的 key。

### ui:type
- 描述: `组件类型`
- 类型: `string`
- 默认值: `必填`
是该列对应的单元格内容所需要的组件类型名称，除内置的几个类型外，自定义类型需要使用`命名空间::组件名称`格式，并通过 components 属性传进来。
目前所包含的内置类型有：纯文本 `text`, 富文本 `render-html`, 带事件的链接 `links`, 图片 `picture`, 按钮 `buttons`, 代码自定义渲染组件`code`。

### ui:props
- 描述: `组件属性`
- 类型: `Record<string, unknown>`
- 默认值: `{}`
是该列对应的单元格内容所对应的组件的属性。

### title
- 描述: `表头`
- 类型: `string`
- 默认值: `必填`
每一列的标题名称。

### width
- 描述: `列宽`
- 类型: `string`
- 默认值: `undefined`
每一列的宽度，支持数字和带单位的字符串，内容同CSS写法。

### dataIndex
- 描述: `数据索引`
- 类型: `string | string[]`
- 默认值: `undefined`
列数据在数据项中对应的路径，支持通过数组查询嵌套路径。

### description
- 描述: `表头说明`
- 类型: `string | string[]`
- 默认值: ` `
表头的提示说明，如果设置了值，则会在该列的表头标题后添加?图标，鼠标悬浮可查看表头说明内容。

### type
- 描述: `数据类型`
- 类型: `string`
- 默认值: `string`
表示该列每个单元格内所展示的数据的数据格式。

### default
- 描述: `默认值`
- 类型: `string`
- 默认值: ` `
表示该列每个单元格内所展示的数据的默认值，如果数据不下发，则展示该兜底数据。

### [...props]
- 描述: `其他属性`
- 类型: `unknown`
- 默认值: ` `
表示该列的其他属性。
