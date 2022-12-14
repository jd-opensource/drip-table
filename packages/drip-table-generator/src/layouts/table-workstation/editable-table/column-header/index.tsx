/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { ArrowLeftOutlined, ArrowRightOutlined, CopyOutlined, DeleteOutlined, MoreOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Modal, Tooltip } from 'antd';
import classNames from 'classnames';
import React from 'react';

import RichText from '@/components/RichText';
import { DripTableGeneratorContext, GeneratorContext } from '@/context';

import { getWidth } from '../../utils';

import styles from '../index.module.less';

interface ColumnHeaderProps{
  style?: React.CSSProperties;
  sticky?: boolean;
  index: number;
  column: DripTableGeneratorContext['columns'][number];
  onInsert: (index: number) => void;
  onCopy: (index: number) => void;
  onDelete: (index: number) => void;
}
const ColumnHeader = (props: ColumnHeaderProps) => {
  const context = React.useContext(GeneratorContext);
  const columnActions = (
    columnIndex: number,
    columns: DripTableGeneratorContext['columns'],
    setState: DripTableGeneratorContext['setState'],
  ) => (
    <Menu key={columnIndex}>
      <Menu.Item onClick={(event) => {
        event.domEvent.preventDefault();
        event.domEvent.stopPropagation();
        props.onInsert(columnIndex);
      }}
      >
        <ArrowLeftOutlined style={{ marginRight: 5 }} />
        <span>向左插入列</span>
      </Menu.Item>
      <Menu.Item onClick={(event) => {
        event.domEvent.preventDefault();
        event.domEvent.stopPropagation();
        props.onInsert(columnIndex + 1);
      }}
      >
        <ArrowRightOutlined style={{ marginRight: 5 }} />
        <span>向右插入列</span>
      </Menu.Item>
      <Menu.Item onClick={(event) => {
        event.domEvent.preventDefault();
        event.domEvent.stopPropagation();
        props.onCopy(columnIndex);
      }}
      >
        <CopyOutlined style={{ marginRight: 5 }} />
        <span>复制列</span>
      </Menu.Item>
      <Menu.Item onClick={(event) => {
        event.domEvent.preventDefault();
        event.domEvent.stopPropagation();
        Modal.confirm({
          title: '删除列提醒',
          content: `确认删除该列（${columns[columnIndex]?.title}）吗？`,
          okText: '删除',
          okButtonProps: { type: 'primary', danger: true },
          cancelText: '取消',
          onOk: () => {
            const isCurrentColumn = context.currentColumn?.key === columns[columnIndex]?.key;
            const isAttributePanelOpen = context.drawerType === 'column' && isCurrentColumn;
            props.onDelete(columnIndex);
            columns.splice(columnIndex, 1);
            setState({
              columns: [...columns],
              currentColumn: isCurrentColumn ? void 0 : context.currentColumn,
              drawerType: isAttributePanelOpen ? void 0 : context.drawerType,
            });
          },
        });
      }}
      >
        <DeleteOutlined style={{ marginRight: 5 }} />
        <span>删除列</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <GeneratorContext.Consumer>
      { ({ columns, globalConfigs, setState }) => {
        let columnTitle = '';
        if (typeof props.column.title === 'string') {
          columnTitle = props.column.title;
        } else if (typeof props.column.title.body === 'string') {
          columnTitle = props.column.title.body;
        } else {
          columnTitle = props.column.title.body.content;
        }
        return (
          <div
            key={props.index}
            className={classNames(styles['editable-table-thead'], styles[globalConfigs.size || 'default'])}
            style={{
              ...props.style,
              width: getWidth(props.column.width, 'px', props.sticky ? 0 : -4),
            }}
          >
            <RichText
              className={styles['editable-table-column-title']}
              style={{ width: props.column.description ? 'calc(100% - 34px)' : void 0 }}
              html={columnTitle}
            />
            { props.column.description && (
            <Tooltip placement="top" overlay={<RichText html={props.column.description} />}>
              <span style={{ marginLeft: 6, verticalAlign: 'top' }}><QuestionCircleOutlined /></span>
            </Tooltip>
            ) }
            <Dropdown overlay={columnActions(props.index, columns, setState)} trigger={['click']}>
              <MoreOutlined className={styles['action-button']} onClick={(event) => { event.stopPropagation(); }} />
            </Dropdown>
          </div>
        );
      } }
    </GeneratorContext.Consumer>
  );
};

export default ColumnHeader;
