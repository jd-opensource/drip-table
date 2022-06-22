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

import { filterAttributes, generateColumn } from '@/utils';
import { DripTableColumn, globalActions, GlobalStore } from '@/store';
import { useGlobalData } from '@/hooks';

const ToolLayout = (props: { store: GlobalStore }) => {
  const globalData = useGlobalData();

  const [state, actions] = props.store;
  const store = { state, setState: actions };

  const [modalStatus, setModalStatus] = useState('');
  const [code, setCode] = useState('');

  const getSchemaValue = (): DripTableSchema<DripTableColumnSchema> => ({
    ...filterAttributes(state.globalConfigs, '$version'),
    columns: state.columns.map(item => generateColumn(item)),
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
            let hasError = false;
            try {
              const json = JSON.parse(value);
              state.globalConfigs = filterAttributes(json, ['columns']);
              state.columns = json.columns?.map((item, index) => ({ index, sort: index, ...item })) as DripTableColumn[];
              state.currentColumn = void 0;
            } catch {
              hasError = true;
              message.error('解析出错, 请传入正确的格式');
            } finally {
              if (!hasError) {
                globalActions.updateGlobalConfig(store);
                message.success('数据导入成功');
              }
            }
          } else if (modalStatus === 'export') { // 导出复制
            if (navigator.clipboard) {
              navigator.clipboard.writeText(JSON.stringify(getSchemaValue()))
                .then(
                  () => {
                    globalData.onExportSchema?.(getSchemaValue());
                    message.success('复制成功');
                    return void 0;
                  },
                )
                .catch(
                  () => {
                    message.error('复制失败');
                  },
                );
            } else {
              message.error('复制失败：您的浏览器不支持复制。');
            }
          }
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
