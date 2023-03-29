/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import React from 'react';

import { GeneratorTableConfigsContext } from '@/context/table-configs';

const TableWorkStation = () => {
  const context = React.useContext(GeneratorTableConfigsContext);
  return (
    <div>
      { ' ' }
      { context.currentTableID }
      { ' ' }
      { JSON.stringify(context.tableConfigs) }
    </div>
  );
};

export default TableWorkStation;
