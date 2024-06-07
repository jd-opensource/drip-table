/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import './index.less';

import isEqual from 'lodash/isEqual';
import React from 'react';

import { preventEvent } from '@/components/cell-components/utils';
import Checkbox from '@/components/react-components/checkbox';
import Tooltip from '@/components/react-components/tooltip';
import { type IDripTableContext } from '@/hooks';
import { type DripTableColumnSchema } from '@/index';

const prefixCls = 'jfe-drip-table-layout-table-column-header-cell-toolbox-filters';

export interface HeaderCellFilterProps {
  columnSchema: DripTableColumnSchema;
  filter: IDripTableContext['state']['filters'][string];
  setFilter: (filter: IDripTableContext['state']['filters'][string]) => void;
}

const HeaderCellFilter = (props: HeaderCellFilterProps) => {
  const { filter, columnSchema } = props;
  const [filterDisplay, setFilterDisplay] = React.useState<NonNullable<HeaderCellFilterProps['filter']>>(props.filter || []);
  return (
    <Tooltip
      placement="bottom"
      trigger="click"
      overlay={(
        <div className={`${prefixCls}`} onClick={preventEvent}>
          <ul className={`${prefixCls}-list`}>
            {
              columnSchema.filters?.map((f, i) => {
                const checked = filterDisplay?.includes(f.value);
                return (
                  <li
                    key={i}
                    className={`${prefixCls}-item`}
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
                    <span className={`${prefixCls}-item-content`}>
                      <Checkbox key={i} checked={checked} />
                      <span className={`${prefixCls}-item-content-text`}>{ f.text }</span>
                    </span>
                  </li>
                );
              })
            }
          </ul>
          <div className={`${prefixCls}-btns`}>
            <button
              type="button"
              className={`${prefixCls}-btn-reset`}
              disabled={isEqual(filter || [], filterDisplay)}
              onClick={() => {
                setFilterDisplay(filter || []);
              }}
            >
              <span>重置</span>
            </button>
            <button
              type="button"
              className={`${prefixCls}-btn-sure`}
              onClick={() => {
                props.setFilter(filterDisplay);
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
      <div className={`${prefixCls}-icon`} onClick={preventEvent}>
        <span role="img" aria-label="filter" className={`${prefixCls}-icon-filter`}>
          <svg viewBox="64 64 896 896" focusable="false" data-icon="filter" width="1em" height="1em" fill="currentColor" aria-hidden="true">
            <path d="M349 838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V642H349v196zm531.1-684H143.9c-24.5 0-39.8 26.7-27.5 48l221.3 376h348.8l221.3-376c12.1-21.3-3.2-48-27.7-48z" />
          </svg>
        </span>
      </div>
    </Tooltip>
  );
};

export default HeaderCellFilter;
