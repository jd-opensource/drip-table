/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { Alert, Button, Result, Tabs, Tooltip } from 'antd';
import { DripTableDriver, DripTableGenericRenderElement, DripTableSchema } from 'drip-table';
import React from 'react';
import MonacoEditor from 'react-monaco-editor';

import { filterAttributes } from '@/utils';
import { DripTableColumn, globalActions, GlobalStore } from '@/store';
import CustomForm from '@/components/CustomForm';
import { useGlobalData } from '@/hooks';
import components from '@/table-components';
import { DripTableComponentAttrConfig, DTGComponentPropertySchema } from '@/typing';

import { GlobalAttrFormConfigs } from '../configs';
import { CollapseIcon, TabsIcon } from './icons';

import styles from './index.module.less';

type GlobalSchema = Omit<DripTableSchema<DripTableColumn<string, never>>, '$schema' | 'columns'>;

type ButtonType = 'link' | 'text' | 'ghost' | 'primary' | 'dashed' | 'default';
type FlexJustifyContent = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
type LabeledValue = {
  label: string;
  value: string | number;
}[];
interface Props {
  customComponentPanel: {
    mode: 'add' | 'replace';
    components: DripTableComponentAttrConfig[];
  } | undefined;
  customGlobalConfigPanel: DTGComponentPropertySchema[] | undefined;
  driver: DripTableDriver;
}

const { TabPane } = Tabs;

