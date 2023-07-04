/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import './index.less';

import classNames from 'classnames';
import forEach from 'lodash/forEach';
import ResizeObserver from 'rc-resize-observer';
import RcTable from 'rc-table';
import type { ColumnType as TableColumnType } from 'rc-table/lib/interface';
import { TableProps as RcTableProps } from 'rc-table/lib/Table';
import React from 'react';
import { type GridChildComponentProps, areEqual, VariableSizeGrid } from 'react-window';

import {
  type DripTableBaseColumnSchema,
  type DripTableExtraOptions,
  type DripTableProps,
  type DripTableRecordTypeBase,
  type DripTableRecordTypeWithSubtable,
  type DripTableSchema,
  type DripTableSubtableProps,
  type DripTableTableInformation,
  type ExtractDripTableExtraOption,
  type SchemaObject,
} from '@/types';
import { parseCSS, parseReactCSS, setElementCSS, stringifyCSS } from '@/utils/dom';
import { encodeJSON } from '@/utils/json';
import { indexValue, parseNumber, setValue } from '@/utils/operator';
import { createExecutor, safeExecute } from '@/utils/sandbox';
import DripTableBuiltInComponents, { type DripTableBuiltInColumnSchema, type DripTableComponentProps } from '@/components/cell-components';
import Checkbox from '@/components/react-components/checkbox';
import Pagination from '@/components/react-components/pagination';
import RichText from '@/components/react-components/rich-text';
import SlotRender from '@/components/react-components/slot-render';
import Tooltip from '@/components/react-components/tooltip';
import { type IDripTableContext, useTableContext } from '@/hooks';
import DripTableWrapper from '@/wrapper';

import { type TableLayoutComponentProps } from '../types';
import HeaderCell from './components/header-cell';
import { type DripTableColumnRenderOptions } from './types';
import { finalizeColumnTitle } from './utils';

const prefixCls = 'jfe-drip-table-layout-table';

/**
 * 表格参数默认值，用于覆盖父表参数值防止透传到子表
 */
const DEFAULT_SUBTABLE_PROPS: DripTableSubtableProps<never, never> = {
  total: void 0,
  defaultExpandAllRows: void 0,
  defaultExpandedRowKeys: void 0,
};

interface RcTableRecordType<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  type: 'header' | 'body' | 'footer';
  key: string;
  index: number;
  record: RecordType;
}

const updateCellElementStyle = (el: HTMLElement, hoverColumnKey: string | undefined, hoverRowKey: string | undefined) => {
  const columnKey = el.dataset.columnKey || '';
  const rowKey = el.dataset.rowKey || '';
  // 保留非 Schema 生成样式
  const keepStyle = Object.fromEntries(
    Object.entries({
      ...parseCSS(el.getAttribute('style') || ''),
      ...Object.fromEntries(Object.entries(parseCSS(el.dataset.style ?? '')).map(([k, _]) => [k, ''])),
    })
      .filter(([_, v]) => v),
  );
  // 列基础样式
  const style = parseCSS(el.dataset.basicStyle || '');
  // 列 hover 样式
  if (columnKey) {
    const columnHoverStyle = parseCSS(el.dataset.columnHoverStyle || '');
    const columnHoverClasses = (el.dataset.columnHoverClass ?? '').split(' ').map(s => s.trim()).filter(Boolean);
    if (hoverColumnKey === columnKey) {
      if (columnHoverStyle) {
        Object.assign(style, columnHoverStyle);
      }
      columnHoverClasses.forEach(c => el.classList.add(c));
    } else {
      columnHoverClasses.forEach(c => el.classList.remove(c));
    }
  }
  // 行 hover 样式
  if (rowKey) {
    const rowHoverStyle = parseCSS(el.dataset.rowHoverStyle || '');
    const rowHoverClasses = (el.dataset.rowHoverClass ?? '').split(' ').map(s => s.trim()).filter(Boolean);
    if (hoverRowKey === rowKey) {
      if (rowHoverStyle) {
        Object.assign(style, rowHoverStyle);
      }
      rowHoverClasses.forEach(c => el.classList.add(c));
    } else {
      rowHoverClasses.forEach(c => el.classList.remove(c));
    }
  }
  // 单元格 hover 样式
  if (columnKey && rowKey) {
    const hoverStyle = parseCSS(el.dataset.hoverStyle || '');
    if (hoverStyle && hoverColumnKey === columnKey && hoverRowKey === rowKey) {
      Object.assign(style, hoverStyle);
    }
  }
  // 设置样式、保存复原状态样式
  el.removeAttribute('style');
  setElementCSS(el, keepStyle);
  setElementCSS(el, style);
  el.dataset.style = stringifyCSS(Object.fromEntries(Object.entries(style).map(([k, _]) => [k, el.style[k]])));
};

const onCellMouseEnter: (e: MouseEvent) => void = (e) => {
  const currentTarget = e.currentTarget;
  if (currentTarget instanceof HTMLElement) {
    const tableUUID = currentTarget.dataset.tableUuid;
    const hoverColumnKey = currentTarget.dataset.columnKey;
    const hoverRowKey = currentTarget.dataset.rowKey;
    if (tableUUID && hoverColumnKey && hoverRowKey) {
      forEach(
        document.querySelectorAll(`td[data-table-uuid=${encodeJSON(tableUUID)}],div[data-table-uuid=${encodeJSON(tableUUID)}]`),
        (el) => {
          if (el instanceof HTMLElement) {
            updateCellElementStyle(el, hoverColumnKey, hoverRowKey);
          }
        },
      );
    }
  }
};

const onCellMouseLeave: (e: MouseEvent) => void = (e) => {
  const currentTarget = e.currentTarget;
  if (currentTarget instanceof HTMLElement) {
    const tableUUID = currentTarget.dataset.tableUuid;
    if (tableUUID) {
      forEach(
        document.querySelectorAll(`td[data-table-uuid=${encodeJSON(tableUUID)}],div[data-table-uuid=${encodeJSON(tableUUID)}]`),
        (el) => {
          if (el instanceof HTMLElement) {
            updateCellElementStyle(el, void 0, void 0);
          }
        },
      );
    }
  }
};

