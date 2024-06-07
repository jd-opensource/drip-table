/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import './index.less';

import classNames from 'classnames';
import React from 'react';

import { preventEvent } from '@/components/cell-components/utils';
import { type IDripTableContext } from '@/hooks';
import { type DripTableColumnSchema } from '@/index';

const prefixCls = 'jfe-drip-table-layout-table-column-header-cell-toolbox-sorter';

export interface HeaderCellSorterProps {
  columnSchema: DripTableColumnSchema;
  sorter: Omit<IDripTableContext['state']['sorter'], 'comparer'>;
  setSorter: (sorter: Omit<IDripTableContext['state']['sorter'], 'comparer'>) => void;
}

const HeaderCellSorter = (props: HeaderCellSorterProps) => {
  const { sorter, columnSchema } = props;
  return (
    <span
      className={classNames(`${prefixCls}`, {
        [`${prefixCls}-full`]: !columnSchema.sortDirections || columnSchema.sortDirections.length === 2,
      })}
    >
      <span className={`${prefixCls}-inner`} aria-hidden="true">
        {
          !columnSchema.sortDirections || columnSchema.sortDirections.includes('ascend')
            ? (
              <span
                role="img"
                aria-label="caret-up"
                className={classNames(`${prefixCls}-up`, {
                  [`${prefixCls}--active`]: sorter.key === columnSchema.key && sorter.direction === 'ascend',
                })}
                onClick={React.useCallback((e) => {
                  if (sorter.key === columnSchema.key && sorter.direction === 'ascend') {
                    props.setSorter({ key: null, direction: null });
                  } else {
                    props.setSorter({
                      key: columnSchema.key,
                      direction: 'ascend',
                    });
                  }
                  return preventEvent(e);
                }, [columnSchema.key, sorter])}
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
                className={classNames(`${prefixCls}-down`, {
                  [`${prefixCls}--active`]: sorter.key === columnSchema.key && sorter.direction === 'descend',
                })}
                onClick={React.useCallback((e) => {
                  if (sorter.key === columnSchema.key && sorter.direction === 'descend') {
                    props.setSorter({ key: null, direction: null });
                  } else {
                    props.setSorter({
                      key: columnSchema.key,
                      direction: 'descend',
                    });
                  }
                  return preventEvent(e);
                }, [columnSchema.key, sorter])}
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
  );
};

export default HeaderCellSorter;
