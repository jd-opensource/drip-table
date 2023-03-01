---
title: 常见问题
toc: content
---

## 常见问题

### 1、是否支持自定义组件面板？

可以，`<DripTableGenerator />` 添加 `customComponentPanel` 和 `customComponent` 属性即可。
其中，`customComponentPanel` 传入自定义组件的属性配置等配置信息，`customComponent` 属性传入自定义组。

### 2、使用时样式错乱该如何解决？

首先排查一下是否未安装 `antd`、`drip-table`，然后，查看一下组件是否引入了对应的样式文件。

### 3、安装后运行项目报错： `ReferenceError: Buffer is not defined`，如何解决？

建议查看一下是否是因为本地项目使用了 `webpack5`，然后安装最新版本的 `drip-table`。
