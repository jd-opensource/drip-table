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
  path: (number | 'popover' | 'content')[],
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
  } else if (columnValue.component === 'popover' && typeof key === 'string') {
    columnValue.options[key] = rest.length === 0
      ? cloneDeep(schema)
      : updateColumnItemByPath(columnValue.options[key] as DTGTableConfig['columns'][number], rest, schema);
  }
  return columnValue;
};

export const getColumnItemByPath = (column: DTGTableConfig['columns'][number], path: (number | 'popover' | 'content')[]) => {
  const [key, ...rest] = path;
  if (!column || path.length <= 0) {
    return null;
  }
  const newColumn = cloneDeep(column);
  if (newColumn.component === 'group') {
    const items = newColumn.options.items as DTGTableConfig['columns'] || [];
    if (rest.length > 0) {
      return getColumnItemByPath(items[key], rest);
    }
    return typeof key === 'number' ? items[key] : null;
  }
  if (newColumn.component === 'popover' && typeof key === 'string') {
    if (rest.length > 0) {
      return getColumnItemByPath(newColumn.options[key] as DTGTableConfig['columns'][number], rest);
    }
    return newColumn.options[key];
  }
  return null;
};

export const getColumnItemByType = (column: DTGTableConfig['columns'][number], type?: 'popover' | 'content') => {
  if (column.component === 'popover' && type) {
    const options = cloneDeep(column.options);
    return type === 'content' ? options.content : options.popover;
  }
  return null;
};

export const updateColumnItemByType = (
  column: DTGTableConfig['columns'][number],
  type: 'popover' | 'content',
  schema: DTGTableConfig['columns'][number] | null,
) => {
  if (column.component === 'popover' && type) {
    const columnValue = cloneDeep(column);
    if (type === 'content') {
      columnValue.options.content = schema;
    } else {
      columnValue.options.popover = schema;
    }
    return columnValue;
  }
  return cloneDeep(column);
};
