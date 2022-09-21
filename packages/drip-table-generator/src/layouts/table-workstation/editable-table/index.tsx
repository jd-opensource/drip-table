/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { ArrowLeftOutlined, ArrowRightOutlined, CopyOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { Dropdown, Input, Menu, message, Modal } from 'antd';
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
  onDropComponent: () => void;
}

const EditableTable = <
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
>(props: EditableTableProps<RecordType, ExtraOptions>) => {
  const [columnIndexToDrag, setColumnIndexToDrag] = React.useState<number>(-1);
  const [cellHeight, setCellHeight] = React.useState<number>();
  const [columnIndexToCopy, setColumnIndexToCopy] = React.useState<number>(-1);
  const [columnIndexToInsert, setColumnIndexToInsert] = React.useState<number>(-1);
  const [columnToInsert, setColumnToInsert] = React.useState<string>('');
  const context = React.useContext(GeneratorContext);

  React.useEffect(() => {
    setTimeout(() => {
      const columnsDOM = document.querySelectorAll('.drip-table-generator-editable-table-column');
      let maxHeight = 0;
      columnsDOM.forEach((dom) => {
        const cell = (dom.childNodes[1]?.childNodes[0]?.firstChild as HTMLDivElement) || null;
        const cellNodeHeight = ((cell?.offsetHeight || 0) + 14) || 0;
        if (cellNodeHeight >= maxHeight) {
          maxHeight = cellNodeHeight;
        }
      });
      setCellHeight(maxHeight);
    }, 50);
  }, [context.columns.length, context.currentColumn]);

  const columnActions = (
    columnIndex: number,
    columns: DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>['columns'],
    setState: DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>['setState'],
  ) => (
    <Menu key={columnIndex}>
      <Menu.Item onClick={(event) => {
        event.domEvent.preventDefault();
        event.domEvent.stopPropagation();
        setColumnIndexToInsert(columnIndex);
      }}
      >
        <ArrowLeftOutlined style={{ marginRight: 5 }} />
        <span>向左插入列</span>
      </Menu.Item>
      <Menu.Item onClick={(event) => {
        event.domEvent.preventDefault();
        event.domEvent.stopPropagation();
        setColumnIndexToInsert(columnIndex + 1);
      }}
      >
        <ArrowRightOutlined style={{ marginRight: 5 }} />
        <span>向右插入列</span>
      </Menu.Item>
      <Menu.Item onClick={(event) => {
        event.domEvent.preventDefault();
        event.domEvent.stopPropagation();
        setColumnIndexToCopy(columnIndex);
      }}
      >
        <CopyOutlined
          style={{ marginRight: 5 }}
        />
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
        let columnWidth = '';
        columns.forEach((item) => {
          if (item.width) {
            if (Number.isNaN(Number(item.width))) {
              columnWidth += (/(px|%|r?em|pt|vw|cm|in|pc)$/ui).test(String(item.width)) ? ` - ${String(item.width)}` : ' - 180px';
            } else {
              columnWidth += ` - ${Number(item.width)}px`;
            }
          } else {
            columnWidth += ' - 180px';
          }
        });
        return (
          <div className={styles['editable-table']}>
            { columns.map((column, columnIndex) => (
              <div
                key={columnIndex}
                className={classNames(styles['editable-table-column'], { [styles.checked]: currentColumn?.key === column.key })}
                style={{ width: column.width || void 0 }}
                onClick={(event) => {
                  event.preventDefault();
                  setState({
                    currentColumn: currentColumn?.key === column.key ? void 0 : column,
                    drawerType: currentColumn?.key === column.key ? void 0 : 'column',
                  });
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
                    <div key={index} className={styles['editable-table-cell']} style={{ height: cellHeight, width: column.width || void 0 }}>
                      <EditableComponents record={record} column={column} driver={props.driver} customComponents={props.customComponents} />
                    </div>
                  )) }
                </div>
              </div>
            )) }
            <Dropdown overlay={menu(columns, setState)} trigger={['contextMenu']}>
              <div
                className={styles['table-column-skeleton']}
                style={{ minWidth: 120, width: columnWidth.length > 0 ? `calc(100% ${columnWidth})` : void 0 }}
                onDragOver={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                }}
                onDrop={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  if (columnToAdd) { setCellHeight(void 0); }
                  props.onDropComponent();
                  return columnToAdd ? setState({ columns: [...columns, columnToAdd], columnToAdd: void 0 }) : void 0;
                }}
              >
                拖拽组件至此处或者在此处右击
              </div>
            </Dropdown>
            <Modal
              title="复制列"
              visible={columnIndexToCopy > -1}
              onCancel={() => setColumnIndexToCopy(-1)}
              onOk={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(JSON.stringify({ ...columns[columnIndexToCopy], index: void 0 }, null, 4))
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
                setColumnIndexToCopy(-1);
              }}
            >
              <Input.TextArea value={JSON.stringify({ ...columns[columnIndexToCopy], index: void 0 }, null, 4)} style={{ minHeight: '560px' }} />
            </Modal>
            <Modal
              title="插入列"
              visible={columnIndexToInsert >= 0 && columnIndexToInsert <= columns.length}
              onCancel={() => { setColumnIndexToInsert(-1); setColumnToInsert(''); }}
              onOk={() => {
                try {
                  const jsonVal = JSON.parse(columnToInsert);
                  const column = { ...jsonVal, index: columnIndexToInsert };
                  columns.splice(columnIndexToInsert, 0, column);
                  for (let i = columnIndexToInsert + 1; i < columns.length; i++) { columns[i].index += 1; }
                  setState({ columns: [...columns] }, () => {
                    setColumnIndexToInsert(-1);
                    setColumnToInsert('');
                  });
                } catch {
                  message.error('参数输入不合法');
                }
              }}
            >
              <Input.TextArea style={{ minHeight: '560px' }} onChange={e => setColumnToInsert(e.target.value)} />
            </Modal>
          </div>
        );
      } }
    </GeneratorContext.Consumer>
  );
};

export default EditableTable;
