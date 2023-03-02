/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { Result } from 'antd';
import { DripTableExtraOptions } from 'drip-table';
import React from 'react';

import { filterAttributes } from '@/utils';
import CustomForm from '@/components/CustomForm';
import { DripTableGeneratorContext, GeneratorContext } from '@/context';
import { getColumnItemConfigs, getComponentsConfigs } from '@/layouts/utils';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

interface ComponentConfigFormProps<
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
    icon={<ExclamationCircleTwoTone />}
    title={<div style={{ color: '#999' }}>{ message }</div>}
  />
);

const ComponentConfigForm = <
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: ComponentConfigFormProps<RecordType, ExtraOptions>) => {
  const { previewDataSource } = React.useContext(GeneratorContext);

  const getAllComponentsConfigs = React.useMemo(() => getComponentsConfigs('', props.customComponentPanel), [props.customComponentPanel]);

  const getColumnConfigs = (componentType: string) => getColumnItemConfigs(componentType, {
    componentsConfigs: getAllComponentsConfigs,
    previewDataSource,
    mockDataSource: props.mockDataSource,
    dataFields: props.dataFields,
  });

  const decodeColumnConfigs = (columnConfigs?: DripTableGeneratorContext['currentColumn'], defaultData?: Record<string, unknown>) => {
    const formData: Record<string, unknown> = {};
    if (typeof columnConfigs?.title === 'string') {
      formData.title = columnConfigs.title;
    } else if (typeof columnConfigs?.title?.body === 'string') {
      formData.title = columnConfigs?.title?.body;
    } else if (typeof columnConfigs?.title?.body === 'object') {
      formData.title = columnConfigs?.title?.body.content;
    }
    if (typeof columnConfigs?.title === 'object' && columnConfigs.title.style) {
      formData.titleStyle = true;
      Object.keys(columnConfigs.title.style).forEach((key) => {
        formData[`titleStyle.${key}`] = typeof columnConfigs?.title === 'object' ? columnConfigs.title.style?.[key] : void 0;
      });
    }
    if (typeof columnConfigs?.style === 'object') {
      formData.style = true;
      Object.keys(columnConfigs.style).forEach((key) => {
        formData[`style.${key}`] = columnConfigs.style?.[key];
      });
    }
    return formData;
  };

  const encodeColumnConfigs = (formData: { [key: string]: unknown }, currentColumn: DripTableGeneratorContext['currentColumn']) => {
    const uiProps: Record<string, unknown> = {};
    const dataProps: Record<string, unknown> = {};
    const titleStyle: Record<string, string> = {};
    const columnStyle: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      if (key.startsWith('options.')) {
        uiProps[key.replace('options.', '')] = formData[key];
      } else if (key.startsWith('ui:props.')) {
        uiProps[key.replace('ui:props.', '')] = formData[key];
      } else if (key.startsWith('titleStyle.')) {
        titleStyle[key.replace('titleStyle.', '')] = String(formData[key]);
      } else if (key.startsWith('style.')) {
        columnStyle[key.replace('style.', '')] = String(formData[key]);
      } else {
        dataProps[key] = formData[key];
      }
    });
    if (dataProps.width && !Number.isNaN(Number(dataProps.width))) {
      dataProps.width = Number(dataProps.width);
    }
    if (currentColumn?.component === 'group') {
      const length = (uiProps.layout as number[])?.reduce((p, v) => p + v, 0) || 0;
      uiProps.items = Array.from({ length }, _ => null);
      if (currentColumn.options.items) {
        (currentColumn.options.items as Record<string, unknown>[])
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
        'titleStyle',
        'width',
        'group',
        'style',
      ]),
      key: currentColumn?.key ?? '',
      innerIndexForGenerator: currentColumn?.innerIndexForGenerator ?? 0,
      dataIndex: formData.dataIndex as string | string[],
      title: formData.titleStyle
        ? {
          body: formData.title,
          style: titleStyle,
        }
        : formData.title,
      width: formData.width as string,
      align: formData.align as 'left' | 'center' | 'right',
      component: currentColumn?.component ?? '',
      options: uiProps,
      style: formData.style ? columnStyle : void 0,
    } as DripTableGeneratorContext['currentColumn'];
  };
  return (
    <GeneratorContext.Consumer>
      { ({ tableConfigs, currentTableID, currentColumn, setState }) => {
        if (!currentColumn) {
          return errorBoundary('请点击选择要编辑的列/组件');
        }
        const columnConfig = getColumnConfigs(currentColumn?.component);
        return (
          <CustomForm<DripTableGeneratorContext['currentColumn']>
            primaryKey="key"
            configs={columnConfig ? columnConfig.attrSchema || [] : []}
            data={currentColumn}
            decodeData={decodeColumnConfigs}
            encodeData={formData => encodeColumnConfigs(formData, currentColumn)}
            extendKeys={['ui:props', 'options']}
            extraComponents={props.customAttributeComponents}
            groupType="tabs"
            icons={props.icons}
            onChange={(data) => {
              const currentTableIndex = tableConfigs.findIndex(item => item.tableId === currentTableID);
              const columns = currentTableIndex > -1 ? tableConfigs[currentTableIndex].columns : [];
              const newCurrentColumn = Object.assign({}, currentColumn, data);
              const index = currentColumn.innerIndexForGenerator;
              const keyIndex = columns.findIndex(item => item.key === currentColumn.key);
              if (keyIndex === index) {
                columns[index] = Object.assign({}, newCurrentColumn);
              } else {
                columns[keyIndex] = Object.assign({}, newCurrentColumn);
                newCurrentColumn.innerIndexForGenerator = keyIndex;
              }
              const newTableConfigs = [...tableConfigs];
              newTableConfigs[currentTableIndex] = {
                ...newTableConfigs[currentTableIndex],
                columns: [...columns || []],
              };
              setState({
                currentColumn: newCurrentColumn,
                tableConfigs: newTableConfigs,
              });
            }}
          />
        );
      } }
    </GeneratorContext.Consumer>
  );
};

export default ComponentConfigForm;
