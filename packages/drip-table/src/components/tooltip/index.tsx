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

export interface TooltipProps extends RcTooltipProps {}

const Tooltip = React.memo(({ ...props }: TooltipProps) => (
  <RcTooltip
    {...props}
    prefixCls="jfe-drip-table-tooltip"
    transitionName="jfe-drip-table-motion-zoom-big"
    overlay={<div className="jfe-drip-table-tooltip-inner-content">{ props.overlay }</div>}
    arrowContent={<span className="jfe-drip-table-tooltip-arrow-content" />}
  />
));

export default Tooltip;
