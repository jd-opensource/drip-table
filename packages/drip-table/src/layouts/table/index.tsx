/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import RcTable from 'rc-table';
import type { ColumnType as TableColumnType } from 'rc-table/lib/interface';
import { TableProps as RcTableProps } from 'rc-table/lib/Table';
import React from 'react';
import { type GridChildComponentProps, areEqual, VariableSizeGrid } from 'react-window';

import {
  type DripTableCellDisplayControl,
  type DripTableExtraOptions,
  type DripTableProps,
  type DripTableRecordTypeBase,
  type DripTableRecordTypeWithSubtable,
  type DripTableSchema,
  type DripTableSubtableProps,
  type DripTableTableInformation,
  type SchemaObject,
} from '@/types';
import { indexValue, parseNumber, setValue } from '@/utils/operator';
import { createExecutor } from '@/utils/sandbox';
import DripTableBuiltInComponents, { type DripTableBuiltInColumnSchema, type DripTableComponentProps } from '@/components/built-in';
import Checkbox from '@/components/checkbox';
import GenericRender from '@/components/generic-render';
import Pagination from '@/components/pagination';
import RichText from '@/components/rich-text';
import Tooltip from '@/components/tooltip';
import { type IDripTableContext } from '@/context';
import DripTableWrapper from '@/wrapper';

import { type TableLayoutComponentProps } from '../types';
import HeaderCell, { HeaderCellProps } from './components/header-cell';

import styles from './index.module.less';

/**
 * 表格参数默认值，用于覆盖父表参数值防止透传到子表
 */
const DEFAULT_SUBTABLE_PROPS: DripTableSubtableProps<never, never> = {
  total: void 0,
  defaultExpandAllRows: void 0,
  defaultExpandedRowKeys: void 0,
};

interface RcTableRecordType<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  type: 'header' | 'body' | 'footer';
  key: string;
  index: number;
  record: RecordType;
}

/**
 * 根据列 Schema，生成表格列配置
 * @param tableInfo 表格信息
 * @param columnSchema 表格列 Schema
 * @param extraProps 一些额外的参数
 * @returns 表格列配置
 */
export const columnGenerator = <
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(
    tableInfo: DripTableTableInformation<RecordType, ExtraOptions>,
    columnSchema: DripTableBuiltInColumnSchema | NonNullable<ExtraOptions['CustomColumnSchema']>,
    extraProps: Pick<DripTableProps<RecordType, ExtraOptions>, 'driver' | 'components' | 'ext' | 'onEvent' | 'onDataSourceChange'>,
  ): TableColumnType<RcTableRecordType<RecordType>> & { style?: React.CSSProperties } => {
  let width = String(columnSchema.width).trim();
  if ((/^[0-9]+$/uig).test(width)) {
    width += 'px';
  }
  const column: TableColumnType<RcTableRecordType<RecordType>> & { style?: React.CSSProperties } = {
    width,
    className: classNames({
      [styles['jfe-drip-table-cell--top']]: columnSchema.verticalAlign === 'top',
      [styles['jfe-drip-table-cell--middle']]: columnSchema.verticalAlign === 'middle',
      [styles['jfe-drip-table-cell--bottom']]: columnSchema.verticalAlign === 'bottom',
      [styles['jfe-drip-table-cell--stretch']]: columnSchema.verticalAlign === 'stretch',
    }),
    align: columnSchema.align,
    title: <RichText html={typeof columnSchema.title === 'string' ? columnSchema.title : columnSchema.title?.body || ''} />,
    dataIndex: columnSchema.dataIndex,
    fixed: columnSchema.fixed,
    style: columnSchema.style,
    onHeaderCell: () => ({ additionalProps: { columnSchema } as NonNullable<HeaderCellProps<RecordType, ExtraOptions>['additionalProps']> } as React.TdHTMLAttributes<Element>),
  };
  if (columnSchema.description) {
    column.title = (
      <div>
        <span style={{ marginRight: '6px' }}>
          <RichText className={styles['jfe-drip-table-column-title']} html={typeof columnSchema.title === 'string' ? columnSchema.title : columnSchema.title?.body || ''} />
        </span>
        <Tooltip placement="top" overlay={<RichText html={columnSchema.description} />}>
          <span role="img" aria-label="question-circle" className={styles['jfe-drip-table-column-title__question-icon']}>
            <svg viewBox="64 64 896 896" focusable="false" data-icon="question-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
              <path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z" />
            </svg>
          </span>
        </Tooltip>
      </div>
    );
  }

  if (!column.render) {
    if ('component' in columnSchema) {
      const BuiltInComponent = DripTableBuiltInComponents[columnSchema.component] as
        React.JSXElementConstructor<DripTableComponentProps<RecordType, DripTableBuiltInColumnSchema>> & { schema?: SchemaObject };
      const onChange = (record: RecordType, index: number, value: unknown) => {
        const ds = [...tableInfo.dataSource];
        const rec = { ...record };
        setValue(rec, columnSchema.dataIndex, value);
        ds[index] = rec;
        extraProps.onDataSourceChange?.(ds, tableInfo);
      };
      let dataTranslation: (v: unknown, r: RecordType, i: number) => unknown = v => v;
      if (columnSchema.dataTranslation) {
        try {
          const translate = createExecutor(columnSchema.dataTranslation, ['props']);
          dataTranslation = (v, r, i) => {
            try {
              return translate({ value: v, record: r, recordIndex: i });
            } catch {}
            return void 0;
          };
        } catch {}
      }
      if (BuiltInComponent) {
        column.render = (_, row) => (
          <BuiltInComponent
            driver={extraProps.driver}
            value={dataTranslation(indexValue(row.record, columnSchema.dataIndex), row.record, row.index) ?? columnSchema.defaultValue}
            data={row.record}
            editable={tableInfo.schema.editable}
            onChange={v => onChange(row.record, row.index, v)}
            schema={columnSchema as unknown as DripTableBuiltInColumnSchema}
            ext={extraProps.ext}
            components={extraProps.components as DripTableProps<DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, NonNullable<React.Key>>, DripTableExtraOptions>['components']}
            fireEvent={event => extraProps.onEvent?.(event, row.record, row.index, { ...tableInfo, record: row.record })}
          />
        );
      }
      const [libName, componentName] = columnSchema.component.split('::');
      if (libName && componentName) {
        const ExtraComponent = extraProps.components?.[libName]?.[componentName];
        if (ExtraComponent) {
          column.render = (_, row) => (
            <ExtraComponent
              driver={extraProps.driver}
              value={dataTranslation(indexValue(row.record, columnSchema.dataIndex), row.record, row.index) ?? columnSchema.defaultValue}
              data={row.record}
              editable={tableInfo.schema.editable}
              onChange={v => onChange(row.record, row.index, v)}
              schema={columnSchema as NonNullable<ExtraOptions['CustomColumnSchema']>}
              ext={extraProps.ext}
              fireEvent={event => extraProps.onEvent?.(event, row.record, row.index, { ...tableInfo, record: row.record })}
            />
          );
        }
      }
    }
    if (!column.render) {
      column.render = () => <div className={styles['ajv-error']}>{ `Unknown column component: ${columnSchema.component}` }</div>;
    }
  }
  return column;
};

