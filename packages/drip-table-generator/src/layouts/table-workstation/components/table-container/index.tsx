/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import './index.less';

import { PicLeftOutlined, SettingOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Dropdown, Tooltip } from 'antd';
import classNames from 'classnames';
import React from 'react';

import { mockId } from '@/utils';
import { DripTableGeneratorContext, GeneratorContext } from '@/context';
import { DTGTableConfig, TableConfigsContext } from '@/context/table-configs';

export interface TableContainerProps {
  tableConfig: DTGTableConfig;
  children: React.ReactNode;
}

interface SubTableSettingProps {
  tableConfig: DTGTableConfig;
  label: string;
}

const SubTableSetting = (props: SubTableSettingProps) => {
  const context = React.useContext(GeneratorContext);
  const tableContext = React.useContext(TableConfigsContext);
  const dataFields = React.useMemo(() => {
    if (context.previewDataSource.length <= 0) {
      return [];
    }
    let fields = Object.keys(context.previewDataSource[0]).filter(key => Array.isArray(context.previewDataSource[0][key]));
    const currentTableIndex = tableContext.tableConfigs.findIndex(item => item.tableId === context.currentTableID);
    if (currentTableIndex > 0) {
      try {
        let dataSource = context.previewDataSource[0];
        for (let i = 1; i <= currentTableIndex; i++) {
          const subKey = tableContext.tableConfigs[i].dataSourceKey;
          dataSource = dataSource?.[subKey]?.[0] as DripTableGeneratorContext['previewDataSource'][number];
        }
        if (dataSource) {
          fields = Object.keys(dataSource).filter(key => Array.isArray(dataSource[key]));
        }
      } catch {}
    }
    return fields;
  }, [context.previewDataSource, context.currentTableID, tableContext.tableConfigs]);

  return (
    <TableConfigsContext.Consumer>
      { ({ tableConfigs, updateTableConfig, updateTableConfigs }) => {
        const currentTableIndex = tableConfigs.findIndex(item => item.tableId === context.currentTableID);
        return (
          <div className="jfe-drip-table-generator-table-container-setting">
            <div style={{ display: 'flex' }}>
              <div style={{ lineHeight: '32px', width: 72, marginRight: 6 }}>{ props.label }</div>
              <div>
                <AutoComplete
                  allowClear
                  style={{ width: 200 }}
                  disabled={!props.tableConfig || !context.currentTableID}
                  value={tableConfigs[currentTableIndex + 1]?.dataSourceKey}
                  options={dataFields.map(item => ({ label: item, value: item }))}
                  onChange={(value) => {
                    if (!props.tableConfig || !context.currentTableID) { return; }
                    const newTableConfigs = [...tableConfigs];
                    newTableConfigs[currentTableIndex] = Object.assign({}, tableConfigs[currentTableIndex], { hasSubTable: !!value });
                    if (value) {
                      const newConfig: DTGTableConfig = {
                        tableId: mockId(),
                        columns: [],
                        configs: { pagination: false },
                        hasSubTable: false,
                        dataSourceKey: value,
                      };
                      newTableConfigs[currentTableIndex + 1] = newConfig;
                      updateTableConfigs(newTableConfigs);
                    } else if (currentTableIndex < tableConfigs.length - 1) {
                      newTableConfigs.splice(currentTableIndex + 1, 1);
                      updateTableConfigs(newTableConfigs);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        );
      } }
    </TableConfigsContext.Consumer>
  );
};

const TableContainer = (props: TableContainerProps) => (
  <GeneratorContext.Consumer>
    { ({ currentTableID, setState }) => (
      <div
        className={classNames('jfe-drip-table-generator-table-container-wrapper', {
          checked: currentTableID === props.tableConfig.tableId,
        })}
        onClick={(e) => {
          e.stopPropagation();
          setState({ currentTableID: props.tableConfig.tableId, currentColumnID: void 0, currentComponentID: void 0, currentComponentPath: [] });
        }}
      >
        { currentTableID === props.tableConfig.tableId && (
        <div className="jfe-drip-table-generator-table-container-tools">
          <span className="jfe-drip-table-generator-table-container-tool">{ props.tableConfig.tableId }</span>
          <div className="jfe-drip-table-generator-table-container-tool" style={{ marginLeft: '2px', padding: '0 4px' }}>
            <Tooltip title="打开当前表格配置面板">
              <Button
                size="small"
                ghost
                className="jfe-drip-table-generator-table-container-inner-button"
                icon={<SettingOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  setState({
                    currentTableID: props.tableConfig.tableId,
                    drawerType: 'table',
                  });
                }}
              >
                配置
              </Button>
            </Tooltip>
            <Dropdown
              placement="bottomRight"
              trigger={['click']}
              dropdownRender={() => <SubTableSetting label="子表格字段" tableConfig={props.tableConfig} />}
            >
              <Tooltip title="添加字段用以配置子表格">
                <Button
                  size="small"
                  ghost
                  className="jfe-drip-table-generator-table-container-inner-button"
                  icon={<PicLeftOutlined />}
                  onClick={e => e.stopPropagation()}
                >
                  子表格
                </Button>
              </Tooltip>
            </Dropdown>
          </div>
        </div>
        ) }
        { props.children }
      </div>
    ) }
  </GeneratorContext.Consumer>
);

export default TableContainer;
