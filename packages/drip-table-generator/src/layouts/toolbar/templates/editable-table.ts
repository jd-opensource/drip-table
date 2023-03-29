/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { DripTableGeneratorTemplate } from './index';

export const editableTableTemplate: DripTableGeneratorTemplate = {
  key: 'editable-template',
  label: '可编辑表格',
  previewImg: 'https://img.alicdn.com/imgextra/i4/O1CN01dtjMvv1heoyqst9u5_!!6000000004303-55-tps-56-56.svg',
  schema: {
    editable: true,
    pagination: {
      pageSize: 20,
      position: 'bottomRight',
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
  },
};
