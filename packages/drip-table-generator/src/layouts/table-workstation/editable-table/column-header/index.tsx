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
import { DripTableExtraOptions } from 'drip-table';
import React from 'react';

import RichText from '@/components/RichText';
import { DripTableGeneratorContext, GeneratorContext } from '@/context';

import styles from '../index.module.less';

interface ColumnHeaderProps<
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
>{
  style?: React.CSSProperties;
  sticky?: boolean;
  index: number;
  column: DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>['columns'][number];
  onInsert: (index: number) => void;
  onCopy: (index: number) => void;
  onDelete: (index: number) => void;
}
const ColumnHeader = <
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
>(props: ColumnHeaderProps<ExtraOptions>) => {
  const columnActions = (
    columnIndex: number,
    columns: DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>['columns'],
    setState: DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>['setState'],
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
            props.onDelete(columnIndex);
            columns.splice(columnIndex, 1);
            setState({ columns: [...columns] });
          },
        });
      }}
      >
        <DeleteOutlined style={{ marginRight: 5 }} />
        <span>删除列</span>
      </Menu.Item>
    </Menu>
  );

  const width = React.useMemo(() => {
    if (props.sticky) {
      return Number.isNaN(Number(props.column.width)) ? props.column.width || 180 : Number(props.column.width);
    }
    return void 0;
  }, [props.column.width, props.sticky]);

  return (
    <GeneratorContext.Consumer>
      { ({ columns, globalConfigs, setState }) => (
        <div
          key={props.index}
          className={classNames(styles['editable-table-thead'], styles[globalConfigs.size || 'default'])}
          style={{
            ...props.style,
            width,
            minWidth: 100,
          }}
        >
          <RichText className={styles['editable-table-column-title']} html={typeof props.column.title === 'string' ? props.column.title : props.column.title.body} />
          { props.column.description && (
            <Tooltip placement="top" overlay={<RichText html={props.column.description} />}>
              <span style={{ marginLeft: 6, verticalAlign: 'top' }}><QuestionCircleOutlined /></span>
            </Tooltip>
          ) }
          <Dropdown overlay={columnActions(props.index, columns, setState)} trigger={['click']}>
            <MoreOutlined className={styles['action-button']} onClick={(event) => { event.stopPropagation(); }} />
          </Dropdown>
        </div>
      ) }
    </GeneratorContext.Consumer>
  );
};

export default ColumnHeader;
