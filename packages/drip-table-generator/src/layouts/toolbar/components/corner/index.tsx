/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import classNames from 'classnames';
import React from 'react';

export interface CornerProps {
  size?: number;
  style?: React.CSSProperties;
  position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
}
function Corner(props: CornerProps) {
  return (
    <div
      className="jfe-drip-table-generator-corner-background"
      style={{ ...props.style, width: props.size || 10, height: props.size || 10 }}
    >
      <div
        className={classNames('jfe-drip-table-generator-corner-front', props.position)}
        style={{ width: 2 * (props.size || 10), height: 2 * (props.size || 10) }}
      />
    </div>
  );
}

export default Corner;
