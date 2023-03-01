/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import './index.less';

import RcTooltip from 'rc-tooltip';
import { type TooltipProps as RcTooltipProps } from 'rc-tooltip/lib/Tooltip';
import React from 'react';

export interface TooltipProps extends Omit<RcTooltipProps, 'overlay'> {
  title?: React.ReactNode;
  overlay?: RcTooltipProps['overlay'];
}

const prefixCls = 'jfe-drip-table-rc-tooltip';

const Tooltip = React.memo(({ title, ...props }: TooltipProps) => (
  <RcTooltip
    {...props}
    prefixCls={prefixCls}
    transitionName="jfe-drip-table-motion-zoom-big"
    overlay={
      title
        ? (
          <div className={`${prefixCls}-inner-content`}>
            <div className={`${prefixCls}-inner-content__title`}>{ title }</div>
            <div className={`${prefixCls}-inner-content__body`}>{ props.overlay }</div>
          </div>
        )
        : props.overlay ?? ''
    }
    arrowContent={<span className={`${prefixCls}-arrow-content`} />}
  />
));

export default Tooltip;
