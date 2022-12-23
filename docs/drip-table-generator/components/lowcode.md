---
order: 2
title: 低代码组件
---

## 低代码组件

**Generator 提供了可在线编写简单代码的自定义组件，方便用户生成自己所想要的渲染 HTML**

自定义代码编写时返回一段字符串或者带 `HTML` 的字符串，`drip-table` 会将其渲染成 `HTML`。

效果图如下所示：

![image](https://img10.360buyimg.com/imagetools/jfs/t1/160874/3/32469/319065/636262f3Eb80275b9/5da677a720bbcc14.png)

#### 参数 `rec`

- 描述: `模板字段`
- 类型: `Record`
- 默认值: `null`
  用于获取表格数据的一条记录，数据格式取决于用户传入的数据格式。

示例：

```js
return `<a href="http://ace.jd.com/#/launch?config=${rec.price}" target="_blank">${rec.name}</a>`;
```
