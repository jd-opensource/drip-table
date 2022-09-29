/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { DripTableExtraOptions, DripTableRecordTypeBase } from 'drip-table';
import React from 'react';

import { mockId } from '@/utils';
import Icon from '@/components/Icon';
import { DripTableColumn, DripTableGeneratorContext, GeneratorContext } from '@/context';
import components from '@/table-components';
import { DripTableComponentAttrConfig, DripTableGeneratorProps, DTGComponentPropertySchema } from '@/typing';

import { getComponents, getGroups } from '../utils';
import { defaultComponentIcon } from './configs';

import styles from './index.module.less';

interface ComponentsBarProps<
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
> {
  customComponentPanel: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'] | undefined;
  mockDataSource: DripTableGeneratorProps<RecordType, ExtraOptions>['mockDataSource'];
  dataFields: DripTableGeneratorProps<RecordType, ExtraOptions>['dataFields'];
}

const ComponentsBar = <
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
>(props: ComponentsBarProps<RecordType, ExtraOptions>) => {
  const [collapsed, setCollapsed] = React.useState(true);
  const { columns, previewDataSource } = React.useContext(GeneratorContext);

  const getAllComponentsConfigs = () => {
    let componentsToUse = components;
    if (props.customComponentPanel) {
      const customComponents = props.customComponentPanel.configs;
      componentsToUse = props.customComponentPanel.mode === 'add' ? [...components, ...customComponents] : [...customComponents];
    }
    return [...componentsToUse];
  };

  const getColumnConfigs = (componentType: string) => {
    const columnConfig = getAllComponentsConfigs().find(schema => schema['ui:type'] === componentType);
    columnConfig?.attrSchema.forEach((schema) => {
      const uiProps = schema['ui:props'];
      if (!uiProps) {
        return;
      }
      if (uiProps.optionsParam === '$$FIELD_KEY_OPTIONS$$') {
        uiProps.options = props.mockDataSource
          ? Object.keys(previewDataSource[0] || {}).map(key => ({ label: key, value: key }))
          : props.dataFields?.map(key => ({ label: key, value: key })) || [];
      }
      if (uiProps.items) {
        (uiProps.items as DTGComponentPropertySchema[])?.forEach((item, index) => {
          const itemUiProps = item['ui:props'];
          if (!itemUiProps) {
            return;
          }
          if (itemUiProps.optionsParam === '$$FIELD_KEY_OPTIONS$$') {
            itemUiProps.options = props.mockDataSource
              ? Object.keys(previewDataSource[0] || {}).map(key => ({ label: key, value: key }))
              : props.dataFields?.map(key => ({ label: key, value: key })) || [];
          }
        });
      }
    });
    return columnConfig;
  };

  const addComponentToColumn = (component: DripTableComponentAttrConfig, setState: DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>['setState']) => {
    const configs = getColumnConfigs(component['ui:type']);
    const options: Record<string, unknown> = {};
    const additionalProps = {};
    configs?.attrSchema.forEach((schema) => {
      if (schema.name.startsWith('options.')) {
        options[schema.name.replace('options.', '')] = schema.default;
      } else {
        additionalProps[schema.name] = schema.default;
      }
    });
    if (component['ui:type'] === 'group') {
      options.items = [null, null];
    }
    const columnSchema: DripTableColumn<ExtraOptions['CustomColumnSchema']> = {
      key: `${component['ui:type']}_${mockId()}`,
      dataIndex: '',
      title: component.title,
      width: void 0,
      description: '',
      component: component['ui:type'] as 'text',
      options,
      index: columns.length,
      ...additionalProps,
    };
    setState({ columnToAdd: columnSchema });
  };

  return (
    <GeneratorContext.Consumer>
      { ({ setState }) => (
        <div className={styles['components-container']}>
          <div className={styles['components-navigator']}>
            <div className={styles['component-title']}>组件库</div>
            <Button className={styles['component-button']} onClick={() => setCollapsed(!collapsed)} type="text">
              { collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> }
            </Button>
            {
            getGroups(props.customComponentPanel).map((groupName, groupIndex) => (
              <div key={groupIndex}>
                <div className={styles['component-title']}>{ groupName.replace(/组件$/u, '') }</div>
                {
                  getComponents(groupName, props.customComponentPanel).map((component, index) => (
                    <Tooltip title={component.title} key={index} placement="right">
                      <Button
                        draggable
                        onDragStart={() => addComponentToColumn(component, setState)}
                        onDragEnd={() => setState({ columnToAdd: void 0 })}
                        type="text"
                        className={styles['component-button']}
                      >
                        <Icon className={styles['component-icon']} svg={component.icon || defaultComponentIcon} />
                      </Button>
                    </Tooltip>
                  ))
                }
              </div>
            ))
          }
          </div>
          <div className={styles['components-drawer']} style={{ transform: collapsed ? 'translateX(-360px)' : void 0 }}>
            {
            getGroups(props.customComponentPanel).map((groupName, groupIndex) => (
              <div key={groupIndex}>
                <div className={styles['component-title']}>{ groupName }</div>
                <div className={styles['component-group']}>
                  {
                    getComponents(groupName, props.customComponentPanel).map((component, index) => (
                      <Button
                        key={index}
                        type="primary"
                        size="small"
                        style={{ height: 32, minWidth: 108 }}
                        draggable
                        onDragEnd={() => {
                          setCollapsed(!collapsed);
                          setState({ columnToAdd: void 0 });
                        }}
                        onDragStart={() => addComponentToColumn(component, setState)}
                      >
                        <Icon className={styles['component-icon']} svg={component.icon || defaultComponentIcon} />
                        { component.title }
                      </Button>
                    ))
                  }
                </div>
              </div>
            ))
          }
          </div>
        </div>
      ) }
    </GeneratorContext.Consumer>

  );
};

export default ComponentsBar;
