/**
 * This file is part of the jd-mkt5 launch.
 * @link     : https://ace.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { DripTableBuiltInColumnSchema, DripTableColumnSchema } from 'drip-table';
import cloneDeep from 'lodash/cloneDeep';

import { DripTableColumn } from '@/store';

export const updateColumnItemByPath = (
  column: DripTableColumn,
  path: number[],
  schema: DripTableColumnSchema | DripTableBuiltInColumnSchema | null,
) => {
  const newSchema = cloneDeep(schema);
  const [key, ...rest] = path;
  if (column.component === 'group') {
    if (!column.options.items) {
      column.options.items = [];
    }
    const items = column.options.items as (DripTableColumnSchema | DripTableBuiltInColumnSchema | null)[];
    if (rest.length === 0) {
      items[key] = newSchema;
    } else {
      column = updateColumnItemByPath(column[key], rest, newSchema);
    }
  }
  return column;
};

export const getColumnItemByPath = (column: DripTableColumn | null, path: number[]) => {
  const [key, ...rest] = path;
  if (!column) {
    return null;
  }
  const newColumn = cloneDeep(column);
  if (newColumn.component === 'group') {
    const items = newColumn.options.items as (DripTableColumn | null)[];
    if (rest.length > 0) {
      return getColumnItemByPath(items[key], rest);
    }
    return items[key];
  }
  return null;
};
