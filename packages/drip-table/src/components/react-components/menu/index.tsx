/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import './index.less';

import RcMenu from 'rc-menu';
import React from 'react';

import MenuContext, { MenuContextValue } from './context';
import OverrideContext from './override';

const PREFIX_CLS = 'jfe-drip-table-rc-menu';

export interface MenuItemProps extends React.ComponentProps<typeof RcMenu['Item']> {
  icon?: React.ReactNode;
}
const MenuItem = React.memo((props: MenuItemProps) => {
  const context = React.useContext(MenuContext);
  return (
    <React.Fragment>
      <RcMenu.Item {...props}>
        <span className={`${context.prefixCls}-item-icon`}>
          { props.icon }
        </span>
        <span className={`${context.prefixCls}-title-content`}>{ props.children }</span>
      </RcMenu.Item>
    </React.Fragment>
  );
});

export interface MenuProps extends React.ComponentProps<typeof RcMenu> {
}
const Menu = Object.assign(
  {
    Item: MenuItem,
    ItemGroup: RcMenu.ItemGroup,
  },
  React.memo((props: MenuProps) => {
    const override = React.useContext(OverrideContext);
    const prefixCls = React.useMemo(() => override?.prefixCls || PREFIX_CLS, [override?.prefixCls]);
    const menuContext = React.useMemo<MenuContextValue>(() => ({
      prefixCls,
    }), [prefixCls]);
    return (
      <MenuContext.Provider value={menuContext}>
        <RcMenu
          prefixCls={prefixCls}
          items={props.items}
          expandIcon={props.expandIcon ?? override?.expandIcon}
          mode={props.mode ?? override?.mode}
          selectable={props.selectable ?? override?.selectable}
          onClick={props.onClick ?? override?.onClick}
        >
          { props.children }
        </RcMenu>
      </MenuContext.Provider>
    );
  }),
);

export default Menu;
