import { DripTableRecordTypeBase } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import { createContext } from 'react';

import { DripTableGeneratorProps } from '@/typing';

export const Ctx = createContext<DripTableGeneratorProps<DripTableRecordTypeBase>>({
  dataSource: [],
  driver: DripTableDriverAntDesign,
});
