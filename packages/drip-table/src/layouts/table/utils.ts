/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import { DripTableBaseColumnSchema } from '@/types';

export const finalizeColumnTitle = (columnSchema: DripTableBaseColumnSchema): string => {
  if (typeof columnSchema.title === 'string') {
    return columnSchema.title;
  }
  if (typeof columnSchema.title.body === 'string') {
    return columnSchema.title.body;
  }
  return columnSchema.title?.body?.content;
};
