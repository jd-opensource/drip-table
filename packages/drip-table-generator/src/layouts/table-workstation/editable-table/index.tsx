/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import { DripTableBuiltInColumnSchema, DripTableExtraOptions, DripTableTableInformation } from 'drip-table';
import React from 'react';

import { DTGTableConfig, GeneratorTableConfigsContext } from '@/context/table-configs';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

import TableContainer from '../components/table-container';
import TableCell from './components/cell';
import ColumnHeaderList from './components/column-list';

export interface EditableTableProps<
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
> extends DripTableGeneratorProps<RecordType, ExtraOptions> {
  index: number;
  tableConfig: DTGTableConfig;
  dataSource: RecordType[];
  parent?: DripTableTableInformation<RecordType, ExtraOptions>;
}

const EditableTable = <
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: EditableTableProps<RecordType, ExtraOptions>) => {
  const tableHeight = React.useMemo(() => {
    if (props.tableConfig.configs.scroll?.y && typeof props.tableConfig.configs.scroll?.y !== 'boolean') {
      return props.tableConfig.configs.scroll?.y;
    }
    return '100%';
  }, []);
  return (
    <GeneratorTableConfigsContext.Consumer>
      { ({ tableConfigs, setTableColumns }) => (
        <TableContainer>
          <div
            className="jfe-drip-table-generator-workstation-table-wrapper"
            style={{ height: tableHeight, overflow: props.tableConfig.configs.sticky ? 'hidden' : 'auto' }}
          >
            { props.tableConfig.configs.sticky
              ? (
                <div>
                  <ColumnHeaderList
                    tableConfig={props.tableConfig}
                    onResort={newColumns => setTableColumns([...newColumns], props.index)}
                  />
                </div>
              )
              : null }
            <div style={props.tableConfig.configs.sticky ? { height: tableHeight, overflow: 'auto' } : void 0}>
              <ColumnHeaderList
                tableConfig={props.tableConfig}
                onResort={newColumns => setTableColumns([...newColumns], props.index)}
              />
              { props.dataSource.map((record, rowIndex) => {
                const hasSubTable = tableConfigs[props.index + 1] && Object.keys(record).includes(tableConfigs[props.index + 1].dataSourceKey);
                const tableInfo: DripTableTableInformation<RecordType, ExtraOptions> = {
                  uuid: tableConfigs[props.index]?.tableId,
                  schema: {
                    ...tableConfigs[props.index]?.configs,
                    id: tableConfigs[props.index]?.tableId,
                    columns: tableConfigs[props.index]?.columns,
                    dataSourceKey: tableConfigs[props.index]?.dataSourceKey,
                  } as DripTableTableInformation<RecordType, ExtraOptions>['schema'],
                  dataSource: record?.[tableConfigs[props.index + 1]?.dataSourceKey || ''] as RecordType[] || [],
                  record,
                };
                return (
                  <div>
                    { props.tableConfig.columns.map((column, colIndex) => (
                      <TableCell
                        record={record}
                        column={column as DripTableBuiltInColumnSchema}
                        customComponents={props.customComponents}
                        customComponentPanel={props.customComponentPanel}
                        mockDataSource={props.mockDataSource}
                        dataFields={props.dataFields}
                      />
                    )) }
                    { (props.tableConfig.hasSubTable && hasSubTable)
                  && (
                  <div className="subtable">
                    <EditableTable
                      {...props}
                      index={props.index + 1}
                      tableConfig={tableConfigs[props.index + 1]}
                      dataSource={record[tableConfigs[props.index + 1].dataSourceKey] as RecordType[] || []}
                      parent={tableInfo}
                    />
                  </div>
                  ) }
                  </div>
                );
              }) }
            </div>
          </div>

        </TableContainer>
      ) }
    </GeneratorTableConfigsContext.Consumer>
  );
};

export default EditableTable;
