/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import RcTooltip from 'rc-tooltip';
import { type TooltipProps as RcTooltipProps } from 'rc-tooltip/lib/Tooltip';
import React from 'react';

import styles from './index.module.less';

export interface TooltipProps extends RcTooltipProps {}

const Tooltip = React.memo(({ ...props }: TooltipProps) => (
  <RcTooltip
    {...props}
    prefixCls="jfe-drip-table-tooltip"
    transitionName="jfe-drip-table-motion-zoom-big"
    overlay={<div className={styles['jfe-drip-table-tooltip-inner-content']}>{ props.overlay }</div>}
    arrowContent={<span className={styles['jfe-drip-table-tooltip-arrow-content']} />}
  />
));

export default Tooltip;
