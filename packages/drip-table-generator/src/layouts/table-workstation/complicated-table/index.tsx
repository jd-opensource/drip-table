/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import { PlusSquareOutlined } from '@ant-design/icons';
import { Checkbox, Empty } from 'antd';
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
import PaginationComponent from './pagination';
import TableContainer from './table-container';

export interface ComplicatedTableProps<
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
> extends DripTableGeneratorProps<RecordType, ExtraOptions> {
  index: number;
  tableConfig: DripTableGeneratorContext['tableConfigs'][number];
  dataSource: RecordType[];
  parent?: DripTableTableInformation<RecordType, ExtraOptions>;
  innerStyle?: React.CSSProperties;
}

const VerticalAligns = {
  top: 'flex-start',
  middle: 'center',
  bottom: 'flex-end',
  stretch: 'stretch',
};

const ComplicatedTable = <
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: ComplicatedTableProps<RecordType, ExtraOptions>) => {
  const context = React.useContext(GeneratorContext);
  const [columnList, setColumnList] = React.useState((props.tableConfig?.columns || []).map((col, idx) => ({ id: idx + 1, column: col })));
  const [dataSource, setDataSource] = React.useState(props.dataSource.map((record, idx) => ({ id: idx, record })));
  const [currentPage] = React.useState(1);
  const [columnIndexToCopy, setColumnIndexToCopy] = React.useState<number>(-1);
  const [columnIndexToInsert, setColumnIndexToInsert] = React.useState<number>(-1);
  const [columnToInsert, setColumnToInsert] = React.useState<string>('');

  const getAllComponentsConfigs = React.useMemo(() => getComponentsConfigs('', props.customComponentPanel), [props.customComponentPanel]);

  React.useEffect(() => {
    setColumnList(props.tableConfig?.columns.map((col, idx) => ({ id: idx + 1, column: col })) || []);
  }, [context.tableConfigs, props.tableConfig?.columns]);

  React.useEffect(() => {
    let previewDataSource = [...props.dataSource];
    if (props.tableConfig.configs.pagination) {
      const pageSize = props.tableConfig.configs.pagination.pageSize;
      previewDataSource = previewDataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    }
    setDataSource(previewDataSource.map((record, idx) => ({ id: idx, record })));
  }, [context.previewDataSource]);

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
      ...props.tableConfig,
      columns: [...props.tableConfig.columns, {
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
        ...props.tableConfig,
        columns: [...props.tableConfig.columns, context.columnToAdd],
      };
      context.setState({ tableConfigs: newTableConfigs });
    }
  };

  const resetDataSource = (start: number, size: number) => {
    const data = dataSource.map(item => item.record);
    const newDataSource = data.slice(start, size);
    setDataSource(newDataSource.map((rec, idx) => ({ id: idx, record: rec })));
  };

  return (
    <GeneratorContext.Consumer>
      { ({ currentColumn, tableConfigs, setState }) => {
        if (props.tableConfig.columns.length <= 0) {
          return (
            <TableContainer
              id={props.tableConfig.tableId}
              dataSource={props.dataSource}
              onClick={() => setState({ currentTableID: props.tableConfig.tableId })}
              onChangePageSize={(start, size) => resetDataSource(start, size)}
              onOpenSetting={() => setState({ drawerType: 'global' })}
            >
              <BlankPanel
                customComponentPanel={props.customComponentPanel}
                onMenuClick={component => addColumnFromMenu(component, setState)}
                onDropComponent={addColumnFromComponentBar}
              />
            </TableContainer>
          );
        }
        const paginationInHeader = props.tableConfig.configs.pagination && props.tableConfig.configs.pagination.position?.startsWith('top');
        const paginationInFooter = props.tableConfig.configs.pagination && props.tableConfig.configs.pagination.position?.startsWith('bottom');
        return (
          <TableContainer
            id={props.tableConfig.tableId}
            dataSource={props.dataSource}
            style={{ ...props.tableConfig.configs.innerStyle, width: 'max-content', minWidth: 'calc(100% - 8px)' }}
            onClick={() => setState({ currentTableID: props.tableConfig.tableId })}
            onChangePageSize={(start, size) => resetDataSource(start, size)}
            onOpenSetting={() => setState({ drawerType: 'global' })}
          >
            { props.parent?.record && (props.subtableTitle?.(props.parent.record, props.index || 0, props.parent) || '') }
            { props.parent?.record && props.tableConfig.configs.pagination && paginationInHeader
              ? (
                <PaginationComponent {...props.tableConfig.configs.pagination} dataSourceLength={props.dataSource.length} />
              )
              : null }
            <div style={{ display: 'flex' }}>
              <div className="left">
                <div style={{ display: 'flex', marginLeft: '1px' }}>
                  { props.tableConfig.subtable && (
                  <div
                    className={classNames(
                      'jfe-drip-table-generator-workstation-editable-table-thead',
                      `jfe-drip-table-generator-workstation-editable-table-${props.tableConfig.configs.size || 'default'}`,
                    )}
                    style={{ width: 44, border: '1px solid #f0f0f0' }}
                  />
                  ) }
                  { props.tableConfig.configs.rowSelection && (
                  <div
                    className={classNames(
                      'jfe-drip-table-generator-workstation-editable-table-thead',
                      `jfe-drip-table-generator-workstation-editable-table-${props.tableConfig.configs.size || 'default'}`,
                    )}
                    style={{ width: 44, border: '1px solid #f0f0f0' }}
                  />
                  ) }
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
                              currentTableID: props.tableConfig.tableId,
                              drawerType: currentColumn?.key === column.column?.key ? void 0 : 'column',
                            });
                          }}
                        >
                          <ColumnHeader
                            className={`jfe-drip-table-generator-workstation-complicated-table-thead${currentColumn?.key === column.column?.key ? '-checked' : ''}`}
                            style={{
                              ...typeof column.column.title === 'object' ? column.column.title.style : {},
                            }}
                            size={props.tableConfig.configs.size}
                            sticky
                            index={column.id - 1}
                            tableId={props.tableConfig.tableId}
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
                <div style={props.innerStyle}>
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
                              { props.tableConfig.subtable && (
                              <div className={classNames('jfe-drip-table-generator-workstation-complicated-table-filter', `jfe-drip-table-generator-workstation-complicated-table-td-${props.tableConfig.configs.size || 'default'}`)}>
                                <div className="jfe-drip-table-generator-workstation-complicated-table-cell">
                                  { hasSubTable && <PlusSquareOutlined /> }
                                </div>
                              </div>
                              ) }
                              { props.tableConfig.configs.rowSelection && (
                              <div className={classNames('jfe-drip-table-generator-workstation-complicated-table-filter', `jfe-drip-table-generator-workstation-complicated-table-td-${props.tableConfig.configs.size || 'default'}`)}>
                                <div className="jfe-drip-table-generator-workstation-complicated-table-cell"><Checkbox /></div>
                              </div>
                              ) }
                              {
                                columnList.map(column => (
                                  <div
                                    className={classNames(
                                      'jfe-drip-table-generator-workstation-complicated-table-td',
                                      `jfe-drip-table-generator-workstation-complicated-table-td-${props.tableConfig.configs.size || 'default'}`,
                                      {
                                        checked: currentColumn?.key === column.column?.key,
                                        'last-checked-item': currentColumn?.key === column.column?.key && index === dataSource.length - 1,
                                      },
                                    )}
                                    style={{ width: column.column.width, backgroundColor: props.tableConfig.configs.stripe && index % 2 === 1 ? '#fafafa' : void 0 }}
                                  >
                                    <div
                                      className="jfe-drip-table-generator-workstation-complicated-table-cell"
                                      style={{
                                        justifyContent: column.column.align,
                                        alignItems: VerticalAligns[column.column.verticalAlign || ''],
                                      }}
                                    >
                                      <EditableComponents
                                        record={record.record}
                                        column={column.column as unknown as DripTableBuiltInColumnSchema}
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
                          { (props.tableConfig.subtable && hasSubTable)
                          && (
                          <div className="subtable">
                            <ComplicatedTable
                              {...props}
                              innerStyle={void 0}
                              index={props.index + 1}
                              tableConfig={context.tableConfigs[props.index + 1]}
                              dataSource={record.record[tableConfigs[props.index + 1].dataSourceKey] as RecordType[] || []}
                              parent={tableInfo}
                            />
                          </div>
                          ) }
                        </React.Fragment>
                      );
                    })
                  }
                </div>
                { dataSource.length <= 0 && <Empty className="jfe-drip-table-generator-workstation-editable-table-empty-body" image={Empty.PRESENTED_IMAGE_SIMPLE} /> }
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
            { props.parent?.record && props.tableConfig.configs.pagination && paginationInFooter
              ? (
                <PaginationComponent {...props.tableConfig.configs.pagination} dataSourceLength={props.dataSource.length} />
              )
              : null }
            { props.parent?.record && (props.subtableFooter?.(props.parent.record, props.index || 0, props.parent) || '') }
            <ColumnCopyModal
              visible={columnIndexToCopy > -1}
              value={columnList[columnIndexToCopy]?.column}
              onClose={() => setColumnIndexToCopy(-1)}
            />
            <ColumnInsertModal
              visible={columnIndexToInsert >= 0 && columnIndexToInsert <= props.tableConfig.columns.length}
              value={columnToInsert}
              index={columnIndexToInsert}
              tableId={props.tableConfig.tableId}
              onChange={value => setColumnToInsert(value)}
              onClose={(columns) => {
                setColumnIndexToInsert(-1);
                setColumnToInsert('');
                if (columns) { setColumnList(columns.map((col, idx) => ({ id: idx + 1, column: col }))); }
              }}
            />
          </TableContainer>
        );
      } }
    </GeneratorContext.Consumer>
  );
};

export default ComplicatedTable;
