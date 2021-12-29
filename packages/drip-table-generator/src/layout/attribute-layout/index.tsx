/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import React from 'react';
import { Alert, Result, Tabs } from 'antd';
import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { DripTableSchema } from 'drip-table';
import MonacoEditor from '@monaco-editor/react';
import debounce from 'lodash/debounce';

import { useGlobalData } from '@/hooks';
import { DripTableComponentAttrConfig, DTGComponentPropertySchema } from '@/typing';
import { DripTableColumn, globalActions, GlobalStore } from '@/store';
import CustomForm from '@/components/CustomForm';
import components from '@/table-components';

import { GlobalAttrFormConfigs } from '../configs';

import styles from './index.module.less';

type GlobalSchema = DripTableSchema['configs'];

interface Props {
  customComponentPanel: {
    mode: 'add' | 'replace';
    components: DripTableComponentAttrConfig[];
  } | undefined;
  customGlobalConfigPanel: DTGComponentPropertySchema[] | undefined;
}

const { TabPane } = Tabs;

const AttributeLayout = (props: Props & { store: GlobalStore }) => {
  const { dataFields } = useGlobalData();

  const [state, setState] = props.store;
  const store = { state, setState };

  const [activeKey, setActiveKey] = React.useState('0');

  const [codeErrorMessage, setCodeErrorMessage] = React.useState('');

  const code = JSON.stringify(state.previewDataSource, null, 4);

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

  const encodeGlobalConfigs = (formData: { [key: string]: unknown }): GlobalSchema => ({
    bordered: formData.bordered as boolean,
    size: formData.size as 'small' | 'middle' | 'large' | undefined,
    ellipsis: formData.ellipsis as boolean,
    header: formData.header
      ? {
        title: formData['header.title.type'] === 'title'
          ? {
            type: formData['header.title.type'] as 'title',
            title: formData['header.title.title'] as string,
            span: formData['header.title.span'] as number,
            position: 'topLeft',
          }
          : void 0,
        search: formData['header.search.type'] === 'search'
          ? {
            type: formData['header.search.type'] as 'search',
            span: formData['header.search.wrapperWidth'] as number,
            position: 'topCenter',
            placeholder: formData['header.search.placeholder'],
            allowClear: formData['header.search.allowClear'],
            searchBtnText: formData['header.search.searchBtnText'],
            searchStyle: { float: 'right', width: formData['header.search.width'] as string },
            defaultSelectedKey: formData['header.search.defaultSelectedKey'],
            typeOptions: formData['header.search.typeVisible'] ? formData['header.search.typeOptions'] : void 0,
          }
          : void 0,
      }
      : false,
    pagination: formData.pagination
      ? {
        pageSize: formData['pagination.pageSize'] as number,
        position: formData['pagination.position'] as 'bottomLeft' | 'bottomCenter' | 'bottomRight',
      }
      : false,
  } as GlobalSchema);

  const filterAttrs = (originObj: Record<string, unknown>, excludeKeys: string[]) => {
    const obj = {};
    Object.keys(originObj).filter(k => !excludeKeys.includes(k)).forEach((key) => {
      obj[key] = originObj[key];
    });
    return obj;
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
      ...filterAttrs(dataProps, ['ui:props', 'ui:type', 'type', 'name', 'dataIndex', 'title', 'width', 'group']),
      $id: state.currentColumn?.$id || '',
      dataIndex: formData.dataIndex as string | string[],
      title: formData.title as string,
      width: formData.width as string,
      'ui:type': state.currentColumn?.['ui:type'],
      'ui:props': { ...uiProps },
      type: columnConfig ? columnConfig.type : state.currentColumn?.type,
    } as DripTableColumn;
  };

  const submitDataWithoutDebounce = (codeValue?: string) => {
    setCodeErrorMessage('');
    try {
      state.previewDataSource = JSON.parse(codeValue || '');
      setState({ ...state });
      globalActions.updatePreviewDataSource(store);
    } catch (error) {
      setCodeErrorMessage((error as Error).message);
    }
  };

  const submitTableData = debounce(submitDataWithoutDebounce, 500);

  const renderGlobalForm = () => (
    <CustomForm<GlobalSchema>
      configs={props.customGlobalConfigPanel || GlobalAttrFormConfigs}
      data={state.globalConfigs}
      encodeData={encodeGlobalConfigs}
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
      if (uiProps.from === 'dataSource') {
        uiProps.options = Object.keys(state.previewDataSource[0] || {})
          .map(key => ({ label: key, value: key }));
      } else if (uiProps.from === 'dataFields') {
        uiProps.options = dataFields?.map(key => ({ label: key, value: key })) || [];
      }
      if (uiProps.items) {
        (uiProps.items as DTGComponentPropertySchema[])?.forEach((item, index) => {
          const itemUiProps = item['ui:props'];
          if (!itemUiProps) {
            return;
          }
          if (itemUiProps.from === 'dataSource') {
            itemUiProps.options = Object.keys(state.previewDataSource[0] || {})
              .map(key => ({ label: key, value: key }));
          } else if (itemUiProps.from === 'dataFields') {
            itemUiProps.options = dataFields?.map(key => ({ label: key, value: key })) || [];
          }
        });
      }
    });
    return (
      <CustomForm<DripTableColumn>
        configs={columnConfig ? columnConfig.attrSchema || [] : []}
        data={state.currentColumn}
        encodeData={encodeColumnConfigs}
        extendKeys={['ui:props']}
        onChange={(data) => {
          state.currentColumn = Object.assign(state.currentColumn, data);
          const idx = state.columns.findIndex(item => item.$id === state.currentColumn?.$id);
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
        <Tabs activeKey={getActiveKey()} type="card" onChange={(key) => { setActiveKey(key); }}>
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
          <TabPane tab="表格数据" key="3" className={styles['attribute-panel']}>
            <div className={styles['attributes-code-panel']}>
              { codeErrorMessage && <Alert style={{ margin: '8px 0' }} message={codeErrorMessage} type="error" showIcon /> }
              <MonacoEditor
                width="100%"
                height={348}
                language="json"
                theme="vs-dark"
                value={code || ''}
                onChange={(value) => { submitTableData(value); }}
              />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default AttributeLayout;
