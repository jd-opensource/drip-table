import { createContext } from 'react';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import { DripTableGeneratorProps } from '@/typing';

export const Ctx = createContext<DripTableGeneratorProps>({
  dataSource: [],
  driver: DripTableDriverAntDesign,
});
