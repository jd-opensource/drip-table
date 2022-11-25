/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { Result } from 'antd';
import { DripTableExtraOptions, DripTableRecordTypeBase } from 'drip-table';
import React from 'react';

import { filterAttributes } from '@/utils';
import CustomForm from '@/components/CustomForm';
import { DripTableGeneratorContext, GeneratorContext } from '@/context';
import { getColumnItemByPath, updateColumnItemByPath } from '@/layouts/table-workstation/utils';
import components from '@/table-components';
import { DripTableGeneratorProps, DTGComponentPropertySchema } from '@/typing';

import styles from './index.module.less';

interface ComponentItemConfigFormProps<
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
> {
  customAttributeComponents: DripTableGeneratorProps<RecordType, ExtraOptions>['customAttributeComponents'];
  customComponentPanel: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'];
  driver: DripTableGeneratorProps<RecordType, ExtraOptions>['driver'];
  dataFields: DripTableGeneratorProps<RecordType, ExtraOptions>['dataFields'];
  mockDataSource: DripTableGeneratorProps<RecordType, ExtraOptions>['mockDataSource'];
}

const errorBoundary = (message?: string) => (
  <Result
    className={styles.result}
    icon={<ExclamationCircleTwoTone />}
    title={<div style={{ color: '#999' }}>{ message }</div>}
  />
);

const ComponentItemConfigForm = <
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
>(props: ComponentItemConfigFormProps<RecordType, ExtraOptions>) => {
  const { previewDataSource } = React.useContext(GeneratorContext);

  const getComponents = () => {
    let componentsToUse = components;
    if (props.customComponentPanel) {
      const customComponents = props.customComponentPanel.configs;
      componentsToUse = props.customComponentPanel.mode === 'add' ? [...components, ...customComponents] : [...customComponents];
    }
    return [...componentsToUse];
  };

  const getColumnConfigs = (componentType: string) => {
    const columnConfig = getComponents().find(schema => schema['ui:type'] === componentType);
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

  const encodeColumnConfigs = (
    formData: { [key: string]: unknown },
    column: DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>['currentColumn'],
  ): DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>['currentColumn'] => {
    const uiProps: Record<string, unknown> = {};
    const dataProps = {};
    Object.keys(formData).forEach((key) => {
      if (key.startsWith('options.')) {
        uiProps[key.replace('options.', '')] = formData[key];
      } else if (key.startsWith('ui:props.')) {
        uiProps[key.replace('ui:props.', '')] = formData[key];
      } else {
        dataProps[key] = formData[key];
      }
    });
    if (column?.component === 'group') {
      const length = (uiProps.layout as number[])?.reduce((p, v) => p + v, 0) || 0;
      uiProps.items = Array.from({ length }, _ => null);
      if (column.options.items) {
        (column.options.items as Record<string, unknown>[])
          .slice(0, length)
          .forEach((item, i) => { (uiProps.items as Record<string, unknown>[])[i] = item; });
      }
    }
    return {
      ...filterAttributes(dataProps, [
        'options',
        'component',
        'ui:props',
        'ui:type',
        'type',
        'name',
        'dataIndex',
        'title',
        'width',
        'group',
      ]),
      key: column?.key ?? '',
      index: column?.index ?? 0,
      dataIndex: formData.dataIndex as string | string[],
      title: formData.title as string,
      width: formData.width as string,
      component: column?.component ?? '',
      options: uiProps,
    } as DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>['currentColumn'];
  };
  return (
    <GeneratorContext.Consumer>
      { ({ columns, currentColumn, currentColumnPath, setState }) => {
        const currentColumnItem = getColumnItemByPath(currentColumn, currentColumnPath || []);
        if (!currentColumnItem || !currentColumn) {
          return errorBoundary('请点击选择要编辑的组件');
        }
        const columnConfig = getColumnConfigs(currentColumnItem?.component);
        return (
          <CustomForm<DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>['currentColumn']>
            primaryKey="key"
            configs={columnConfig ? columnConfig.attrSchema || [] : []}
            data={currentColumnItem}
            encodeData={formData => encodeColumnConfigs(formData, currentColumnItem)}
            extendKeys={['ui:props', 'options']}
            extraComponents={props.customAttributeComponents}
            groupType="collapse"
            theme={props.driver}
            onChange={(data) => {
              const columnSchema = Object.assign({}, currentColumnItem, data);
              updateColumnItemByPath(currentColumn, currentColumnPath || [], columnSchema);
              const index = columns.findIndex(item => item.key === currentColumn.key);
              columns[index] = Object.assign({}, currentColumn);
              setState({
                currentColumn,
                columns: [...columns],
              });
            }}
          />
        );
      } }
    </GeneratorContext.Consumer>
  );
};

export default ComponentItemConfigForm;
