/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import './index.less';

import classNames from 'classnames';
import RcSwitch from 'rc-switch';
import React from 'react';

type RcSwitchProps = React.ComponentProps<typeof RcSwitch>;

export interface SwitchProps extends RcSwitchProps {}

const prefixCls = 'jfe-drip-table-rc-switch';

const Checkbox = React.memo(({ ...props }: SwitchProps) => (
  <label className={classNames(`${prefixCls}-wrapper`, `${prefixCls}-wrapper-checked`)}>
    <RcSwitch
      {...props}
      prefixCls={prefixCls}
    />
  </label>
));

export default Checkbox;
