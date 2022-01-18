/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { Button, Input, message, Modal } from 'antd';
import { DripTableColumnSchema, DripTableSchema } from 'drip-table';
import React, { useState } from 'react';

import { filterAttributes } from '@/utils';
import { globalActions, GlobalStore } from '@/store';
import { useGlobalData } from '@/hooks';

const ToolLayout = (props: { store: GlobalStore }) => {
  const globalData = useGlobalData();

  const [state, actions] = props.store;
  const store = { state, setState: actions };

  const [modalStatus, setModalStatus] = useState('');
  const [code, setCode] = useState('');

  const getSchemaValue = (): DripTableSchema => ({
    $schema: 'http://json-schema.org/draft/2019-09/schema#',
    ...state.globalConfigs,
    columns: state.columns.map(item => ({ ...item, index: void 0, sort: void 0 })) as DripTableColumnSchema<string, never>[],
  });

  /**
    * 渲染一个Modal用来展示JSON Schema配置
    * @returns {JSX.Element} 返回React组件
    */
  const renderSchemaModal = () => {
    if (modalStatus !== 'export' && modalStatus !== 'import') {
      return null;
    }

    const defaultValue = modalStatus === 'export'
      ? JSON.stringify(getSchemaValue(), null, 4)
      : code || '';
    return (
      <Input.TextArea
        style={{ minHeight: '560px' }}
        value={defaultValue}
        onChange={(e) => {
          if (modalStatus === 'import') { setCode(e.target.value); }
        }}
      />
    );
  };

  return (
    <React.Fragment>
      <Button
        style={{ margin: '0 12px' }}
        size="small"
        onClick={() => { globalActions.toggleEditMode(store); }}
      >
        { state.isEdit ? '预览模式' : '编辑模式' }
      </Button>
      <Button
        style={{ margin: '0 12px' }}
        size="small"
        onClick={() => setModalStatus('import')}
      >
        导入配置
      </Button>
      <Button
        style={{ margin: '0 12px' }}
        size="small"
        onClick={() => {
          setModalStatus('export');
        }}
      >
        导出配置
      </Button>

      <Modal
        width={720}
        title={modalStatus === 'export' ? '导出数据' : '导入数据'}
        visible={modalStatus === 'export' || modalStatus === 'import'}
        cancelText={modalStatus === 'export' ? '确认' : '取消'}
        okText={modalStatus === 'export' ? '复制文本' : '确认导入'}
        onCancel={() => setModalStatus('')}
        onOk={() => {
          if (modalStatus === 'import') { // 导入解析
            const value = (code || '').trim();
            try {
              const json = JSON.parse(value);
              state.globalConfigs = filterAttributes(json, ['$schema', 'columns']);
              state.columns = json.columns;
              state.currentColumn = void 0;
            } catch {
              message.error('解析出错, 请传入正确的格式');
            } finally {
              globalActions.updateGlobalConfig(store);
            }
          } else { // 导出复制
            const aux = document.createElement('input');
            aux.setAttribute('value', JSON.stringify(getSchemaValue()));
            document.body.append(aux);
            aux.select();
            document.execCommand('copy');
            aux.remove();
            if (globalData.onExportSchema) {
              globalData.onExportSchema(getSchemaValue());
            }
          }
          message.success('复制成功');
          setModalStatus('');
          setCode('');
        }}
      >
        { renderSchemaModal() }
      </Modal>
    </React.Fragment>
  );
};

export default ToolLayout;
