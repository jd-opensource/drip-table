/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import './index.less';

import { SettingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
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
        { currentTableID === props.tableConfig.tableId && (
        <div className="jfe-drip-table-generator-table-container-tools">
          <span className="jfe-drip-table-generator-table-container-tool">{ props.tableConfig.tableId }</span>
          <div className="jfe-drip-table-generator-table-container-tool" style={{ marginLeft: '2px', padding: '0 4px' }}>
            <Button
              title="打开配置面板"
              size="small"
              type="primary"
              icon={<SettingOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                setState({
                  currentTableID: props.tableConfig.tableId,
                  drawerType: 'table',
                });
              }}
            />
          </div>
        </div>
        ) }
        { props.children }
      </div>
    ) }
  </GeneratorContext.Consumer>
);

export default TableContainer;
