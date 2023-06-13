/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { DripTableGeneratorTemplate } from './index';

export const proTableTemplate: DripTableGeneratorTemplate = {
  key: 'pro-template',
  label: '高级表格',
  previewImg: 'https://img12.360buyimg.com/imagetools/jfs/t1/110370/7/39274/1039/642e347aFb6fa2807/d43cfbb9a1bda8cf.png',
  schema: {
    id: 'sample-table',
    size: 'middle',
    bordered: true,
    tableLayout: 'auto',
    sticky: true,
    rowSelection: true,
    editable: true,
    virtual: false,
    scroll: {
      y: 500,
    },
    rowKey: 'id',
    header: {
      style: { margin: '0', padding: '12px 0' },
      elements: [
        {
          type: 'display-column-selector',
          selectorButtonType: 'primary',
          selectorButtonText: '选择展示列',
        },
        {
          type: 'spacer',
          style: { width: '20px' },
        },
        {
          type: 'text',
          span: 'flex-auto',
          align: 'flex-start',
          text: '商品列表',
        },
        {
          type: 'layout-selector',
          selectorButtonType: 'primary',
          selectorButtonText: '布局模式',
        },
        {
          type: 'slot',
          slot: 'header-slot-sample',
        },
        {
          type: 'search',
          wrapperStyle: { width: 360 },
          align: 'flex-end',
          placeholder: '请输入关键字',
          allowClear: true,
          searchButtonText: '搜索',
          searchKeys: [{ label: '商品', value: 'goods' }, { label: '广告', value: 'advert' }],
          searchKeyDefaultValue: 'goods',
        },
        {
          type: 'insert-button',
          align: 'flex-end',
          insertButtonText: '添加商品',
          showIcon: true,
        },
      ],
    },
    pagination: {
      pageSize: 20,
      showTotal: '总共 {{total}} 条目',
      size: 'default',
      position: 'bottomRight',
      showQuickJumper: true,
      showSizeChanger: true,
      pageSizeOptions: [3, 5, 10, 20, 50, 100],
    },
    columns: [
      {
        key: 'mock_1',
        title: {
          body: '图片/名称',
          header: {
            elements: [{
              type: 'text',
              span: 'flex-auto',
              align: 'flex-start',
              text: '⌚',
            }],
          },
          footer: {
            elements: [{
              type: 'text',
              span: 'flex-auto',
              align: 'flex-start',
              text: '🖼️',
            }],
          },
        },
        width: 140,
        align: 'center',
        verticalAlign: 'middle',
        dataIndex: '',
        component: 'group',
        options: {
          layout: [1, 1],
          horizontalAlign: 'center',
          verticalAlign: 'middle',
          gutter: [8, 8],
          wrap: false,
          items: [
            {
              key: 'mock_1_1',
              title: '',
              component: 'image',
              options: {
                imageWidth: 86,
                imageHeight: 86,
              },
              dataIndex: 'demoPic',
            },
            {
              key: 'mock_1_2',
              title: '',
              component: 'text',
              options: {
                mode: 'single',
              },
              dataIndex: 'name',
            },
          ],
        },
      },
      {
        key: 'mock_2',
        title: '详情',
        width: 200,
        align: 'center',
        hidable: true,
        dataIndex: 'description',
        component: 'text',
        options: {
          mode: 'single',
          ellipsis: true,
          maxRow: 3,
        },
      },
      {
        key: 'mock_3',
        title: '状态',
        width: 150,
        align: 'center',
        dataIndex: 'status',
        description: '这是一条提示信息',
        hidable: true,
        filters: [
          { text: '售卖中', value: 'onSale' },
          { text: '已售罄', value: 'soldOut' },
        ],
        defaultFilteredValue: ['onSale', 'soldOut'],
        component: 'text',
        options: {
          mode: 'single',
          i18n: {
            onSale: '售卖中',
            soldOut: '已售罄',
          },
        },
      },
      {
        key: 'date-picker_182e8eea517-1239',
        dataIndex: 'startDate',
        title: '生产日期',
        width: 120,
        description: '',
        component: 'date-picker',
        options: {
          mode: 'basic',
          format: 'YYYY-MM-DD',
        },
        align: 'center',
      },
      {
        key: 'mock_8',
        title: '状态选择',
        width: 120,
        dataIndex: 'status',
        component: 'select',
        options: {
          style: { width: 120 },
          options: [{ label: '售卖中', value: 'onSale' }, { label: '已售罄', value: 'soldOut' }],
          event: 'statusToggle',
        },
      },
      {
        key: 'mock_4',
        title: '商品价格',
        width: 150,
        align: 'center',
        hidable: true,
        dataIndex: 'price',
        component: 'text',
        options: {
          mode: 'single',
          prefix: '￥',
        },
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
            { name: 'order', label: '订购', href: './#order', target: '_blank' },
            { name: 'view', label: '查看', href: './#view' },
            { name: 'edit', label: '编辑', event: 'edit' },
            { name: 'remove', label: '删除', event: 'remove' },
          ],
        },
      },
    ],
  },
};
