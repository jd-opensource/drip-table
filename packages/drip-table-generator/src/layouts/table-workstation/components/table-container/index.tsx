/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import './index.less';

import React from 'react';

import { DTGTableConfig } from '@/context/table-configs';

export interface TableContainerProps {
  tableConfig: DTGTableConfig;
  children: React.ReactNode;
}
const TableContainer = (props: TableContainerProps) => (
  <div style={{ border: '1px dashed #1970ff' }}>
    { props.tableConfig.tableId }
    { props.children }
  </div>
);

export default TableContainer;
