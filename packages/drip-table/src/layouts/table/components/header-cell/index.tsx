/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import './index.less';

import isEqual from 'lodash/isEqual';
import type { ColumnType as TableColumnType } from 'rc-table/lib/interface';
import React from 'react';

import Checkbox from '@/components/react-components/checkbox';
import SlotRender from '@/components/react-components/slot-render';
import Tooltip from '@/components/react-components/tooltip';
import { type IDripTableContext, useTableContext } from '@/hooks';
import { type DripTableBuiltInColumnSchema, type DripTableExtraOptions, type DripTableRecordTypeBase, type DripTableRecordTypeWithSubtable, type ExtractDripTableExtraOption } from '@/index';

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
  const { props: tableProps, info: tableInfo, state: tableState, setState: setTableState } = useTableContext<RecordType, ExtraOptions>();
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
    <div className={prefixCls} style={{ justifyContent }} ref={props.onRef}>
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
            <div className={`${prefixCls}-body`}>
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
                        setTableState({ filters });
                        tableProps.onFilterChange?.(filters, tableInfo);
                        tableProps.onChange?.({ pagination: tableState.pagination, filters }, tableInfo);
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
  );
};

export default HeaderCell;
