/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { DripTableGeneratorTemplate } from './index';

export const basicTableTemplates: DripTableGeneratorTemplate = {
  key: 'basic-template',
  label: '通用表格',
  previewImg: 'https://img.alicdn.com/imgextra/i1/O1CN01R1OdLV1GgCXW0rjop_!!6000000000651-2-tps-112-112.png',
  schema: {
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
        align: 'center',
        verticalAlign: 'middle',
      },
      {
        key: 'text_18722ec0683-132a',
        dataIndex: 'name',
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
        align: 'center',
        verticalAlign: 'middle',
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
        align: 'center',
        verticalAlign: 'middle',
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
        align: 'center',
        verticalAlign: 'middle',
      },
    ],
  },
};
