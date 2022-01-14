import { DripTableDriver, DripTableRecordTypeBase } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import { createContext } from 'react';

import { DripTableGeneratorProps } from '@/typing';

export const Ctx = createContext<DripTableGeneratorProps>({
  dataSource: [],
  // TODO 由于antd版本不匹配导致类型对不上，暂且先as后续再改类型
  driver: DripTableDriverAntDesign as unknown as DripTableDriver<DripTableRecordTypeBase>,
});
