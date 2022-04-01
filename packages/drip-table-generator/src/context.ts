import DripTableDriverAntDesign from 'drip-table-driver-antd';
import { createContext } from 'react';

export const Ctx = createContext({
  driver: DripTableDriverAntDesign,
});
