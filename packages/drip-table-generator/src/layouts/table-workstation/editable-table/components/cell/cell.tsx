/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import { Alert } from 'antd';
import {
  DripTableExtraOptions, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, ExtractDripTableExtraOption,
} from 'drip-table';
import React from 'react';

import CommonCell, { CommonCellProps } from './common';
import GroupCell, { GroupCellProps } from './group';
import PopoverCell, { PopoverCellProps } from './popover';

export type TableCellProps<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> = PopoverCellProps<RecordType, ExtraOptions> | GroupCellProps<RecordType, ExtraOptions> | CommonCellProps<RecordType, ExtraOptions>
function CellComponent<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: TableCellProps<RecordType, ExtraOptions>) {
  if (props.column?.component === 'group') {
    return <GroupCell {...props as GroupCellProps<RecordType, ExtraOptions>} />;
  }
  if (props.column?.component === 'popover') {
    return <PopoverCell {...props as PopoverCellProps<RecordType, ExtraOptions>} />;
  }
  if (props.column) {
    return <CommonCell {...props as CommonCellProps<RecordType, ExtraOptions>} />;
  }
  return (
    <Alert
      message="Error"
      description="组件配置错误"
      type="error"
      showIcon
    />
  );
}

export default CellComponent;
