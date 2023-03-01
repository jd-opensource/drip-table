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

export interface AlertProps {
  icon?: React.ReactNode;
  message?: string | React.ReactNode;
  showIcon?: boolean;
  type?: 'success' | 'info' | 'warning' | 'error';
}
const prefixCls = 'jfe-drip-table-rc-alert';
const Alert = React.memo((props: AlertProps) => {
  const icon = React.useMemo(() => {
    if (props.icon) {
      return props.icon;
    }
    if (props.type === 'info' || !props.type) {
      return <span role="img" className={`${prefixCls}-icon`} aria-label="info-circle"><svg viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" /></svg></span>;
    }
    if (props.type === 'success') {
      return <span role="img" className={`${prefixCls}-icon`} aria-label="check-circle"><svg viewBox="64 64 896 896" focusable="false" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" /></svg></span>;
    }
    if (props.type === 'warning') {
      return <span role="img" className={`${prefixCls}-icon`} aria-label="exclamation-circle"><svg viewBox="64 64 896 896" focusable="false" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" /></svg></span>;
    }
    if (props.type === 'error') {
      return <span role="img" className={`${prefixCls}-icon`} aria-label="close-circle"><svg viewBox="64 64 896 896" focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" /></svg></span>;
    }
    return null;
  }, [props.type, props.icon]);
  return (
    <div className={classNames(prefixCls, {
      [`${prefixCls}-info`]: !props.type || props.type === 'info',
      [`${prefixCls}-success`]: props.type === 'success',
      [`${prefixCls}-warning`]: props.type === 'warning',
      [`${prefixCls}-error`]: props.type === 'error',
    })}
    >
      { props.showIcon && icon }
      <div className={`${prefixCls}-content`}><div className={`${prefixCls}-message`}>{ props.message }</div></div>
    </div>
  );
});

export default Alert;
