/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import {
  DripTableBuiltInColumnSchema,
  DripTableExtraOptions,
  DripTableProps,
} from 'drip-table';
import React from 'react';

import { GeneratorContext } from '@/context';
import { DTGTableConfig, TableConfigsContext } from '@/context/table-configs';
import { updateColumnItemByPath } from '@/layouts/attributes-layout/utils';
import { getSchemaValue } from '@/layouts/utils';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

import CellComponent from './cell';
import { GroupCellProps } from './group';
import { PopoverCellProps } from './popover';

interface TableCellProps<
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  column: DripTableBuiltInColumnSchema;
  columnIndex: number;
  record: RecordType;
  rowIndex: number;
  path: (number | 'content' | 'popover')[];
  tableConfig: DTGTableConfig;
  customComponents: DripTableProps<RecordType, ExtraOptions>['components'];
  customComponentPanel?: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'];
  customColumnAddPanel?: DripTableGeneratorProps<RecordType, ExtraOptions>['customColumnAddPanel'];
  mockDataSource: DripTableGeneratorProps<RecordType, ExtraOptions>['mockDataSource'];
  dataFields: DripTableGeneratorProps<RecordType, ExtraOptions>['dataFields'];
  ext?: DripTableGeneratorProps<RecordType, ExtraOptions>['ext'];
  icons?: DripTableGeneratorProps<RecordType, ExtraOptions>['icons'];
  preview?: DripTableGeneratorProps<RecordType, ExtraOptions>['preview'];
  onEvent?: DripTableGeneratorProps<RecordType, ExtraOptions>['onEvent'];
  defaultComponentLib?: DripTableGeneratorProps<RecordType, ExtraOptions>['defaultComponentLib'];
  onClick?: DripTableGeneratorProps<RecordType, ExtraOptions>['onClick'];
  onColumnItemChanged?: DripTableGeneratorProps<RecordType, ExtraOptions>['onColumnItemChanged'];
}

function TableCell<
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: TableCellProps<RecordType, ExtraOptions>) {
  const { tableConfigs } = React.useContext(TableConfigsContext);
  return (
    <TableConfigsContext.Consumer>
      { ({ setTableColumns }) => {
        const onChangeColumnItem: PopoverCellProps<RecordType, ExtraOptions>['onChangeColumnItem'] = (path, schema, tableIndex) => {
          const newColumns = [...props.tableConfig.columns];
          const newColumn = updateColumnItemByPath(newColumns[props.columnIndex], path, schema);
          newColumns.splice(props.columnIndex, 1, newColumn);
          setTableColumns(newColumns, tableIndex);
          props.onColumnItemChanged?.('edit', {
            currentTableID: props.tableConfig.tableId,
            currentColumnID: newColumn.key,
            currentComponent: schema,
            currentColumn: newColumn,
            currentComponentPath: path,
            tableConfig: props.tableConfig,
          });
        };
        const onAddColumnItem: GroupCellProps<RecordType, ExtraOptions>['onAddColumnItem'] = (path, schema, tableIndex) => {
          const newColumn = updateColumnItemByPath(props.column, path, schema);
          const newColumns = [...props.tableConfig.columns];
          newColumns.splice(props.columnIndex, 1, newColumn);
          setTableColumns(newColumns, tableIndex);
          props.onColumnItemChanged?.('add', {
            currentTableID: props.tableConfig.tableId,
            currentColumnID: newColumn.key,
            currentComponent: schema,
            currentColumn: newColumn,
            currentComponentPath: path,
            tableConfig: props.tableConfig,
          });
        };
        const onRemoveColumnItem: GroupCellProps<RecordType, ExtraOptions>['onRemoveColumnItem'] = (path, columnIndex, tableId) => {
          const tableIndex = tableConfigs.findIndex(item => item.tableId === tableId);
          if (tableIndex < -1) { return; }
          const newColumn = updateColumnItemByPath(props.column, path, null);
          const newColumns = [...props.tableConfig.columns];
          newColumns.splice(props.columnIndex, 1, newColumn);
          setTableColumns(newColumns, tableIndex);
          props.onColumnItemChanged?.('remove', {
            currentTableID: props.tableConfig.tableId,
            currentColumnID: newColumn.key,
            currentColumn: newColumn,
            currentComponentPath: path,
            tableConfig: props.tableConfig,
          });
        };
        return (
          <GeneratorContext.Consumer>
            { ({ setState }) => (
              <CellComponent
                {...props}
                icons={props.icons}
                schema={getSchemaValue(tableConfigs)}
                onChangeColumnItem={onChangeColumnItem}
                onAddColumnItem={onAddColumnItem}
                onRemoveColumnItem={onRemoveColumnItem}
                onClick={(type, payload) => {
                  setState({
                    ...payload,
                    currentColumnID: props.column.key,
                    drawerType: type as 'table' | 'column' | 'column-item' | undefined,
                  });
                  props.onClick?.(type, {
                    ...payload,
                    currentColumnID: props.column.key,
                  });
                }}
              />
            ) }
          </GeneratorContext.Consumer>
        );
      } }
    </TableConfigsContext.Consumer>
  );
}

export default TableCell;
