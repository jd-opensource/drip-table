/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import { PlusSquareOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import classNames from 'classnames';
import { DripTableBuiltInColumnSchema, DripTableExtraOptions, DripTableTableInformation } from 'drip-table';
import React from 'react';
import { ReactSortable } from 'react-sortablejs';

import { mockId } from '@/utils';
import { DripTableGeneratorContext, GeneratorContext } from '@/context';
import { getComponentsConfigs } from '@/layouts/utils';
import { DataSourceTypeAbbr, DripTableComponentAttrConfig, DripTableGeneratorProps, DTGComponentPropertySchema } from '@/typing';

import BlankPanel from '../editable-table/blank-panel';
import ColumnCopyModal from '../editable-table/colum-copy-modal';
import ColumnHeader from '../editable-table/column-header';
import ColumnInsertModal from '../editable-table/column-insert-modal';
import EditableComponents from '../editable-table/components';
import { MIN_WIDTH } from '../utils';

export interface ComplicatedTableProps<
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
> extends DripTableGeneratorProps<RecordType, ExtraOptions> {
  index: number;
  configs: DripTableGeneratorContext['tableConfigs'][number];
  dataSource: RecordType[];
  parent?: DripTableTableInformation<RecordType, ExtraOptions>;
}

const ComplicatedTable = <
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: ComplicatedTableProps<RecordType, ExtraOptions>) => {
  const context = React.useContext(GeneratorContext);
  const [columnList, setColumnList] = React.useState(props.configs.columns.map((col, idx) => ({ id: idx + 1, column: col })));
  const [dataSource] = React.useState(props.dataSource.map((record, idx) => ({
    id: idx,
    record,
  })));
  const [columnIndexToCopy, setColumnIndexToCopy] = React.useState<number>(-1);
  const [columnIndexToInsert, setColumnIndexToInsert] = React.useState<number>(-1);
  const [columnToInsert, setColumnToInsert] = React.useState<string>('');

  const getAllComponentsConfigs = React.useMemo(() => getComponentsConfigs('', props.customComponentPanel), [props.customComponentPanel]);

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

  const addColumnFromMenu = (component: DripTableComponentAttrConfig, setState: DripTableGeneratorContext['setState']) => {
    const configs = getColumnConfigs(component['ui:type']);
    const options: Record<string, unknown> = {};
    const additionalProps = {};
    configs?.attrSchema.forEach((schema) => {
      if (schema.name.startsWith('options.')) {
        options[schema.name.replace('options.', '')] = schema.default;
      } else if (!schema.name.startsWith('style') && !schema.name.startsWith('titleStyle')) {
        additionalProps[schema.name] = schema.default;
      }
    });
    if (component['ui:type'] === 'group') {
      options.items = [null, null];
    }
    const newTableConfigs = [...context.tableConfigs];
    newTableConfigs[props.index] = {
      ...props.configs,
      columns: [...props.configs.columns, {
        key: `${component['ui:type']}_${mockId()}`,
        dataIndex: '',
        title: component.title,
        width: void 0,
        description: '',
        component: component['ui:type'] as 'text',
        options,
        ...additionalProps,
      }],
    };
    setState({ tableConfigs: newTableConfigs });
  };

  const addColumnFromComponentBar = () => {
    if (context.columnToAdd) {
      const newTableConfigs = [...context.tableConfigs];
      newTableConfigs[props.index] = {
        ...props.configs,
        columns: [...props.configs.columns, context.columnToAdd],
      };
      context.setState({ tableConfigs: newTableConfigs });
    }
  };

  React.useEffect(() => {
    console.debug(context.tableConfigs, props.configs.columns);
    setColumnList(props.configs.columns.map((col, idx) => ({ id: idx + 1, column: col })));
  }, [context.tableConfigs, props.configs.columns]);

  return (
    <GeneratorContext.Consumer>
      { ({ currentColumn, currentTableID, tableConfigs, setState }) => {
        if (props.configs.columns.length <= 0) {
          return (
            <div
              id={props.configs.tableId}
              className={classNames('jfe-drip-table-generator-workstation-complicated-table', { checked: props.configs.tableId === currentTableID })}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setState({ currentTableID: props.configs.tableId });
              }}
            >
              <BlankPanel
                customComponentPanel={props.customComponentPanel}
                onMenuClick={component => addColumnFromMenu(component, setState)}
                onDropComponent={addColumnFromComponentBar}
              />
            </div>
          );
        }
        return (
          <div
            id={props.configs.tableId}
            className={classNames('jfe-drip-table-generator-workstation-complicated-table', { checked: props.configs.tableId === currentTableID })}
            style={{ width: 'max-content', minWidth: 'calc(100% - 8px)' }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setState({ currentTableID: props.configs.tableId });
            }}
          >
            { props.parent?.record && (props.subtableTitle?.(props.parent.record, props.index || 0, props.parent) || '') }
            <div style={{ display: 'flex' }}>
              <div className="left">
                <div style={{ display: 'flex', marginLeft: '1px' }}>
                  { props.configs.subtable && (
                  <div className={classNames(
                    'jfe-drip-table-generator-workstation-editable-table-thead',
                    `jfe-drip-table-generator-workstation-editable-table-${context.globalConfigs.size || 'default'}`,
                  )}
                  >
                    扩展
                  </div>
                  ) }
                  { props.configs.configs.rowSelection && <div className={classNames('jfe-drip-table-generator-workstation-editable-table-thead', `jfe-drip-table-generator-workstation-editable-table-${context.globalConfigs.size || 'default'}`)}>选择</div> }
                  <ReactSortable animation={250} list={columnList} setList={setColumnList} style={{ display: 'flex' }}>
                    {
                      columnList.map(column => (
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const newColumn = { ...column.column } as DripTableGeneratorContext['currentColumn'];
                            setState({
                              currentColumn: currentColumn?.key === column.column?.key ? void 0 : newColumn,
                              currentTableID: props.configs.tableId,
                              drawerType: currentColumn?.key === column.column?.key ? void 0 : 'column',
                            });
                          }}
                        >
                          <ColumnHeader
                            className={`jfe-drip-table-generator-workstation-complicated-table-thead${currentColumn?.key === column.column?.key ? '-checked' : ''}`}
                            style={{
                              ...typeof column.column.title === 'object' ? column.column.title.style : {},
                            }}
                            sticky
                            index={column.id - 1}
                            tableId={props.configs.tableId}
                            column={{ ...column.column, innerIndexForGenerator: column.id }}
                            onInsert={index => setColumnIndexToInsert(index)}
                            onCopy={index => setColumnIndexToCopy(index)}
                            onDelete={() => false}
                          />
                        </div>
                      ))
                    }
                  </ReactSortable>
                </div>
                {
                  dataSource.map((record, index) => {
                    const hasSubTable = tableConfigs[props.index + 1] && Object.keys(record.record).includes(tableConfigs[props.index + 1].dataSourceKey);
                    const tableInfo: DripTableTableInformation<RecordType, ExtraOptions> = {
                      uuid: tableConfigs[props.index]?.tableId,
                      schema: {
                        ...tableConfigs[props.index]?.configs,
                        id: tableConfigs[props.index]?.tableId,
                        columns: tableConfigs[props.index]?.columns,
                        dataSourceKey: tableConfigs[props.index]?.dataSourceKey,
                      } as DripTableTableInformation<RecordType, ExtraOptions>['schema'],
                      dataSource: record.record?.[tableConfigs[props.index + 1]?.dataSourceKey || ''] as RecordType[] || [],
                      record: record.record,
                    };
                    return (
                      <React.Fragment>
                        <div className="jfe-drip-table-generator-workstation-complicated-table-line" key={index}>
                          <div style={{ display: 'flex' }}>
                            { props.configs.subtable && (
                            <div className="jfe-drip-table-generator-workstation-complicated-table-filter">
                              <div className="jfe-drip-table-generator-workstation-complicated-table-cell">
                                { hasSubTable && <PlusSquareOutlined /> }
                              </div>
                            </div>
                            ) }
                            { props.configs.configs.rowSelection && (
                            <div className="jfe-drip-table-generator-workstation-complicated-table-filter">
                              <div className="jfe-drip-table-generator-workstation-complicated-table-cell"><Checkbox /></div>
                            </div>
                            ) }
                            {
                              columnList.map(column => (
                                <div
                                  className={classNames(
                                    'jfe-drip-table-generator-workstation-complicated-table-td',
                                    {
                                      checked: currentColumn?.key === column.column?.key,
                                      'last-checked-item': currentColumn?.key === column.column?.key && index === dataSource.length - 1,
                                    },
                                  )}
                                  style={{ width: column.column.width }}
                                >
                                  <div
                                    className="jfe-drip-table-generator-workstation-complicated-table-cell"
                                    style={{
                                      textAlign: column.column.align,
                                      alignItems: column.column.verticalAlign,
                                    }}
                                  >
                                    <EditableComponents
                                      record={record.record}
                                      column={column.column as unknown as DripTableBuiltInColumnSchema}
                                      driver={props.driver}
                                      customComponents={props.customComponents}
                                      customComponentPanel={props.customComponentPanel}
                                      mockDataSource={props.mockDataSource}
                                      dataFields={props.dataFields}
                                    />
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                        { (props.configs.subtable && hasSubTable)
                        && (
                        <div className="subtable">
                          <ComplicatedTable
                            {...props}
                            index={props.index + 1}
                            configs={context.tableConfigs[props.index + 1]}
                            dataSource={record.record.subtable as RecordType[] || []}
                            parent={tableInfo}
                          />
                        </div>
                        ) }
                      </React.Fragment>
                    );
                  })
                }
              </div>
              <div className="right">
                <BlankPanel
                  style={{
                    minWidth: MIN_WIDTH,
                    height: '100%',
                  }}
                  customComponentPanel={props.customComponentPanel}
                  onMenuClick={component => addColumnFromMenu(component, setState)}
                  onDropComponent={addColumnFromComponentBar}
                />
              </div>
            </div>
            { props.parent?.record && (props.subtableFooter?.(props.parent.record, props.index || 0, props.parent) || '') }
            <ColumnCopyModal
              visible={columnIndexToCopy > -1}
              value={columnList[columnIndexToCopy]?.column}
              onClose={() => setColumnIndexToCopy(-1)}
            />
            <ColumnInsertModal
              visible={columnIndexToInsert >= 0 && columnIndexToInsert <= props.configs.columns.length}
              value={columnToInsert}
              index={columnIndexToInsert}
              tableId={props.configs.tableId}
              onChange={value => setColumnToInsert(value)}
              onClose={(columns) => {
                setColumnIndexToInsert(-1);
                setColumnToInsert('');
                if (columns) { setColumnList(columns.map((col, idx) => ({ id: idx + 1, column: col }))); }
              }}
            />
          </div>
        );
      } }
    </GeneratorContext.Consumer>
  );
};

export default ComplicatedTable;
