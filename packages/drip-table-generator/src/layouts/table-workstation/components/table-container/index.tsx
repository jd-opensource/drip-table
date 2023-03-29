/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import './index.less';

import React from 'react';

export interface TableContainerProps {

  children: React.ReactNode;
}
const TableContainer = props => (
  <div>
    { props.children }
  </div>
);

export default TableContainer;
