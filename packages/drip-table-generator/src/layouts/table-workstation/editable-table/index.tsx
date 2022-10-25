/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { Checkbox } from 'antd';
import classNames from 'classnames';
import { DripTableExtraOptions, DripTableRecordTypeBase } from 'drip-table';
import React from 'react';

import { mockId } from '@/utils';
import { DripTableGeneratorContext, GeneratorContext } from '@/context';
import components from '@/table-components';
import { DripTableComponentAttrConfig, DripTableGeneratorProps, DTGComponentPropertySchema } from '@/typing';

import BlankPanel from './blank-panel';
import ColumnCopyModal from './colum-copy-modal';
import ColumnHeader from './column-header';
import ColumnInsertModal from './column-insert-modal';
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
  const [checkedList, setCheckedList] = React.useState<number[]>([]);
  const [indeterminate, setIndeterminate] = React.useState(false);
  const [checkAll, setCheckAll] = React.useState(false);
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
    }, 50);
  }, [context.globalConfigs.size, context.globalConfigs.sticky, context.globalConfigs.scroll?.y, context.globalConfigs.pagination]);

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

  const dataSource = React.useMemo(() => {
    const { previewDataSource, globalConfigs: { pagination } } = context;
    return previewDataSource.slice(0, pagination ? pagination.pageSize : void 0);
  }, [context.globalConfigs.pagination, context.previewDataSource]);

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
                  <ColumnHeader
                    style={{ border: '1px solid #f0f0f0' }}
                    sticky
                    index={columnIndex}
                    column={column}
                    onInsert={index => setColumnIndexToInsert(index)}
                    onCopy={index => setColumnIndexToCopy(index)}
                    onDelete={() => setCellHeight(void 0)}
                  />
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
                    { !globalConfigs.sticky && (
                    <div className={classNames(styles['editable-table-thead'], styles[globalConfigs.size || 'default'])} style={{ textAlign: 'center' }}>
                      <Checkbox
                        indeterminate={indeterminate}
                        checked={checkAll}
                        onChange={(e) => {
                          const options = Array.from({ length: dataSource.length }, (item, i) => i);
                          setCheckedList(e.target.checked ? options : []);
                          setIndeterminate(false);
                          setCheckAll(e.target.checked);
                        }}
                      />
                    </div>
                    ) }
                    <div className={styles['editable-table-tbody']} style={{ textAlign: 'center' }}>
                      {
                      dataSource.map((record, index) => (
                        <div
                          key={index}
                          className={classNames(styles['editable-table-cell'], styles[globalConfigs.size || 'default'])}
                          style={{ height: cellHeight, textAlign: 'center', backgroundColor: globalConfigs.stripe && index % 2 === 1 ? '#fafafa' : void 0 }}
                        >
                          <Checkbox
                            checked={checkedList.includes(index)}
                            onChange={(e) => {
                              const list = [...checkedList];
                              if (e.target.checked) {
                                list.push(index);
                              } else {
                                const point = list.indexOf(index);
                                if (point > -1) { list.splice(point, 1); }
                              }
                              setCheckedList(list);
                              setIndeterminate(!!list.length && list.length < dataSource.length);
                              setCheckAll(list.length === dataSource.length);
                            }}
                          />
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
                  style={{
                    width: Number.isNaN(Number(column.width)) ? column.width || void 0 : Number(column.width),
                  }}
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
                    <ColumnHeader
                      index={columnIndex}
                      column={column}
                      onInsert={index => setColumnIndexToInsert(index)}
                      onCopy={index => setColumnIndexToCopy(index)}
                      onDelete={() => setCellHeight(void 0)}
                    />
                  ) }
                  <div className={styles['editable-table-tbody']}>
                    { dataSource.map((record, index) => (
                      <div
                        key={index}
                        className={classNames(styles['editable-table-cell'], styles[globalConfigs.size || 'default'])}
                        style={{
                          height: cellHeight,
                          minWidth: 180,
                          width: Number.isNaN(Number(column.width)) ? column.width || void 0 : Number(column.width),
                          textAlign: column.align,
                          backgroundColor: globalConfigs.stripe && index % 2 === 1 ? '#fafafa' : void 0,
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
            <ColumnCopyModal
              visible={columnIndexToCopy > -1}
              value={columns[columnIndexToCopy]}
              onClose={() => setColumnIndexToCopy(-1)}
            />
            <ColumnInsertModal
              visible={columnIndexToInsert >= 0 && columnIndexToInsert <= columns.length}
              value={columnToInsert}
              index={columnIndexToInsert}
              onChange={value => setColumnToInsert(value)}
              onClose={() => { setColumnIndexToInsert(-1); setColumnToInsert(''); }}
            />
          </React.Fragment>
        );
      } }
    </GeneratorContext.Consumer>
  );
};

export default EditableTable;
