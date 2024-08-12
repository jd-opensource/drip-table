import React from 'react';

import type { MenuProps } from './index';

/**
 * !!! IMPORTANT !!!
 * This context is ONLY used for Dropdown component. DO NOT use this in your production.
 */

// Used for Dropdown only
export interface OverrideContextValue {
  prefixCls?: string;
  expandIcon?: React.ReactNode;
  mode?: MenuProps['mode'];
  selectable?: boolean;
  onClick?: () => void;
}

const OverrideContext = React.createContext<OverrideContextValue | null>(null);

export function OverrideProvider(
  props: Parameters<React.FC<OverrideContextValue & { children: React.ReactNode }>>[0],
) {
  const { children, ...restProps } = props;
  const override = React.useContext(OverrideContext);

  const context = React.useMemo<OverrideContextValue>(
    () => ({ ...override, ...restProps }),
    [
      override,
      restProps.prefixCls,
      // restProps.expandIcon, Not mark as deps since this is a ReactNode
      restProps.mode,
      restProps.selectable,
    ],
  );

  return <OverrideContext.Provider value={context}>{ children }</OverrideContext.Provider>;
}

export default OverrideContext;
