/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import './index.less';

import classNames from 'classnames';
import RcCheckbox, { Props as RcCheckboxProps } from 'rc-checkbox';
import React from 'react';

export interface CheckboxProps extends RcCheckboxProps {
  label?: string;
}

const prefixCls = 'jfe-drip-table-rc-checkbox';

const Checkbox = React.memo(({ ...props }: CheckboxProps) => (
  <label className={classNames(`${prefixCls}-wrapper`, `${prefixCls}-wrapper-checked`)}>
    <RcCheckbox
      {...props}
      prefixCls={prefixCls}
    />
    { props.label && <span className={classNames(`${prefixCls}-label`)}>{ props.label }</span> }
  </label>
));

export default Checkbox;
