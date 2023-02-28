/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import React from 'react';

import { DripTableReactComponent } from './component';

export { DripTableReactComponent, DripTableReactComponentProps } from './component';

export interface DripTableDriver {
  /**
   * 组件库
   */
  components: {
    Col: DripTableReactComponent<{
      className?: string;
      style?: React.CSSProperties;
      span?: number;
    }>;
    Image: DripTableReactComponent<{
      width?: number;
      height?: number;
      src?: string;
      preview?: boolean;
      fallback?: string;
    }>;
    Row: DripTableReactComponent<{
      style?: React.CSSProperties;
      className?: string;
      gutter?: number | [number, number] | { xs: number; sm: number; md: number };
      justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
      align?: 'top' | 'middle' | 'bottom';
      wrap?: boolean;
    }>;
  };
}
