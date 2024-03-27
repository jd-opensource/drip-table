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
  const columnSchema = column && 'schema' in column ? cloneDeep(column.schema) as DTGTableConfig['columns'][number] : cloneDeep(column);
  const [key, ...rest] = path;
  if (columnSchema.component === 'group') {
    if (!columnSchema.options.items) {
      columnSchema.options.items = [];
    }
    const items = columnSchema.options.items as DTGTableConfig['columns'][number];
    if (rest.length === 0) {
      const newSchema = cloneDeep(schema);
      items[key] = items[key] && 'component' in items[key]
        ? newSchema
        : {
          ...items[key],
          schema: newSchema,
        };
    } else {
      items[key] = updateColumnItemByPath(items[key], rest, schema);
    }
  } else if (columnSchema.component === 'popover' && typeof key === 'string') {
    columnSchema.options[key] = rest.length === 0
      ? cloneDeep(schema)
      : updateColumnItemByPath(columnSchema.options[key] as DTGTableConfig['columns'][number], rest, schema);
  }
  if ('component' in (column ?? {})) {
    return columnSchema;
  }
  return { ...column, schema: columnSchema };
};

export const getColumnItemByPath = (column: DTGTableConfig['columns'][number], path: (number | 'popover' | 'content')[]) => {
  const [key, ...rest] = path;
  if (!column || path.length <= 0) {
    return null;
  }
  const newColumn = cloneDeep(column && 'schema' in column ? column.schema : column) as DTGTableConfig['columns'][number];
  if (newColumn.component === 'group') {
    const items = newColumn.options.items as DTGTableConfig['columns'] || [];
    const columnItem = items[key] && 'schema' in items[key] ? items[key].schema : items[key] ?? null;
    if (rest.length > 0) {
      return getColumnItemByPath(columnItem, rest);
    }
    return columnItem;
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
