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

export interface RowProps {
  style?: React.CSSProperties;
  className?: string;
  gutter?: [number, number];
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  align?: 'top' | 'middle' | 'bottom';
  wrap?: boolean;
  children?: React.ReactNode;
}

const prefixCls = 'jfe-drip-table-rc-row';

const Row = React.memo(({ ...props }: RowProps) => {
  const style = React.useMemo(
    () => {
      const st = Object.assign({}, props.style);
      if (props.gutter) {
        st.margin = `${props.gutter[0]}px ${props.gutter[1]}px ${props.gutter[0]}px ${props.gutter[1]}px`;
      }
      if (props.justify) {
        st.justifyContent = props.justify;
      }
      if (props.align) {
        if (props.align === 'top') {
          st.alignItems = 'flex-start';
        } else if (props.align === 'middle') {
          st.alignItems = 'center';
        } else if (props.align === 'bottom') {
          st.alignItems = 'flex-end';
        }
      }
      if (props.wrap) {
        st.flexWrap = 'wrap';
      }
      return st;
    },
    [props.style, props.gutter, props.justify, props.align, props.wrap],
  );
  return (
    <div className={classNames(prefixCls, props.className)} style={style}>
      { props.children }
    </div>
  );
});

export default Row;
