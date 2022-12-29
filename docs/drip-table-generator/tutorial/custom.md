---
order: 2
title: 自定义属性面板
toc: content
---

## 自定义属性面板

> 本篇主要介绍 `drip-table-generator` 的自定义组件以及自定义属性面板的功能

## 一、自定义属性

### 1、自定义全局属性

用户可以根据自身业务需要自定义表格全局设置的属性以及配置面板

**自定义全局属性需要手动关闭 Ajv 的额外属性校验**

效果如下图所示：

![image](https://img11.360buyimg.com/imagetools/jfs/t1/132518/40/30714/281556/63625d66E0a9bd88b/3cf0aebd95eae880.png)

参数字段说明：

### mode

- 描述: `加载模式`
- 类型: `enum<add | replace>`
- 默认值: ``

### configs

- 描述: `属性栏配置项`
- 类型: `DTGComponentPropertySchema[]`

  configs 每项数据字段详情如下所示：

#### name

- 描述: `属性名`
- 类型: `string`
- 默认值: ``

#### required

- 描述: `属性是否必填`
- 类型: `boolean`
- 默认值: `false`

#### ui:title

- 描述: `属性标题`
- 类型: `string`
- 默认值: `无`

#### ui:type

- 描述: `属性组件类型`
- 类型: `string`
- 默认值: `无`

  默认属性组件类型包括：`input`、 `text`、 `auto-complete`、 `switch`、 `number`、 `checkbox`、 `radio`、 `select`、 `cascader`、 `code-editor`、 `color-picker`、 `array-list`。

  当组件类型为 `custom::` 开头时可以通过 `ui:externalComponent` 属性传入外部组件。

#### ui:externalComponent

- 描述: `外部组件`
- 类型: `React.ComponentClass | function`
- 默认值: `无`

  用来传入外部组件使用。

#### ui:props

- 描述: `属性组件的属性`
- 类型: `Record`
- 默认值: `{}`

  - 具体属性同 `antd` 组件，具体详见 `antd` 官网。
  - `code-editor` 暂无属性。
  - `array-list` 属性包含 `items`，`items` 为 `Array`, 每一项配置同通用 `antd` 组件。

#### type

- 描述: `属性数据类型`
- 类型: `string`
- 默认值: `无`

  属性数据类型，用于描述组件所对应字段的数据类型。

#### default

- 描述: `属性默认值`
- 类型: `unknown`
- 默认值: `无`

  属性默认值。

示例：

```js
<DripTableGenerator
  {...otherProps}
  customGlobalConfigPanel={[
    {
      name: "bordered",
      "ui:title": "是否展示边框",
      "ui:type": "switch",
      "ui:props": {},
      type: "boolean",
      default: false,
    },
    {
      name: "size",
      "ui:title": "表格尺寸",
      "ui:type": "radio",
      "ui:props": {
        options: [
          { label: "大号", value: "large" },
          { label: "中等", value: "middle" },
          { label: "小号", value: "small" },
        ],
      },
      type: "string",
      default: "default",
    },
    {
      name: "tips",
      "ui:title": "配置说明",
      "ui:type": "render-html",
      type: "string",
      default: '<span style="color:red;">这是一段说明</span>',
    },
  ]}
/>
```

### 2、自定义组件属性

类似于定制化全局属性，用户也可以根据自身业务需要定制组件的属性面板，尤其当自己传入业务组件时。

效果图如下所示：

![image](https://img13.360buyimg.com/imagetools/jfs/t1/63961/9/22407/255440/63625f57E017515ac/587acfcea6a8f94a.png)

参数字段说明：

#### mode

- 描述: `模式`
- 类型: `add | replace`
- 默认值: `add`

  自定义组件加载模式，当为 `add` 时往默认内建组件库内添加新组件，当为 `replace` 时替换组件库全部使用传入的组件。

#### components

- 描述: `组件列表`
- 类型: `array`
- 默认值: `[]`

  传入的自定义组件配置列表。

自定义组件配置的字段如下：

#### $id

- 描述: `唯一标识`
- 类型: `string`
- 默认值: `无`

#### ui:type

- 描述: `组件类型`
- 类型: `string`
- 默认值: `无`

  组件类型，用于区分组件的唯一标识。

#### type

- 描述: `数据类型`
- 类型: `string`
- 默认值: `无`

  数据类型，用于描述组件所对应字段的数据类型。

#### group

- 描述: `组名称`
- 类型: `string`
- 默认值: `无`

  组件所属组类型。

#### title

- 描述: `组件名称`
- 类型: `string`
- 默认值: `无`

  组件中文名称。

#### attrSchema

- 描述: `属性配置`
- 类型: `array`
- 默认值: `[]`

  组件属性配置。

`attrSchema`配置如下：

#### attrSchema.name

- 描述: `属性名`
- 类型: `string`
- 默认值: ``

#### attrSchema.required

- 描述: `属性是否必填`
- 类型: `boolean`
- 默认值: `false`

#### attrSchema["ui:title"]

- 描述: `属性标题`
- 类型: `string`
- 默认值: `无`

#### attrSchema["ui:type"]

- 描述: `属性组件类型`
- 类型: `string`
- 默认值: `无`

  默认属性组件类型包括：`input`、 `text`、 `auto-complete`、 `switch`、 `number`、 `checkbox`、 `radio`、 `select`、 `cascader`、 `code-editor`、 `color-picker`、 `array-list`。

  当组件类型为 `custom::` 开头时可以通过 `ui:externalComponent` 属性传入外部组件。

#### attrSchema["ui:externalComponent"]

- 描述: `外部组件`
- 类型: `React.ComponentClass | function`
- 默认值: `无`

  用来传入外部组件使用。

#### attrSchema["ui:props"]

- 描述: `属性组件的属性`
- 类型: `Record`
- 默认值: `{}`

  - 具体属性同 `antd` 组件，具体详见 `antd` 官网。
  - `code-editor` 暂无属性。
  - `array-list` 属性包含 `items`，`items` 为 `Array`, 每一项配置同通用 `antd` 组件。

#### attrSchema.type

- 描述: `属性数据类型`
- 类型: `string`
- 默认值: `无`

  属性数据类型，用于描述组件所对应字段的数据类型。

示例：

```js
<DripTableGenerator
  customComponentPanel={{
    mode: "add",
    components: [
      {
        $id: "$custom_id",
        "ui:type": "componentName",
        type: "string",
        group: "组名称",
        fieldKey: "custom_[hash]_id",
        title: "组件名称",
        attrSchema: [
          {
            name: "propertyName",
            required: true,
            "ui:title": "属性标题",
            "ui:type": "select",
            "ui:props": {},
            type: "string",
            ...otherProps,
          },
          ...otherAttributes,
        ],
      },
    ],
  }}
/>
```

## 二、自定义组件及其属性面板

用户可以根据业务需要自定义表格组件，当传入自定义组件给 `drip-table-generator` 时，需要给自定义组件配置属性面板。

效果图如下所示：

![image](https://img13.360buyimg.com/imagetools/jfs/t1/63961/9/22407/255440/63625f57E017515ac/587acfcea6a8f94a.png)

字段说明：

#### customComponents

- 描述: `自定义组件`
- 类型: `DripTableProps<DripTableRecordTypeBase, CustomComponentEvent, Ext>['components']`
- 默认值: `无`

  传入自定义组件，即业务组件，具体参数数据格式同 `DripTable` 的 `components` 属性。

  详情可见[自定义组件库](/drip-table/props/components)。

#### customComponentPanel

- 描述: `自定义组件属性面板`
- 类型: `array`
- 默认值: `无`

  传入的自定义组件配置列表，具体参数见上方[自定义组件属性面板](#2自定义组件属性面板)。

示例：

```js
<DripTableGenerator
  customComponents={{ custom: { CustomComponentName } }}
  customComponentPanel={{
    mode: "add",
    components: [
      {
        $id: "$custom_id",
        "ui:type": "custom::CustomComponentName",
        type: "string",
        group: "组名称",
        fieldKey: "custom_[hash]_id",
        title: "组件名称",
        attrSchema: [
          {
            name: "propertyName",
            required: true,
            "ui:title": "属性标题",
            "ui:type": "select",
            "ui:props": {},
            type: "string",
            ...otherProps,
          },
          ...otherAttributes,
        ],
      },
    ],
  }}
/>
```
