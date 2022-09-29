/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classNames from 'classnames';
import { DripTableExtraOptions, DripTableRecordTypeBase } from 'drip-table';
import React from 'react';

import { GeneratorContext } from '@/context';
import { DripTableGeneratorProps } from '@/typing';

import ComponentConfigForm from './component-configs';
import ComponentItemConfigForm from './component-item-config';
import DataSourceEditor from './datasource';
import GlobalConfigForm from './global-configs';

import styles from './index.module.less';

const AttributesLayout = <
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
>(props: DripTableGeneratorProps<RecordType, ExtraOptions>) => {
  const body = React.useRef<HTMLDivElement>(null);
  const drawerTitleMapper = {
    datasource: '数据源配置',
    global: '全局配置',
    column: '组件配置',
    'column-item': '子组件配置',
  };

  const drawerWidth = {
    datasource: 680,
    global: 560,
    column: 560,
    'column-item': 560,
  };

  return (
    <GeneratorContext.Consumer>
      { ({ drawerType, currentColumn, currentColumnPath, setState }) => {
        const isGroupColumn = currentColumn && currentColumn.component === 'group';
        return (
          <div
            className={classNames(styles['attributes-drawer'], {
              [styles['attributes-drawer-fixed']]: props.rightLayoutMode !== 'drawer' && drawerType && drawerType !== 'datasource',
            })}
            style={{
              width: drawerType ? drawerWidth[drawerType] : void 0,
              transform: drawerType ? 'translateX(0)' : void 0,
              opacity: drawerType ? 1 : 0,
              zIndex: drawerType ? void 0 : -1,
            }}
          >
            <div className={styles['attributes-drawer-header']}>
              <Button icon={<CloseOutlined />} type="text" onClick={() => setState({ drawerType: void 0 })} />
              <span>{ drawerType ? drawerTitleMapper[drawerType] : '' }</span>
            </div>
            <div className={styles['attributes-drawer-body']} ref={body}>
              {
              drawerType === 'datasource' && (
              <DataSourceEditor
                width={(drawerWidth[drawerType] || 0)}
                height={(body.current?.offsetHeight || 0)}
              />
              )
            }
              {
              drawerType === 'global' && (
                <GlobalConfigForm
                  customAttributeComponents={props.customAttributeComponents}
                  customGlobalConfigPanel={props.customGlobalConfigPanel}
                  driver={props.driver}
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
                  driver={props.driver}
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
                  driver={props.driver}
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
