/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import './index.less';

import classNames from 'classnames';
import React from 'react';

import { GeneratorContext } from '@/context';
import { DTGTableConfig } from '@/context/table-configs';

export interface TableContainerProps {
  tableConfig: DTGTableConfig;
  children: React.ReactNode;
}
const TableContainer = (props: TableContainerProps) => (
  <GeneratorContext.Consumer>
    { ({ currentTableID, setState }) => (
      <div
        className={classNames('jfe-drip-table-generator-table-container-wrapper', {
          checked: currentTableID === props.tableConfig.tableId,
        })}
        onClick={() => {
          setState({ currentTableID: props.tableConfig.tableId });
        }}
      >
        <div className="jfe-drip-table-generator-table-container-tools">
          <span>{ props.tableConfig.tableId }</span>
        </div>
        { props.children }
      </div>
    ) }
  </GeneratorContext.Consumer>
);

export default TableContainer;
