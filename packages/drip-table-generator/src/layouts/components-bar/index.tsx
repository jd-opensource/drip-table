/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import { Button } from 'antd';
import { DripTableExtraOptions } from 'drip-table';
import React from 'react';

import { mockId } from '@/utils';
import Icon from '@/components/Icon';
import { DripTableColumn, DripTableGeneratorContext, GeneratorContext } from '@/context';
import components from '@/table-components';
import { DataSourceTypeAbbr, DripTableComponentAttrConfig, DripTableGeneratorProps, DTGComponentPropertySchema } from '@/typing';

import { getComponents, getGroups } from '../utils';
import { defaultComponentIcon } from './configs';

interface ComponentsBarProps<
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  customComponentPanel: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'] | undefined;
  mockDataSource: DripTableGeneratorProps<RecordType, ExtraOptions>['mockDataSource'];
  dataFields: DripTableGeneratorProps<RecordType, ExtraOptions>['dataFields'];
}

const ComponentsBar = <
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: ComponentsBarProps<RecordType, ExtraOptions>) => {
  const context = React.useContext(GeneratorContext);

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
          ? Object.keys(context.previewDataSource[0] || {}).map(key => ({ label: key, value: key }))
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
              ? Object.keys(context.previewDataSource[0] || {}).map(key => ({ label: key, value: key }))
              : props.dataFields?.map(key => ({ label: key, value: key })) || [];
          }
        });
      }
    });
    return columnConfig;
  };

  const initComponentColumnSchema = (component: DripTableComponentAttrConfig) => {
    const configs = getColumnConfigs(component['ui:type']);
    const options: Record<string, unknown> = {};
    const additionalProps = {};
    configs?.attrSchema.forEach((schema) => {
      if (schema.name.startsWith('options.')) {
        options[schema.name.replace('options.', '')] = schema.default;
      } else if (!schema.name.startsWith('style') && !schema.name.startsWith('titleStyle')) {
        additionalProps[schema.name] = schema.default;
      }
    });
    if (component['ui:type'] === 'group') {
      options.items = [null, null];
    }
    const columnSchema: DripTableColumn = {
      key: `${component['ui:type']}_${mockId()}`,
      dataIndex: '',
      title: component.title,
      width: void 0,
      description: '',
      component: component['ui:type'] as 'text',
      options,
      innerIndexForGenerator: context.columns.length,
      ...additionalProps,
    };
    return columnSchema;
  };

  const addComponentToColumn = (
    component: DripTableComponentAttrConfig,
    setState: DripTableGeneratorContext['setState'],
  ) => {
    const columnSchema = initComponentColumnSchema(component);
    setState({ columnToAdd: columnSchema });
  };

  return (
    <GeneratorContext.Consumer>
      { ({ columns, setState }) => (
        <div className="jfe-drip-table-generator-components-bar-components-container">
          <div className="jfe-drip-table-generator-components-bar-components-navigator">
            {
            getGroups(props.customComponentPanel).map((groupName, groupIndex) => (
              <div key={groupIndex}>
                <div className="jfe-drip-table-generator-components-bar-component-title">{ groupName.length > 6 ? groupName.replace(/组件$/u, '') : groupName }</div>
                {
                  getComponents(groupName, props.customComponentPanel).map((component, index) => (
                    <Button
                      type="text"
                      className="jfe-drip-table-generator-components-bar-component-title-item"
                      draggable
                      onDragStart={() => addComponentToColumn(component, setState)}
                      onDragEnd={() => setState({ columnToAdd: void 0 })}
                      onClick={() => {
                        const columnSchema = initComponentColumnSchema(component);
                        setState({ columns: [...columns, columnSchema] });
                      }}
                    >
                      <Icon className="jfe-drip-table-generator-components-bar-component-icon" svg={component.icon || defaultComponentIcon} />
                      <span className="jfe-drip-table-generator-components-bar-component-text">{ component.title.length > 5 ? component.title.replace(/组件$/u, '') : component.title }</span>
                    </Button>
                  ))
                }
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
