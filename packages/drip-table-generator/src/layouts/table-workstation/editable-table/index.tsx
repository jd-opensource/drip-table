/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import classNames from 'classnames';
import { DripTableExtraOptions, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, DripTableTableInformation, ExtractDripTableExtraOption } from 'drip-table';
import React from 'react';

import { filterArray, mockId } from '@/utils';
import { DTGTableConfig, TableConfigsContext } from '@/context/table-configs';
import { DripTableGeneratorProps } from '@/typing';

import PaginationComponent from '../components/pagination';
import TableContainer, { TableContainerHandler } from '../components/table-container';
import AddColumnComponent from './components/add-column';
import LeftFixedColumns, { LeftFixedColumnsHandler } from './components/left-columns';
import RightFixedColumns, { RightFixedColumnsHandler } from './components/right-columns';
import ScrollableColumns, { ScrollableColumnsHandler } from './components/scroll-columns';

export interface EditableTableProps<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> extends DripTableGeneratorProps<RecordType, ExtraOptions> {
  index: number;
  tableConfig: DTGTableConfig;
  originDataSource?: RecordType[];
  parent?: DripTableTableInformation<RecordType, ExtraOptions>;
}

function EditableTable<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: EditableTableProps<RecordType, ExtraOptions>) {
  const context = React.useContext(TableConfigsContext);
  const [previewRecord] = React.useState(void 0 as number | undefined);
  const [rowHeight, setRowHeight] = React.useState(void 0 as number | undefined);
  const [subTableHeights, setSubTableHeights] = React.useState([] as number[]);
  const [rowHeaderHeights, setRowHeaderHeights] = React.useState([] as number[]);
  const containerRef = React.useRef<TableContainerHandler>(null);
  const leftColumnsRef = React.useRef<LeftFixedColumnsHandler>(null);
  const scrollColumnsRef = React.useRef<ScrollableColumnsHandler>(null);
  const rightColumnsRef = React.useRef<RightFixedColumnsHandler>(null);
  const lastRowHeights = React.useRef<number[]>([]);

  const tableHeight = React.useMemo(() => {
    if (props.tableConfig.configs.scroll?.y && typeof props.tableConfig.configs.scroll?.y !== 'boolean') {
      return props.tableConfig.configs.scroll?.y;
    }
    return '100%';
  }, [props.tableConfig.configs.scroll?.y]);
  const tableWidth = React.useMemo(() => {
    const defaultWidth = props.tableConfig.columns.length * 200;
    return containerRef.current?.getContainerWidth?.() || defaultWidth;
  }, []);

  const dataSourceToUse = React.useMemo(() => {
    if (props.tableConfig.configs.pagination) {
      const dataSource = props.dataSource.map((rec, idx) => ({ id: idx, record: rec }));
      const pageSize = props.tableConfig.configs.pagination.pageSize;
      return filterArray(dataSource, item => item.id < pageSize);
    }
    if (typeof previewRecord === 'number') {
      return [{ id: 0, record: props.dataSource[previewRecord] }];
    }
    return props.dataSource.map((rec, idx) => ({ id: idx, record: rec }));
  }, [props.dataSource, props.tableConfig.configs.pagination, previewRecord]);

  const previewDataSource = typeof previewRecord === 'number' ? [dataSourceToUse[previewRecord]] : dataSourceToUse;
  const paginationInHeader = props.tableConfig.configs.pagination && props.tableConfig.configs.pagination.position?.startsWith('top');
  const paginationInFooter = props.tableConfig.configs.pagination && props.tableConfig.configs.pagination.position?.startsWith('bottom');
  const subTableInfo = {
    uuid: props.tableConfig?.tableId,
    schema: {
      ...props.tableConfig?.configs,
      id: props.tableConfig.tableId ?? mockId(),
      columns: props.tableConfig?.columns,
      dataSourceKey: props.tableConfig?.dataSourceKey,
    } as DripTableTableInformation<RecordType, ExtraOptions>['schema'],
    parent: props.parent,
    dataSource: dataSourceToUse.map(item => item.record),
  };
  const columnList = React.useMemo(() => props.tableConfig.columns.map((item, index) => ({ id: index, column: item })), [props.tableConfig.columns]);
  const sortableColumns = filterArray(columnList, item => !item.column.fixed);
  let leftFixedColumns = filterArray(columnList, item => item.column.fixed === 'left');
  let rightFixedColumns = filterArray(columnList, item => item.column.fixed === 'right');
  if (sortableColumns.length > 0) {
    leftFixedColumns = filterArray(columnList, item => item.column.fixed === 'left' || (item.column.fixed && item.id < sortableColumns[0].id));
    rightFixedColumns = filterArray(columnList, item => item.column.fixed === 'right' || (item.column.fixed && item.id > sortableColumns[0].id));
  }

  React.useEffect(() => {
    const [leftRowHeight, leftCellHeight] = leftColumnsRef.current?.getRowHeight() ?? [0, 0];
    const [scrollRowHeight, scrollCellHeight] = scrollColumnsRef.current?.getRowHeight() ?? [0, 0];
    const [rightRowHeight, rightCellHeight] = rightColumnsRef.current?.getRowHeight() ?? [0, 0];
    if (lastRowHeights.current.length <= 0) {
      if (leftRowHeight !== scrollRowHeight || rightRowHeight !== scrollCellHeight || leftRowHeight !== rightRowHeight) {
        setRowHeight(Math.max(leftCellHeight, scrollCellHeight, rightCellHeight) + 1);
        lastRowHeights.current = [leftCellHeight, scrollCellHeight, rightCellHeight];
      }
    } else {
      const [lastLeftHeight, lastScrollHeight, lastRightHeight] = lastRowHeights.current ?? [];
      if (lastLeftHeight !== leftCellHeight || Math.abs(lastScrollHeight - scrollCellHeight) > 1 || lastRightHeight !== rightCellHeight) {
        setRowHeight(Math.max(leftCellHeight, scrollCellHeight, rightCellHeight) + 1);
        lastRowHeights.current = [leftCellHeight, scrollCellHeight, rightCellHeight];
      }
    }
  }, [props.dataSource, props.schema, props.tableConfig]);

  React.useEffect(() => {
    setTimeout(() => {
      const leftHeights = leftColumnsRef.current?.getSubTableHeight() ?? [];
      setSubTableHeights(leftHeights);
    }, 200);
  }, [props.dataSource, props.schema, props.tableConfig, context.tableConfigs]);

  React.useEffect(() => {
    setTimeout(() => {
      const rowHeights = scrollColumnsRef.current?.getRowHeaderHeights() ?? [];
      setRowHeaderHeights(rowHeights);
    }, 200);
  }, [props.dataSource, props.schema, props.tableConfig, context.tableConfigs]);

  return (
    <TableConfigsContext.Consumer>
      {({ tableConfigs, setTableColumns }) => (
        <TableContainer tableTools={props.tableTools} tableConfig={props.tableConfig} onClick={props.onClick} ref={containerRef}>
          {props.parent?.record && (props.subtableTitle?.(props.parent.record, props.index || 0, subTableInfo) || '')}
          {props.parent?.record && props.tableConfig.configs.pagination && paginationInHeader
            ? (
              <PaginationComponent
                {...props.tableConfig.configs.pagination}
                total={props.total || props.dataSource.length}
                renderPagination={props.renderPagination}
              />
            )
            : null}
          <div
            className={classNames('jfe-drip-table-generator-workstation-table-wrapper', {
              bordered: props.tableConfig.configs.bordered,
            })}
            style={{ display: 'flex' }}
          >
            <div
              style={{
                display: 'flex',
                overflow: 'auto',
                height: tableHeight,
                width: props.tableConfig.configs.scroll?.x ? Number(props.tableConfig.configs.scroll?.x) : void 0,
              }}
            >
              <LeftFixedColumns<RecordType, ExtraOptions>
                {...props}
                ref={leftColumnsRef}
                tableConfig={props.tableConfig}
                columnList={leftFixedColumns}
                previewDataSource={previewDataSource as ({ id: number; record: RecordType })[]}
                containerWidth={tableWidth}
                rowHeight={rowHeight}
                rowHeaderHeights={rowHeaderHeights}
              />
              <ScrollableColumns<RecordType, ExtraOptions>
                {...props}
                ref={scrollColumnsRef}
                tableConfig={props.tableConfig}
                columnList={sortableColumns}
                previewDataSource={previewDataSource}
                containerWidth={tableWidth}
                rowHeight={rowHeight}
                subTableHeights={subTableHeights}
              />
              <RightFixedColumns<RecordType, ExtraOptions>
                {...props}
                ref={rightColumnsRef}
                tableConfig={props.tableConfig}
                columnList={rightFixedColumns}
                previewDataSource={previewDataSource}
                containerWidth={tableWidth}
                rowHeight={rowHeight}
                subTableHeights={subTableHeights}
                rowHeaderHeights={rowHeaderHeights}
              />
            </div>
            <AddColumnComponent
              tableConfig={props.tableConfig}
              customComponentPanel={props.customComponentPanel}
              customColumnAddPanel={props.customColumnAddPanel}
              onColumnAdded={props.onColumnAdded}
            />
          </div>
          {props.parent?.record && props.tableConfig.configs.pagination && paginationInFooter
            ? (
              <PaginationComponent
                {...props.tableConfig.configs.pagination}
                total={props.total || props.dataSource.length}
                renderPagination={props.renderPagination}
              />
            )
            : null}
          {props.parent?.record && (props.subtableFooter?.(props.parent.record, props.index || 0, subTableInfo) || '')}
        </TableContainer>
      )}
    </TableConfigsContext.Consumer>
  );
}

export default EditableTable;
