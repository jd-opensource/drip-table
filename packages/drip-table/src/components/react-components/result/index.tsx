/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import './index.less';

import React from 'react';

export interface ResultProps {
  status: 'error';
  title: React.ReactNode;
  extra?: React.ReactNode;
}

const prefixCls = 'jfe-drip-table-rc-result';

const Result = React.memo((props: ResultProps) => {
  const icon = React.useMemo(() => {
    if (props.status === 'error') {
      return (
        <span role="img" aria-label="close-circle" className={`${prefixCls}-icon__icon`}>
          <svg viewBox="64 64 896 896" focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" />
          </svg>
        </span>
      );
    }
    if (props.status === 'info') {
      return (
        <span role="img" aria-label="exclamation-circle" className={`${prefixCls}-icon__icon`}>
          <svg viewBox="64 64 896 896" focusable="false" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" />
          </svg>
        </span>
      );
    }
    if (props.status === 'warning') {
      return (
        <span role="img" aria-label="warning" className={`${prefixCls}-icon__icon`}>
          <svg viewBox="64 64 896 896" focusable="false" data-icon="warning" width="1em" height="1em" fill="currentColor" aria-hidden="true">
            <path d="M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" />
          </svg>
        </span>
      );
    }
    return null;
  }, [props.status]);
  return (
    <div className={`${prefixCls} ${prefixCls}-error`}>
      <div className={`${prefixCls}-icon`}>
        { icon }
      </div>
      <div className={`${prefixCls}-title`}>{ props.title }</div>
      <div className={`${prefixCls}-extra`}>{ props.extra }</div>
    </div>
  );
});

export default Result;
