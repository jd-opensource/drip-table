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
    Button: DripTableReactComponent<{
      style?: React.CSSProperties;
      className?: string;
      type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
      shape?: 'circle' | 'round';
      size?: 'large' | 'middle' | 'small';
      danger?: boolean;
      ghost?: boolean;
      icon?: React.ReactNode;
      onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    }>;
    Col: DripTableReactComponent<{
      className?: string;
      style?: React.CSSProperties;
      span?: number;
    }>;
    ConfigProvider: DripTableReactComponent<Record<string, unknown>>;
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
      gutter?: number | [number, number] | { xs: number; sm: number; md: number };
      justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
      align?: 'top' | 'middle' | 'bottom';
      wrap?: boolean;
    }>;
    Select: (
      <VT extends string | number | (string | number)[]>(props: React.PropsWithChildren<{
        className?: string;
        style?: React.CSSProperties;
        defaultValue?: string | number;
        mode?: 'multiple' | 'tags';
        bordered?: boolean;
        placeholder?: string;
        placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
        size?: 'large' | 'middle' | 'small';
        showSearch?: boolean;
        disabled?: boolean;
        loading?: boolean;
        allowClear?: boolean;
        value?: VT;
        onChange?: (value: VT) => void;
      }>) => React.ReactElement | null
    )
    & {
      Option: DripTableReactComponent<Record<string, unknown> & { value: string | number; children: React.ReactNode }>;
    };
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
    message: {
      success: (message: string) => void;
    };
  };
  /**
   * 图标库
   */
  icons: {
    CheckOutlined: DripTableReactComponent<unknown>;
    DownOutlined: DripTableReactComponent<unknown>;
    PlusOutlined: DripTableReactComponent<unknown>;
    QuestionCircleOutlined: DripTableReactComponent<unknown>;
  };
  /**
   * 组件本地化翻译
   */
  locale: unknown;
}
