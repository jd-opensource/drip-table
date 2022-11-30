/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import isEqual from 'lodash/isEqual';
import type { ColumnType as TableColumnType } from 'rc-table/lib/interface';
import RcTooltip from 'rc-tooltip';
import React from 'react';

import Checkbox from '@/components/checkbox';
import GenericRender from '@/components/generic-render';
import { type IDripTableContext } from '@/context';
import { type DripTableBuiltInColumnSchema, type DripTableExtraOptions, type DripTableProps, type DripTableRecordTypeBase, type DripTableRecordTypeWithSubtable } from '@/index';

import styles from './index.module.less';

interface HeaderCellAdditionalProps<
RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  tableProps: DripTableProps<RecordType, ExtraOptions>;
  tableState: IDripTableContext;
  setTableState: IDripTableContext['setTableState'];
  column?: TableColumnType<unknown>;
  columnSchema: DripTableBuiltInColumnSchema;
  filter?: IDripTableContext['filters'][string];
  onFilterChange?: (filter: IDripTableContext['filters'][string]) => void;
}

export interface HeaderCellProps<
RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  children: React.ReactNode;
  additionalProps?: HeaderCellAdditionalProps<RecordType, ExtraOptions>;
}

const HeaderCell = <
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: HeaderCellProps<RecordType, ExtraOptions>) => {
  const [filter, setFilter] = React.useState<NonNullable<IDripTableContext['filters'][string]>>([]);
  const children = <React.Fragment>{ props.children }</React.Fragment>;
  const additionalProps = props.additionalProps;
  if (!additionalProps) {
    return children;
  }
  const header = typeof additionalProps.columnSchema.title === 'string' ? void 0 : additionalProps.columnSchema.title?.header;
  const footer = typeof additionalProps.columnSchema.title === 'string' ? void 0 : additionalProps.columnSchema.title?.footer;
  const { columnSchema, onFilterChange } = additionalProps;
  if ((!onFilterChange || !columnSchema.filters?.length) && !header && !footer) {
    return children;
  }
  return (
    <div className={styles['jfe-drip-table-th-cell-toolbox']}>
      {
        header
          ? (
            <GenericRender
              style={header.style}
              schemas={header.elements || []}
              columnSchema={columnSchema}
              tableProps={additionalProps.tableProps}
              tableState={additionalProps.tableState}
              setTableState={additionalProps.setTableState}
            />
          )
          : null
      }
      <div className={styles['jfe-drip-table-th-cell-toolbox-title']}>
        { props.children }
      </div>
      {
        footer
          ? (
            <GenericRender
              style={footer.style}
              schemas={footer.elements || []}
              columnSchema={columnSchema}
              tableProps={additionalProps.tableProps}
              tableState={additionalProps.tableState}
              setTableState={additionalProps.setTableState}
            />
          )
          : null
      }
      {
        onFilterChange && columnSchema.filters?.length
          ? (
            <RcTooltip
              prefixCls="jfe-drip-table-tooltip"
              transitionName="jfe-drip-table-motion-zoom-big"
              placement="bottom"
              trigger="click"
              overlay={(
                <div className={styles['jfe-drip-table-th-cell-toolbox-filters']}>
                  <ul className={styles['jfe-drip-table-th-cell-toolbox-filters-list']}>
                    {
                      columnSchema.filters.map((f, i) => {
                        const checked = filter?.includes(f.value);
                        return (
                          <li
                            className={styles['jfe-drip-table-th-cell-toolbox-filters-item']}
                            onClick={() => {
                              const value = filter.filter(v => v !== f.value);
                              if (!checked) {
                                value.push(f.value);
                              }
                              setFilter(value);
                            }}
                          >
                            <span className={styles['jfe-drip-table-th-cell-toolbox-filters-item-content']}>
                              <Checkbox key={i} checked={checked} />
                              <span className={styles['jfe-drip-table-th-cell-toolbox-filters-item-content-text']}>{ f.text }</span>
                            </span>
                          </li>
                        );
                      })
                    }
                  </ul>
                  <div className={styles['jfe-drip-table-th-cell-toolbox-filters-btns']}>
                    <button
                      type="button"
                      // ?className="ant-btn ant-btn-link ant-btn-sm"
                      className={styles['jfe-drip-table-th-cell-toolbox-filters-btn-reset']}
                      disabled={isEqual(additionalProps.filter || [], filter)}
                      onClick={() => {
                        setFilter(additionalProps.filter || []);
                      }}
                    >
                      <span>重置</span>
                    </button>
                    <button
                      type="button"
                      // ?className="ant-btn ant-btn-primary ant-btn-sm"
                      className={styles['jfe-drip-table-th-cell-toolbox-filters-btn-sure']}
                      onClick={() => { onFilterChange(filter); }}
                    >
                      <span>确 定</span>
                    </button>
                  </div>
                </div>
            )}
              onVisibleChange={(visible) => {
                if (visible) {
                  setFilter(additionalProps.filter || []);
                }
              }}
            >
              <div className={styles['jfe-drip-table-th-cell-toolbox-icon']}>
                <span role="img" aria-label="filter" className={styles['jfe-drip-table-th-cell-toolbox-icon-filter']}>
                  <svg viewBox="64 64 896 896" focusable="false" data-icon="filter" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M349 838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V642H349v196zm531.1-684H143.9c-24.5 0-39.8 26.7-27.5 48l221.3 376h348.8l221.3-376c12.1-21.3-3.2-48-27.7-48z" />
                  </svg>
                </span>
              </div>
            </RcTooltip>
          )
          : null
      }
    </div>
  );
};

export default HeaderCell;
