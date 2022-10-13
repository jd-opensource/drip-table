/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { ArrowLeftOutlined, ArrowRightOutlined, CopyOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { Checkbox, Dropdown, Input, Menu, message, Modal } from 'antd';
import classNames from 'classnames';
import { DripTableExtraOptions, DripTableRecordTypeBase } from 'drip-table';
import React from 'react';

import { mockId } from '@/utils';
import { DripTableGeneratorContext, GeneratorContext } from '@/context';
import components from '@/table-components';
import { DripTableComponentAttrConfig, DripTableGeneratorProps, DTGComponentPropertySchema } from '@/typing';

import BlankPanel from './blank-panel';
import EditableComponents from './components';

import styles from './index.module.less';

interface EditableTableProps<
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
> {
  driver: DripTableGeneratorProps<RecordType, ExtraOptions>['driver'];
  customComponents: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponents'];
  customComponentPanel: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'] | undefined;
  mockDataSource: DripTableGeneratorProps<RecordType, ExtraOptions>['mockDataSource'];
  dataFields: DripTableGeneratorProps<RecordType, ExtraOptions>['dataFields'];
  onDropComponent: () => void;
}

const sizePadding = {
  small: 8,
  default: 12,
  middle: 12,
  large: 16,
};

const headerHeight = {
  small: ' - 43px',
  default: ' - 51px',
  middle: ' - 51px',
  large: ' - 59px',
};

const EditableTable = <
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
>(props: EditableTableProps<RecordType, ExtraOptions>) => {
  const [columnIndexToDrag, setColumnIndexToDrag] = React.useState<number>(-1);
  const [cellHeight, setCellHeight] = React.useState<number>();
  const [blankHeight, setBlankHeight] = React.useState<number>();
  const [columnIndexToCopy, setColumnIndexToCopy] = React.useState<number>(-1);
  const [columnIndexToInsert, setColumnIndexToInsert] = React.useState<number>(-1);
  const [columnToInsert, setColumnToInsert] = React.useState<string>('');
  const context = React.useContext(GeneratorContext);
  const table = React.useRef<HTMLDivElement>(null);

  const getAllComponentsConfigs = React.useMemo(() => {
    let componentsToUse = components;
    if (props.customComponentPanel) {
      const customComponents = props.customComponentPanel.configs;
      componentsToUse = props.customComponentPanel.mode === 'add' ? [...components, ...customComponents] : [...customComponents];
    }
    return [...componentsToUse];
  }, [props.customComponentPanel]);

  const getColumnConfigs = (componentType: string) => {
    const columnConfig = getAllComponentsConfigs.find(schema => schema['ui:type'] === componentType);
    columnConfig?.attrSchema.forEach((schema) => {
      const uiProps = schema['ui:props'];
      if (!uiProps) {
        return;
      }
      if (uiProps.optionsParam === '$$FIELD_KEY_OPTIONS$$') {
        uiProps.options = props.mockDataSource
          ? Object.keys(context.previewDataSource[0] || {}).map(key => ({ label: key, value: key }))
          : props.dataFields?.map(key => ({ label: key, value: key })) || [];
      }
      if (uiProps.items) {
        (uiProps.items as DTGComponentPropertySchema[])?.forEach((item, index) => {
          const itemUiProps = item['ui:props'];
          if (!itemUiProps) {
            return;
          }
          if (itemUiProps.optionsParam === '$$FIELD_KEY_OPTIONS$$') {
            itemUiProps.options = props.mockDataSource
              ? Object.keys(context.previewDataSource[0] || {}).map(key => ({ label: key, value: key }))
              : props.dataFields?.map(key => ({ label: key, value: key })) || [];
          }
        });
      }
    });
    return columnConfig;
  };

  React.useEffect(() => {
    setTimeout(() => {
      const columnsDOM = document.querySelectorAll('.drip-table-generator-editable-table-column');
      let maxHeight = 0;
      columnsDOM.forEach((dom) => {
        const index = context.globalConfigs.sticky ? 0 : 1;
        const cell = (dom.childNodes[index]?.childNodes[0]?.firstChild as HTMLDivElement) || null;
        const delta = sizePadding[context.globalConfigs.size || 'default'];
        const cellNodeHeight = ((cell?.offsetHeight || 0) + delta * 2 + 2) || 0;
        if (cellNodeHeight >= maxHeight) {
          maxHeight = cellNodeHeight;
        }
      });
      setCellHeight(maxHeight);
    }, 50);
  }, [context.columns.length, context.currentColumn, context.globalConfigs.size]);

  React.useEffect(() => {
    setTimeout(() => {
      const columnsDOM = document.querySelectorAll('.drip-table-generator-editable-table-column');
      const siblingHeight = columnsDOM[columnsDOM.length - 1]?.scrollHeight;
      const tableHeight = table.current?.scrollHeight;
      setBlankHeight(siblingHeight || tableHeight);
    }, 800);
  }, [context.globalConfigs.size, context.globalConfigs.sticky, context.globalConfigs.scroll?.y]);

  const columnWidth = React.useMemo(() => {
    let width = '';
    context.columns.forEach((item) => {
      if (item.width) {
        if (Number.isNaN(Number(item.width))) {
          width += (/(px|%|r?em|pt|vw|cm|in|pc)$/ui).test(String(item.width)) ? ` - ${String(item.width)}` : ' - 180px';
        } else {
          width += ` - ${Number(item.width)}px`;
        }
      } else {
        width += ' - 180px';
      }
    });
    return width;
  }, [context.columns, context.currentColumn]);

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

  const onMenuClick = (
    component: DripTableComponentAttrConfig,
    columns: DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>['columns'],
    setState: DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>['setState'],
  ) => {
    setCellHeight(void 0);
    const configs = getColumnConfigs(component['ui:type']);
    const options: Record<string, unknown> = {};
    const additionalProps = {};
    configs?.attrSchema.forEach((schema) => {
      if (schema.name.startsWith('options.')) {
        options[schema.name.replace('options.', '')] = schema.default;
      } else {
        additionalProps[schema.name] = schema.default;
      }
    });
    if (component['ui:type'] === 'group') {
      options.items = [null, null];
    }
    setState({ columns: [...columns, {
      key: `${component['ui:type']}_${mockId()}`,
      dataIndex: '',
      title: component.title,
      width: void 0,
      description: '',
      component: component['ui:type'] as 'text',
      options,
      index: columns.length,
      ...additionalProps,
    }] });
  };

  return (
    <GeneratorContext.Consumer>
      { ({ columns, columnToAdd, currentColumn, globalConfigs, previewDataSource, setState }) => {
        if (columns.length <= 0) {
          return (
            <BlankPanel
              customComponentPanel={props.customComponentPanel}
              onMenuClick={component => onMenuClick(component, columns, setState)}
              onDropComponent={() => {
                setCellHeight(void 0);
                return columnToAdd ? setState({ columns: [columnToAdd], columnToAdd: void 0 }) : void 0;
              }}
            />
          );
        }
        return (
          <React.Fragment>
            { globalConfigs.sticky && (
              <div style={{ display: 'flex' }}>
                { globalConfigs.rowSelection && <div className={classNames(styles['editable-table-thead'], styles[globalConfigs.size || 'default'])} style={{ textAlign: 'center', width: 48 }}><Checkbox /></div> }
                { columns.map((column, columnIndex) => (
                  <div
                    key={columnIndex}
                    className={classNames(styles['editable-table-thead'], styles[globalConfigs.size || 'default'])}
                    style={{ minWidth: 180, border: '1px solid #f0f0f0', width: column.width || void 0 }}
                  >
                    { column.title }
                    <Dropdown overlay={columnActions(columnIndex, columns, setState)} trigger={['click']}>
                      <MoreOutlined className={styles['action-button']} onClick={(event) => { event.stopPropagation(); }} />
                    </Dropdown>
                  </div>
                )) }
              </div>
            ) }
            <div
              className={classNames(styles['editable-table'], {
                [styles.bordered]: globalConfigs.bordered,
                [styles.sticky]: globalConfigs.sticky || globalConfigs.scroll?.y,
              })}
              style={{ height: globalConfigs.sticky ? globalConfigs.scroll?.y || `calc(100% - 42px${headerHeight[globalConfigs.size || 'default']})` : globalConfigs.scroll?.y }}
              ref={table}
            >
              { globalConfigs.rowSelection
                ? (
                  <div className={styles['editable-table-column']} style={{ minWidth: 48, width: 48 }}>
                    { !globalConfigs.sticky && <div className={classNames(styles['editable-table-thead'], styles[globalConfigs.size || 'default'])} style={{ textAlign: 'center' }}><Checkbox /></div> }
                    <div className={styles['editable-table-tbody']} style={{ textAlign: 'center' }}>
                      {
                      previewDataSource.slice(0, globalConfigs.pagination ? globalConfigs.pagination.pageSize : void 0).map((record, index) => (
                        <div className={classNames(styles['editable-table-cell'], styles[globalConfigs.size || 'default'])} style={{ height: cellHeight, textAlign: 'center' }}>
                          <Checkbox />
                        </div>
                      ))
                    }
                    </div>
                  </div>
                )
                : null }
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
                  { !globalConfigs.sticky && (
                  <div className={classNames(styles['editable-table-thead'], styles[globalConfigs.size || 'default'])}>
                    { column.title }
                    <Dropdown overlay={columnActions(columnIndex, columns, setState)} trigger={['click']}>
                      <MoreOutlined className={styles['action-button']} onClick={(event) => { event.stopPropagation(); }} />
                    </Dropdown>
                  </div>
                  ) }
                  <div className={styles['editable-table-tbody']}>
                    { previewDataSource.slice(0, globalConfigs.pagination ? globalConfigs.pagination.pageSize : void 0).map((record, index) => (
                      <div
                        key={index}
                        className={classNames(styles['editable-table-cell'], styles[globalConfigs.size || 'default'])}
                        style={{
                          height: cellHeight,
                          width: column.width || void 0,
                          textAlign: column.align,
                        }}
                      >
                        <EditableComponents
                          record={record}
                          column={column}
                          driver={props.driver}
                          customComponents={props.customComponents}
                          customComponentPanel={props.customComponentPanel}
                          mockDataSource={props.mockDataSource}
                          dataFields={props.dataFields}
                        />
                      </div>
                    )) }
                  </div>
                </div>
              )) }
              <BlankPanel
                style={{
                  minWidth: 120,
                  width: columnWidth.length > 0 ? `calc(100% ${columnWidth})` : void 0,
                  height: globalConfigs.sticky || globalConfigs.scroll?.y ? blankHeight : void 0,
                }}
                customComponentPanel={props.customComponentPanel}
                onMenuClick={component => onMenuClick(component, columns, setState)}
                onDropComponent={() => {
                  if (columnToAdd) { setCellHeight(void 0); }
                  props.onDropComponent();
                  return columnToAdd ? setState({ columns: [...columns, columnToAdd], columnToAdd: void 0 }) : void 0;
                }}
              />

            </div>
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
          </React.Fragment>
        );
      } }
    </GeneratorContext.Consumer>
  );
};

export default EditableTable;
