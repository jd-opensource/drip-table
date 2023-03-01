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

export interface TagProps {
  style?: React.CSSProperties;
  className?: string;
  color?: string;
  children?: React.ReactNode;
}
const prefixCls = 'jfe-drip-table-rc-tag';
const Tag = React.memo((props: TagProps) => {
  const color = React.useMemo(
    () => {
      if (props.color?.match(/^[a-z-]+$/u)) {
        return { style: props.color, className: `${prefixCls}-color-${props.color}` };
      }
      return { style: props.color, className: '' };
    },
    [props.color],
  );
  return (
    <span
      style={Object.assign({ color: color.style }, props.style)}
      className={classNames(`${prefixCls}`, props.className, color.className, {
        [`${prefixCls}-has-color`]: props.color,
      })}
    >
      { props.children }
    </span>
  );
});

export default Tag;
