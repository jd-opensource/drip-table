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
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';

import { filterAttributes, formatNumber } from '@/utils';
import CustomForm from '@/components/CustomForm';
import { GeneratorContext } from '@/context';
import { DTGTableConfig, TableConfigsContext } from '@/context/table-configs';
import { getColumnItemConfigs, getComponentsConfigs } from '@/layouts/utils';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

interface ComponentConfigFormProps<
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  customAttributeComponents: DripTableGeneratorProps<RecordType, ExtraOptions>['customAttributeComponents'];
  customComponentPanel: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'];
  dataFields: DripTableGeneratorProps<RecordType, ExtraOptions>['dataFields'];
  mockDataSource: DripTableGeneratorProps<RecordType, ExtraOptions>['mockDataSource'];
  icons: DripTableGeneratorProps<RecordType, ExtraOptions>['icons'];
}

const errorBoundary = (message?: string) => (
  <Result
    icon={<ExclamationCircleTwoTone />}
    title={<div style={{ color: '#999' }}>{ message }</div>}
  />
);

function ComponentConfigForm<
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: ComponentConfigFormProps<RecordType, ExtraOptions>) {
  const { currentColumnID, currentTableID, previewDataSource } = React.useContext(GeneratorContext);

  const getAllComponentsConfigs = React.useMemo(() => getComponentsConfigs('', props.customComponentPanel), [props.customComponentPanel]);

  const getColumnConfigs = (componentType: string) => getColumnItemConfigs(componentType, {
    componentsConfigs: getAllComponentsConfigs,
    previewDataSource,
    mockDataSource: props.mockDataSource,
    dataFields: props.dataFields,
    icons: props.icons,
  });

  const decodeColumnConfigs = (columnConfigs: DTGTableConfig['columns'][number], defaultData?: Record<string, unknown>) => {
    const formData: Record<string, unknown> = {};
    if (typeof columnConfigs.title === 'string') {
      formData.title = columnConfigs.title;
    } else if (typeof columnConfigs.title?.body === 'string') {
      formData.title = columnConfigs.title?.body;
    } else if (typeof columnConfigs.title?.body === 'object') {
      formData.title = columnConfigs.title?.body.content;
    }
    if (typeof columnConfigs.title === 'object' && columnConfigs.title.style) {
      formData.titleStyle = true;
      Object.keys(columnConfigs.title.style).forEach((key) => {
        formData[`titleStyle.${key}`] = typeof columnConfigs?.title === 'object' ? columnConfigs.title.style?.[key] : void 0;
      });
    }
    if (typeof columnConfigs.style === 'object') {
      formData.style = true;
      Object.keys(columnConfigs.style).forEach((key) => {
        formData[`style.${key}`] = columnConfigs.style?.[key];
      });
    }
    if (columnConfigs.component === 'icon') {
      const iconConfig = columnConfigs?.options?.icon as Record<string, unknown> | string ?? '';
      if (typeof iconConfig === 'string') {
        formData['options.mode'] = 'library';
        formData['options.icon'] = iconConfig;
        formData['options.icon.render'] = '';
      } else if (typeof iconConfig.name === 'string') {
        formData['options.mode'] = 'library';
        formData['options.icon'] = iconConfig?.name;
        formData['options.icon.render'] = '';
      } else {
        formData['options.mode'] = 'custom';
        formData['options.icon'] = '';
        formData['options.icon.render'] = iconConfig?.html || iconConfig?.render;
      }
    }
    if (columnConfigs.component === 'button') {
      const popconfirm = columnConfigs.options.popconfirm as Record<string, unknown>;
      formData['options.popconfirm'] = !!popconfirm;
      formData['options.popconfirm.overlayInnerStyle'] = popconfirm ? !!popconfirm.overlayInnerStyle : false;
      formData['options.popconfirm.contentIconStyle'] = popconfirm ? !!popconfirm.contentIconStyle : false;
      formData['options.popconfirm.cancelStyle'] = popconfirm ? !!popconfirm.cancelStyle : false;
      formData['options.popconfirm.confirmStyle'] = popconfirm ? !!popconfirm.confirmStyle : false;
    }
    return formData;
  };

  const encodeColumnConfigs = (formData: { [key: string]: unknown }, currentColumn: DTGTableConfig['columns'][number]) => {
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
    if (currentColumn?.component === 'icon') {
      if (formData['options.mode'] === 'custom') {
        uiProps.icon = {
          render: uiProps['icon.render'],
        };
      }
      delete uiProps.mode;
      delete uiProps['icon.render'];
    }
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
    if (currentColumn?.component === 'button') {
      uiProps.popconfirm = uiProps.popconfirm
        ? {
          overlayInnerStyle: formData['options.popconfirm.overlayInnerStyle']
            ? {
              borderRadius: formData['options.popconfirm.overlayInnerStyle.borderRadius'],
            }
            : void 0,
          title: formData['options.popconfirm.title'],
          content: formData['options.popconfirm.content'],
          contentIcon: formData['options.popconfirm.contentIcon'],
          contentIconStyle: formData['options.popconfirm.contentIconStyle']
            ? {
              color: formData['options.popconfirm.contentIconStyle.color'],
              marginRight: formData['options.popconfirm.contentIconStyle.marginRight'],
            }
            : void 0,
          placement: formData['options.popconfirm.placement'],
          cancelText: formData['options.popconfirm.cancelText'],
          cancelStyle: formData['options.popconfirm.cancelStyle']
            ? {
              color: formData['options.popconfirm.cancelStyle.color'],
              backgroundColor: formData['options.popconfirm.cancelStyle.backgroundColor'],
              borderRadius: formData['options.popconfirm.cancelStyle.borderRadius'],
              padding: formData['options.popconfirm.cancelStyle.padding'],
              fontSize: formData['options.popconfirm.cancelStyle.fontSize'],
              height: formData['options.popconfirm.cancelStyle.height'],
              border: formData['options.popconfirm.cancelStyle.border'],
              transform: formData['options.popconfirm.cancelStyle.transform'],
            }
            : void 0,
          confirmText: formData['options.popconfirm.confirmText'],
          confirmStyle: formData['options.popconfirm.confirmStyle']
            ? {
              color: formData['options.popconfirm.confirmStyle.color'],
              backgroundColor: formData['options.popconfirm.confirmStyle.backgroundColor'],
              borderRadius: formData['options.popconfirm.confirmStyle.borderRadius'],
              padding: formData['options.popconfirm.confirmStyle.padding'],
              fontSize: formData['options.popconfirm.confirmStyle.fontSize'],
              height: formData['options.popconfirm.confirmStyle.height'],
              border: formData['options.popconfirm.confirmStyle.border'],
              transform: formData['options.popconfirm.confirmStyle.transform'],
            }
            : void 0,
        }
        : void 0;
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
        'dataIndexMode',
        'title',
        'titleStyle',
        'group',
        'style',
        'width',
      ]),
      key: currentColumn?.key ?? '',
      dataIndex: formData.dataIndex as string | string[],
      width: formatNumber(formData.width as string),
      title: formData.titleStyle
        ? {
          body: formData.title,
          style: titleStyle,
        }
        : formData.title,
      align: formData.align as 'left' | 'center' | 'right',
      component: currentColumn?.component ?? '',
      options: uiProps,
      dataTranslation: formData.dataTranslation as string ? formData.dataTranslation : void 0,
      style: formData.style ? columnStyle : void 0,
    } as DTGTableConfig['columns'][number];
  };
  return (
    <TableConfigsContext.Consumer>
      { ({ tableConfigs, setTableColumns }) => {
        const tableIndex = tableConfigs.findIndex(item => item.tableId === currentTableID);
        const currentColumn = tableConfigs[tableIndex]?.columns.find(item => item.key === currentColumnID);
        if (!currentColumn) {
          return errorBoundary('请点击选择要编辑的列/组件');
        }
        const columnConfig = getColumnConfigs(currentColumn?.component);
        return (
          <CustomForm<DTGTableConfig['columns'][number]>
            primaryKey="key"
            configs={columnConfig ? columnConfig.attrSchema || [] : []}
            data={currentColumn}
            decodeData={decodeColumnConfigs}
            encodeData={formData => encodeColumnConfigs(formData, currentColumn)}
            extendKeys={['ui:props', 'options']}
            skippedKeys={['options.popover', 'options.content']}
            extraComponents={props.customAttributeComponents}
            groupType="tabs"
            icons={props.icons}
            onChange={(data) => {
              const columns = tableIndex > -1 ? cloneDeep(tableConfigs[tableIndex].columns || []) : [];
              const newCurrentColumn = Object.assign({}, currentColumn, data);
              const keyIndex = columns.findIndex(item => item.key === currentColumn.key);
              columns[keyIndex] = Object.assign({}, newCurrentColumn);
              setTableColumns(columns, tableIndex);
            }}
          />
        );
      } }
    </TableConfigsContext.Consumer>
  );
}

export default ComponentConfigForm;
