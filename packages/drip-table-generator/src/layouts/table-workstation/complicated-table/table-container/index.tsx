/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import '../index.less';

import { Button, Col, InputNumber, Modal, Row } from 'antd';
import classNames from 'classnames';
import { DripTableExtraOptions } from 'drip-table';
import React from 'react';

import { GeneratorContext } from '@/context';
import { DataSourceTypeAbbr } from '@/typing';

export interface TableContainerProps<
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  id: string;
  dataSource: { id: number; record: RecordType }[];
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick: () => void;
  onChangePageSize: (start: number, length: number) => void;
  onOpenSetting: () => void;
}

const TableContainer = <
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: TableContainerProps<RecordType, ExtraOptions>) => {
  const { currentTableID } = React.useContext(GeneratorContext);
  const [rowsModalVisible, setRowsModalVisible] = React.useState(false);
  const [startPosition, setStartPosition] = React.useState(0);
  const [dataSourceLength, setDataSourceLength] = React.useState(props.dataSource.length);
  return (
    <div
      id={props.id}
      className={classNames('jfe-drip-table-generator-workstation-complicated-table', { checked: props.id === currentTableID })}
      style={props.style}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        props.onClick();
      }}
    >
      { props.id === currentTableID && (
      <div className="jfe-drip-table-generator-workstation-complicated-table-tools">
        <Button
          style={{ marginRight: '6px' }}
          type="primary"
          size="small"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.onOpenSetting();
          }}
        >
          配置表格
        </Button>
        <Button type="primary" size="small" onClick={() => setRowsModalVisible(true)}>数据展示行数</Button>
      </div>
      ) }
      { props.children }
      <Modal
        open={rowsModalVisible}
        onOk={() => props.onChangePageSize(startPosition, dataSourceLength)}
        onCancel={() => setRowsModalVisible(false)}
        okText="确定"
        cancelText="取消"
        destroyOnClose
      >
        <Row>
          <Col span={8}>起始行</Col>
          <Col span={16}><InputNumber min={0} step={1} max={props.dataSource.length} value={startPosition} onChange={v => setStartPosition(v || 0)} /></Col>
        </Row>
        <Row>
          <Col span={8}>数据行数</Col>
          <Col span={16}><InputNumber min={0} step={1} max={props.dataSource.length} value={dataSourceLength} onChange={v => setDataSourceLength(v || 0)} /></Col>
        </Row>
      </Modal>
    </div>
  );
};

export default TableContainer;
