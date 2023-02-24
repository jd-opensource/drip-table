import { createContext } from 'react';

export interface MenuContextValue {
  prefixCls: string;
}

const MenuContext = createContext<MenuContextValue>({
  prefixCls: '',
});

export default MenuContext;
