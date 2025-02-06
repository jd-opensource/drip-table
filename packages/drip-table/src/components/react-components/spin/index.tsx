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

export interface SpinProps {
  children?: React.ReactNode;
  spinning?: boolean;
  tip?: string;
  className?: string;
  innerClassName?: string;
}

const prefixCls = 'jfe-drip-table-rc-spin';

function Indicator() {
  return (
    <div>
      <div className={classNames(prefixCls, `${prefixCls}-spinning`)}>
        <span className={classNames(`${prefixCls}-dot`, `${prefixCls}-dot-spin`)}>
          <i className={`${prefixCls}-dot-item`} />
          <i className={`${prefixCls}-dot-item`} />
          <i className={`${prefixCls}-dot-item`} />
          <i className={`${prefixCls}-dot-item`} />
        </span>
      </div>
    </div>
  );
}

const Spin = React.memo(({ ...props }: SpinProps) => (
  <div className={classNames(`${prefixCls}-nested-loading`, props.className)}>
    { props.spinning && <Indicator /> }
    <div className={classNames(`${prefixCls}-container`, props.innerClassName, { [`${prefixCls}-blur`]: props.spinning })}>
      { props.tip }
      { props.children }
    </div>
  </div>
));

export default Spin;
