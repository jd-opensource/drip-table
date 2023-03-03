/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import './index.less';

import classNames from 'classnames';
import RcInput from 'rc-input';
import React from 'react';

import Button from '../button';

const PREFIX_CLS = 'jfe-drip-table-rc-input';

export interface InputSearchProps extends React.ComponentProps<typeof RcInput> {
  style?: React.CSSProperties;
  allowClear?: boolean;
  placeholder?: string;
  enterButton?: string | true;
  size?: 'large' | 'middle' | 'small';
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSearch?: (value: string) => void;
}
const InputSearch = React.memo((props: InputSearchProps) => {
  const [value, setValue] = React.useState(props.value || '');

  const onChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {
    setValue(e.target.value);
    props.onChange?.(e);
  }, [props.onChange]);

  const onSearch = React.useCallback(() => {
    props.onSearch?.(value);
  }, [props.onSearch]);

  const addonAfter = React.useMemo(() => (props.enterButton
    ? (
      <Button className={`${PREFIX_CLS}-search-button`} size={props.size} type="primary" onClick={onSearch}>
        {
        typeof props.enterButton === 'string'
          ? props.enterButton
          : (
            <span role="img" aria-label="search" style={{ verticalAlign: '-0.125em' }}>
              <svg viewBox="64 64 896 896" focusable="false" data-icon="search" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
              </svg>
            </span>
          )
      }
      </Button>
    )
    : null), [props.enterButton, onSearch]);

  React.useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  return (
    <React.Fragment>
      <RcInput
        prefixCls={PREFIX_CLS}
        className={classNames(`${PREFIX_CLS}-search`, {
          [`${PREFIX_CLS}-search-with-button`]: props.enterButton,
          [`${PREFIX_CLS}-large`]: props.size === 'large',
          [`${PREFIX_CLS}-middle`]: props.size === 'middle',
          [`${PREFIX_CLS}-small`]: props.size === 'small',
        })}
        style={props.style}
        allowClear={props.allowClear
          ? {
            clearIcon: (
              <span role="img" aria-label="close-circle" className={`${PREFIX_CLS}-clear-icon__icon`} style={{ verticalAlign: '-0.125em' }}>
                <svg viewBox="64 64 896 896" focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                  <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" />
                </svg>
              </span>
            ),
          }
          : false}
        placeholder={props.placeholder}
        addonAfter={addonAfter}
        value={value}
        onChange={onChange}
        onPressEnter={onSearch}
      />
    </React.Fragment>
  );
});

export interface InputProps extends React.ComponentProps<typeof RcInput> {
}
const Input = Object.assign(
  {
    Search: InputSearch,
  },
  React.memo((props: InputProps) => (
    <RcInput
      prefixCls={PREFIX_CLS}
      {...props}
    >
      { props.children }
    </RcInput>
  )),
);

export default Input;
