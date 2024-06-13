/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import React from 'react';

import type { SetStateAction } from '@/utils/hooks';
import type { DripTableExtraOptions, DripTableProps, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, DripTableTableInformation, ExtractDripTableExtraOption } from '@/types';

export interface IDripTableComponentContext<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>> = DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, never>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  /**
   * 表格属性
   */
  props: DripTableProps<RecordType, ExtraOptions>;
  /**
   * 表格基本信息
   */
  info: DripTableTableInformation<RecordType, ExtraOptions>;
  /**
   * 表格状态
   */
  state: {
    closePopover: string | null;
  };
  /**
   * 设置表格状态
   */
  setState: (state: SetStateAction<IDripTableComponentContext['state']>) => void;
}

export const createTableComponentState = (): IDripTableComponentContext['state'] => ({
  closePopover: null,
});

export const DripTableComponentContext = React.createContext<IDripTableComponentContext>({
  props: {
    schema: { columns: [] },
    dataSource: [],
  },
  info: {
    uuid: '',
    schema: { columns: [] },
    dataSource: [],
  },
  state: createTableComponentState(),
  setState: () => void 0,
});

export const useTableComponentContext = <
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>> = DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, never>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>() => React.useContext(DripTableComponentContext) as unknown as IDripTableComponentContext<RecordType, ExtraOptions>;
