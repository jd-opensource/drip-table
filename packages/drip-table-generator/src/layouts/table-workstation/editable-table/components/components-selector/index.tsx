/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import { Button, Input, message } from 'antd';
import { DripTableExtraOptions, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, ExtractDripTableExtraOption } from 'drip-table';
import React from 'react';

import { filterAttributes, mockId } from '@/utils';
import { DTGTableConfig, TableConfigsContext } from '@/context/table-configs';
import { getComponentsConfigs, getGroups, getSchemaValue } from '@/layouts/utils';
import { DripTableComponentAttrConfig, DripTableGeneratorProps } from '@/typing';

import Selector from './selector';

interface ComponentsSelectorProps<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  tableId: string;
  showTitle?: boolean;
  showFilter?: boolean;
  customComponentPanel: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'] | undefined;
  customColumnAddPanel?: DripTableGeneratorProps<RecordType, ExtraOptions>['customColumnAddPanel'];
  open?: boolean;
  onClose: () => void;
  customColumns?: (columns: DTGTableConfig['columns'], newColumn: DTGTableConfig['columns'][number]) => DTGTableConfig['columns'];
  onConfirm?: (columns: DTGTableConfig['columns'][number], tableIndex: number) => void;
  onColumnAdded?: DripTableGeneratorProps<RecordType, ExtraOptions>['onColumnAdded'];
}

const getColumnSchemaByComponent = (component: DripTableComponentAttrConfig, title: string) => {
  const options: Record<string, unknown> = {};
  const additionalProps = {};
  component?.attrSchema.forEach((schema) => {
    if (schema.name.startsWith('options.')) {
      options[schema.name.replace('options.', '')] = schema.default;
    } else if (schema.name.startsWith('ui:props.')) {
      options[schema.name.replace('ui:props.', '')] = schema.default;
    } else if (!schema.name.startsWith('style') && !schema.name.startsWith('titleStyle')) {
      additionalProps[schema.name] = schema.default;
    }
  });
  if (component['ui:type'] === 'group') {
    options.items = [null, null];
  }
  if (component['ui:type'] === 'icon') {
    options.icon = 'HomeOutlined';
  }
  const columnSchema: DTGTableConfig['columns'][number] = {
    ...filterAttributes(additionalProps, ['dataIndexMode', 'title']),
    key: `${component['ui:type']}_${mockId()}`,
    dataIndex: '',
    title: title ?? component.title,
    width: void 0,
    component: component['ui:type'] as 'text',
    options,
  };
  return columnSchema;
};

