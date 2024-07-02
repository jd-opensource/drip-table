/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import { DripTableBaseColumnSchema } from '@/types';
import { parseNumber } from '@/utils/operator';

export const finalizeColumnTitle = (columnSchema: DripTableBaseColumnSchema): string => {
  if (typeof columnSchema.title === 'string') {
    return columnSchema.title;
  }
  if (typeof columnSchema.title.body === 'string') {
    return columnSchema.title.body;
  }
  return columnSchema.title?.body?.content;
};

export const finalizeColumnWidth = (value: string | number | undefined, defaultValue: number = 0, tableWidth: number): number => {
  if (typeof value === 'string' && value.endsWith('%')) {
    const columnWidthPercent = Number.parseFloat(value.slice(0, -1));
    const columnWidth = Number.isNaN(columnWidthPercent) ? defaultValue : (tableWidth * columnWidthPercent) / 100;
    return parseNumber(columnWidth, defaultValue);
  }
  return parseNumber(value, defaultValue);
};
