/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Estherjing(qichudegensui@163.com)
 * @modifier : Estherjing(qichudegensui@163.com)
 * @copyright: Copyright (c) 2022 JD Network Technology Co., Ltd.
 */
import classNames from 'classnames';
import RcInputNumber, { InputNumberProps as RcInputNumberProps } from 'rc-input-number';
import React from 'react';

import styles from './index.module.less';

export type SizeType = 'small' | 'middle' | 'large' | undefined;

type ValueType = string | number;

export interface InputNumberProps<T extends ValueType = ValueType>
  extends Omit<RcInputNumberProps<T>, 'prefix' | 'size'> {
  prefixCls?: string;
  bordered?: boolean;
  size?: 'large' | 'middle' | 'small';
}
const prefixCls = 'jfe-drip-table-input-number';

const InputNumber = React.memo(({ ...props }: InputNumberProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const {
    className,
    bordered = true,
    readOnly,
    size,
    ...others
  } = props;

  const inputNumberClass = classNames(
    {
      [styles[`${prefixCls}-readonly`]]: readOnly,
      [styles[`${prefixCls}-borderless`]]: !bordered,
      [styles[`${prefixCls}-lg`]]: size === 'large',
      [styles[`${prefixCls}-sm`]]: size === 'small',
    },
    className,
  );

  return (
    <RcInputNumber
      prefixCls={prefixCls}
      ref={inputRef}
      className={inputNumberClass}
      readOnly={readOnly}
      upHandler={(
        <span role="img" aria-label="up" className={styles[`${prefixCls}-handler-up-inner`]}><svg viewBox="64 64 896 896" focusable="false" data-icon="up" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z" /></svg></span>
      )}
      downHandler={(
        <span role="img" aria-label="down" className={styles[`${prefixCls}-handler-down-inner`]}><svg viewBox="64 64 896 896" focusable="false" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" /></svg></span>
      )}
      {...others}
    />
  );
});

export default InputNumber;
