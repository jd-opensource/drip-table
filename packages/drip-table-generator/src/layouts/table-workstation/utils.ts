/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { DripTableBuiltInColumnSchema, DripTableColumnSchema } from 'drip-table';
import cloneDeep from 'lodash/cloneDeep';

import { DripTableGeneratorContext } from '@/context';

export const updateColumnItemByPath = (
  column: NonNullable<DripTableGeneratorContext['currentColumn']>,
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

export const getColumnItemByPath = (column: DripTableGeneratorContext['currentColumn'], path: number[]) => {
  const [key, ...rest] = path;
  if (!column) {
    return null;
  }
  const newColumn = cloneDeep(column);
  if (newColumn.component === 'group') {
    const items = newColumn.options.items as DripTableGeneratorContext['columns'] || [];
    if (rest.length > 0) {
      return getColumnItemByPath(items[key], rest);
    }
    return typeof key === 'number' ? items[key] : null;
  }
  return null;
};

export const getLength = (value: string) => {
  let length = 0;
  for (const element of value) {
    length += (/[\u4E00-\u9FA5]/ui).test(element) ? 2 : 1;
  }
  return length;
};

export const MIN_WIDTH = 120;

export const getWidth = (originWidth?: string | number, format?: 'px' | '%', delta?: number) => {
  let width = MIN_WIDTH;
  if (typeof originWidth === 'number') {
    width = Number.isNaN(originWidth) ? MIN_WIDTH : originWidth;
  } else if (typeof originWidth === 'string') {
    if ((/^[0-9]+$/ui).test(originWidth)) {
      width = Number(originWidth);
    } else if ((/^[0-9]+px$/ui).test(originWidth)) {
      width = Number(originWidth.replace('px', ''));
    } else if ((/^[0-9]+(%|r?em|pt|vw|cm|in|pc)$/ui).test(originWidth)) {
      return originWidth;
    }
  }
  if (width < MIN_WIDTH) { width = MIN_WIDTH; }
  if (delta) { width += delta; }
  return typeof format === 'string' ? `${width}${format}` : width;
};
