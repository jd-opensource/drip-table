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

export interface ColProps {
  className?: string;
  style?: React.CSSProperties;
  span?: number;
  children?: React.ReactNode;
}

const prefixCls = 'jfe-drip-table-rc-col';

const Col = React.memo(({ ...props }: ColProps) => {
  const style = React.useMemo(
    () => {
      const st = Object.assign({}, props.style);
      if (props.span) {
        st.flexBasis = `${Math.floor((props.span / 24) * 100) / 100}%`;
      }
      return st;
    },
    [props.style, props.span],
  );
  return (
    <div className={classNames(prefixCls, props.className)} style={style}>
      { props.children }
    </div>
  );
});

export default Col;
