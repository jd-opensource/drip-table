/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { DripTableGeneratorPanel, DTGComponentPropertySchema } from 'drip-table-generator';

export const CustomGlobalConfigPanel: DripTableGeneratorPanel<DTGComponentPropertySchema> = {
  mode: 'add',
  configs: [
    {
      name: 'customProps',
      group: '自定义组',
      'ui:title': '表格自定义属性',
      'ui:type': 'input',
      'ui:props': {},
      type: 'string',
    },
  ],
};
