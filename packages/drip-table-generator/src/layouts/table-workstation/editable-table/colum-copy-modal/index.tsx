/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { Input, message, Modal } from 'antd';
import React from 'react';

interface ColumnCopyModalProps {
  visible: boolean;
  value: object;
  onClose: () => void;
}

const ColumnCopyModal = (props: ColumnCopyModalProps) => (
  <Modal
    title="复制列"
    visible={props.visible}
    onCancel={props.onClose}
    onOk={() => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(JSON.stringify({ ...props.value, index: void 0 }, null, 4))
          .then(
            () => {
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
      props.onClose();
    }}
  >
    <Input.TextArea value={JSON.stringify({ ...props.value, index: void 0 }, null, 4)} style={{ minHeight: '560px' }} />
  </Modal>
);

export default ColumnCopyModal;
