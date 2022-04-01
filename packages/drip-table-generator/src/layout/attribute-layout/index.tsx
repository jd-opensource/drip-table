/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { Alert, Button, Result, Tabs, Tooltip } from 'antd';
import { DripTableDriver, DripTableGenericRenderElement } from 'drip-table';
import React from 'react';
import MonacoEditor from 'react-monaco-editor';

import { filterAttributes, filterAttributesByRegExp } from '@/utils';
import { DripTableColumn, globalActions, GlobalSchema, GlobalStore } from '@/store';
import CustomForm from '@/components/CustomForm';
import { useGlobalData } from '@/hooks';
import components from '@/table-components';
import { DripTableComponentAttrConfig, DTGComponentPropertySchema } from '@/typing';

import { GlobalAttrFormConfigs } from '../configs';
import { CollapseIcon, TabsIcon } from './icons';

import styles from './index.module.less';

interface Props {
  customComponentPanel: {
    mode: 'add' | 'replace';
    components: DripTableComponentAttrConfig[];
  } | undefined;
  customGlobalConfigPanel: {
    mode: 'add' | 'replace';
    configs: DTGComponentPropertySchema[];
  } | undefined;
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

  /**
   * 将全局配置转换成FormData
   * @param {GlobalSchema} globalConfigs 全局配置
   * @returns {Record<string, unknown>} 表单数据
   */
  const decodeGlobalConfigs = (globalConfigs?: GlobalSchema) => {
    const formData: Record<string, unknown> = { ...filterAttributes(globalConfigs, 'header') };
    if (typeof globalConfigs?.header === 'object') {
      formData.header = true;
      const headerElements = globalConfigs?.header?.elements || [];
      for (const headerItem of headerElements) {
        if (headerItem.type === 'spacer') {
          headerItem['style.width'] = headerItem.style?.width;
        }
        if (headerItem.type === 'search') {
          headerItem['wrapperStyle.width'] = headerItem.wrapperStyle?.width;
        }
      }
      formData['header.items'] = headerElements;
    }
    if (typeof globalConfigs?.footer === 'object') {
      formData.footer = true;
      const footerElements = globalConfigs?.footer?.elements || [];
      for (const footerItem of footerElements) {
        if (footerItem.type === 'text') {
          footerItem['style.width'] = footerItem.style?.width;
        }
        if (footerItem.type === 'search') {
          footerItem['wrapperStyle.width'] = footerItem.wrapperStyle?.width;
        }
      }
      formData['footer.items'] = footerElements;
    }
    if (typeof globalConfigs?.pagination === 'object') {
      formData.pagination = true;
      Object.keys(globalConfigs?.pagination || {}).forEach((key) => {
        formData[`pagination.${key}`] = globalConfigs?.pagination?.[key];
      });
    }
    return formData;
  };

  const encodeGlobalConfigs = (formData: { [key: string]: unknown }): GlobalSchema => {
    const formatElement = (element) => {
      if (element['style.width']) {
        element.style = { width: element['style.width'] };
        delete element['style.width'];
      }
      if (element['wrapperStyle.width']) {
        element.wrapperStyle = { width: element['wrapperStyle.width'] };
        delete element['wrapperStyle.width'];
      }
      return element;
    };
    return {
      ...filterAttributesByRegExp(formData, /^(footer|header|pagination)\./u),
      $version: formData.$version as number,
      bordered: formData.bordered as boolean,
      size: formData.size as 'small' | 'middle' | 'large' | undefined,
      ellipsis: formData.ellipsis as boolean,
      sticky: formData.sticky as boolean,
      rowSelection: formData.rowSelection as boolean,
      virtual: formData.virtual as boolean,
      scroll: {
        x: formData.scrollX as number,
        y: formData.scrollY as number,
      },
      header: formData.header
        ? {
          style: { margin: '0', padding: '12px 0' },
          elements: (formData['header.items'] as DripTableGenericRenderElement[] || []).map(item => formatElement(item)),
        }
        : false,
      footer: formData.footer
        ? {
          style: { margin: '0', padding: '12px 0' },
          elements: (formData['footer.items'] as DripTableGenericRenderElement[] || []).map(item => formatElement(item)),
        }
        : void 0,
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

  const encodeColumnConfigs = (formData: { [key: string]: unknown }): DripTableColumn => {
    const uiProps = {};
    const dataProps = {};
    Object.keys(formData).forEach((key) => {
      if (key.startsWith('ui:props.')) {
        uiProps[key.replace('ui:props.', '')] = formData[key];
      } else {
        dataProps[key] = formData[key];
      }
    });
    // const columnConfig = getComponents().find(item => item['ui:type'] === state.currentColumn?.component);
    return {
      ...filterAttributes(dataProps, ['ui:props', 'ui:type', 'type', 'name', 'dataIndex', 'title', 'width', 'group']),
      key: state.currentColumn?.key ?? '',
      index: state.currentColumn?.index ?? 0,
      sort: state.currentColumn?.sort ?? 0,
      dataIndex: formData.dataIndex as string | string[],
      title: formData.title as string,
      width: formData.width as string,
      component: state.currentColumn?.component ?? '',
      options: uiProps,
    };
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

  const getGlobalFormConfigs = () => {
    if (props.customGlobalConfigPanel) {
      return props.customGlobalConfigPanel.mode === 'add'
        ? [
          ...GlobalAttrFormConfigs,
          ...props.customGlobalConfigPanel.configs,
        ]
        : [...props.customGlobalConfigPanel.configs];
    }
    return GlobalAttrFormConfigs;
  };

  const renderGlobalForm = () => (
    <CustomForm<GlobalSchema>
      primaryKey="$version"
      configs={getGlobalFormConfigs()}
      data={state.globalConfigs}
      decodeData={decodeGlobalConfigs}
      encodeData={encodeGlobalConfigs}
      groupType={formDisplayMode}
      theme={props.driver}
      onChange={(data) => {
        if (data && data.$version) { data.$version += 1; }
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
    const columnConfig = getComponents().find(schema => schema['ui:type'] === state.currentColumn?.component);
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
      <CustomForm<DripTableColumn>
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
