/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { DripTableColumnSchema, DripTableSchema } from 'drip-table';

import { basicTableTemplates } from './basic-table';
import { editableTableTemplate } from './editable-table';
import { subTableTemplate } from './sub-table';

export interface DripTableGeneratorTemplate {
  /**
   * 唯一标识
   */
  key: string;
  /**
   * 模板名称
   */
  label: string;
  /**
   * 预览图
   */
  previewImg: string;
  /**
   * 模板关联配置
   */
  schema: DripTableSchema<DripTableColumnSchema, React.Key>;
}

export const DTGBuiltInTemplates: DripTableGeneratorTemplate[] = [
  basicTableTemplates,
  editableTableTemplate,
  subTableTemplate,
];
