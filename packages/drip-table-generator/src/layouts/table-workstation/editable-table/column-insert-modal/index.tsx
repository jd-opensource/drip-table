/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { Input, message, Modal } from 'antd';
import React from 'react';

import { GeneratorContext } from '@/context';

interface ColumnInsertModalProps {
  visible: boolean;
  value: string;
  index: number;
  onChange: (value: string) => void;
  onClose: () => void;
}

const ColumnInsertModal = (props: ColumnInsertModalProps) => (
  <GeneratorContext.Consumer>
    { ({ columns, setState }) => (
      <Modal
        title="插入列"
        visible={props.visible}
        onCancel={props.onClose}
        onOk={() => {
          try {
            const jsonVal = JSON.parse(props.value);
            const column = { ...jsonVal, index: props.index };
            columns.splice(props.index, 0, column);
            for (let i = props.index + 1; i < columns.length; i++) { columns[i].index += 1; }
            setState({ columns: [...columns] }, () => {
              props.onClose();
            });
          } catch {
            message.error('参数输入不合法');
          }
        }}
      >
        <Input.TextArea style={{ minHeight: '560px' }} onChange={e => props.onChange(e.target.value)} />
      </Modal>
    ) }
  </GeneratorContext.Consumer>
);

export default ColumnInsertModal;
