/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import './styles/index.less';

export * from './types';
export { indexValue } from './utils/operator';
export { default as builtInComponents } from './components/built-in';
export type { DripTableComponentProps, DripTableBuiltInColumnSchema } from './components/built-in';
export type { DripTableSlotElementSchema, DripTableSlotSchema } from './components/slot-render';
export type { DripTableWrapperContext as DripTableInstance } from './wrapper';
export { default } from './wrapper';
export { columnRenderGenerator as TABLE_LAYOUT_COLUMN_RENDER_GENERATOR_DO_NOT_USE_IN_PRODUCTION } from './layouts/table';
