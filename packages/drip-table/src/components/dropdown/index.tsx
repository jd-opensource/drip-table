/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import './index.less';

import RcDropdown from 'rc-dropdown';
import React from 'react';

import { OverrideProvider } from '../menu/override';

export interface DropdownProps extends React.ComponentProps<typeof RcDropdown> {
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  overlay: React.ReactElement | (() => React.ReactElement);
  visible?: boolean;
  placement?: 'bottom' | 'bottomLeft' | 'bottomRight' | 'top' | 'topLeft' | 'topRight';
  onVisibleChange?: (visible: boolean) => void;
}
const prefixCls = 'jfe-drip-table-dropdown';
const Dropdown = Object.assign(
  {},
  RcDropdown,
  React.memo((props: DropdownProps) => (
    <OverrideProvider
      prefixCls={`${prefixCls}-menu`}
      expandIcon={(
        <span className={`${prefixCls}-menu-submenu-arrow`}>
          <span role="img" aria-label="right" className={`${prefixCls}-menu-submenu-arrow-icon`}>
            <svg viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true">
              <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" />
            </svg>
          </span>
        </span>
    )}
      mode="vertical"
      selectable={false}
    >
      <RcDropdown
        prefixCls={prefixCls}
        trigger={props.trigger}
        transitionName="jfe-drip-table-motion-slide-up"
        overlay={props.overlay}
        visible={props.visible}
        placement={props.placement}
        onVisibleChange={props.onVisibleChange}
      >
        { props.children }
      </RcDropdown>
    </OverrideProvider>
  )),
);

export default Dropdown;
