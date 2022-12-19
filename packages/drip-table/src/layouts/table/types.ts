/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import type { DripTableComponentProps } from '@/components/built-in';
import type { DripTableExtraOptions, DripTableProps, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, DripTableTableInformation } from '@/types';

export interface DripTableColumnRenderOptions<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  tableInfo: DripTableTableInformation<RecordType, ExtraOptions>;
  extraProps: Pick<DripTableProps<RecordType, ExtraOptions>, 'driver' | 'components' | 'ext' | 'onEvent' | 'onDataSourceChange'> & {
    unknownComponent?: React.ReactNode;
    preview?: DripTableComponentProps<RecordType, NonNullable<ExtraOptions['CustomColumnSchema']>, NonNullable<ExtraOptions['CustomComponentEvent']>, NonNullable<ExtraOptions['CustomComponentExtraData']>>['preview'];
  };
}
