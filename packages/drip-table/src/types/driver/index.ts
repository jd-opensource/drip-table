/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import React from 'react';

import { DripTableReactComponent } from './component';
import { DripTableDriverTable } from './table';

export { DripTableReactComponent, DripTableReactComponentProps } from './component';

export interface DripTableDriver {
  /**
   * 组件库
   */
  components: {
    Alert: DripTableReactComponent<{
      action?: React.ReactNode;
      afterClose?: () => void;
      banner?: boolean;
      closable?: boolean;
      description?: string | React.ReactNode;
      icon?: React.ReactNode;
      message?: string | React.ReactNode;
      showIcon?: boolean;
      type?: 'success' | 'info' | 'warning' | 'error';
      onClose?: (e: MouseEvent) => void;
    }>;
    Col: DripTableReactComponent<{
      className?: string;
      style?: React.CSSProperties;
      span?: number;
    }>;
    Dropdown: DripTableReactComponent<{
      className?: string;
      trigger?: ('click' | 'hover' | 'contextMenu')[];
      overlay: React.ReactElement | (() => React.ReactElement);
      visible?: boolean;
      placement?: 'bottom' | 'bottomLeft' | 'bottomRight' | 'top' | 'topLeft' | 'topRight';
      onVisibleChange?: (visible: boolean) => void;
    }>;
    Image: DripTableReactComponent<{
      width?: number;
      height?: number;
      src?: string;
      preview?: boolean;
      fallback?: string;
    }>;
    Input: {
      Search: DripTableReactComponent<{
        style?: React.CSSProperties;
        allowClear?: boolean;
        placeholder?: string;
        enterButton?: string | true;
        size?: 'large' | 'middle' | 'small';
        value?: string;
        onChange?: React.ChangeEventHandler<HTMLInputElement>;
        onSearch?: (value: string) => void;
      }>;
    };
    Menu: DripTableReactComponent<{
      onClick?: (data: { key: React.Key; keyPath: React.Key[]; domEvent: MouseEvent }) => void;
    }> & {
      Item: DripTableReactComponent<{
        key: React.Key;
        icon?: JSX.Element;
        disabled?: boolean;
      }>;
    };
    Popover: DripTableReactComponent<{
      placement?: 'top';
      trigger?: 'click' | 'hover' | 'focus';
      title?: string;
      content?: React.ReactNode;
    }>;
    Result: DripTableReactComponent<{
      status?: 'error';
      title?: string;
      extra?: string;
    }>;
    Row: DripTableReactComponent<{
      style?: React.CSSProperties;
      className?: string;
      gutter?: number | [number, number] | { xs: number; sm: number; md: number };
      justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
      align?: 'top' | 'middle' | 'bottom';
      wrap?: boolean;
    }>;
    Spin: DripTableReactComponent<{
      delay?: number;
      size?: 'small' | 'default' | 'large';
      tip?: React.ReactNode;
      spinning?: boolean;
      wrapperClassName?: string;
    }>;
    Table: DripTableDriverTable;
    Tag: DripTableReactComponent<{
      style?: React.CSSProperties;
      color?: string;
    }>;
    Tooltip: DripTableReactComponent<{
      title: React.ReactNode | (() => React.ReactNode);
      placement?: 'top';
    }>;
    Typography: {
      Text: DripTableReactComponent<{
        style?: React.CSSProperties;
        ellipsis?: boolean;
        copyable?: boolean | {
          text?: string;
          onCopy?: () => void;
        };
      }>;
    };
  };
}
