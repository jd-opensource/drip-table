---
order: 1
title: 基础实例
---

# 基础实例

> 本篇主要通过一个基础的 Demo 实例来展示如何使用drip-table

## 代码演示

```jsx
/**
 * transform: true
 * defaultShowCode: true
 * hideActions: ["CSB"]
 */
import React from 'react';
import { DripTable } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import 'antd/dist/antd.css';
import 'drip-table/index.css';

const schema = {
  "$schema": "http://json-schema.org/draft/2019-09/schema#",
  configs: {
    size: 'middle',
    search: {
      placeholder: '请输入',
      searchText: '搜索',
      position: 'topRight',
    },
    pagination: {
      pageSize: 10,
      position: 'bottomRight',
    },
  },
  columns: [
    {
      $id: 'mock_1',
      title: '商品名称',
      'ui:type': 'text',
      'ui:props': {
        mode: 'single',
        maxRow: 1,
      },
      type: 'string',
      dataIndex: 'name',
    },
    {
      $id: 'mock_2',
      title: '商品详情',
      align: 'center',
      'ui:type': 'text',
      'ui:props': {
        mode: 'single',
        tooltip: true,
        ellipsis: true,
        maxRow: 1,
      },
      type: 'string',
      dataIndex: 'description',
    },
    {
      $id: 'mock_3',
      title: '库存状态',
      'ui:type': 'text',
      'ui:props': {
        mode: 'single',
      },
      type: 'string',
      enumValue: ['onSale', 'soldOut'],
      enumLabel: ['售卖中', '已售罄'],
      description: '这是一条提示信息',
      dataIndex: 'status',
    },
    {
      $id: 'mock_4',
      title: '商品价格',
      width: 80,
      'ui:type': 'text',
      'ui:props': {
        mode: 'single',
        prefix: '￥',
      },
      type: 'number',
      dataIndex: 'price',
    },
    {
      "$id": "mock_5",
      title: '操作',
      'ui:type': 'links',
      "ui:props": {
        mode: 'multiple',
        operates: [
          { name: 'order', label: '预定', href: './#order', target: '_blank' },
          { name: 'view', label: '查看', href: './#view' },
          { name: 'remove', label: '删除', href: './#remove' },
        ]
      },
      type: 'string',
      dataIndex: 'operate',
      width: 118
    }
  ]
};

const dataSource = [
  { id: 1, name: 'Apple iPhone 13 Pro', description: 'Apple iPhone 13 Pro (A2639) 128GB 远峰蓝色 支持移动联通电信5G 双卡双待手机', status: 'onSale', price: 7999 },
  { id: 2, name: 'HUAWEI P50 Pro', description: 'HUAWEI P50 Pro 4G全网通 原色双影像单元 麒麟9000芯片 万象双环设计 8GB+256GB曜金黑华为手机', status: 'onSale', price: 6488 },
  { id: 3, name: 'Redmi Note 11 Pro+', description: 'Redmi Note 11 Pro+ 5G 三星AMOLED高刷屏 1亿像素 120W快充 VC液冷散热 8GB+128GB 神秘黑境 手机 小米 红米', status: 'onSale', price: 2099 },
  { id: 4, name: 'vivo X70 Pro+', description: 'vivo X70 Pro+ 12GB+256GB 至黑 5G手机 蔡司光学镜头 全四摄光学防抖 大底微云台主摄 高通骁龙888Plus', status: 'onSale', price: 5999 },
  { id: 5, name: '馋小贝 休闲零食大礼包', description: '馋小贝 休闲零食大礼包一整箱送女友女生儿童网红礼盒美食品超市好吃的组合装礼物2000g', status: 'onSale', price: 109.90 },
  { id: 6, name: '电动开瓶器', description: '电动开瓶器红酒开瓶器红酒塞倒酒醒酒器家用开瓶器4合1套装', status: 'soldOut', price: 178 },
  { id: 7, name: 'Apple MacBook Pro 13.3', description: '新款八核M1芯片 8G 256G SSD 深空灰 笔记本电脑', status: 'soldOut', price: 9999 },
];

const Demo = () => {
  return (
    <DripTable driver={DripTableDriverAntDesign} schema={schema} dataSource={dataSource} />
  );
};

export default Demo;
```