const hookColumRender = <
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(
    column: TableColumnType<RcTableRecordType<RecordType>>,
    columnSchema: DripTableBaseColumnSchema,
    columnIndex: number,
    tableInfo: DripTableTableInformation<RecordType, ExtraOptions>,
    rcTableInfo: RcTableInfo,
    extraProps: Pick<DripTableProps<RecordType, ExtraOptions>, 'components' | 'ext' | 'onEvent' | 'onDataSourceChange'>,
  ): TableColumnType<RcTableRecordType<RecordType>> => {
  const render = column.render;
  column.render = (d, row, index) => {
    if (rcTableInfo.cellConfigConflictIDs[rcTableInfo.cellConfigs[index]?.[columnIndex]?.spanGroupID ?? '']) {
      return <div className={`${prefixCls}-row-slot__error`}>Cell Span Conflict</div>;
    }
    return (
      <React.Fragment>
        { render?.(d, row, index) }
        {
        columnSchema && (columnSchema.style || columnSchema.hoverStyle || columnSchema.rowHoverStyle || columnSchema.columnHoverStyle)
          ? (
            <div
              style={{ display: 'none' }}
              ref={(el) => {
                const tdEl = el?.parentElement;
                if (tdEl) {
                  const context = { props: { record: row.record, recordIndex: row.index } };
                  const parseStyleSchema = (style: string | Record<string, string> | undefined) => parseCSS(typeof style === 'string' ? safeExecute(style, context) : style);
                  tdEl.dataset.tableUuid = tableInfo.uuid;
                  tdEl.dataset.columnKey = columnSchema.key;
                  tdEl.dataset.rowKey = row.key;
                  tdEl.dataset.basicStyle = stringifyCSS(Object.assign({ 'text-align': columnSchema.align }, parseStyleSchema(columnSchema.style)));
                  tdEl.dataset.hoverStyle = stringifyCSS(parseStyleSchema(columnSchema.hoverStyle));
                  tdEl.dataset.rowHoverStyle = stringifyCSS(parseStyleSchema(columnSchema.rowHoverStyle));
                  tdEl.dataset.columnHoverStyle = stringifyCSS(parseStyleSchema(columnSchema.columnHoverStyle));
                  tdEl.addEventListener('mouseenter', onCellMouseEnter);
                  tdEl.addEventListener('mouseleave', onCellMouseLeave);
                  updateCellElementStyle(tdEl, void 0, void 0);
                }
              }}
            />
          )
          : null
      }
      </React.Fragment>
    );
  };
  column.onCell = (row, index) => {
    if (index === void 0 || rcTableInfo.cellConfigConflictIDs[rcTableInfo.cellConfigs[index]?.[columnIndex]?.spanGroupID ?? '']) {
      return {};
    }
    return rcTableInfo.cellConfigs[index]?.[columnIndex]?.data || {};
  };
  return column;
};

/**
 * 根据列 Schema，生成表格单元格渲染函数
 * @param tableInfo 表格信息
 * @param columnSchema 表格列 Schema
 * @param extraProps 一些额外的参数
 * @returns 表格单元格渲染函数
 */
