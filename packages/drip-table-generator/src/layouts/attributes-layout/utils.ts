/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import cloneDeep from 'lodash/cloneDeep';

import { DTGTableConfig } from '@/context/table-configs';

export const updateColumnItemByPath = (
  column: DTGTableConfig['columns'][number],
  path: number[],
  schema: DTGTableConfig['columns'][number] | null,
) => {
  const columnValue = cloneDeep(column);
  const [key, ...rest] = path;
  if (columnValue.component === 'group') {
    if (!columnValue.options.items) {
      columnValue.options.items = [];
    }
    const items = columnValue.options.items as DTGTableConfig['columns'][number];
    items[key] = rest.length === 0 ? cloneDeep(schema) : updateColumnItemByPath(items[key], rest, schema);
  }
  return columnValue;
};

export const getColumnItemByPath = (column: DTGTableConfig['columns'][number], path: number[]) => {
  const [key, ...rest] = path;
  if (!column) {
    return null;
  }
  const newColumn = cloneDeep(column);
  if (newColumn.component === 'group') {
    const items = newColumn.options.items as DTGTableConfig['columns'][number] || [];
    if (rest.length > 0) {
      return getColumnItemByPath(items[key], rest);
    }
    return typeof key === 'number' ? items[key] : null;
  }
  return null;
};
