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
  children: React.ReactNode;
  spinning?: boolean;
}

const Indicator = () => (
  <div>
    <div className={classNames('jfe-drip-table-spin', 'jfe-drip-table-spin-spinning')}>
      <span className={classNames('jfe-drip-table-spin-dot', 'jfe-drip-table-spin-dot-spin')}>
        <i className="jfe-drip-table-spin-dot-item" />
        <i className="jfe-drip-table-spin-dot-item" />
        <i className="jfe-drip-table-spin-dot-item" />
        <i className="jfe-drip-table-spin-dot-item" />
      </span>
    </div>
  </div>
);

const Spin = React.memo(({ ...props }: SpinProps) => (
  <div className="jfe-drip-table-spin-nested-loading">
    { props.spinning && <Indicator /> }
    <div className={classNames('jfe-drip-table-spin-container', { 'jfe-drip-table-spin-blur': props.spinning })}>
      { props.children }
    </div>
  </div>
));

export default Spin;