function ComponentsSelector<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: ComponentsSelectorProps<RecordType, ExtraOptions>) {
  const [groups, setGroups] = React.useState(getGroups(props.customComponentPanel));
  const [components, setComponents] = React.useState(getComponentsConfigs('', props.customComponentPanel, 'ComponentsSelector'));
  const [title, setTitle] = React.useState('');
  const [componentConfig, setComponentConfig] = React.useState(void 0 as DripTableComponentAttrConfig | undefined);
  const [popoverConfig, setPopoverConfig] = React.useState(void 0 as DripTableComponentAttrConfig | undefined);
  const [contentConfig, setContentConfig] = React.useState(void 0 as DripTableComponentAttrConfig | undefined);

  const initStates = React.useCallback(() => {
    setTitle('');
    setComponentConfig(void 0);
    setGroups(getGroups(props.customComponentPanel));
    setComponents(getComponentsConfigs('', props.customComponentPanel, 'ComponentsSelector'));
  }, []);

  React.useEffect(() => {
    if (!props.open) { initStates(); }
  }, [props.open]);

  return (
    <TableConfigsContext.Consumer>
      {({ tableConfigs, setTableColumns }) => (props.customColumnAddPanel
        ? props.customColumnAddPanel({
          tableConfig: tableConfigs.find(c => c.tableId === props.tableId),
          components,
        })
        : (
          <div className="jfe-drip-table-generator-components-bar-wrapper" onClick={e => e.stopPropagation()}>
            {props.showTitle && (
              <div className="jfe-drip-table-generator-components-bar-navigation">
                <Input
                  className="jfe-drip-table-generator-components-bar-no-border"
                  placeholder="输入列名"
                  value={title}
                  onChange={(e) => { setTitle(e.target.value); }}
                />
              </div>
            )}
            <Selector
              showFilter={props.showFilter}
              openPanel
              value={componentConfig?.['ui:type']}
              options={components.map(item => ({
                label: item.title,
                value: item['ui:type'],
                group: item.group,
                icon: item.icon,
              }))}
              groups={groups}
              onChange={(value) => {
                const component = components.find(item => item['ui:type'] === value);
                setComponentConfig(component);
              }}
            />
            {componentConfig?.['ui:type'] === 'popover' && (
              <React.Fragment>
                <div className="jfe-drip-table-generator-components-bar-sub-component-title">浮窗组件</div>
                <Selector
                  showFilter={props.showFilter}
                  floatPanel
                  value={popoverConfig?.['ui:type']}
                  options={components.filter(item => item['ui:type'] !== 'popover').map(item => ({
                    label: item.title,
                    value: item['ui:type'],
                    group: item.group,
                    icon: item.icon,
                  }))}
                  groups={groups}
                  onChange={(value) => {
                    const component = components.find(item => item['ui:type'] === value);
                    setPopoverConfig(component);
                  }}
                />
              </React.Fragment>
            )}
            {componentConfig?.['ui:type'] === 'popover' && (
              <React.Fragment>
                <div className="jfe-drip-table-generator-components-bar-sub-component-title">单元格内组件</div>
                <Selector
                  showFilter={props.showFilter}
                  floatPanel
                  value={contentConfig?.['ui:type']}
                  options={components.filter(item => item['ui:type'] !== 'popover').map(item => ({
                    label: item.title,
                    value: item['ui:type'],
                    group: item.group,
                    icon: item.icon,
                  }))}
                  groups={groups}
                  onChange={(value) => {
                    const component = components.find(item => item['ui:type'] === value);
                    setContentConfig(component);
                  }}
                />
              </React.Fragment>

            )}
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
                    let column = getColumnSchemaByComponent(componentConfig, props.showTitle ? title : '');
                    if (column.component === 'popover') {
                      if (popoverConfig && contentConfig) {
                        const popover = getColumnSchemaByComponent(popoverConfig, '');
                        const content = getColumnSchemaByComponent(contentConfig, '');
                        column = {
                          ...column,
                          options: {
                            ...column.options,
                            popover,
                            content,
                          },
                        };
                      } else {
                        message.error('浮窗组件需要优先设置浮窗展示所需组件，请先选择好组件再确认');
                        return;
                      }
                    }
                    if (props.onConfirm) {
                      props.onConfirm(column, tableIndex);
                    } else {
                      const lastSortableColumnIndex = tableConfigs[tableIndex].columns.map(item => !!item.fixed).lastIndexOf(false);
                      let columns = [...tableConfigs[tableIndex].columns];
                      let columnIndex = columns.length - 1;
                      if (props.customColumns) {
                        columns = props.customColumns(tableConfigs[tableIndex].columns, column);
                        columnIndex = columns.findIndex(item => item.key === column.key);
                      } else if (lastSortableColumnIndex < columns.length - 1) {
                        columns.splice(lastSortableColumnIndex + 1, 0, column);
                        columnIndex = lastSortableColumnIndex + 1;
                      } else {
                        columns = [...tableConfigs[tableIndex].columns, column];
                        columnIndex += 1;
                      }
                      setTableColumns(columns, tableIndex, (configs) => {
                        props.onColumnAdded?.(column, getSchemaValue(configs), columnIndex);
                      });
                    }
                    initStates();
                    props.onClose();
                  }
                }}
              >
                确认
              </Button>
            </div>
          </div>
        ))}
    </TableConfigsContext.Consumer>

  );
}

export default ComponentsSelector;
