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
