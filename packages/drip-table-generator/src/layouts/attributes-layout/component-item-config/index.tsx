/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { Result } from 'antd';
import { DripTableExtraOptions } from 'drip-table';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';

import { filterAttributes } from '@/utils';
import CustomForm from '@/components/CustomForm';
import { GeneratorContext } from '@/context';
import { DTGTableConfig, TableConfigsContext } from '@/context/table-configs';
import { getColumnItemConfigs, getComponentsConfigs } from '@/layouts/utils';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

import { getColumnItemByPath, updateColumnItemByPath } from '../utils';

interface ComponentItemConfigFormProps<
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  customAttributeComponents: DripTableGeneratorProps<RecordType, ExtraOptions>['customAttributeComponents'];
  customComponentPanel: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'];
  icons: DripTableGeneratorProps<RecordType, ExtraOptions>['icons'];
  dataFields: DripTableGeneratorProps<RecordType, ExtraOptions>['dataFields'];
  mockDataSource: DripTableGeneratorProps<RecordType, ExtraOptions>['mockDataSource'];
}

const errorBoundary = (message?: string) => (
  <Result
    className="jfe-drip-table-generator-component-item-config-result"
    icon={<ExclamationCircleTwoTone />}
    title={<div style={{ color: '#999' }}>{ message }</div>}
  />
);

const ComponentItemConfigForm = <
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: ComponentItemConfigFormProps<RecordType, ExtraOptions>) => {
  const { currentColumnID, currentComponentPath, currentTableID, previewDataSource } = React.useContext(GeneratorContext);

  const allComponentsConfigs = React.useMemo(() => getComponentsConfigs('', props.customComponentPanel), [props.customComponentPanel]);

  const getColumnConfigs = (componentType: string) => getColumnItemConfigs(componentType, {
    componentsConfigs: allComponentsConfigs,
    previewDataSource,
    mockDataSource: props.mockDataSource,
    dataFields: props.dataFields,
    filterSchema: true,
  });

  const decodeColumnConfigs = (columnConfigs?: DTGTableConfig['columns'][number], defaultData?: Record<string, unknown>) => {
    const formData: Record<string, unknown> = {};
    if (typeof columnConfigs?.title === 'string') {
      formData.title = columnConfigs.title;
    } else if (typeof columnConfigs?.title?.body === 'string') {
      formData.title = columnConfigs?.title?.body;
    } else if (typeof columnConfigs?.title?.body === 'object') {
      formData.title = columnConfigs?.title?.body.content;
    }
    if (typeof columnConfigs?.style === 'object') {
      formData.style = true;
      Object.keys(columnConfigs.style).forEach((key) => {
        formData[`style.${key}`] = columnConfigs.style?.[key];
      });
    }
    return formData;
  };

  const encodeColumnConfigs = (formData: { [key: string]: unknown }, column: DTGTableConfig['columns'][number]) => {
    const uiProps: Record<string, unknown> = {};
    const dataProps = {};
    const columnStyle: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      if (key.startsWith('options.')) {
        uiProps[key.replace('options.', '')] = formData[key];
      } else if (key.startsWith('ui:props.')) {
        uiProps[key.replace('ui:props.', '')] = formData[key];
      } else if (key.startsWith('style.')) {
        columnStyle[key.replace('style.', '')] = String(formData[key]);
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
        'style',
      ]),
      key: column?.key ?? '',
      dataIndex: formData.dataIndex as string | string[],
      title: '',
      width: formData.width as string,
      component: column?.component ?? '',
      options: uiProps,
      style: columnStyle,
    };
  };
  return (
    <TableConfigsContext.Consumer>
      { ({ tableConfigs, setTableColumns }) => {
        const tableIndex = tableConfigs.findIndex(item => item.tableId === currentTableID);
        const currentColumn = tableConfigs[tableIndex]?.columns.find(item => item.key === currentColumnID);
        const currentColumnItem = currentColumn ? getColumnItemByPath(currentColumn, currentComponentPath || []) : void 0;
        if (!currentColumnItem || !currentColumn) {
          return errorBoundary('请选择要载入的组件');
        }
        const columnConfig = getColumnConfigs(currentColumnItem?.component);
        return (
          <CustomForm<DTGTableConfig['columns'][number]>
            primaryKey="key"
            configs={columnConfig ? columnConfig.attrSchema || [] : []}
            data={currentColumnItem}
            decodeData={decodeColumnConfigs}
            encodeData={formData => encodeColumnConfigs(formData, currentColumnItem)}
            extendKeys={['ui:props', 'options']}
            extraComponents={props.customAttributeComponents}
            groupType="tabs"
            icons={props.icons}
            onChange={(data) => {
              const columns = [...tableConfigs[tableIndex]?.columns];
              const columnSchema = Object.assign({}, currentColumnItem, data);
              const index = columns.findIndex(item => item.key === currentColumn.key);
              updateColumnItemByPath(columns[index], currentComponentPath || [], columnSchema);
              setTableColumns(cloneDeep(columns), tableIndex);
            }}
          />
        );
      } }
    </TableConfigsContext.Consumer>
  );
};

export default ComponentItemConfigForm;
