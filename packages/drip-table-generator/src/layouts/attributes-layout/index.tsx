/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import './index.less';

import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classNames from 'classnames';
import { DripTableExtraOptions } from 'drip-table';
import React from 'react';

import { GeneratorContext } from '@/context';
import { TableConfigsContext } from '@/context/table-configs';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

import { getComponentsConfigs } from '../utils';
import ComponentConfigForm from './component-configs';
import ComponentItemConfigForm from './component-item-config';
import GlobalConfigForm from './global-configs';
import { getColumnItemByPath } from './utils';

const AttributesLayout = <
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: DripTableGeneratorProps<RecordType, ExtraOptions>) => {
  const body = React.useRef<HTMLDivElement>(null);
  const { tableConfigs } = React.useContext(TableConfigsContext);
  const drawerTitleMapper = {
    table: '表格配置',
    column: '组件配置',
    'column-item': '子组件配置',
  };

  const getComponentName = (componentType: string) => {
    const componentConfigs = getComponentsConfigs('', props.customComponentPanel);
    const componentConfig = componentConfigs.find(item => item['ui:type'] === componentType);
    return componentConfig?.title ?? '未知组件';
  };

  return (
    <GeneratorContext.Consumer>
      { ({ currentTableID, currentColumnID, currentComponentPath, drawerType, setState }) => {
        const currentTable = tableConfigs.find(item => item.tableId === currentTableID);
        const currentColumn = currentTable?.columns.find(item => item.key === currentColumnID);
        const isGroupColumn = currentColumn && currentColumn.component === 'group';
        const currentColumnItem = isGroupColumn && currentComponentPath ? getColumnItemByPath(currentColumn, currentComponentPath) : void 0;
        return (
          <div
            className={classNames('jfe-drip-table-generator-attributes-layout-attributes-drawer')}
            style={{
              width: drawerType ? 420 : void 0,
              zIndex: drawerType ? void 0 : -1,
              opacity: drawerType ? 1 : 0,
            }}
          >
            <div className="jfe-drip-table-generator-attributes-layout-attributes-drawer-header">
              <Button icon={<CloseOutlined />} type="text" onClick={() => setState({ drawerType: void 0, currentColumnID: drawerType === 'column' ? void 0 : currentColumn?.key })} />
              <span className="jfe-drip-table-generator-attributes-layout-title">{ drawerType ? drawerTitleMapper[drawerType] : '' }</span>
              { drawerType === 'column'
                ? (
                  <span className="jfe-drip-table-generator-attributes-layout-component-title">
                    组件 &gt;
                    { ' ' }
                    { getComponentName(currentColumn?.component || '') }
                  </span>
                )
                : null }
              { drawerType === 'column-item'
                ? (
                  <span className="jfe-drip-table-generator-attributes-layout-component-title">
                    { currentColumnItem ? `子组件 > ${getComponentName(currentColumnItem?.component)}` : '' }
                  </span>
                )
                : null }
              { drawerType === 'table'
                ? (
                  <span className="jfe-drip-table-generator-attributes-layout-component-title">
                    表格ID：
                    { currentTableID }
                  </span>
                )
                : null }
            </div>
            <div className="jfe-drip-table-generator-attributes-layout-attributes-drawer-body" ref={body}>
              {
                drawerType === 'table' && (
                  <GlobalConfigForm
                    customAttributeComponents={props.customAttributeComponents}
                    customGlobalConfigPanel={props.customGlobalConfigPanel}
                    slots={props.slots}
                    slotsSchema={props.slotsSchema}
                  />
                )
              }
              {
                drawerType === 'column' && (
                  <ComponentConfigForm
                    customAttributeComponents={props.customAttributeComponents}
                    customComponentPanel={props.customComponentPanel}
                    dataFields={props.dataFields}
                    mockDataSource={props.mockDataSource}
                  />
                )
              }
              {
                drawerType === 'column-item' && isGroupColumn && (
                  <ComponentItemConfigForm
                    customAttributeComponents={props.customAttributeComponents}
                    customComponentPanel={props.customComponentPanel}
                    icons={props.icons}
                    dataFields={props.dataFields}
                    mockDataSource={props.mockDataSource}
                  />
                )
              }
            </div>
          </div>
        );
      } }
    </GeneratorContext.Consumer>
  );
};

export default AttributesLayout;
