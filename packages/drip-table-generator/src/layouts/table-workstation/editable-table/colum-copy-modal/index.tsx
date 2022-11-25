/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { Button, Input, message, Modal } from 'antd';
import React from 'react';
import Clipboard from 'react-clipboard.js';

interface ColumnCopyModalProps {
  visible: boolean;
  value: object;
  onClose: () => void;
}

const ColumnCopyModal = (props: ColumnCopyModalProps) => (
  <Modal
    title="复制列"
    visible={props.visible}
    footer={(
      <div>
        <Button onClick={props.onClose}>取消</Button>
        <Clipboard
          style={{ marginLeft: '8px' }}
          component="span"
          option-text={() => JSON.stringify({ ...props.value, index: void 0 }, null, 4)}
          onSuccess={() => {
            message.success('复制成功');
            props.onClose();
          }}
          onError={(e) => {
            message.error('复制失败：您的浏览器不支持复制。');
          }}
        >
          <Button type="primary">复制</Button>
        </Clipboard>
      </div>
    )}
    onCancel={props.onClose}
  >
    <Input.TextArea value={JSON.stringify({ ...props.value, index: void 0 }, null, 4)} style={{ minHeight: '560px' }} />
  </Modal>
);

export default ColumnCopyModal;
