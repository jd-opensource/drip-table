/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select } from 'antd';
import { DripTableExtraOptions } from 'drip-table';
import React from 'react';

import { mockId } from '@/utils';
import Icon from '@/components/Icon';
import { DTGTableConfig, TableConfigsContext } from '@/context/table-configs';
import { getComponentsConfigs, getGroups } from '@/layouts/utils';
import { DataSourceTypeAbbr, DripTableComponentAttrConfig, DripTableGeneratorProps } from '@/typing';

import { defaultComponentIcon } from './configs';

interface ComponentsSelectorProps<
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>{
  tableId: string;
  showTitle?: boolean;
  showFilter?: boolean;
  customComponentPanel: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'] | undefined;
  open?: boolean;
  onClose: () => void;
  onConfirm?: (columns: DTGTableConfig['columns'], newColumn: DTGTableConfig['columns'][number]) => DTGTableConfig['columns'];
}

const getColumnSchemaByComponent = (component: DripTableComponentAttrConfig, title: string) => {
  const options: Record<string, unknown> = {};
  const additionalProps = {};
  component?.attrSchema.forEach((schema) => {
    if (schema.name.startsWith('options.')) {
      options[schema.name.replace('options.', '')] = schema.default;
    } else if (!schema.name.startsWith('style') && !schema.name.startsWith('titleStyle')) {
      additionalProps[schema.name] = schema.default;
    }
  });
  if (component['ui:type'] === 'group') {
    options.items = [null, null];
  }
  const columnSchema: DTGTableConfig['columns'][number] = {
    ...additionalProps,
    key: `${component['ui:type']}_${mockId()}`,
    dataIndex: '',
    title: title ?? component.title,
    width: void 0,
    component: component['ui:type'] as 'text',
    options,
  };
  return columnSchema;
};

const ComponentsSelector = <
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: ComponentsSelectorProps<RecordType, ExtraOptions>) => {
  const [keyword, setKeyWord] = React.useState('');
  const [groups, setGroups] = React.useState(getGroups(props.customComponentPanel));
  const [components, setComponents] = React.useState(getComponentsConfigs('', props.customComponentPanel));
  const [title, setTitle] = React.useState('');
  const [componentConfig, setComponentConfig] = React.useState(void 0 as DripTableComponentAttrConfig | undefined);

  const initStates = React.useCallback(() => {
    setKeyWord('');
    setTitle('');
    setComponentConfig(void 0);
    setGroups(getGroups(props.customComponentPanel));
    setComponents(getComponentsConfigs('', props.customComponentPanel));
  }, []);

  React.useEffect(() => {
    if (!props.open) { initStates(); }
  }, [props.open]);

  return (
    <TableConfigsContext.Consumer>
      { ({ tableConfigs, setTableColumns }) => (
        <div className="jfe-drip-table-generator-components-bar-wrapper" onClick={e => e.stopPropagation()}>
          { props.showTitle && (
            <div className="jfe-drip-table-generator-components-bar-navigation">
              <Input
                className="jfe-drip-table-generator-components-bar-no-border"
                placeholder="输入列名"
                value={title}
                onChange={(e) => { setTitle(e.target.value); }}
              />
            </div>
          ) }
          { componentConfig
            ? (
              <div className="jfe-drip-table-generator-components-bar-navigation" style={{ marginTop: 8 }}>
                <Select
                  className="jfe-drip-table-generator-components-bar-no-border"
                  value={componentConfig['ui:type']}
                  options={[{ label: componentConfig.title, value: componentConfig['ui:type'] }]}
                  onFocus={() => { setComponentConfig(void 0); }}
                />
              </div>
            )
            : (
              <div className="jfe-drip-table-generator-components-bar-navigation" style={{ marginTop: 8 }}>
                { props.showFilter && (
                <div>
                  <Input
                    className="jfe-drip-table-generator-components-bar-no-border"
                    prefix={<SearchOutlined />}
                    allowClear
                    placeholder="输入组件名搜索"
                    value={keyword}
                    onChange={(e) => {
                      setKeyWord(e.target.value);
                      let componentConfigs = getComponentsConfigs('', props.customComponentPanel);
                      let groupsToUse = getGroups(props.customComponentPanel);
                      if (e.target.value) {
                        componentConfigs = componentConfigs.filter(item => item.title.includes(e.target.value));
                        groupsToUse = componentConfigs.map(item => item.group);
                      }
                      setComponents(componentConfigs);
                      setGroups(groupsToUse);
                    }}
                  />
                </div>
                ) }
                <div className="jfe-drip-table-generator-components-bar-components-list">
                  {
                groups.map((groupName, groupIndex) => (
                  <div key={groupIndex}>
                    <div className="jfe-drip-table-generator-components-bar-component-title">
                      { groupName }
                    </div>
                    {
                      components.filter(item => item.group === groupName).map((component, index) => (
                        <Button
                          key={index}
                          type="text"
                          className="jfe-drip-table-generator-components-bar-component-title-item"
                          onClick={(e) => { setComponentConfig(component); }}
                        >
                          <Icon className="jfe-drip-table-generator-components-bar-component-icon" svg={component.icon || defaultComponentIcon} />
                          <span className="jfe-drip-table-generator-components-bar-component-text">{ component.title }</span>
                        </Button>
                      ))
                    }
                  </div>
                ))
              }
                </div>
              </div>
            ) }

          <div className="jfe-drip-table-generator-components-bar-actions">
            <Button
              style={{ marginRight: 12 }}
              onClick={() => {
                initStates();
                props.onClose();
              }}
            >
              取消
            </Button>
            <Button
              disabled={!componentConfig}
              type="primary"
              onClick={() => {
                const tableIndex = tableConfigs.findIndex(item => item.tableId === props.tableId);
                if (componentConfig && tableIndex > -1) {
                  const column = getColumnSchemaByComponent(componentConfig, title);
                  const columns = props.onConfirm ? props.onConfirm(tableConfigs[tableIndex].columns, column) : [...tableConfigs[tableIndex].columns, column];
                  setTableColumns(columns, tableIndex);
                  initStates();
                  props.onClose();
                }
              }}
            >
              确认
            </Button>
          </div>
        </div>
      ) }
    </TableConfigsContext.Consumer>

  );
};

export default ComponentsSelector;
