/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import type { SandboxCreateExecutor, SandboxExecute, SandboxSafeExecute } from '@/utils/sandbox';
import type { DripTableComponentProps } from '@/components/cell-components';
import type { FinalizeString } from '@/components/cell-components/utils';
import type { DripTableExtraOptions, DripTableProps, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, DripTableTableInformation, ExtractDripTableExtraOption } from '@/types';

export interface DripTableColumnRenderOptions<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  tableInfo: DripTableTableInformation<RecordType, ExtraOptions>;
  extraProps: Pick<DripTableProps<RecordType, ExtraOptions>, 'components' | 'defaultComponentLib' | 'icons' | 'ext' | 'onEvent' | 'onDataSourceChange'> & {
    unknownComponent?: React.ReactNode;
    preview?: DripTableComponentProps<RecordType, ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'>, ExtractDripTableExtraOption<ExtraOptions, 'CustomComponentEvent'>, ExtractDripTableExtraOption<ExtraOptions, 'CustomComponentExtraData'>>['preview'];
    createExecutor: SandboxCreateExecutor;
    execute: SandboxExecute;
    safeExecute: SandboxSafeExecute;
    finalizeString: FinalizeString;
    schemaFunctionPreprocessor: DripTableProps<RecordType, ExtraOptions>['schemaFunctionPreprocessor'];
  };
}
