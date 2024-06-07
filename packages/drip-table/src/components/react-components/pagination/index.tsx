/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import './index.less';

import classNames from 'classnames';
import RcPagination, { PaginationProps as RcPaginationProps } from 'rc-pagination';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { parseCSS, stringifyCSS } from '@/utils/dom';

import Select from '../select';
import MiniSelect from './mini-select';

const prefixCls = 'jfe-drip-table-rc-pagination';
const selectPrefixCls = 'jfe-drip-table-rc-select';

export interface PaginationProps extends RcPaginationProps {
  align?: 'left' | 'center' | 'right';
  size?: 'small' | 'default';
  style?: React.CSSProperties;
  pageNumberStyle?: React.CSSProperties;
  pageStepperStyle?: React.CSSProperties;
  pageSelectorStyle?: React.CSSProperties;
}

const Pagination = React.memo((props: PaginationProps) => {
  const componentId = React.useMemo(() => uuidv4(), []);
  return (
    <React.Fragment>
      <style>
        { `.${prefixCls}--id-${componentId} > .${prefixCls}-item{${stringifyCSS(parseCSS(props.pageNumberStyle as Record<string, string>))}}` }
        { `.${prefixCls}--id-${componentId} > .${prefixCls}-options > .${selectPrefixCls} > .${selectPrefixCls}-selector{${stringifyCSS(parseCSS(props.pageSelectorStyle as Record<string, string>))}}` }
      </style>
      <RcPagination
        {...props}
        style={props.style}
        prefixCls={prefixCls}
        className={classNames(`${prefixCls}--id-${componentId}`, {
          [`${prefixCls}--mini`]: props.size === 'small',
          [`${prefixCls}--left`]: props.align === 'left',
          [`${prefixCls}--center`]: props.align === 'center',
          [`${prefixCls}--right`]: props.align === void 0 || props.align === 'right',
        })}
        prevIcon={(
          <button className={`${prefixCls}-item-link`} style={props.pageStepperStyle} type="button" tabIndex={-1}>
            <span role="img" aria-label="left" className={`${prefixCls}-jump-prev__icon`}>
              <svg viewBox="64 64 896 896" focusable="false" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" />
              </svg>
            </span>
          </button>
        )}
        nextIcon={(
          <button className={`${prefixCls}-item-link`} style={props.pageStepperStyle} type="button" tabIndex={-1}>
            <span role="img" aria-label="right" className={`${prefixCls}-jump-next__icon`}>
              <svg viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" />
              </svg>
            </span>
          </button>
        )}
        jumpPrevIcon={(
          <a className={`${prefixCls}-item-link`}>
            <div className={`${prefixCls}-item-container`}>
              <span role="img" aria-label="double-left" className={`${prefixCls}-item-link-icon`}>
                <svg viewBox="64 64 896 896" focusable="false" data-icon="double-left" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                  <path d="M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z" />
                </svg>
              </span>
              <span className={`${prefixCls}-item-ellipsis`}>•••</span>
            </div>
          </a>
        )}
        jumpNextIcon={(
          <a className={`${prefixCls}-item-link`}>
            <div className={`${prefixCls}-item-container`}>
              <span role="img" aria-label="double-right" className={`${prefixCls}-item-link-icon`}>
                <svg viewBox="64 64 896 896" focusable="false" data-icon="double-right" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                  <path d="M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 00188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 00492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z" />
                </svg>
              </span>
              <span className={`${prefixCls}-item-ellipsis`}>•••</span>
            </div>
          </a>
        )}
        selectPrefixCls={selectPrefixCls}
        selectComponentClass={props.size === 'small' ? MiniSelect : Select}
      />
    </React.Fragment>
  );
});

export default Pagination;
