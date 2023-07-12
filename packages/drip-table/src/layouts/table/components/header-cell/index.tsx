/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import './index.less';

import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import type { ColumnType as TableColumnType } from 'rc-table/lib/interface';
import React from 'react';

import { safeExecute } from '@/utils/sandbox';
import Checkbox from '@/components/react-components/checkbox';
import SlotRender from '@/components/react-components/slot-render';
import Tooltip from '@/components/react-components/tooltip';
import { type IDripTableContext, useTableContext } from '@/hooks';
import { type DripTableBuiltInColumnSchema, type DripTableExtraOptions, type DripTableRecordTypeBase, type DripTableRecordTypeWithSubtable, type ExtractDripTableExtraOption, indexValue } from '@/index';

const prefixCls = 'jfe-drip-table-layout-table-column-header-cell';

interface HeaderCellAdditionalProps<
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
  additionalProps?: HeaderCellAdditionalProps<ExtraOptions>;
}

const HeaderCell = <
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: HeaderCellProps<ExtraOptions>) => {
  const { state: tableState, setState: setTableState } = useTableContext<RecordType, ExtraOptions>();
  const dataIndex = props.additionalProps?.columnSchema?.dataIndex;
  const filter = React.useMemo(() => (typeof dataIndex === 'string' && tableState.filters[dataIndex]) || [], [dataIndex, tableState.filters]);
  const [filterDisplay, setFilterDisplay] = React.useState<NonNullable<IDripTableContext['state']['filters'][string]>>((typeof dataIndex === 'string' && tableState.filters[dataIndex]) || []);
  const children = <React.Fragment>{ props.children }</React.Fragment>;
  const additionalProps = props.additionalProps;
  if (!additionalProps) {
    return children;
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
              <span
                className={classNames(`${prefixCls}-toolbox-sorter`, {
                  [`${prefixCls}-toolbox-sorter-full`]: !columnSchema.sortDirections || columnSchema.sortDirections.length === 2,
                })}
              >
                <span className={`${prefixCls}-toolbox-sorter-inner`} aria-hidden="true">
                  {
                    !columnSchema.sortDirections || columnSchema.sortDirections.includes('ascend')
                      ? (
                        <span
                          role="img"
                          aria-label="caret-up"
                          className={classNames(`${prefixCls}-toolbox-sorter-up`, {
                            [`${prefixCls}-toolbox-sorter--active`]: tableState.sorter.key === columnSchema.key && tableState.sorter.direction === 'ascend',
                          })}
                          onClick={React.useCallback(() => {
                            if (tableState.sorter.key === columnSchema.key && tableState.sorter.direction === 'ascend') {
                              setTableState({ sorter: { key: null, direction: null, comparer: null }, sorterChanged: true });
                            } else {
                              setTableState({
                                sorter: {
                                  key: columnSchema.key,
                                  direction: 'ascend',
                                  comparer: (a, b) => safeExecute(columnSchema.sorter || '', {
                                    props: {
                                      column: columnSchema,
                                      leftRecord: a,
                                      rightRecord: b,
                                      leftValue: indexValue(a, columnSchema.dataIndex),
                                      rightValue: indexValue(b, columnSchema.dataIndex),
                                    },
                                  }, 0),
                                },
                                sorterChanged: true,
                              });
                            }
                          }, [columnSchema.key, tableState.sorter])}
                        >
                          <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-up" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                            <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" />
                          </svg>
                        </span>
                      )
                      : null
                  }
                  {
                    !columnSchema.sortDirections || columnSchema.sortDirections.includes('descend')
                      ? (
                        <span
                          role="img"
                          aria-label="caret-down"
                          className={classNames(`${prefixCls}-toolbox-sorter-down`, {
                            [`${prefixCls}-toolbox-sorter--active`]: tableState.sorter.key === columnSchema.key && tableState.sorter.direction === 'descend',
                          })}
                          onClick={React.useCallback(() => {
                            if (tableState.sorter.key === columnSchema.key && tableState.sorter.direction === 'descend') {
                              setTableState({ sorter: { key: null, direction: null, comparer: null }, sorterChanged: true });
                            } else {
                              setTableState({
                                sorter: {
                                  key: columnSchema.key,
                                  direction: 'descend',
                                  comparer: (a, b) => 0 - safeExecute(columnSchema.sorter || '', {
                                    props: {
                                      column: columnSchema,
                                      leftRecord: a,
                                      rightRecord: b,
                                      leftValue: indexValue(a, columnSchema.dataIndex),
                                      rightValue: indexValue(b, columnSchema.dataIndex),
                                    },
                                  }, 0),
                                },
                                sorterChanged: true,
                              });
                            }
                          }, [columnSchema.key, tableState.sorter])}
                        >
                          <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                            <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" />
                          </svg>
                        </span>
                      )
                      : null
                  }
                </span>
              </span>
            )
            : null
        }
        {
          columnSchema.filters?.length
            ? (
              <Tooltip
                placement="bottom"
                trigger="click"
                overlay={(
                  <div className={`${prefixCls}-toolbox-filters`}>
                    <ul className={`${prefixCls}-toolbox-filters-list`}>
                      {
                        columnSchema.filters.map((f, i) => {
                          const checked = filterDisplay?.includes(f.value);
                          return (
                            <li
                              key={i}
                              className={`${prefixCls}-toolbox-filters-item`}
                              onClick={() => {
                                const value = filterDisplay.filter(v => v !== f.value);
                                if (!checked) {
                                  value.push(f.value);
                                }
                                if (columnSchema.filtersMaxSelect && value.length > columnSchema.filtersMaxSelect) {
                                  value.splice(0, value.length - columnSchema.filtersMaxSelect);
                                }
                                setFilterDisplay(value);
                              }}
                            >
                              <span className={`${prefixCls}-toolbox-filters-item-content`}>
                                <Checkbox key={i} checked={checked} />
                                <span className={`${prefixCls}-toolbox-filters-item-content-text`}>{ f.text }</span>
                              </span>
                            </li>
                          );
                        })
                      }
                    </ul>
                    <div className={`${prefixCls}-toolbox-filters-btns`}>
                      <button
                        type="button"
                        className={`${prefixCls}-toolbox-filters-btn-reset`}
                        disabled={isEqual(filter || [], filterDisplay)}
                        onClick={() => {
                          setFilterDisplay(filter || []);
                        }}
                      >
                        <span>重置</span>
                      </button>
                      <button
                        type="button"
                        className={`${prefixCls}-toolbox-filters-btn-sure`}
                        onClick={() => {
                          const filters = Object.fromEntries(Object.entries(tableState.filters).filter(([k]) => k !== dataIndex));
                          if (typeof dataIndex === 'string' && filterDisplay?.length) {
                            filters[dataIndex] = filterDisplay;
                          }
                          setTableState({ filters, filtersChanged: true });
                        }}
                      >
                        <span>确 定</span>
                      </button>
                    </div>
                  </div>
              )}
                onVisibleChange={(visible) => {
                  if (visible) {
                    setFilterDisplay(filter || []);
                  }
                }}
              >
                <div className={`${prefixCls}-toolbox-icon`}>
                  <span role="img" aria-label="filter" className={`${prefixCls}-toolbox-icon-filter`}>
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="filter" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                      <path d="M349 838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V642H349v196zm531.1-684H143.9c-24.5 0-39.8 26.7-27.5 48l221.3 376h348.8l221.3-376c12.1-21.3-3.2-48-27.7-48z" />
                    </svg>
                  </span>
                </div>
              </Tooltip>
            )
            : null
        }
      </div>
    </div>
  );
};

export default HeaderCell;