interface VirtualCellItemData {
  columns: TableColumnType<unknown>[];
  columnsDisplayControl: DripTableCellDisplayControl[];
  dataSource: unknown[];
  rowKey: React.Key;
  selectedRowKeys: IDripTableContext['selectedRowKeys'];
  hoverRowKey: React.Key | undefined;
  setHoverRowKey: (hoverRowKey: React.Key | undefined) => void;
}

const VirtualCell = React.memo(({ data, columnIndex, rowIndex, style }: GridChildComponentProps<VirtualCellItemData>) => {
  const { columns, columnsDisplayControl, dataSource, rowKey, selectedRowKeys, hoverRowKey, setHoverRowKey } = data;
  const displayControl = columnsDisplayControl[columnIndex];
  const column = columns[columnIndex];
  const record = dataSource[rowIndex];
  const recKey = indexValue(record, rowKey);
  const selected = selectedRowKeys.includes(recKey);
  const onMouseEnter = React.useCallback(() => { setHoverRowKey(recKey); }, [recKey]);
  const onMouseLeave = React.useCallback(() => { setHoverRowKey(void 0); }, [recKey]);
  return (
    <div
      className={classNames(styles['jfe-drip-table-virtual-cell'], {
        [styles['jfe-drip-table-virtual-cell--top']]: displayControl?.verticalAlign === 'top',
        [styles['jfe-drip-table-virtual-cell--middle']]: displayControl?.verticalAlign === 'middle',
        [styles['jfe-drip-table-virtual-cell--bottom']]: displayControl?.verticalAlign === 'bottom',
        [styles['jfe-drip-table-virtual-cell--stretch']]: displayControl?.verticalAlign === 'stretch',
        [styles['jfe-drip-table--row-hover']]: hoverRowKey !== void 0 && hoverRowKey === recKey,
        [styles['jfe-drip-table--row-selected']]: selected,
        [styles['jfe-drip-table--row-selected-hover']]: selected && hoverRowKey !== void 0 && hoverRowKey === recKey,
      })}
      style={Object.assign({ textAlign: column.align }, style)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      { column.render?.(indexValue(record, column.dataIndex), record, rowIndex) }
    </div>
  );
}, areEqual);

const TableLayout = <
RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: TableLayoutComponentProps<RecordType, ExtraOptions>): JSX.Element => {
  const { tableProps, tableInfo, tableState, setTableState } = props;
  const rowKey = tableProps.schema.rowKey ?? '$$row-key$$';

  const [rcTableWidth, setRcTableWidth] = React.useState(0);
  const [hoverRowKey, setHoverRowKey] = React.useState<React.Key | undefined>(void 0);
  const [dragInIndex, setDragInIndex] = React.useState(-1);

  const initialPagination = tableInfo.schema?.pagination || void 0;
  React.useEffect(() => {
    setTableState(state => ({
      pagination: {
        ...state.pagination,
        pageSize: initialPagination?.pageSize || 10,
      },
    }));
  }, [initialPagination?.pageSize]);

  // 原始数据源
  const dataSource = React.useMemo(
    () => tableProps.dataSource.map((item, index) => ({
      ...item,
      [rowKey]: typeof item[rowKey] === 'undefined' ? index : item[rowKey],
    })),
    [tableProps.dataSource, rowKey],
  );

  // 原始数据行转 RcTable 数据行包装
  const packRcTableRecord = React.useCallback((record: RecordType, index: number, type: RcTableRecordType<RecordType>['type']): RcTableRecordType<RecordType> => ({
    type,
    key: `${record[rowKey]}__DRIP_TABLE_ROW_PACK__${type}`,
    index,
    record,
  }), []);

  // RcTable 数据源
  const rcTableDataSource = React.useMemo(
    () => {
      const offset = tableInfo.schema.pagination && dataSource.length > tableState.pagination.pageSize
        ? tableState.pagination.pageSize * (tableState.pagination.current - 1)
        : 0;
      const ds = tableInfo.schema.pagination && dataSource.length > tableState.pagination.pageSize
        ? dataSource.slice(offset, tableState.pagination.pageSize * tableState.pagination.current)
        : dataSource;
      // 行头部/尾部插槽存在，通过内部 dataSource 插入行实现
      const spreadDs: RcTableRecordType<RecordType>[] = [];
      for (const [index, record] of ds.entries()) {
        if (tableProps.schema.rowHeader?.elements && (!tableProps.rowHeaderVisible || tableProps.rowHeaderVisible(record, offset + index, tableInfo))) {
          spreadDs.push(packRcTableRecord(record, offset + index, 'header'));
        }
        spreadDs.push(packRcTableRecord(record, offset + index, 'body'));
        if (tableProps.schema.rowFooter?.elements && (!tableProps.rowFooterVisible || tableProps.rowFooterVisible(record, offset + index, tableInfo))) {
          spreadDs.push(packRcTableRecord(record, offset + index, 'footer'));
        }
      }
      return spreadDs;
    },
    [
      dataSource,
      tableState.pagination.current,
      tableState.pagination.pageSize,
      tableProps.rowHeaderVisible,
      tableProps.rowFooterVisible,
      tableProps.schema.rowHeader,
      tableProps.schema.rowFooter,
    ],
  );

  const rowExpandColumnVisible = React.useMemo(
    () => {
      const subtable = tableProps.schema.subtable;
      const expandedRowRender = tableProps.expandedRowRender;
      if (subtable || expandedRowRender) {
        return true;
      }
      return false;
    },
    [tableProps.schema.subtable, tableProps.expandedRowRender],
  );

  const rowExpandColumnWidth = React.useMemo(
    () => (rowExpandColumnVisible ? 48 : 0),
    [rowExpandColumnVisible],
  );

  const rowSelectionDisplayControl = React.useMemo(
    (): DripTableCellDisplayControl | undefined => (
      tableInfo.schema.rowSelection === true
        ? {
          align: 'center',
          verticalAlign: 'middle',
        }
        : tableInfo.schema.rowSelection || void 0),
    [tableInfo.schema.rowSelection],
  );

  const columnsDisplayControl = React.useMemo(
    (): DripTableCellDisplayControl[] => {
      const dc: DripTableCellDisplayControl[] = tableInfo.schema.columns.map(c => ({
        align: c.align,
        verticalAlign: c.verticalAlign,
      }));
      if (rowSelectionDisplayControl) {
        dc.unshift(rowSelectionDisplayControl);
      }
      return dc;
    },
    [tableInfo.schema.columns, rowSelectionDisplayControl],
  );

  const filteredColumns = React.useMemo(
    (): TableColumnType<RcTableRecordType<RecordType>>[] => {
      const extraProps = {
        driver: tableProps.driver,
        components: tableProps.components,
        ext: tableProps.ext,
        onEvent: tableProps.onEvent,
        onDataSourceChange: tableProps.onDataSourceChange,
      };
      const returnColumns = tableProps.schema.columns
        .filter(column => !column.hidable || tableState.displayColumnKeys.includes(column.key))
        .map(column => columnGenerator(tableInfo, column, extraProps));
      if (rowSelectionDisplayControl) {
        returnColumns.unshift({
          align: rowSelectionDisplayControl.align,
          width: 50,
          fixed: returnColumns[0]?.fixed === 'left' || returnColumns[0]?.fixed === true ? 'left' : void 0,
          title: (
            <div className={styles['jfe-drip-table-column-title-selection']}>
              <Checkbox
                checked={!rcTableDataSource.some(d => d.type === 'body' && !tableState.selectedRowKeys.includes(d.record[rowKey] as React.Key))}
                onChange={(e) => {
                  const selectedRowKeys = indexValue(e.target, 'checked')
                    ? rcTableDataSource.map(d => d.record[rowKey] as React.Key)
                    : [];
                  const selectedRows = rcTableDataSource
                    .filter(d => selectedRowKeys.includes(d.record[rowKey] as React.Key))
                    .map(d => tableInfo.dataSource[d.index]);
                  setTableState({ selectedRowKeys });
                  tableProps.onSelectionChange?.(selectedRowKeys, selectedRows, tableInfo);
                }}
              />
            </div>
          ),
          render: (_, row) => (
            <div className={styles['jfe-drip-table-column-selection']}>
              <Checkbox
                checked={tableState.selectedRowKeys.includes(row.record[rowKey] as React.Key)}
                onChange={(e) => {
                  const selectedRowKeys = tableState.selectedRowKeys.filter(k => k !== row.record[rowKey]);
                  if (indexValue(e.target, 'checked')) {
                    selectedRowKeys.push(row.record[rowKey] as React.Key);
                  }
                  const selectedRows = rcTableDataSource
                    .filter(d => selectedRowKeys.includes(d.record[rowKey] as React.Key))
                    .map(d => tableInfo.dataSource[d.index]);
                  setTableState({ selectedRowKeys });
                  tableProps.onSelectionChange?.(selectedRowKeys, selectedRows, tableInfo);
                }}
                disabled={!(tableProps?.rowSelectable?.(row.record, row.index, tableInfo) ?? true)}
              />
            </div>
          ),
        });
      }
      if (tableInfo.schema.rowDraggable) {
        returnColumns.unshift({
          align: 'center',
          width: 50,
          fixed: returnColumns[0]?.fixed === 'left' || returnColumns[0]?.fixed === true ? 'left' : void 0,
          render: (_, row) => (
            <div
              className={classNames(styles['jfe-drip-table-column-draggable-row'], {
                [styles['jfe-drip-table-column-draggable-row--drag-in']]: row.index === dragInIndex,
              })}
              onDrop={(e) => {
                if (e.dataTransfer.getData('type') === `drip-table-draggable-row--${tableInfo.schema.id}`) {
                  const sourceIndex = Number.parseInt(e.dataTransfer.getData('index'), 10);
                  if (sourceIndex !== row.index) {
                    const ds = [...tableProps.dataSource];
                    const absSourceIndex = sourceIndex;
                    const absTargetIndex = row.index;
                    ds.splice(absSourceIndex, 1);
                    ds.splice(absTargetIndex, 0, tableProps.dataSource[absSourceIndex]);
                    tableProps.onDataSourceChange?.(ds, tableInfo);
                  }
                  setDragInIndex(-1);
                  e.preventDefault();
                }
              }}
              onDragEnter={(e) => { setDragInIndex(row.index); e.preventDefault(); }}
              onDragLeave={(e) => { e.preventDefault(); }}
              onDragOver={(e) => { e.preventDefault(); }}
            >
              <div
                className={styles['jfe-drip-table-column-draggable-row__draggable']}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.effectAllowed = 'move';
                  e.dataTransfer.setData('type', `drip-table-draggable-row--${tableInfo.schema.id}`);
                  e.dataTransfer.setData('index', String(row.index));
                  e.dataTransfer.setDragImage(e.currentTarget.parentElement?.parentElement?.parentElement || e.currentTarget, 0, 0);
                }}
                onDragEnd={() => { setDragInIndex(-1); }}
              >
                <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg>
              </div>
            </div>
          ),
        });
      }
      if (returnColumns.length === 0) {
        return returnColumns;
      }
      // 整行自定义插槽
      const rowSlotKey = tableInfo.schema.rowSlotKey;
      if (rowSlotKey) {
        {
          const render = returnColumns[0].render;
          returnColumns[0].render = (o, row, index) => {
            const slotType = rowSlotKey in row.record ? String(row.record[rowSlotKey]) : void 0;
            if (slotType) {
              const Slot = tableProps.slots?.[slotType] || tableProps.slots?.default;
              return Slot
                ? (
                  <Slot
                    slotType={slotType}
                    driver={tableProps.driver}
                    schema={tableProps.schema}
                    ext={tableProps.ext}
                    dataSource={tableProps.dataSource}
                    record={row.record}
                    recordIndex={row.index}
                    onSearch={(searchParams) => { tableProps.onSearch?.(searchParams, tableInfo); }}
                  >
                    { o }
                  </Slot>
                )
                : (
                  <span className={styles['jfe-drip-table-row-slot__error']}>{ `自定义插槽组件渲染函数 tableProps.slots['${slotType}'] 不存在` }</span>
                );
            }
            return render?.(o, row, index);
          };
          returnColumns[0].onCell = (row, index) => {
            const slotType = rowSlotKey in row.record ? String(row.record[rowSlotKey]) : void 0;
            if (slotType) {
              return {
                colSpan: returnColumns.length,
                className: styles['jfe-drip-table--slot'],
              };
            }
            return {};
          };
        }
        for (let columnIndex = 1; columnIndex < returnColumns.length; columnIndex++) {
          const render = returnColumns[columnIndex].render;
          returnColumns[columnIndex].render = (o, row, index) => {
            const slotType = rowSlotKey in row.record ? String(row.record[rowSlotKey]) : void 0;
            if (slotType) {
              return null;
            }
            return render?.(o, row, index);
          };
          returnColumns[columnIndex].onCell = (row, index) => {
            const slotType = rowSlotKey in row.record ? String(row.record[rowSlotKey]) : void 0;
            if (slotType) {
              return {
                colSpan: 0,
                className: styles['jfe-drip-table--slot'],
              };
            }
            return {};
          };
        }
      }
      // 行头尾插槽
      if (tableProps.schema.rowHeader || tableProps.schema.rowFooter) {
        {
          const render = returnColumns[0].render;
          returnColumns[0].render = (o, row, index) => {
            if (row.type === 'header' && tableProps.schema.rowHeader) {
              return (
                <GenericRender
                  style={tableProps.schema.rowHeader.style}
                  schemas={tableProps.schema.rowHeader.elements ?? []}
                  tableProps={tableProps}
                  tableState={tableState}
                  setTableState={setTableState}
                  record={row.record}
                  recordIndex={row.index}
                />
              );
            }
            if (row.type === 'footer' && tableProps.schema.rowFooter) {
              return (
                <GenericRender
                  style={tableProps.schema.rowFooter.style}
                  schemas={tableProps.schema.rowFooter.elements ?? []}
                  tableProps={tableProps}
                  tableState={tableState}
                  setTableState={setTableState}
                  record={row.record}
                  recordIndex={row.index}
                />
              );
            }
            return render?.(o, row, index);
          };
          returnColumns[0].onCell = (row, index) => {
            if ((row.type === 'header' && tableProps.schema.rowHeader) || (row.type === 'footer' && tableProps.schema.rowFooter)) {
              return {
                colSpan: returnColumns.length,
                className: styles['jfe-drip-table--slot'],
              };
            }
            return {};
          };
        }
        for (let columnIndex = 1; columnIndex < returnColumns.length; columnIndex++) {
          const render = returnColumns[columnIndex].render;
          returnColumns[columnIndex].render = (o, row, index) => {
            if (row.type === 'header' || row.type === 'footer') {
              return null;
            }
            return render?.(o, row, index);
          };
          returnColumns[columnIndex].onCell = (row, index) => {
            if (row.type === 'header' || row.type === 'footer') {
              return {
                colSpan: 0,
                className: styles['jfe-drip-table--slot'],
              };
            }
            return {};
          };
        }
      }
      return returnColumns;
    },
    [
      dragInIndex,
      tableInfo,
      tableProps.schema.columns,
      tableProps.driver,
      tableProps.components,
      tableProps.ext,
      tableProps.onEvent,
      tableProps.onDataSourceChange,
      tableState.displayColumnKeys,
      tableState.selectedRowKeys,
      tableInfo.schema.rowSlotKey,
      tableProps.schema.rowHeader,
      tableProps.schema.rowFooter,
    ],
  );

  const columnsWidth = React.useMemo(
    () => {
      const csWidth = filteredColumns.map(c => parseNumber(c.width, 0));
      const restWidth = Math.max(rcTableWidth - csWidth.reduce((v, w) => v + w, 0) - rowExpandColumnWidth, 0);
      const flexibleCount = csWidth.filter(w => w === 0).length;
      return flexibleCount === 0
        ? csWidth.map(w => w + restWidth / csWidth.length)
        : csWidth.map(w => (w === 0 ? restWidth / flexibleCount : w));
    },
    [filteredColumns, rcTableWidth],
  );

  const rcTableColumns = React.useMemo(
    (): TableColumnType<RcTableRecordType<RecordType>>[] =>
      filteredColumns.map((c, i) => ({ ...c, width: columnsWidth[i] })),
    [filteredColumns, columnsWidth],
  );

  const rcTableScroll = React.useMemo(() => {
    const sc = Object.assign({}, tableProps.schema.scroll);
    const scrollX = columnsWidth.reduce((v, w) => v + w, 0);
    if (sc.x === void 0 && rcTableWidth < scrollX) {
      sc.x = scrollX;
    }
    return sc;
  }, [tableProps.schema.scroll, columnsWidth, rcTableWidth]);

  const refVirtualGrid = React.useRef<VariableSizeGrid>(null);
  const resetVirtualGrid = () => {
    refVirtualGrid.current?.resetAfterIndices({
      columnIndex: 0,
      rowIndex: 0,
      shouldForceUpdate: true,
    });
  };

  React.useEffect(() => resetVirtualGrid, [rcTableWidth]);

  const paginationPosition = React.useMemo(
    () => {
      const pagination = tableInfo.schema.pagination;
      if (pagination) {
        if (pagination.position === 'topLeft' || pagination.position === 'topCenter' || pagination.position === 'topRight') {
          return 'top';
        }
        if (pagination.position === 'bottomLeft' || pagination.position === 'bottomCenter' || pagination.position === 'bottomRight') {
          return 'bottom';
        }
      }
      return 'bottom';
    },
    [tableInfo.schema.pagination],
  );

  const paginationAlign = React.useMemo(
    () => {
      const pagination = tableInfo.schema.pagination;
      if (pagination) {
        if (pagination.position === 'bottomLeft' || pagination.position === 'topLeft') {
          return 'left';
        }
        if (pagination.position === 'bottomCenter' || pagination.position === 'topCenter') {
          return 'center';
        }
        if (pagination.position === 'bottomRight' || pagination.position === 'topRight') {
          return 'right';
        }
      }
      return void 0;
    },
    [tableInfo.schema.pagination],
  );

  const showTotal: React.ComponentProps<typeof Pagination>['showTotal'] = React.useMemo(() => {
    if (tableInfo.schema.pagination) {
      if (typeof tableInfo.schema.pagination?.showTotal === 'string') {
        return (total, range) => (tableInfo.schema.pagination
          ? String(tableInfo.schema.pagination.showTotal ?? '')
            .replace('{{total}}', String(total))
            .replace('{{range[0]}}', String(range?.[0] ?? ''))
            .replace('{{range[1]}}', String(range?.[1] ?? ''))
          : '');
      }
      if (tableInfo.schema.pagination?.showTotal) {
        return (total, range) => (range ? `${range[0]}-${range[1]} of ${total}` : `${total} items`);
      }
    }
    return void 0;
  }, [tableInfo.schema.pagination ? tableInfo.schema.pagination.showTotal : tableInfo.schema.pagination]);

  const renderPagination = tableInfo.schema.pagination === false
    ? null
    : (
      <Pagination
        size={tableInfo.schema.pagination?.size === void 0 ? 'small' : tableInfo.schema.pagination.size}
        pageSize={tableState.pagination.pageSize}
        total={tableProps.total === void 0 ? tableInfo.dataSource.length : tableProps.total}
        showTotal={showTotal}
        current={tableProps.currentPage || tableState.pagination.current}
        align={paginationAlign}
        showLessItems={tableInfo.schema.pagination?.showLessItems}
        showQuickJumper={tableInfo.schema.pagination?.showQuickJumper}
        showSizeChanger={tableInfo.schema.pagination?.showSizeChanger}
        pageSizeOptions={tableInfo.schema.pagination?.pageSizeOptions}
        hideOnSinglePage={tableInfo.schema.pagination?.hideOnSinglePage}
        onChange={(page, pageSize) => {
          const pagination = { ...tableState.pagination, current: page, pageSize };
          props.setTableState({ pagination });
          tableProps.onPageChange?.(page, pageSize, tableInfo);
          tableProps.onChange?.({ pagination, filters: tableState.filters }, tableInfo);
        }}
      />
    );

  const rcTableOnResize: React.ComponentProps<typeof ResizeObserver>['onResize'] = React.useMemo(
    () => ({ width }) => { setRcTableWidth(width); },
    [setRcTableWidth],
  );

  const rcTableRowClassName: React.ComponentProps<typeof RcTable>['rowClassName'] = React.useMemo(
    () =>
      record => (tableState.selectedRowKeys.includes(record[rowKey] as React.Key)
        ? styles['jfe-drip-table-row-selected']
        : ''),
    [tableState.selectedRowKeys],
  );

  const rcTableComponents: React.ComponentProps<typeof RcTable>['components'] = React.useMemo(() => ({
    header: {
      cell: ({ additionalProps, ...wrapperProps }: { children: React.ReactNode; additionalProps?: HeaderCellProps<RecordType, ExtraOptions>['additionalProps'] }) => {
        const dataIndex = additionalProps?.columnSchema.dataIndex;
        return (
          <th {...wrapperProps}>
            <HeaderCell
              additionalProps={
              additionalProps
                ? {
                  ...additionalProps,
                  filter: typeof dataIndex === 'string' ? tableState.filters[dataIndex] : void 0,
                  onFilterChange: (filter) => {
                    const filters = Object.fromEntries(Object.entries(tableState.filters).filter(([k]) => k !== dataIndex));
                    if (typeof dataIndex === 'string' && filter?.length) {
                      filters[dataIndex] = filter;
                    }
                    setTableState({ filters });
                    tableProps.onFilterChange?.(filters, tableInfo);
                    tableProps.onChange?.({ pagination: tableState.pagination, filters }, tableInfo);
                  },
                  tableProps,
                  tableState,
                  setTableState,
                }
                : void 0
              }
            >
              { wrapperProps.children }
            </HeaderCell>
          </th>
        );
      },
    },
    body: tableInfo.schema.virtual
      ? (rawData, { scrollbarSize, onScroll }) => (
        <VariableSizeGrid
          ref={refVirtualGrid}
          itemData={{
            columns: rcTableColumns as TableColumnType<unknown>[],
            columnsDisplayControl,
            dataSource: rcTableDataSource,
            rowKey: 'key',
            selectedRowKeys: tableState.selectedRowKeys,
            hoverRowKey,
            setHoverRowKey,
          }}
          className={styles['jfe-drip-table-virtual-list']}
          columnCount={rcTableColumns.length}
          columnWidth={(index) => {
            const width = columnsWidth[index];
            return index === rcTableColumns.length - 1 ? width - scrollbarSize - 1 : width;
          }}
          height={parseNumber(tableInfo.schema.scroll?.y, 500)}
          rowCount={rawData.length}
          rowHeight={() => tableInfo.schema.rowHeight ?? 50}
          width={rcTableWidth}
          onScroll={onScroll}
        >
          { VirtualCell }
        </VariableSizeGrid>
      )
      : void 0,
  }),
  [
    tableInfo,
    tableInfo.schema.virtual,
    columnsWidth,
    rcTableColumns,
    tableInfo.schema.scroll?.y,
    tableInfo.schema.rowHeight,
    tableInfo.schema.columns,
    tableState.selectedRowKeys,
    tableState.filters,
    hoverRowKey,
  ]);

  const rcTableExpandable: RcTableProps<RcTableRecordType<RecordType>>['expandable'] = React.useMemo(
    () => {
      const subtable = tableProps.schema.subtable;
      const expandedRowRender = tableProps.expandedRowRender;
      const rowExpandable = tableProps.rowExpandable;
      if (rowExpandColumnVisible) {
        return {
          expandIcon: ({ expandable, expanded, record: row, onExpand }) => {
            if (!expandable) {
              return null;
            }
            return (
              <div className={styles['jfe-drip-table-row-expand-icon-wrapper']}>
                <button
                  type="button"
                  className={classNames(
                    styles['jfe-drip-table-row-expand-icon'],
                    expanded ? styles['jfe-drip-table-row-expand-icon-expanded'] : styles['jfe-drip-table-row-expand-icon-collapsed'],
                  )}
                  aria-label={expanded ? '关闭行' : '展开行'}
                  onClick={(e) => {
                    if (expanded) {
                      tableProps.onRowCollapse?.(row.record, row.index, tableInfo);
                    } else {
                      tableProps.onRowExpand?.(row.record, row.index, tableInfo);
                    }
                    onExpand(row, e);
                  }}
                />
              </div>
            );
          },
          expandedRowRender: (row) => {
            const parentTableInfo: typeof tableInfo = { ...tableInfo, record: row.record };
            let subtableEl: React.ReactNode = null;
            if (subtable && Array.isArray(row.record[subtable.dataSourceKey])) {
              const subtableProps = Object.assign(
                {},
                DEFAULT_SUBTABLE_PROPS,
                tableProps.subtableProps
                  ? Object.assign(
                    {},
                    ...[
                      ...tableProps.subtableProps.filter(sp => sp.default) || [],
                      ...subtable ? tableProps.subtableProps.filter(sp => sp.subtableID === subtable.id) || [] : [],
                      ...tableProps.subtableProps.filter(
                        sp => sp.recordKeys
                    && sp.recordKeys.length === 1
                    && sp.recordKeys[0] === row.record[rowKey],
                      ) || [],
                    ].map(sp => sp.properties),
                  )
                  : void 0,
              );
              const subtableSchema = Object.fromEntries(
                Object.entries(subtable)
                  .filter(([key]) => key !== 'dataSourceKey'),
              ) as DripTableSchema<NonNullable<ExtraOptions['CustomColumnSchema']>, NonNullable<ExtraOptions['SubtableDataSourceKey']>>;
              subtableEl = (
                <DripTableWrapper<RecordType, ExtraOptions>
                  {...tableProps}
                  {...subtableProps}
                  schema={subtableSchema}
                  dataSource={row.record[subtable.dataSourceKey] as RecordType[]}
                  title={
                    tableProps.subtableTitle
                      ? subtableData => tableProps.subtableTitle?.(
                        row.record,
                        row.index,
                        { schema: subtableSchema, dataSource: subtableData, parent: parentTableInfo },
                      )
                      : void 0
                  }
                  footer={
                    tableProps.subtableFooter
                      ? subtableData => tableProps.subtableFooter?.(
                        row.record,
                        row.index,
                        { schema: subtableSchema, dataSource: subtableData, parent: parentTableInfo },
                      )
                      : void 0
                  }
                  subtableProps={
                    tableProps.subtableProps
                      ?.map((sp) => {
                        if (sp.recordKeys) {
                          const recordKeys = tableInfo.schema.rowKey && sp.recordKeys[0] === row.record[rowKey]
                            ? [...sp.recordKeys]
                            : [];
                          recordKeys.shift();
                          return {
                            ...sp,
                            recordKeys,
                          };
                        }
                        return sp;
                      })
                      .filter(sp => sp.recordKeys?.length !== 0)
                  }
                  __PARENT_INFO__={{
                    parent: tableProps.__PARENT_INFO__,
                    schema: tableProps.schema,
                    dataSource: tableProps.dataSource || [],
                  }}
                />
              );
            }
            return (
              <React.Fragment>
                { subtableEl }
                { expandedRowRender?.(row.record, row.index, parentTableInfo) }
              </React.Fragment>
            );
          },
          rowExpandable: (row) => {
            if (rowExpandable?.(row.record, row.index, { ...tableInfo, record: row.record })) {
              return true;
            }
            if (subtable) {
              const ds = row.record[subtable.dataSourceKey];
              return Array.isArray(ds) && ds.length > 0;
            }
            return false;
          },
          defaultExpandAllRows: tableProps.defaultExpandAllRows,
          defaultExpandedRowKeys: tableProps.defaultExpandedRowKeys,
        };
      }
      return void 0;
    },
    [tableProps.schema.subtable, tableProps.expandedRowRender, tableProps.rowExpandable],
  );

  return (
    <React.Fragment>
      { paginationPosition === 'top' ? renderPagination : void 0 }
      { props.header }
      <ResizeObserver onResize={rcTableOnResize}>
        <div className={styles['jfe-drip-table-resize-observer']}>
          <RcTable<RcTableRecordType<RecordType>>
            prefixCls="jfe-drip-table"
            className={classNames(styles['jfe-drip-table'], tableProps.schema.innerClassName, {
              [styles['jfe-drip-table-small']]: tableProps.schema.size === 'small',
              [styles['jfe-drip-table-middle']]: tableProps.schema.size === 'middle',
              [styles['jfe-drip-table--bordered']]: tableProps.schema.bordered,
              [styles['jfe-drip-table--stripe']]: tableProps.schema.stripe,
            })}
            style={tableProps.schema.innerStyle}
            rowKey="key"
            columns={rcTableColumns}
            data={rcTableDataSource}
            scroll={rcTableScroll}
            tableLayout={tableProps.schema.tableLayout}
            rowClassName={rcTableRowClassName}
            components={rcTableComponents}
            showHeader={tableProps.schema.showHeader}
            sticky={
              tableProps.schema.sticky
                ? tableProps.sticky ?? true
                : false
            }
            title={
              React.useMemo(
                () => (
                  tableProps.title
                    ? rows => tableProps.title?.(rows.map(r => r.record))
                    : void 0
                ),
                [tableProps.title],
              )
            }
            footer={
              React.useMemo(
                () => (
                  tableProps.footer
                    ? rows => tableProps.footer?.(rows.map(r => r.record))
                    : void 0
                ),
                [tableProps.footer],
              )
            }
            expandable={rcTableExpandable}
          />
        </div>
      </ResizeObserver>
      { props.footer }
      { paginationPosition === 'bottom' ? renderPagination : void 0 }
    </React.Fragment>
  );
};

export default TableLayout;
