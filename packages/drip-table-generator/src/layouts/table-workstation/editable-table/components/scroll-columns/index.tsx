/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import classNames from 'classnames';
import { DripTableExtraOptions, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, ExtractDripTableExtraOption } from 'drip-table';
import React from 'react';

import { DTGTableConfig } from '@/context/table-configs';
import { DripTableGeneratorProps } from '@/typing';

import ColumnHeader from '../column-header';
import RowHeader from '../row/row-header';
import TableSection from '../table-section';

export interface ScrollableColumnsProps<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never
> extends DripTableGeneratorProps<RecordType, ExtraOptions> {
  tableConfig: DTGTableConfig;
  previewDataSource: ({ id: number; record: RecordType })[];
  containerWidth: number;
  rowHeight: number | undefined;
  columnList: { id: number; column: DTGTableConfig['columns'][number] }[];
  ref?: React.RefObject<ScrollableColumnsHandler>;
  subTableHeights?: number[];
}

export interface ScrollableColumnsHandler {
  getRowHeight: () => number[];
  getRowHeaderHeights: () => number[];
}

function ScrollableColumnsInner<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never
>(
  props: ScrollableColumnsProps<RecordType, ExtraOptions>,
  ref: React.ForwardedRef<ScrollableColumnsHandler>,
) {
  const rowRef = React.createRef<HTMLDivElement>();
  const containerRef = React.createRef<HTMLDivElement>();
  React.useImperativeHandle(ref, () => ({
    getRowHeight: () => {
      let maxCellHeight = 0;
      const rowHeight = rowRef.current?.offsetHeight ?? 0;
      for (const element of (rowRef.current?.children || []) as HTMLDivElement[]) {
        if (element.children[0]) {
          const trueCellHeight = (element.children[0] as HTMLDivElement).offsetHeight + 28;
          if (trueCellHeight > maxCellHeight) {
            maxCellHeight = trueCellHeight;
          }
        }
      }
      return [rowHeight, maxCellHeight];
    },
    getRowHeaderHeights: () => {
      const rows = (containerRef.current?.children || []) as HTMLDivElement[];
      const start = props.tableConfig.configs.showHeader ? 1 : 0;
      const rowHeaderHeights: number[] = [];
      for (let i = start; i < rows.length; i++) {
        if (rows[i].className === 'jfe-drip-table-generator-workstation-table-row'
          || rows[i].className === 'jfe-drip-table-generator-workstation-table-row stripe'
        ) {
          if (rows[i - 1]?.className === 'rowHeader') {
            rowHeaderHeights.push(rows[i - 1].offsetHeight);
          } else {
            rowHeaderHeights.push(0);
          }
        }
      }
      return rowHeaderHeights;
    },
  }));
  return (
    <div className="jfe-drip-table-generator-workstation-table-scrollable-columns" ref={containerRef}>
      <div className={classNames(
        'jfe-drip-table-generator-workstation-table-row jfe-drip-table-generator-workstation-table-header',
        {
          sticky: props.tableConfig.configs.sticky,
          invisible: props.tableConfig.configs.showHeader === false,
        },
      )}
      >
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
        <React.Fragment>
          {props.tableConfig.configs.rowHeader && (
            <RowHeader
              ext={props.ext}
              slots={props.slots}
              tableConfig={props.tableConfig}
              configs={props.tableConfig.configs.rowHeader}
            />
          )}
          <div
            className={classNames('jfe-drip-table-generator-workstation-table-row', {
              stripe: props.tableConfig.configs.stripe && rowIndex % 2 === 1,
            })}
            ref={rowRef}
            style={{ height: props.rowHeight }}
          >
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
          {(props.subTableHeights?.length || 0) > 0 && (props.subTableHeights?.[rowIndex] || 0) > 0 && (
            <div style={{ padding: '32px 0 12px 0', width: '100%', height: props.subTableHeights?.[rowIndex] || 0 }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// 使用 forwardRef 包装
const ScrollableColumns = React.forwardRef(ScrollableColumnsInner) as <RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never>(props: ScrollableColumnsProps<RecordType, ExtraOptions>, ref: React.ForwardedRef<ScrollableColumnsHandler>) => JSX.Element;

export default ScrollableColumns;