export const columnRenderGenerator = <
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(
    tableInfo: DripTableColumnRenderOptions<RecordType, ExtraOptions>['tableInfo'],
    columnSchema: DripTableBuiltInColumnSchema<ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'>> | ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'>,
    extraProps: DripTableColumnRenderOptions<RecordType, ExtraOptions>['extraProps'],
  ): NonNullable<TableColumnType<RcTableRecordType<RecordType>>['render']> => {
  if ('component' in (columnSchema as DripTableBuiltInColumnSchema)) {
    const BuiltInComponent = DripTableBuiltInComponents[columnSchema.component] as
      React.JSXElementConstructor<DripTableComponentProps<RecordType, DripTableBuiltInColumnSchema<ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'>>>> & { schema?: SchemaObject };
    const onChange = (record: RecordType, index: number, value: unknown) => {
      const ds = [...tableInfo.dataSource];
      const rec = { ...record };
      setValue(rec, columnSchema.dataIndex, value);
      ds[index] = rec;
      extraProps.onDataSourceChange?.(ds, tableInfo);
    };
    type PropsTranslator = (rawValue: unknown, context: { value: unknown; record: RecordType; recordIndex: number }) => unknown;
    const generatePropsTranslator = (translatorSchema: unknown): PropsTranslator => {
      if (translatorSchema === void 0) {
        return (v, c) => v;
      }
      if (typeof translatorSchema === 'string') {
        try {
          const translate = createExecutor(translatorSchema, ['props']);
          return (v, c) => {
            try {
              return translate(c);
            } catch {}
            return void 0;
          };
        } catch {}
      }
      return () => translatorSchema;
    };
    const dataTranslator = generatePropsTranslator(columnSchema.dataTranslation);
    const hiddenTranslator = generatePropsTranslator(columnSchema.hidden);
    const disableTranslator = generatePropsTranslator(columnSchema.disable);
    const editableTranslator = generatePropsTranslator(columnSchema.editable);
    if (BuiltInComponent) {
      return (_, row) => {
        const rawValue = indexValue(row.record, columnSchema.dataIndex, columnSchema.defaultValue);
        const record = row.record;
        const recordIndex = row.index;
        const value = dataTranslator(rawValue, { value: rawValue, record, recordIndex });
        const translatorContext = { value, record, recordIndex };
        const ext = columnSchema.component === 'group'
          ? { tableInfo, extraProps } as unknown as typeof extraProps.ext
          : extraProps.ext;
        if (hiddenTranslator(false, translatorContext)) {
          return null;
        }
        return (
          <BuiltInComponent
            data={record}
            value={value}
            indexValue={(dataIndex, defaultValue) => {
              const v = indexValue(row.record, dataIndex, defaultValue ?? columnSchema.defaultValue);
              return dataTranslator(v, { value: v, record, recordIndex });
            }}
            preview={extraProps.preview as DripTableComponentProps<RecordType, DripTableBuiltInColumnSchema<ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'>>>['preview']}
            disable={Boolean(disableTranslator(false, translatorContext))}
            editable={Boolean(editableTranslator(tableInfo.schema.editable, translatorContext))}
            onChange={v => onChange(record, recordIndex, v)}
            schema={columnSchema as unknown as DripTableBuiltInColumnSchema<ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'>>}
            ext={ext}
            components={extraProps.components as DripTableProps<DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, NonNullable<React.Key>>, DripTableExtraOptions>['components']}
            fireEvent={event => extraProps.onEvent?.({ record, recordIndex, ...event }, tableInfo)}
          />
        );
      };
    }
    const [libName, componentName] = columnSchema.component.split('::');
    if (libName && componentName) {
      const ExtraComponent = extraProps.components?.[libName]?.[componentName];
      if (ExtraComponent) {
        return (_, row) => {
          const rawValue = indexValue(row.record, columnSchema.dataIndex, columnSchema.defaultValue);
          const record = row.record;
          const recordIndex = row.index;
          const value = dataTranslator(rawValue, { value: rawValue, record, recordIndex });
          const translatorContext = { value, record, recordIndex };
          if (hiddenTranslator(false, translatorContext)) {
            return null;
          }
          return (
            <ExtraComponent
              data={record}
              value={value}
              indexValue={(dataIndex, defaultValue) => {
                const v = indexValue(row.record, dataIndex, defaultValue ?? columnSchema.defaultValue);
                return dataTranslator(v, { value: v, record, recordIndex });
              }}
              preview={extraProps.preview}
              disable={Boolean(disableTranslator(false, translatorContext))}
              editable={Boolean(editableTranslator(tableInfo.schema.editable, translatorContext))}
              onChange={v => onChange(record, recordIndex, v)}
              schema={columnSchema as ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'>}
              ext={extraProps.ext}
              fireEvent={event => extraProps.onEvent?.({ record, recordIndex, ...event }, tableInfo)}
            />
          );
        };
      }
    }
  }
  return () => extraProps.unknownComponent ?? <div className="ajv-error">{ `Unknown column component: ${columnSchema.component}` }</div>;
};

interface HeaderCellAdditionalProps<
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  columnSchema: ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'> | DripTableBuiltInColumnSchema<ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'>>;
}

/**
 * 根据列 Schema，生成表格列配置
 * @param tableInfo 表格信息
 * @param columnSchema 表格列 Schema
 * @param extraProps 一些额外的参数
 * @returns 表格列配置
 */
export const columnGenerator = <
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(
    tableInfo: DripTableTableInformation<RecordType, ExtraOptions>,
    columnSchema: DripTableBuiltInColumnSchema<ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'>> | ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'>,
    extraProps: Pick<DripTableProps<RecordType, ExtraOptions>, 'components' | 'ext' | 'onEvent' | 'onDataSourceChange'>,
  ): TableColumnType<RcTableRecordType<RecordType>> => {
  let width = String(columnSchema.width).trim();
  if ((/^[0-9]+$/uig).test(width)) {
    width += 'px';
  }
  const columnTitle = finalizeColumnTitle(columnSchema);
  const onTitleRef = (el: HTMLDivElement) => {
    const style = typeof columnSchema.title === 'object' && columnSchema.title.style;
    if (!style) {
      return;
    }
    let thEl: HTMLElement | null = el;
    while (thEl && thEl.tagName !== 'TH') {
      thEl = thEl?.parentElement;
    }
    if (!thEl) {
      return;
    }
    setElementCSS(thEl, style);
  };
  const titleStyle = typeof columnSchema.title === 'object' && typeof columnSchema.title.body === 'object' && columnSchema.title.body.style
    ? parseReactCSS(columnSchema.title.body.style)
    : void 0;
  const column: TableColumnType<RcTableRecordType<RecordType>> = {
    key: columnSchema.key,
    width,
    className: classNames({
      [`${prefixCls}-cell--top`]: columnSchema.verticalAlign === 'top',
      [`${prefixCls}-cell--middle`]: columnSchema.verticalAlign === 'middle',
      [`${prefixCls}-cell--bottom`]: columnSchema.verticalAlign === 'bottom',
      [`${prefixCls}-cell--stretch`]: columnSchema.verticalAlign === 'stretch',
    }),
    align: columnSchema.align,
    title:
      columnSchema.description
        ? (
          <div ref={onTitleRef}>
            <span style={{ marginRight: '6px' }}>
              <RichText className={`${prefixCls}-column-title`} style={titleStyle} html={columnTitle} />
            </span>
            <Tooltip placement="top" title={<RichText html={columnSchema.description} />}>
              <span role="img" aria-label="question-circle" className={`${prefixCls}-column-title__question-icon`}>
                <svg viewBox="64 64 896 896" focusable="false" data-icon="question-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                  <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
                  <path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z" />
                </svg>
              </span>
            </Tooltip>
          </div>
        )
        : (<RichText onRef={onTitleRef} style={titleStyle} html={columnTitle} />),
    dataIndex: columnSchema.dataIndex,
    fixed: columnSchema.fixed,
    render: columnRenderGenerator(tableInfo, columnSchema, extraProps),
    onHeaderCell: () => ({ additionalProps: { columnSchema } as HeaderCellAdditionalProps<ExtraOptions> } as React.TdHTMLAttributes<Element>),
  };

  return column;
};

interface VirtualCellItemData {
  tableUUID: string;
  columns: TableColumnType<unknown>[];
  columnsBaseSchema: DripTableBaseColumnSchema[];
  dataSource: RcTableRecordType<DripTableRecordTypeBase>[];
  rowKey: React.Key;
  selectedRowKeys: IDripTableContext['state']['selectedRowKeys'];
}

const VirtualCell = React.memo(({ data, columnIndex, rowIndex, style: vcStyle }: GridChildComponentProps<VirtualCellItemData>) => {
  const { tableUUID, columns, columnsBaseSchema, dataSource, rowKey, selectedRowKeys } = data;
  const columnBaseSchema = columnsBaseSchema[columnIndex];
  const column = columns[columnIndex];
  const row = dataSource[rowIndex];
  const recKey = row.record[rowKey] as React.Key;
  const selected = selectedRowKeys.includes(recKey);
  const context = { props: { record: row.record, recordIndex: row.index } };
  const parseStyleSchema = (style: string | Record<string, string> | undefined) => parseCSS(typeof style === 'string' ? safeExecute(style, context) : style);
  const styleText = stringifyCSS(Object.assign(
    { 'text-align': columnBaseSchema.align },
    Object.fromEntries(Object.entries(vcStyle).map(([k, v]) => {
      if (typeof v === 'number' && (k === 'top' || k === 'right' || k === 'bottom' || k === 'left' || k === 'width' || k === 'height')) {
        return [k, `${v}px`];
      }
      return [k, v];
    })),
    parseStyleSchema(columnBaseSchema.style),
  ));
  return (
    <div
      className={classNames(`${prefixCls}-virtual-cell`, {
        [`${prefixCls}-virtual-cell--top`]: columnBaseSchema?.verticalAlign === 'top',
        [`${prefixCls}-virtual-cell--middle`]: columnBaseSchema?.verticalAlign === 'middle',
        [`${prefixCls}-virtual-cell--bottom`]: columnBaseSchema?.verticalAlign === 'bottom',
        [`${prefixCls}-virtual-cell--stretch`]: columnBaseSchema?.verticalAlign === 'stretch',
        [`${prefixCls}--row-selected`]: selected,
      })}
      style={parseReactCSS(styleText)}
      data-table-uuid={tableUUID}
      data-row-key={row.key}
      data-column-key={columnBaseSchema.key}
      data-basic-style={styleText}
      data-hover-style={stringifyCSS(parseStyleSchema(columnBaseSchema.hoverStyle))}
      data-row-hover-style={stringifyCSS(parseStyleSchema(columnBaseSchema.rowHoverStyle))}
      data-column-hover-style={stringifyCSS(parseStyleSchema(columnBaseSchema.columnHoverStyle))}
      data-row-hover-class={classNames(`${prefixCls}--row-hover`, { [`${prefixCls}--row-selected-hover`]: selected })}
      onMouseEnter={React.useCallback(e => onCellMouseEnter(e), [])}
      onMouseLeave={React.useCallback(e => onCellMouseLeave(e), [])}
    >
      { column.render?.(void 0, row, rowIndex) }
    </div>
  );
}, areEqual);

/**
 * 单元格配置
 */
interface RcCellConfig {
  /**
   * 透传给 onCell 的属性
   */
  data: {
    rowSpan?: number;
    colSpan?: number;
    className?: string;
  };
  /**
   * 合并单元格类型
   */
  spanType?: 'none' | 'row' | 'rectangle';
  /**
   * 合并单元格组ID
   */
  spanGroupID?: string;
  /**
   * 是否为合并单元格的主单元格
   */
  spanPrimary?: boolean;
  /**
   * 合并单元格开始行号
   */
  spanStartRowIndex?: number;
  /**
   * 合并单元格开始列号
   */
  spanStartColumnIndex?: number;
  /**
   * 合并单元格结束行号
   */
  spanEndRowIndex?: number;
  /**
   * 合并单元格结束列号
   */
  spanEndColumnIndex?: number;
}

/**
 * 所有单元格配置集合
 */
type RcTableInfo = {
  /**
   * 单元格配置矩阵（稀疏矩阵，列号为一级数组下标）
   */
  cellConfigs: {
    [rowIndex: number]: {
      [columnIndex: number]: RcCellConfig;
    };
  };
  /**
   * 单元格合并冲突组ID
   */
  cellConfigConflictIDs: Record<string, boolean>;
  maxColumnIndex: number;
  maxRowIndex: number;
};

/**
 * 设置单元格配置矩阵中指定单元格的属性
 * @param rcTableInfo 单元格配置矩阵
 * @param rowIndex 设置的单元格行下标
 * @param columnIndex 设置的单元格列下标
 * @param config 想要设置的单元格属性
 */
const setCellConfig = (rcTableInfo: RcTableInfo, rowIndex: number, columnIndex: number, config: RcCellConfig) => {
  // 初始化单元格配置
  if (!rcTableInfo.cellConfigs[rowIndex]) {
    rcTableInfo.cellConfigs[rowIndex] = {};
  }
  if (!rcTableInfo.cellConfigs[rowIndex][columnIndex]) {
    rcTableInfo.cellConfigs[rowIndex][columnIndex] = { data: {} };
  }
  const cellConfig = rcTableInfo.cellConfigs[rowIndex][columnIndex];
  // 标准化参数
  const rowSpan = config.data.rowSpan ?? cellConfig.data.rowSpan ?? 1;
  const colSpan = config.data.colSpan ?? cellConfig.data.colSpan ?? 1;
  const primary = rowSpan !== 0 && colSpan !== 0;
  // 合并单元格冲突
  if (cellConfig.spanGroupID && cellConfig.spanGroupID !== config.spanGroupID) {
    if (config.spanGroupID) {
      rcTableInfo.cellConfigConflictIDs[config.spanGroupID] = true;
    }
    rcTableInfo.cellConfigConflictIDs[cellConfig.spanGroupID] = true;
  }
  cellConfig.data.className = config.data.className;
  cellConfig.data.rowSpan = rowSpan;
  cellConfig.data.colSpan = colSpan;
  cellConfig.spanType = config.spanType;
  cellConfig.spanGroupID = config.spanGroupID;
  cellConfig.spanPrimary = primary;
  cellConfig.spanStartRowIndex = primary ? rowIndex : config.spanStartRowIndex;
  cellConfig.spanStartColumnIndex = primary ? columnIndex : config.spanStartColumnIndex;
  cellConfig.spanEndRowIndex = primary ? rowIndex + rowSpan - 1 : config.spanEndRowIndex;
  cellConfig.spanEndColumnIndex = primary ? columnIndex + colSpan - 1 : config.spanEndColumnIndex;
  // 清空被合并单元格
  if (primary) {
    for (let r = rowIndex; r < rowIndex + rowSpan; r++) {
      for (let c = columnIndex; c < columnIndex + colSpan; c++) {
        if (r === rowIndex && c === columnIndex) {
          continue;
        }
        setCellConfig(rcTableInfo, r, c, {
          data: {
            className: config.data.className,
            rowSpan: 0,
            colSpan: 0,
          },
          spanType: config.spanType,
          spanGroupID: config.spanGroupID,
          spanStartRowIndex: rowIndex,
          spanStartColumnIndex: columnIndex,
          spanEndRowIndex: rowIndex + rowSpan - 1,
          spanEndColumnIndex: columnIndex + colSpan - 1,
        });
      }
    }
  }
};

/**
 * 向单元格配置矩阵中插入一行
 * @param rcTableInfo 单元格配置矩阵
 * @param targetRowIndex 插入的单元格行下标
 */
const insertCellConfigRow = (rcTableInfo: RcTableInfo, targetRowIndex: number) => {
  // 执行插入：调整稀疏矩阵元素下标
  for (let rowIndex = rcTableInfo.maxRowIndex; rowIndex >= 0; rowIndex--) {
    const cellConfigRow = rcTableInfo.cellConfigs[rowIndex];
    if (!cellConfigRow) {
      if (rowIndex >= targetRowIndex) {
        delete rcTableInfo.cellConfigs[rowIndex + 1];
      }
      continue;
    }
    for (let columnIndex = 0; columnIndex <= rcTableInfo.maxColumnIndex; columnIndex++) {
      const config = cellConfigRow[columnIndex];
      if (!config) {
        continue;
      }
      if (config.spanStartRowIndex !== void 0 && config.spanStartRowIndex >= targetRowIndex) {
        if (config.spanPrimary && config.data.rowSpan !== void 0) {
          config.data.rowSpan -= 1;
        }
        config.spanStartRowIndex += 1;
      }
      if (config.spanEndRowIndex !== void 0 && config.spanEndRowIndex >= targetRowIndex) {
        if (config.spanPrimary && config.data.rowSpan !== void 0) {
          config.data.rowSpan += 1;
        }
        config.spanEndRowIndex += 1;
      }
    }
    if (rowIndex >= targetRowIndex) {
      rcTableInfo.cellConfigs[rowIndex + 1] = cellConfigRow;
    }
  }
  delete rcTableInfo.cellConfigs[targetRowIndex];
  rcTableInfo.maxRowIndex += 1;
  // 完成插入：纵向调整合并单元格
  const hasSet: Record<number, Record<number, string | undefined>> = {};
  for (let columnIndex = 0; columnIndex <= rcTableInfo.maxColumnIndex; columnIndex++) {
    const configT = rcTableInfo.cellConfigs[targetRowIndex - 1]?.[columnIndex];
    const configB = rcTableInfo.cellConfigs[targetRowIndex + 1]?.[columnIndex];
    if (configT && configB && configT.spanGroupID === configB.spanGroupID && configT.spanStartRowIndex !== void 0 && configT.spanStartColumnIndex !== void 0) {
      const spanConfig = rcTableInfo.cellConfigs[configT.spanStartRowIndex]?.[configT.spanStartColumnIndex];
      if (
        spanConfig
        && spanConfig.spanStartRowIndex !== void 0 && spanConfig.spanEndRowIndex !== void 0
        && spanConfig.spanStartColumnIndex !== void 0 && spanConfig.spanEndColumnIndex !== void 0
      ) {
        // 过滤重复的合并单元格优化性能
        if (hasSet[spanConfig.spanStartRowIndex]?.[spanConfig.spanStartColumnIndex] === spanConfig.spanGroupID) {
          continue;
        }
        if (!hasSet[spanConfig.spanStartRowIndex]) {
          hasSet[spanConfig.spanStartRowIndex] = {};
        }
        hasSet[spanConfig.spanStartRowIndex][spanConfig.spanStartColumnIndex] = spanConfig.spanGroupID;
        // 设置合并单元格
        setCellConfig(rcTableInfo, spanConfig.spanStartRowIndex, spanConfig.spanStartColumnIndex, {
          ...spanConfig,
          data: {
            ...spanConfig.data,
            rowSpan: spanConfig.spanEndRowIndex - spanConfig.spanStartRowIndex + 1,
            colSpan: spanConfig.spanEndColumnIndex - spanConfig.spanStartColumnIndex + 1,
          },
        });
        continue;
      }
    }
  }
};

/**
 * 向单元格配置矩阵中插入一列
 * @param rcTableInfo 单元格配置矩阵
 * @param targetColumnIndex 插入的单元格列下标
 */
const insertCellConfigColumn = (rcTableInfo: RcTableInfo, targetColumnIndex: number) => {
  // 执行插入：调整稀疏矩阵元素下标
  for (let rowIndex = 0; rowIndex <= rcTableInfo.maxRowIndex; rowIndex++) {
    const cellConfigRow = rcTableInfo.cellConfigs[rowIndex];
    if (!cellConfigRow) {
      continue;
    }
    for (let columnIndex = rcTableInfo.maxColumnIndex; columnIndex >= 0; columnIndex--) {
      const config = cellConfigRow[columnIndex];
      if (!config) {
        if (columnIndex >= targetColumnIndex) {
          delete cellConfigRow[columnIndex + 1];
        }
        continue;
      }
      if (config.spanStartColumnIndex !== void 0 && config.spanStartColumnIndex >= targetColumnIndex) {
        if (config.spanPrimary && config.data.colSpan !== void 0) {
          config.data.colSpan -= 1;
        }
        config.spanStartColumnIndex += 1;
      }
      if (config.spanEndColumnIndex !== void 0 && config.spanEndColumnIndex >= targetColumnIndex) {
        if (config.spanPrimary && config.data.colSpan !== void 0) {
          config.data.colSpan += 1;
        }
        config.spanEndColumnIndex += 1;
      }
      if (columnIndex >= targetColumnIndex) {
        cellConfigRow[columnIndex + 1] = config;
      }
    }
    delete cellConfigRow[targetColumnIndex];
  }
  rcTableInfo.maxColumnIndex += 1;
  // 完成插入：横向调整合并单元格
  const hasSet: Record<number, Record<number, string | undefined>> = {};
  for (let rowIndex = 0; rowIndex <= rcTableInfo.maxRowIndex; rowIndex++) {
    const configL = rcTableInfo.cellConfigs[rowIndex]?.[targetColumnIndex - 1];
    const configR = rcTableInfo.cellConfigs[rowIndex]?.[targetColumnIndex + 1];
    if (configL?.spanType === 'row' && configL.spanStartRowIndex !== void 0 && configL.spanStartColumnIndex !== void 0) {
      const spanConfig = rcTableInfo.cellConfigs[configL.spanStartRowIndex]?.[configL.spanStartColumnIndex];
      if (spanConfig) {
        // 过滤重复的合并单元格优化性能
        if (hasSet[rowIndex]?.[0] === spanConfig.spanGroupID) {
          continue;
        }
        if (!hasSet[rowIndex]) {
          hasSet[rowIndex] = {};
        }
        hasSet[rowIndex][0] = spanConfig.spanGroupID;
        // 设置合并单元格
        setCellConfig(rcTableInfo, rowIndex, 0, {
          ...spanConfig,
          data: {
            ...spanConfig.data,
            colSpan: rcTableInfo.maxColumnIndex + 1,
          },
        });
        continue;
      }
    }
    if (configR?.spanType === 'row' && configR.spanStartRowIndex !== void 0 && configR.spanStartColumnIndex !== void 0) {
      const spanConfig = rcTableInfo.cellConfigs[configR.spanStartRowIndex]?.[configR.spanStartColumnIndex];
      if (spanConfig) {
        // 过滤重复的合并单元格优化性能
        if (hasSet[rowIndex]?.[0] === spanConfig.spanGroupID) {
          continue;
        }
        if (!hasSet[rowIndex]) {
          hasSet[rowIndex] = {};
        }
        hasSet[rowIndex][0] = spanConfig.spanGroupID;
        // 设置合并单元格
        setCellConfig(rcTableInfo, rowIndex, 0, {
          ...spanConfig,
          data: {
            ...spanConfig.data,
            colSpan: rcTableInfo.maxColumnIndex + 1,
          },
        });
        continue;
      }
    }
    if (configL && configR && configL.spanGroupID === configR.spanGroupID && configL.spanStartRowIndex !== void 0 && configL.spanStartColumnIndex !== void 0) {
      const spanConfig = rcTableInfo.cellConfigs[configL.spanStartRowIndex]?.[configL.spanStartColumnIndex];
      if (
        spanConfig
        && spanConfig.spanStartRowIndex !== void 0 && spanConfig.spanEndRowIndex !== void 0
        && spanConfig.spanStartColumnIndex !== void 0 && spanConfig.spanEndColumnIndex !== void 0
      ) {
        // 过滤重复的合并单元格优化性能
        if (hasSet[spanConfig.spanStartRowIndex]?.[spanConfig.spanStartColumnIndex] === spanConfig.spanGroupID) {
          continue;
        }
        if (!hasSet[spanConfig.spanStartRowIndex]) {
          hasSet[spanConfig.spanStartRowIndex] = {};
        }
        hasSet[spanConfig.spanStartRowIndex][spanConfig.spanStartColumnIndex] = spanConfig.spanGroupID;
        // 设置合并单元格
        setCellConfig(rcTableInfo, spanConfig.spanStartRowIndex, spanConfig.spanStartColumnIndex, {
          ...spanConfig,
          data: {
            ...spanConfig.data,
            rowSpan: spanConfig.spanEndRowIndex - spanConfig.spanStartRowIndex + 1,
            colSpan: spanConfig.spanEndColumnIndex - spanConfig.spanStartColumnIndex + 1,
          },
        });
        continue;
      }
    }
  }
};

/**
 * 从单元格配置矩阵中删除一列
 * @param rcTableInfo 单元格配置矩阵
 * @param targetColumnIndex 删除的单元格列下标
 */
const removeCellConfigColumn = (rcTableInfo: RcTableInfo, targetColumnIndex: number) => {
  // 执行删除：调整稀疏矩阵元素下标
  for (let rowIndex = 0; rowIndex <= rcTableInfo.maxRowIndex; rowIndex++) {
    const cellConfigRow = rcTableInfo.cellConfigs[rowIndex];
    if (!cellConfigRow) {
      continue;
    }
    for (let columnIndex = 0; columnIndex <= rcTableInfo.maxColumnIndex; columnIndex++) {
      const config = cellConfigRow[columnIndex];
      if (!config) {
        if (columnIndex > targetColumnIndex) {
          delete cellConfigRow[columnIndex - 1];
        }
        continue;
      }
      if (config.spanStartColumnIndex !== void 0 && config.spanStartColumnIndex > targetColumnIndex) {
        if (config.spanPrimary && config.data.colSpan !== void 0) {
          config.data.colSpan += 1;
        }
        config.spanStartColumnIndex -= 1;
      }
      if (config.spanEndColumnIndex !== void 0 && config.spanEndColumnIndex >= targetColumnIndex) {
        if (config.spanPrimary && config.data.colSpan !== void 0) {
          config.data.colSpan -= 1;
        }
        config.spanEndColumnIndex -= 1;
      }
      if (columnIndex > targetColumnIndex) {
        cellConfigRow[columnIndex - 1] = config;
      }
    }
    delete cellConfigRow[rcTableInfo.maxColumnIndex];
  }
  rcTableInfo.maxColumnIndex -= 1;
  // 完成插入：调整合并单元格
  const hasSet: Record<number, Record<number, string | undefined>> = {};
  for (let rowIndex = 0; rowIndex <= rcTableInfo.maxRowIndex; rowIndex++) {
    const config = rcTableInfo.cellConfigs[rowIndex]?.[targetColumnIndex];
    if (config && config.spanStartRowIndex !== void 0 && config.spanStartColumnIndex !== void 0) {
      const spanConfig = rcTableInfo.cellConfigs[config.spanStartRowIndex]?.[config.spanStartColumnIndex];
      if (spanConfig
        && spanConfig.spanStartRowIndex !== void 0 && spanConfig.spanEndRowIndex !== void 0
        && spanConfig.spanStartColumnIndex !== void 0 && spanConfig.spanEndColumnIndex !== void 0
      ) {
        // 过滤重复的合并单元格优化性能
        if (hasSet[spanConfig.spanStartRowIndex]?.[spanConfig.spanStartColumnIndex] === spanConfig.spanGroupID) {
          continue;
        }
        if (!hasSet[spanConfig.spanStartRowIndex]) {
          hasSet[spanConfig.spanStartRowIndex] = {};
        }
        hasSet[spanConfig.spanStartRowIndex][spanConfig.spanStartColumnIndex] = spanConfig.spanGroupID;
        // 设置合并单元格
        setCellConfig(rcTableInfo, spanConfig.spanStartRowIndex, spanConfig.spanStartColumnIndex, {
          ...spanConfig,
          data: {
            ...spanConfig.data,
            rowSpan: spanConfig.spanEndRowIndex - spanConfig.spanStartRowIndex + 1,
            colSpan: spanConfig.spanEndColumnIndex - spanConfig.spanStartColumnIndex + 1,
          },
        });
      }
    }
  }
};

const TableLayout = <
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: TableLayoutComponentProps): JSX.Element => {
  const { props: tableProps, info: tableInfo, state: tableState, setState: setTableState } = useTableContext<RecordType, ExtraOptions>();
  const tableUUID = tableInfo.uuid;
  const rowKey = tableProps.schema.rowKey ?? '$$row-key$$';

  const [rcTableWidth, setRcTableWidth] = React.useState(0);
  const [dragInIndex, setDragInIndex] = React.useState(-1);

  const initialPagination = tableInfo.schema?.pagination || void 0;
  React.useEffect(() => {
    setTableState(state => ({
      pagination: {
        ...state.pagination,
        pageSize: initialPagination?.pageSize || 10,
      },
    }));
  }, [initialPagination, initialPagination?.pageSize]);

  const spanSchema = React.useMemo<Exclude<typeof tableInfo.schema.span, string | unknown[] | undefined>>(() => {
    if (typeof tableInfo.schema.span === 'string') {
      return {
        generator: tableInfo.schema.span,
      };
    }
    if (Array.isArray(tableInfo.schema.span)) {
      return {
        rectangles: tableInfo.schema.span,
      };
    }
    return tableInfo.schema.span ?? {};
  }, [tableInfo.schema.span]);

  // 原始数据源
  const dataSource = React.useMemo(
    () => tableProps.dataSource.map((item, index) => ({
      ...item,
      [rowKey]: item[rowKey] === void 0 ? index : item[rowKey],
    })),
    [tableProps.dataSource, rowKey],
  );

  // 当前分页原始数据源偏移量
  const pageDataSourceOffset = React.useMemo(
    () => (tableInfo.schema.pagination && dataSource.length > tableState.pagination.pageSize
      ? tableState.pagination.pageSize * (tableState.pagination.current - 1)
      : 0),
    [dataSource, tableInfo.schema.pagination, tableState.pagination.current, tableState.pagination.pageSize],
  );

  // 当前分页原始数据源
  const pageDataSource = React.useMemo(
    () => (tableInfo.schema.pagination && dataSource.length > tableState.pagination.pageSize
      ? dataSource.slice(pageDataSourceOffset, tableState.pagination.pageSize * tableState.pagination.current)
      : dataSource),
    [dataSource, pageDataSourceOffset, tableInfo.schema.pagination, tableState.pagination.current, tableState.pagination.pageSize],
  );

  // 当前分页原始数据源行头部插槽可见性
  const pageDataSourceRowHeaderVisible = React.useMemo(
    () => {
      const v: Record<number, boolean> = {};
      for (let index = pageDataSource.length - 1; index >= 0; index--) {
        if (tableProps.schema.rowHeader?.elements && (!tableProps.rowHeaderVisible || tableProps.rowHeaderVisible(pageDataSource[index], pageDataSourceOffset + index, tableInfo))) {
          v[index] = true;
        }
      }
      return v;
    },
    [pageDataSource, tableProps.rowHeaderVisible, tableProps.schema.rowHeader],
  );

  // 当前分页原始数据源行尾部插槽可见性
  const pageDataSourceRowFooterVisible = React.useMemo(
    () => {
      const v: Record<number, boolean> = {};
      for (let index = pageDataSource.length - 1; index >= 0; index--) {
        if (tableProps.schema.rowFooter?.elements && (!tableProps.rowFooterVisible || tableProps.rowFooterVisible(pageDataSource[index], pageDataSourceOffset + index, tableInfo))) {
          v[index] = true;
        }
      }
      return v;
    },
    [pageDataSource, tableProps.rowFooterVisible, tableProps.schema.rowFooter],
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
      // 行头部/尾部插槽存在，通过内部 dataSource 插入行实现
      const spreadDs: RcTableRecordType<RecordType>[] = [];
      for (const [index, record] of pageDataSource.entries()) {
        if (pageDataSourceRowHeaderVisible[index]) {
          spreadDs.push(packRcTableRecord(record, pageDataSourceOffset + index, 'header'));
        }
        spreadDs.push(packRcTableRecord(record, pageDataSourceOffset + index, 'body'));
        if (pageDataSourceRowFooterVisible[index]) {
          spreadDs.push(packRcTableRecord(record, pageDataSourceOffset + index, 'footer'));
        }
      }
      return spreadDs;
    },
    [
      pageDataSource,
      pageDataSourceOffset,
      pageDataSourceRowHeaderVisible,
      pageDataSourceRowFooterVisible,
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

  const rowSelectionColumnSchema = React.useMemo(
    (): DripTableBaseColumnSchema | undefined => (
      tableInfo.schema.rowSelection
        ? Object.assign(
          {
            title: '',
            align: 'center',
            verticalAlign: 'middle',
          },
          typeof tableInfo.schema.rowSelection === 'object'
            ? tableInfo.schema.rowSelection
            : void 0,
          { key: '$$drip-table-row-selection$$' },
        )
        : void 0
    ),
    [tableInfo.schema.rowSelection],
  );

  const rowDraggableColumnSchema = React.useMemo(
    (): DripTableBaseColumnSchema | undefined => (
      tableInfo.schema.rowDraggable
        ? Object.assign(
          {
            title: '',
            align: 'center',
            verticalAlign: 'middle',
          },
          typeof tableInfo.schema.rowDraggable === 'object'
            ? tableInfo.schema.rowDraggable
            : void 0,
          { key: '$$drip-table-row-selection$$' },
        )
        : void 0
    ),
    [tableInfo.schema.rowDraggable],
  );

  const columnsBaseSchema = React.useMemo(
    (): DripTableBaseColumnSchema[] => {
      const dc: DripTableBaseColumnSchema[] = [...tableInfo.schema.columns];
      if (rowSelectionColumnSchema) {
        dc.unshift(rowSelectionColumnSchema);
      }
      if (rowDraggableColumnSchema) {
        dc.unshift(rowDraggableColumnSchema);
      }
      return dc;
    },
    [tableInfo.schema.columns, rowSelectionColumnSchema, rowDraggableColumnSchema],
  );

  const hiddenColumnIndexes = React.useMemo(
    (): number[] => tableProps.schema.columns
      .map((columnSchema, rawColumnIndex) => ({ columnSchema, rawColumnIndex }))
      .filter(({ columnSchema }) => columnSchema.hidable && !tableState.displayColumnKeys.includes(columnSchema.key))
      .map(({ rawColumnIndex }) => rawColumnIndex),
    [tableProps.schema.columns, tableState.displayColumnKeys],
  );

  const rcTableInfo = React.useMemo(() => {
    const rti: RcTableInfo = { cellConfigs: {}, cellConfigConflictIDs: {}, maxColumnIndex: 0, maxRowIndex: 0 };
    rti.maxRowIndex = pageDataSource.length - 1;
    rti.maxColumnIndex = tableInfo.schema.columns.length - 1;
    /**
     * 原始坐标系行数据
     */
    // 指定坐标合并单元格
    if (spanSchema.rectangles) {
      for (const [rowIndex, columnIndex, rowSpan, colSpan] of spanSchema.rectangles) {
        if (rowIndex >= pageDataSourceOffset) {
          setCellConfig(rti, rowIndex - pageDataSourceOffset, columnIndex, {
            data: {
              rowSpan,
              colSpan,
            },
            spanType: 'rectangle',
            spanGroupID: `rectangle-${rowIndex + pageDataSourceOffset}-${columnIndex}-${rowSpan}-${colSpan}`,
          });
        }
      }
    }
    // 动态合并单元格
    if (spanSchema.generator) {
      const generator = createExecutor(spanSchema.generator, ['props']);
      for (const [rowIndex, record] of pageDataSource.entries()) {
        for (let columnIndex = 0; columnIndex < tableInfo.schema.columns.length; columnIndex++) {
          const columnSchema = tableInfo.schema.columns[columnIndex];
          const context = { record, recordIndex: rowIndex + pageDataSourceOffset, column: columnSchema };
          const cc = generator(context) as { rowSpan?: number; colSpan?: number } | undefined;
          if (cc && (cc.rowSpan !== void 0 || cc.colSpan !== void 0)) {
            setCellConfig(rti, rowIndex, columnIndex, {
              data: {
                rowSpan: cc.rowSpan ?? 1,
                colSpan: cc.colSpan ?? 1,
              },
              spanType: 'rectangle',
              spanGroupID: `generator-${rowIndex + pageDataSourceOffset}-${columnIndex}-${cc.rowSpan ?? 1}-${cc.colSpan ?? 1}`,
            });
          }
        }
      }
    }
    // 整行自定义插槽
    const rowSlotKey = tableInfo.schema.rowSlotKey;
    if (rowSlotKey) {
      for (const [rowIndex, record] of pageDataSource.entries()) {
        const slotType = rowSlotKey in record ? String(record[rowSlotKey]) : void 0;
        if (slotType) {
          setCellConfig(rti, rowIndex, 0, {
            data: {
              className: `${prefixCls}--slot`,
              colSpan: tableProps.schema.columns.length,
            },
            spanType: 'row',
            spanGroupID: `row-${rowIndex}`,
          });
        }
      }
    }
    /**
     * 行坐标系转换
     */
    // 行头尾插槽
    for (let index = pageDataSource.length - 1; index >= 0; index--) {
      if (pageDataSourceRowFooterVisible[index]) {
        insertCellConfigRow(rti, index + 1);
        setCellConfig(rti, index + 1, 0, {
          data: {
            className: `${prefixCls}--slot`,
            colSpan: tableInfo.schema.columns.length,
          },
          spanType: 'row',
          spanGroupID: `footer-${index}`,
        });
      }
      if (pageDataSourceRowHeaderVisible[index]) {
        insertCellConfigRow(rti, index);
        setCellConfig(rti, index, 0, {
          data: {
            className: `${prefixCls}--slot`,
            colSpan: tableInfo.schema.columns.length,
          },
          spanType: 'row',
          spanGroupID: `header-${index}`,
        });
      }
    }
    /**
     * 列坐标系转换
     */
    // 隐藏列
    for (let i = hiddenColumnIndexes.length - 1; i >= 0; i--) {
      const columnIndex = hiddenColumnIndexes[i];
      removeCellConfigColumn(rti, columnIndex);
    }
    // 拖拽列
    if (rowDraggableColumnSchema) {
      insertCellConfigColumn(rti, 0);
    }
    // 选择列
    if (rowSelectionColumnSchema) {
      insertCellConfigColumn(rti, 0);
    }
    return rti;
  }, [
    pageDataSource,
    pageDataSourceOffset,
    spanSchema,
    tableInfo.schema.columns,
    hiddenColumnIndexes,
    pageDataSourceRowHeaderVisible,
    pageDataSourceRowFooterVisible,
  ]);

  const filteredColumns = React.useMemo(
    (): TableColumnType<RcTableRecordType<RecordType>>[] => {
      const extraProps = {
        components: tableProps.components,
        ext: tableProps.ext,
        onEvent: tableProps.onEvent,
        onDataSourceChange: tableProps.onDataSourceChange,
      };
      const schemaColumns: { schema: DripTableBaseColumnSchema; column: TableColumnType<RcTableRecordType<RecordType>> }[] = tableProps.schema.columns
        .filter((_, i) => !hiddenColumnIndexes.includes(i))
        .map(columnSchema => ({ schema: columnSchema, column: columnGenerator(tableInfo, columnSchema, extraProps) }));
      if (rowSelectionColumnSchema) {
        schemaColumns.unshift({
          schema: rowSelectionColumnSchema,
          column: {
            align: rowSelectionColumnSchema.align,
            width: 50,
            fixed: schemaColumns[0]?.column.fixed === 'left' || schemaColumns[0]?.column.fixed === true ? 'left' : void 0,
            title: (
              <div className={`${prefixCls}-column-title-selection`}>
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
              <div className={`${prefixCls}-column-selection`}>
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
          },
        });
      }
      if (rowDraggableColumnSchema) {
        schemaColumns.unshift({
          schema: rowDraggableColumnSchema,
          column: {
            align: 'center',
            width: 50,
            fixed: schemaColumns[0]?.column.fixed === 'left' || schemaColumns[0]?.column.fixed === true ? 'left' : void 0,
            render: (_, row) => (
              <div
                className={classNames(`${prefixCls}-column-draggable-row`, {
                  [`${prefixCls}-column-draggable-row--drag-in`]: row.index === dragInIndex,
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
                  className={`${prefixCls}-column-draggable-row__draggable`}
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
          },
        });
      }
      if (schemaColumns.length === 0) {
        return [];
      }
      // 整行自定义插槽
      if (tableInfo.schema.rowSlotKey) {
        const rowSlotKey = tableInfo.schema.rowSlotKey;
        {
          const render = schemaColumns[0].column.render;
          schemaColumns[0].column.render = (o, row, index) => {
            const slotType = rowSlotKey in row.record ? String(row.record[rowSlotKey]) : void 0;
            if (slotType) {
              const Slot = tableProps.slots?.[slotType] || tableProps.slots?.default;
              return Slot
                ? (
                  <Slot
                    slotType={slotType}
                    schema={tableProps.schema}
                    ext={tableProps.ext}
                    dataSource={tableProps.dataSource}
                    record={row.record}
                    recordIndex={row.index}
                    onSearch={(searchParams) => { tableProps.onSearch?.(searchParams, tableInfo); }}
                    fireEvent={event => extraProps.onEvent?.({ record: row.record, recordIndex: row.index, ...event }, tableInfo)}
                  >
                    { o }
                  </Slot>
                )
                : (
                  <span className={`${prefixCls}-row-slot__error`}>{ `自定义插槽组件渲染函数 tableProps.slots['${slotType}'] 不存在` }</span>
                );
            }
            return render?.(o, row, index);
          };
        }
        for (let columnIndex = 1; columnIndex < schemaColumns.length; columnIndex++) {
          const render = schemaColumns[columnIndex].column.render;
          schemaColumns[columnIndex].column.render = (o, row, index) => {
            const slotType = rowSlotKey in row.record ? String(row.record[rowSlotKey]) : void 0;
            if (slotType) {
              return null;
            }
            return render?.(o, row, index);
          };
        }
      }
      // 行头尾插槽
      if (tableProps.schema.rowHeader || tableProps.schema.rowFooter) {
        {
          const render = schemaColumns[0].column.render;
          const columnKey = schemaColumns[0].schema.key;
          schemaColumns[0].column.render = (o, row, index) => {
            if (row.type === 'header' && tableProps.schema.rowHeader) {
              return (
                <SlotRender
                  schema={tableProps.schema.rowHeader}
                  record={row.record}
                  recordIndex={row.index}
                  columnKey={columnKey}
                />
              );
            }
            if (row.type === 'footer' && tableProps.schema.rowFooter) {
              return (
                <SlotRender
                  schema={tableProps.schema.rowFooter}
                  record={row.record}
                  recordIndex={row.index}
                />
              );
            }
            return render?.(o, row, index);
          };
        }
        for (let columnIndex = 1; columnIndex < schemaColumns.length; columnIndex++) {
          const render = schemaColumns[columnIndex].column.render;
          schemaColumns[columnIndex].column.render = (o, row, index) => {
            if (row.type === 'header' || row.type === 'footer') {
              return null;
            }
            return render?.(o, row, index);
          };
        }
      }
      return schemaColumns.map((sc, i) => hookColumRender(sc.column, sc.schema, i, tableInfo, rcTableInfo, extraProps));
    },
    [
      dragInIndex,
      tableInfo,
      tableProps.schema.columns,
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

  const renderPagination = tableInfo.schema.pagination
    ? (
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
          setTableState({ pagination });
          tableProps.onPageChange?.(page, pageSize, tableInfo);
          tableProps.onChange?.({ pagination, filters: tableState.filters }, tableInfo);
        }}
      />
    )
    : null;

  const rcTableOnResize: React.ComponentProps<typeof ResizeObserver>['onResize'] = React.useMemo(
    () => ({ width }) => { setRcTableWidth(width); },
    [setRcTableWidth],
  );

  const rcTableRowClassName: React.ComponentProps<typeof RcTable>['rowClassName'] = React.useMemo(
    () =>
      record => (tableState.selectedRowKeys.includes(record[rowKey] as React.Key)
        ? `${prefixCls}-row-selected`
        : ''),
    [tableState.selectedRowKeys],
  );

  const rcTableComponents: React.ComponentProps<typeof RcTable>['components'] = React.useMemo(() => ({
    header: {
      cell: ({ additionalProps, ...wrapperProps }: { children: React.ReactNode; additionalProps?: HeaderCellAdditionalProps }) => (
        <th {...wrapperProps}>
          <HeaderCell additionalProps={additionalProps}>
            { wrapperProps.children }
          </HeaderCell>
        </th>
      ),
    },
    body: tableInfo.schema.virtual
      ? (rawData, { scrollbarSize, onScroll }) => (
        <VariableSizeGrid
          ref={refVirtualGrid}
          itemData={{
            tableUUID,
            columns: rcTableColumns as TableColumnType<unknown>[],
            columnsBaseSchema,
            dataSource: rcTableDataSource,
            rowKey,
            selectedRowKeys: tableState.selectedRowKeys,
          }}
          className={`${prefixCls}-virtual-list`}
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
              <div className={`${prefixCls}-row-expand-icon-wrapper`}>
                <button
                  type="button"
                  className={classNames(
                    `${prefixCls}-row-expand-icon`,
                    expanded ? `${prefixCls}-row-expand-icon-expanded` : `${prefixCls}-row-expand-icon-collapsed`,
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
              ) as DripTableSchema<ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'>, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>;
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
                        { uuid: tableUUID, schema: subtableSchema, dataSource: subtableData, parent: parentTableInfo },
                      )
                      : void 0
                  }
                  footer={
                    tableProps.subtableFooter
                      ? subtableData => tableProps.subtableFooter?.(
                        row.record,
                        row.index,
                        { uuid: tableUUID, schema: subtableSchema, dataSource: subtableData, parent: parentTableInfo },
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
        <div className={`${prefixCls}-resize-observer`}>
          <RcTable<RcTableRecordType<RecordType>>
            prefixCls={prefixCls}
            className={classNames(`${prefixCls}`, tableProps.schema.innerClassName, {
              [`${prefixCls}-small`]: tableProps.schema.size === 'small',
              [`${prefixCls}-middle`]: tableProps.schema.size === 'middle',
              [`${prefixCls}--bordered`]: tableProps.schema.bordered,
              [`${prefixCls}--stripe`]: tableProps.schema.stripe,
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
            emptyText={
              React.useMemo(
                () => {
                  if (tableProps.emptyText) {
                    return tableProps.emptyText(tableInfo);
                  }
                  return <RichText style={{ textAlign: 'center' }} html={tableProps.schema.emptyText ?? 'No Data'} />;
                },
                [tableProps.emptyText, tableProps.schema.emptyText],
              )
            }
          />
        </div>
      </ResizeObserver>
      { props.footer }
      { paginationPosition === 'bottom' ? renderPagination : void 0 }
    </React.Fragment>
  );
};

export default TableLayout;
