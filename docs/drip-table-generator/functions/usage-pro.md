---
order: 2
title: 高级教程
---

# 高级教程

> 本篇主要介绍 `drip-table-generator` 的高级使用能力介绍

## 一、在线 `LowCode` 组件

**Generator 提供了可在线编写简单代码的自定义组件，方便用户生成自己所想要的渲染HTML**

自定义代码编写时返回一段字符串或者带 `HTML` 的字符串，`drip-table` 会将其渲染成 `HTML`。

效果图如下所示：

![image](https://img13.360buyimg.com/imagetools/jfs/t1/218522/19/5799/94575/61a09db2E30ef6a81/add97ba39098f925.jpg)

#### 参数 `rec`

- 描述: `模板字段`
- 类型: `Record`
- 默认值: `null`
用于获取表格数据的一条记录，数据格式取决于用户传入的数据格式。

示例：

```js
return `<a href="http://ace.jd.com/#/launch?config=${rec.price}" target="_blank">${rec.name}</a>`;
```

## 二、Refs 引用

利用 `React.useRef` 获取 `<DripTableGenerator>` 实例，可以直接在外部操作生成器动作胡哦哦这获取生成器状态。

**开放方法**

#### getSchemaValue

- 描述: `获取表格schema配置数据`
- 参数: `无`
- 返回类型: `DripTableSchema`
从生成器外部主动获取当前配置信息并做后续操作。

示例如下：

```js
// 初始化实例
const generator = React.useRef(null);

// 调用实例内部函数或者获取内部属性
generator.current.getSchemaValue();

// 引用
<DripTableGenerator ref={generator} />
```

## 三、自定义组件及属性面板

用户可以根据业务需要自定义表格组件，当传入自定义组件给 `DripTableGenerator` 时，需要自定义属性面板。

效果图如下所示：

![image](https://img12.360buyimg.com/imagetools/jfs/t1/205483/28/16831/38692/61a0a0c6E2e10434b/49b58dd2a16c6e66.jpg)

字段说明：

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

    默认属性组件类型包括：`input`、 `text`、 `auto-complete`、 `switch`、 `number`、 `checkbox`、 `radio`、 `select`、 `cascader`、 `code-editor`、 `color-picker`、 `custom::ArrayComponent`。

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

    * 具体属性同 `antd` 组件，具体详见 `antd` 官网。
    * `code-editor` 暂无属性。
    * `custom::ArrayComponent` 属性包含 `items`，`items` 为 `Array`, 每一项配置同通用 `antd` 组件。

#### attrSchema.type
- 描述: `属性数据类型`
- 类型: `string`
- 默认值: `无`

    属性数据类型，用于描述组件所对应字段的数据类型。

示例：

```js
<DripTableGenerator
  customComponents={{ custom: { CustomComponentName } }}
  customComponentPanel={
    {
      mode: 'add',
      components: [
        {
          $id: '$custom_id',
          'ui:type': 'custom::CustomComponentName',
          type: 'string',
          group: '组名称',
          fieldKey: 'custom_[hash]_id',
          title: '组件名称',
          attrSchema: [
            {
              name: 'propertyName',
              required: true,
              'ui:title': '属性标题',
              'ui:type': 'select',
              'ui:props': {},
              type: 'string',
              ...(otherProps),
            },
            ...(otherAttributes),
          ]
        }
      ]
    }
  }
/>
```
