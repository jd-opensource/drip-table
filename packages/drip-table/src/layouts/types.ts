/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import {
  type DripTableExtraOptions,
  type DripTableProps,
  type DripTableRecordTypeBase,
  type DripTableRecordTypeWithSubtable,
  type DripTableTableInformation,
} from '@/types';
import { type IDripTableContext } from '@/context';

export interface TableLayoutComponentProps<
RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  tableUUID: string;
  tableProps: DripTableProps<RecordType, ExtraOptions>;
  tableInfo: DripTableTableInformation<RecordType, ExtraOptions>;
  tableState: IDripTableContext;
  setTableState: IDripTableContext['setTableState'];
  header?: (() => React.ReactNode) | React.ReactNode;
  footer?: (() => React.ReactNode) | React.ReactNode;
}
