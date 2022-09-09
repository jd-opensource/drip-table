/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { ArrowLeftOutlined, ArrowRightOutlined, CopyOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Modal } from 'antd';
import classNames from 'classnames';
import { DripTableExtraOptions, DripTableRecordTypeBase } from 'drip-table';
import React from 'react';

import { mockId } from '@/utils';
import Icon from '@/components/Icon';
import { DripTableGeneratorContext, GeneratorContext } from '@/context';
import { getComponents, getGroups } from '@/layouts/utils';
import { DripTableGeneratorProps } from '@/typing';

import { defaultComponentIcon } from '../../components-bar/configs';
import EditableComponents from './components';

import styles from './index.module.less';

interface EditableTableProps<
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
> {
  driver: DripTableGeneratorProps<RecordType, ExtraOptions>['driver'];
  customComponents: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponents'];
  customComponentPanel: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'] | undefined;
}

const EditableTable = <
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
>(props: EditableTableProps<RecordType, ExtraOptions>) => {
  const [columnIndexToDrag, setColumnIndexToDrag] = React.useState<number>(-1);
  const [cellHeight, setCellHeight] = React.useState<number>();
  const context = React.useContext(GeneratorContext);

  React.useEffect(() => {
    setTimeout(() => {
      const columnsDOM = document.querySelectorAll('.drip-table-generator-editable-table-column');
      let maxHeight = 0;
      columnsDOM.forEach((dom) => {
        const cellNodeHeight = (dom.childNodes[1]?.childNodes[0] as HTMLDivElement)?.offsetHeight || 0;
        if (cellNodeHeight >= maxHeight) {
          maxHeight = cellNodeHeight;
        }
      });
      setCellHeight(maxHeight);
    }, 100);
  }, [context.columns.length]);

  const columnActions = (
    columnIndex: number,
    columns: DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>['columns'],
    setState: DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>['setState'],
  ) => (
    <Menu>
      <Menu.Item>
        <ArrowLeftOutlined style={{ marginRight: 5 }} />
        <span>向左插入列</span>
      </Menu.Item>
      <Menu.Item>
        <ArrowRightOutlined style={{ marginRight: 5 }} />
        <span>向右插入列</span>
      </Menu.Item>
      <Menu.Item>
        <CopyOutlined style={{ marginRight: 5 }} />
        <span>复制列</span>
      </Menu.Item>
      <Menu.Item onClick={() => {
        Modal.confirm({
          title: '删除列提醒',
          content: `确认删除该列（${columns[columnIndex]?.title}）吗？`,
          onOk: () => {
            setCellHeight(void 0);
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

  const menu = (
    columns: DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>['columns'],
    setState: DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>['setState'],
  ) => (
    <Menu>
      { getGroups(props.customComponentPanel).map((group, index) => (
        <Menu.ItemGroup key={index} title={group}>
          { getComponents(group, props.customComponentPanel).map((component, i) => (
            <Menu.Item
              key={`${index}_${i}`}
              onClick={() => {
                setCellHeight(void 0);
                setState({ columns: [...columns, {
                  key: `${component['ui:type']}_${mockId()}`,
                  dataIndex: '',
                  title: component.title,
                  width: void 0,
                  description: '',
                  component: component['ui:type'] as 'text',
                  options: {},
                  index: columns.length,
                }] });
              }}
            >
              <Icon svg={component.icon || defaultComponentIcon} className={styles['component-icon']} />
              <span>{ component.title }</span>
            </Menu.Item>
          )) }
        </Menu.ItemGroup>
      )) }
    </Menu>
  );

  return (
    <GeneratorContext.Consumer>
      { ({ columns, columnToAdd, currentColumn, globalConfigs, previewDataSource, setState }) => {
        if (columns.length <= 0) {
          return (
            <Dropdown overlay={menu(columns, setState)} trigger={['contextMenu']}>
              <div
                className={styles['table-column-skeleton']}
                onDragOver={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                }}
                onDrop={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  setCellHeight(void 0);
                  return columnToAdd ? setState({ columns: [columnToAdd], columnToAdd: void 0 }) : void 0;
                }}
              >
                拖拽组件至此处或者在此处右击
              </div>
            </Dropdown>
          );
        }
        return (
          <div className={styles['editable-table']}>
            { columns.map((column, columnIndex) => (
              <div
                key={columnIndex}
                className={classNames(styles['editable-table-column'], { [styles.checked]: currentColumn?.key === column.key })}
                onClick={(event) => {
                  event.preventDefault();
                  setState({ currentColumn: currentColumn?.key === column.key ? void 0 : column, drawerType: 'column' });
                }}
                draggable
                onDragStart={() => setColumnIndexToDrag(columnIndex)}
                onDragOver={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                }}
                onDrop={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  if (columnIndexToDrag >= 0 && columnIndex !== columnIndexToDrag) {
                    const tempColumnInfo = Object.assign({}, columns[columnIndexToDrag]);
                    columns.splice(columnIndexToDrag, 1);
                    columns.splice(columnIndex, 0, tempColumnInfo);
                    setState({ columns });
                  }
                }}
              >
                <div className={styles['editable-table-thead']}>
                  { column.title }
                  <Dropdown overlay={columnActions(columnIndex, columns, setState)} trigger={['click']}>
                    <MoreOutlined className={styles['action-button']} onClick={(event) => { event.stopPropagation(); }} />
                  </Dropdown>
                </div>
                <div className={styles['editable-table-tbody']}>
                  { previewDataSource.slice(0, globalConfigs.pagination ? globalConfigs.pagination.pageSize : void 0).map((record, index) => (
                    <div key={index} className={styles['editable-table-cell']} style={{ height: cellHeight }}>
                      <EditableComponents record={record} column={column} driver={props.driver} customComponents={props.customComponents} />
                    </div>
                  )) }
                </div>
              </div>
            )) }
            <Dropdown overlay={menu(columns, setState)} trigger={['contextMenu']}>
              <div
                className={styles['table-column-skeleton']}
                style={{ minWidth: 120 }}
                onDragOver={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                }}
                onDrop={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  if (columnToAdd) { setCellHeight(void 0); }
                  return columnToAdd ? setState({ columns: [...columns, columnToAdd], columnToAdd: void 0 }) : void 0;
                }}
              >
                拖拽组件至此处或者在此处右击
              </div>
            </Dropdown>
          </div>
        );
      } }
    </GeneratorContext.Consumer>
  );
};

export default EditableTable;
