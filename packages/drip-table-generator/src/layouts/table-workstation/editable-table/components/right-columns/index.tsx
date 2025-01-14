/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import { DripTableExtraOptions, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, ExtractDripTableExtraOption } from 'drip-table';
import React from 'react';

import { GeneratorContext } from '@/context';
import { DTGTableConfig } from '@/context/table-configs';
import { DripTableGeneratorProps } from '@/typing';

import ColumnHeader from '../column-header';
import TableSection from '../table-section';

export interface RightFixedColumnsProps<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never
> extends DripTableGeneratorProps<RecordType, ExtraOptions> {
  tableConfig: DTGTableConfig;
  previewDataSource: ({ id: number; record: RecordType })[];
  containerWidth: number;
  rowHeight: number | undefined;
  columnList: { id: number; column: DTGTableConfig['columns'][number] }[];
  ref?: React.RefObject<RightFixedColumnsHandler>;
}

export interface RightFixedColumnsHandler {
  getRowHeight: () => number;
}

function RightFixedColumnsInner<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never
>(
  props: RightFixedColumnsProps<RecordType, ExtraOptions>,
  ref: React.ForwardedRef<RightFixedColumnsHandler>,
) {
  const context = React.useContext(GeneratorContext);
  console.debug(context);
  const rowRef = React.createRef<HTMLDivElement>();
  React.useImperativeHandle(ref, () => ({
    getRowHeight: () => rowRef.current?.offsetHeight ?? 0,
  }));
  return (
    <div className="jfe-drip-table-generator-workstation-table-fixed-column right">
      <div className="jfe-drip-table-generator-workstation-table-row jfe-drip-table-generator-workstation-table-header">
        {props.columnList.map(columnWrapper => (
          <ColumnHeader
            tableConfig={props.tableConfig}
            column={columnWrapper.column}
            columnId={columnWrapper.id}
            customColumnAddPanel={props.customColumnAddPanel}
            customComponentPanel={props.customComponentPanel}
            columnTools={props.columnTools}
            dataSource={props.previewDataSource}
            onClick={props.onClick}
            renderHeaderCellFilter={props.renderHeaderCellFilter}
            containerWidth={props.containerWidth}
          />
        ))}
      </div>
      {props.previewDataSource.map((record, rowIndex) => (
        <div className="jfe-drip-table-generator-workstation-table-row" ref={rowRef} style={{ height: props.rowHeight }}>
          <TableSection
            {...props}
            record={record}
            rowIndex={rowIndex}
            columnList={props.columnList}
            tableConfig={props.tableConfig}
            containerWidth={props.containerWidth}
            isLastRow={rowIndex === props.previewDataSource.length - 1}
          />
        </div>
      ))}
    </div>
  );
}

// 使用 forwardRef 包装
const RightFixedColumns = React.forwardRef(RightFixedColumnsInner) as <RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never>(props: RightFixedColumnsProps<RecordType, ExtraOptions>, ref: React.ForwardedRef<RightFixedColumnsHandler>) => JSX.Element;

export default RightFixedColumns;
