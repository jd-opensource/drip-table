/**
 * This file is part of the jd-mkt5 launch.
 * @link     : https://ace.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { DTGComponentPropertySchema } from 'drip-table-generator';

export const CustomGlobalConfigPanel: {
  mode: 'add' | 'replace';
  configs: DTGComponentPropertySchema[];
} = {
  mode: 'add',
  configs: [
    {
      name: 'customProps',
      group: '自定义组',
      'ui:title': '自定义属性透传',
      'ui:type': 'input',
      'ui:props': {},
      type: 'string',
    },
  ],
};
