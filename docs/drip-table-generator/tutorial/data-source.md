---
title: 数据预览配置
toc: content
---

## 数据预览配置

> 本篇主要介绍如何利用 `drip-table-generator` 手动配置默认数据以及数据对应字段。

## 自动预览数据配置

`drip-table-generator` 提供了 `dataSource` 和 [🔗`dataFields`](/drip-table-generator/props/data-fields) 两个字段，两个字段需要配合使用，从而实现表格数据的预览。其中 `dataSource` 负责表格数据的预览， `dataFields` 设置字段选择器下拉框数据。

效果如下图所示：
![image](https://img11.360buyimg.com/imagetools/jfs/t1/126307/22/30818/355128/636261b7Ec3def89f/dc46df1bab43decd.png)

## 手动默认数据配置

`drip-table-generator` 提供了 [🔗`mockDataSource`](/drip-table-generator/props/mock-data-source) 字段控制属性栏“表格数据”选项卡的显隐控制，当打开时提供文本编辑器，允许用户手动输入数据来覆盖 `dataSource` 字段传入的值。

效果如下图所示：
![image](https://img12.360buyimg.com/imagetools/jfs/t1/180703/35/29787/567565/636261b8Ee7ed82b1/b7c6c713a48dde60.png)