const AttributeLayout = (props: Props & { store: GlobalStore }) => {
  const { dataFields, mockDataSource: isDemo } = useGlobalData();

  const [state, setState] = props.store;
  const store = { state, setState };

  const [activeKey, setActiveKey] = React.useState('0');

  const [formDisplayMode, setFormDisplayMode] = React.useState('tabs' as 'collapse' | 'tabs');

  const [codeErrorMessage, setCodeErrorMessage] = React.useState('');

  const [code, setCode] = React.useState(JSON.stringify(state.previewDataSource, null, 4));

  const getActiveKey = () => {
    if (activeKey === '0') {
      return state.currentColumn ? '1' : '2';
    }
    return activeKey;
  };

  const getComponents = () => {
    let componentsToUse = components;
    if (props.customComponentPanel) {
      const customComponents = props.customComponentPanel.components;
      componentsToUse = props.customComponentPanel.mode === 'add' ? [...components, ...customComponents] : [...customComponents];
    }
    return [...componentsToUse];
  };

  const decodeGlobalConfigs = (globalConfigs?: Omit<DripTableSchema, '$schema' | 'columns'>) => {
    const formData: Record<string, unknown> = { ...filterAttributes(globalConfigs, 'header') };
    if (typeof globalConfigs?.header === 'object') {
      formData.header = true;
      const headerElements = globalConfigs?.header?.elements || [];
      for (const headerItem of headerElements) {
        if (headerItem.type === 'display-column-selector') {
          formData['header.displayColumnSelector'] = true;
          formData['header.displayColumnSelector.selectorButtonType'] = headerItem.selectorButtonType;
          formData['header.displayColumnSelector.selectorButtonText'] = headerItem.selectorButtonText;
        }
        if (headerItem.type === 'text') {
          formData['header.title'] = true;
          formData['header.title.align'] = headerItem.align;
          formData['header.title.text'] = headerItem.text;
        }
        if (headerItem.type === 'search') {
          formData['header.search'] = true;
          formData['header.search.width'] = headerItem.wrapperStyle?.width;
          formData['header.search.align'] = headerItem.align;
          formData['header.search.placeholder'] = headerItem.placeholder;
          formData['header.search.allowClear'] = headerItem.allowClear;
          formData['header.search.searchButtonText'] = headerItem.searchButtonText;
          formData['header.search.searchKeys'] = headerItem.searchKeys;
          formData['header.search.searchKeyDefaultValue'] = headerItem.searchKeyDefaultValue;
        }
        if (headerItem.type === 'insert-button') {
          formData['header.insertButton'] = true;
          formData['header.insertButton.align'] = headerItem.align;
          formData['header.insertButton.showIcon'] = headerItem.showIcon;
          formData['header.insertButton.insertButtonText'] = headerItem.insertButtonText;
        }
      }
    }
    return formData;
  };

  const encodeGlobalConfigs = (formData: { [key: string]: unknown }): GlobalSchema => {
    const elements: DripTableGenericRenderElement[] = [];
    if (formData.header) {
      if (formData['header.displayColumnSelector']) {
        elements.push({
          type: 'display-column-selector',
          selectorButtonType: formData['header.displayColumnSelector.selectorButtonType'] as ButtonType,
          selectorButtonText: formData['header.displayColumnSelector.selectorButtonText'] as string || '',
        });
      }
      if (formData['header.title']) {
        elements.push({
          type: 'text',
          span: 'flex-auto',
          align: formData['header.title.align'] as FlexJustifyContent,
          text: formData['header.title.text'] as string,
        });
      }
      if (formData['header.search']) {
        elements.push({
          type: 'search',
          wrapperStyle: { width: formData['header.search.width'] as number },
          align: formData['header.search.align'] as FlexJustifyContent,
          placeholder: formData['header.search.placeholder'] as string,
          allowClear: formData['header.search.allowClear'] as boolean,
          searchButtonText: formData['header.search.searchButtonText'] as string,
          searchKeys: formData['header.search.typeVisible'] ? formData['header.search.searchKeys'] as LabeledValue : void 0,
          searchKeyDefaultValue: formData['header.search.searchKeyDefaultValue'] as string,
        });
      }
      if (formData['header.insertButton']) {
        elements.push({
          type: 'insert-button',
          align: formData['header.insertButton.align'] as FlexJustifyContent,
          showIcon: formData['header.insertButton.showIcon'] as boolean,
          insertButtonText: formData['header.insertButton.insertButtonText'] as string,
        });
      }
    }
    return {
      ...formData,
      bordered: formData.bordered as boolean,
      size: formData.size as 'small' | 'middle' | 'large' | undefined,
      ellipsis: formData.ellipsis as boolean,
      sticky: formData.sticky as boolean,
      rowSelection: formData.rowSelection as boolean,
      virtual: formData.virtual as boolean,
      scroll: {
        y: formData.scrollY as number,
      },
      header: formData.header
        ? {
          style: { margin: '0', padding: '12px 0' },
          elements,
        }
        : false,
      pagination: formData.pagination
        ? {
          size: formData['pagination.size'] as 'small' | 'default',
          pageSize: formData['pagination.pageSize'] as number,
          position: formData['pagination.position'] as 'bottomLeft' | 'bottomCenter' | 'bottomRight',
          showQuickJumper: formData['pagination.showQuickJumper'] as boolean,
          showSizeChanger: formData['pagination.showSizeChanger'] as boolean,
        }
        : false,
    };
  };

  const encodeColumnConfigs = (formData: { [key: string]: unknown }) => {
    const uiProps = {};
    const dataProps = {};
    Object.keys(formData).forEach((key) => {
      if (key.startsWith('ui:props.')) {
        uiProps[key.replace('ui:props.', '')] = formData[key];
      } else {
        dataProps[key] = formData[key];
      }
    });
    const columnConfig = getComponents().find(item => item['ui:type'] === state.currentColumn?.['ui:type']);
    return {
      ...filterAttributes(dataProps, ['ui:props', 'ui:type', 'type', 'name', 'dataIndex', 'title', 'width', 'group']),
      dataIndex: formData.dataIndex as string | string[],
      title: formData.title as string,
      width: formData.width as string,
      'ui:type': state.currentColumn?.['ui:type'],
      ...uiProps,
      type: columnConfig ? columnConfig.type : state.currentColumn?.type,
    } as DripTableColumn<string, never>;
  };

  const submitTableData = (codeValue?: string) => {
    setCodeErrorMessage('');
    setCode(codeValue || '');
    try {
      state.previewDataSource = JSON.parse(codeValue || '');
      setState({ ...state });
      globalActions.updatePreviewDataSource(store);
    } catch (error) {
      setCodeErrorMessage((error as Error).message);
    }
  };

  const renderGlobalForm = () => (
    <CustomForm<GlobalSchema>
      primaryKey="$version"
      configs={props.customGlobalConfigPanel || GlobalAttrFormConfigs}
      data={state.globalConfigs}
      decodeData={decodeGlobalConfigs}
      encodeData={encodeGlobalConfigs}
      groupType={formDisplayMode}
      theme={props.driver}
      onChange={(data) => {
        state.globalConfigs = { ...data };
        globalActions.updateGlobalConfig(store);
      }}
    />
  );

  const renderColumnForm = () => {
    if (!state.currentColumn) {
      return (
        <Result
          icon={<ExclamationCircleTwoTone />}
          title={<div style={{ color: '#999' }}>请点击选择要编辑的列</div>}
        />
      );
    }
    const columnConfig = getComponents().find(schema => schema['ui:type'] === state.currentColumn?.['ui:type']);
    columnConfig?.attrSchema.forEach((schema) => {
      const uiProps = schema['ui:props'];
      if (!uiProps) {
        return;
      }
      if (uiProps.optionsParam === '$$FIELD_KEY_OPTIONS$$') {
        uiProps.options = isDemo
          ? Object.keys(state.previewDataSource[0] || {}).map(key => ({ label: key, value: key }))
          : dataFields?.map(key => ({ label: key, value: key })) || [];
      }
      if (uiProps.items) {
        (uiProps.items as DTGComponentPropertySchema[])?.forEach((item, index) => {
          const itemUiProps = item['ui:props'];
          if (!itemUiProps) {
            return;
          }
          if (itemUiProps.optionsParam === '$$FIELD_KEY_OPTIONS$$') {
            itemUiProps.options = isDemo
              ? Object.keys(state.previewDataSource[0] || {}).map(key => ({ label: key, value: key }))
              : dataFields?.map(key => ({ label: key, value: key })) || [];
          }
        });
      }
    });
    return (
      <CustomForm<DripTableColumn<string, never>>
        primaryKey="key"
        configs={columnConfig ? columnConfig.attrSchema || [] : []}
        data={state.currentColumn}
        encodeData={encodeColumnConfigs}
        extendKeys={['ui:props']}
        groupType={formDisplayMode}
        theme={props.driver}
        onChange={(data) => {
          state.currentColumn = Object.assign(state.currentColumn, data);
          const idx = state.columns.findIndex(item => item.key === state.currentColumn?.key);
          if (idx > -1 && state.currentColumn) {
            state.columns[idx] = state.currentColumn;
          }
          globalActions.editColumns(store);
          globalActions.checkColumn(store);
        }}
      />
    );
  };

  return (
    <div className={styles['attributes-wrapper']}>
      <div className={styles['attributes-container']}>
        <Tabs
          activeKey={getActiveKey()}
          type="card"
          onChange={(key) => { setActiveKey(key); }}
          tabBarExtraContent={activeKey !== '3'
            ? (
              <Tooltip title={formDisplayMode === 'tabs' ? '折叠面板' : '标签面板'}>
                <Button
                  style={{ borderRadius: 2 }}
                  size="small"
                  onClick={() => { setFormDisplayMode(formDisplayMode === 'collapse' ? 'tabs' : 'collapse'); }}
                  icon={formDisplayMode === 'tabs' ? <CollapseIcon style={{ marginTop: 4 }} /> : <TabsIcon style={{ marginTop: 4 }} />}
                />
              </Tooltip>
            )
            : null}
        >
          <TabPane tab="属性配置" key="1" className={styles['attribute-panel']}>
            <div className={styles['attributes-form-panel']}>
              { renderColumnForm() }
            </div>
          </TabPane>
          <TabPane tab="全局设置" key="2" className={styles['attribute-panel']}>
            <div className={styles['attributes-form-panel']}>
              { renderGlobalForm() }
            </div>
          </TabPane>
          { isDemo && (
          <TabPane tab="表格数据" key="3" className={styles['attribute-panel']}>
            <div className={styles['attributes-code-panel']}>
              { codeErrorMessage && <Alert style={{ margin: '8px 0' }} message={codeErrorMessage} type="error" showIcon /> }
              <MonacoEditor
                width="100%"
                height={428}
                language="json"
                theme="vs-dark"
                value={code || ''}
                onChange={(value) => { submitTableData(value); }}
              />
            </div>
          </TabPane>
          ) }
        </Tabs>
      </div>
    </div>
  );
};

export default AttributeLayout;
