/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import './index.less';

import classNames from 'classnames';
import type { ColumnType as TableColumnType } from 'rc-table/lib/interface';
import React from 'react';

import { safeExecute } from '@/utils/sandbox';
import SlotRender from '@/components/react-components/slot-render';
import { useTableContext } from '@/hooks';
import { type DripTableBuiltInColumnSchema, type DripTableExtraOptions, type DripTableRecordTypeBase, type DripTableRecordTypeWithSubtable, type ExtractDripTableExtraOption, indexValue } from '@/index';

import HeaderCellFilter from './components/filter';
import HeaderCellSorter from './components/sorter';

const prefixCls = 'jfe-drip-table-layout-table-column-header-cell';

export interface HeaderCellAdditionalProps<
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  column?: TableColumnType<unknown>;
  columnSchema: DripTableBuiltInColumnSchema<ExtractDripTableExtraOption<ExtraOptions, 'CustomColumnSchema'>>;
}

export interface HeaderCellProps<
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  onRef?: (el: HTMLDivElement | null) => void;
  children: React.ReactNode;
  wrapperProps?: {
    className?: string;
  };
  additionalProps?: HeaderCellAdditionalProps<ExtraOptions>;
}

const HeaderCell = <
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: HeaderCellProps<ExtraOptions>) => {
  const { props: tableProps, state: tableState, setState: setTableState } = useTableContext<RecordType, ExtraOptions>();
  const dataIndex = props.additionalProps?.columnSchema?.dataIndex;
  const filter = React.useMemo(() => (typeof dataIndex === 'string' && tableState.filters[dataIndex]) || [], [dataIndex, tableState.filters]);
  const children = <React.Fragment>{ props.children }</React.Fragment>;
  const wrapperProps = props.wrapperProps;
  const additionalProps = props.additionalProps;
  if (!additionalProps) {
    return (
      <th {...wrapperProps}>
        { children }
      </th>
    );
  }
  const header = typeof additionalProps.columnSchema.title === 'string' ? void 0 : additionalProps.columnSchema.title?.header;
  const footer = typeof additionalProps.columnSchema.title === 'string' ? void 0 : additionalProps.columnSchema.title?.footer;
  const { columnSchema } = additionalProps;
  const itemsCount = [header, props.children, footer].filter(Boolean).length;
  let justifyContent: 'center' | 'flex-end' | 'flex-start' | 'space-between' = 'flex-start';
  if (columnSchema.align === 'center') {
    justifyContent = itemsCount === 1 ? 'center' : 'space-between';
  } else if (columnSchema.align === 'right') {
    justifyContent = 'flex-end';
  } else {
    justifyContent = 'flex-start';
  }
  return (
    <th
      {...wrapperProps}
      className={classNames(wrapperProps?.className, { [`${prefixCls}-has-sorter`]: columnSchema.sorter })}
      onClick={React.useCallback(() => {
        if (!columnSchema.sorter) {
          return;
        }
        const sortDirections = columnSchema.sortDirections || ['ascend', 'descend'];
        if (tableState.sorter.key === columnSchema.key && tableState.sorter.direction === sortDirections[sortDirections.length - 1]) {
          setTableState({ sorter: { key: null, direction: null, comparer: null }, sorterChanged: true });
        } else {
          const direction = tableState.sorter.key === columnSchema.key && tableState.sorter.direction
            ? sortDirections[sortDirections.indexOf(tableState.sorter.direction) + 1] || sortDirections[0]
            : sortDirections[0];
          setTableState({
            sorter: {
              key: columnSchema.key,
              direction,
              comparer: (a, b) => (direction === 'ascend' ? 1 : -1) * safeExecute(columnSchema.sorter || '', {
                props: {
                  column: columnSchema,
                  leftRecord: a,
                  rightRecord: b,
                  leftValue: indexValue(a, columnSchema.dataIndex),
                  rightValue: indexValue(b, columnSchema.dataIndex),
                  ext: tableProps.ext,
                },
              }, 0),
            },
            sorterChanged: true,
          });
        }
      }, [columnSchema.key, tableState.sorter])}
    >
      <div className={prefixCls} ref={props.onRef}>
        <div className={`${prefixCls}-content`} style={{ justifyContent }}>
          {
            header
              ? (
                <SlotRender
                  schema={header}
                  columnKey={columnSchema.key}
                />
              )
              : null
          }
          {
            props.children
              ? (
                <div className={`${prefixCls}-content-body`}>
                  { props.children }
                </div>
              )
              : null
          }
          {
            footer
              ? (
                <SlotRender
                  schema={footer}
                  columnKey={columnSchema.key}
                />
              )
              : null
          }
        </div>
        <div className={`${prefixCls}-toolbox`}>
          {
            columnSchema.sorter
              ? (
                <HeaderCellSorter
                  columnSchema={columnSchema}
                  sorter={tableState.sorter}
                  setSorter={(sorter) => {
                    if (sorter && sorter.key) {
                      setTableState({
                        sorter: {
                          key: sorter.key,
                          direction: sorter.direction,
                          comparer: (a, b) => (sorter.direction === 'ascend' ? 1 : -1) * safeExecute(columnSchema.sorter || '', {
                            props: {
                              column: columnSchema,
                              leftRecord: a,
                              rightRecord: b,
                              leftValue: indexValue(a, columnSchema.dataIndex),
                              rightValue: indexValue(b, columnSchema.dataIndex),
                              ext: tableProps.ext,
                            },
                          }, 0),
                        },
                        sorterChanged: true,
                      });
                    } else {
                      setTableState({ sorter: { key: null, direction: null, comparer: null }, sorterChanged: true });
                    }
                  }}
                />
              )
              : null
          }
          {
            columnSchema.filters?.length
              ? (
                <HeaderCellFilter
                  columnSchema={columnSchema}
                  filter={filter}
                  setFilter={(newFilter) => {
                    const filters = Object.fromEntries(Object.entries(tableState.filters).filter(([k]) => k !== dataIndex));
                    if (typeof dataIndex === 'string' && newFilter?.length) {
                      filters[dataIndex] = newFilter;
                    }
                    setTableState({ filters, filtersChanged: true });
                  }}
                />
              )
              : null
          }
        </div>
      </div>
    </th>
  );
};

export default HeaderCell;
