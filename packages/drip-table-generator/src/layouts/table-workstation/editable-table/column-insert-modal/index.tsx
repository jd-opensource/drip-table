/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { Input, message, Modal } from 'antd';
import React from 'react';

import { mockId } from '@/utils';
import { DripTableGeneratorContext, GeneratorContext } from '@/context';

interface ColumnInsertModalProps {
  visible: boolean;
  value: string;
  index: number;
  tableId: string;
  onChange: (value: string) => void;
  onClose: (columns?: DripTableGeneratorContext['tableConfigs'][number]['columns']) => void;
}

const ColumnInsertModal = (props: ColumnInsertModalProps) => (
  <GeneratorContext.Consumer>
    { ({ tableConfigs, setState }) => (
      <Modal
        title="插入列"
        visible={props.visible}
        onCancel={() => props.onClose()}
        onOk={() => {
          const currentTableIndex = tableConfigs.findIndex(item => item.tableId === props.tableId);
          const columns = currentTableIndex > -1 ? tableConfigs[currentTableIndex].columns : void 0;
          try {
            const jsonVal = JSON.parse(props.value);
            if (typeof jsonVal !== 'object'
            || !Object.keys(jsonVal).includes('component')
            || !Object.keys(jsonVal).includes('title')) {
              message.error('参数输入不合法');
              return;
            }
            const column = { ...jsonVal };
            column.key = `${column.component}_${mockId()}`;
            columns?.splice(props.index, 0, column);
            const newTableConfigs = [...tableConfigs];
            newTableConfigs[currentTableIndex] = {
              ...newTableConfigs[currentTableIndex],
              columns: [...columns || []],
            };
            setState({ tableConfigs: newTableConfigs }, () => {
              props.onClose(columns);
            });
          } catch {
            message.error('参数输入不合法');
          }
        }}
      >
        <Input.TextArea value={props.value} style={{ minHeight: '560px' }} onChange={e => props.onChange(e.target.value)} />
      </Modal>
    ) }
  </GeneratorContext.Consumer>
);

export default ColumnInsertModal;
