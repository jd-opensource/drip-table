/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { DripTableGeneratorTemplate } from './index';

export const subTableTemplate: DripTableGeneratorTemplate = {
  key: 'subTable-template',
  label: '母子表格',
  previewImg: 'https://img.alicdn.com/imgextra/i4/O1CN01dtjMvv1heoyqst9u5_!!6000000004303-55-tps-56-56.svg',
  schema: {
    pagination: {
      pageSize: 20,
    },
    columns: [
      {
        key: 'text_18722ec0161-1323',
        dataIndex: 'id',
        title: '标识',
        component: 'text',
        options: {
          mode: 'single',
          format: '{{rec}}',
          parts: [
            {
              dataIndex: 'id',
            },
          ],
        },
        align: 'left',
        verticalAlign: 'top',
      },
      {
        key: 'text_18722ec0683-132a',
        dataIndex: 'id',
        title: '名称',
        component: 'text',
        options: {
          mode: 'single',
          format: '{{rec}}',
          parts: [
            {
              dataIndex: 'id',
            },
          ],
        },
        align: 'left',
        verticalAlign: 'top',
      },
      {
        key: 'tag_18722ec1c73-1336',
        dataIndex: 'status',
        title: '状态',
        description: '',
        component: 'tag',
        options: {
          prefix: '',
          suffix: '',
        },
        align: 'left',
        verticalAlign: 'top',
      },
      {
        key: 'link_18722ec2412-133d',
        dataIndex: '',
        title: '操作',
        component: 'link',
        options: {
          mode: 'single',
          label: '链接',
          href: 'http://api.example.com/api_path',
          event: '',
          operates: [],
          trigger: 'hover',
        },
        align: 'left',
        verticalAlign: 'top',
      },
    ],
    subtable: {
      id: 'sample-table-sub-level-1',
      dataSourceKey: 'subtable',
      columns: [
        {
          key: 'mock_1',
          title: '页面名称',
          align: 'center',
          dataIndex: 'name',
          component: 'text',
          options: {
            mode: 'single',
            maxRow: 1,
          },
        },
        {
          key: 'mock_2',
          title: '开始/结束时间',
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
          title: '页面状态',
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
          key: 'mock_7',
          title: '操作',
          align: 'center',
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
      showHeader: true,
      bordered: true,
    },
  },
};
