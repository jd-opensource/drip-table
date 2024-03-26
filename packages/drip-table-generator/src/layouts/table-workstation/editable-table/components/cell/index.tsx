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

import { DTGTableConfig, TableConfigsContext } from '@/context/table-configs';
import { updateColumnItemByPath, updateColumnItemByType } from '@/layouts/attributes-layout/utils';
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
  path: number[];
  tableConfig: DTGTableConfig;
  customComponents: DripTableProps<RecordType, ExtraOptions>['components'];
  customComponentPanel?: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'];
  customColumnAddPanel?: DripTableGeneratorProps<RecordType, ExtraOptions>['customColumnAddPanel'];
  mockDataSource: DripTableGeneratorProps<RecordType, ExtraOptions>['mockDataSource'];
  dataFields: DripTableGeneratorProps<RecordType, ExtraOptions>['dataFields'];
  ext?: DripTableGeneratorProps<RecordType, ExtraOptions>['ext'];
  icons?: DripTableGeneratorProps<RecordType, ExtraOptions>['icons'];
  onClick?: DripTableGeneratorProps<RecordType, ExtraOptions>['onClick'];
  onColumnItemChanged?: DripTableGeneratorProps<RecordType, ExtraOptions>['onColumnItemChanged'];
}

const TableCell = <
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: TableCellProps<RecordType, ExtraOptions>) => {
  const { tableConfigs } = React.useContext(TableConfigsContext);
  return (
    <TableConfigsContext.Consumer>
      { ({ setTableColumns }) => {
        const onChangeColumnItem: PopoverCellProps<RecordType, ExtraOptions>['onChangeColumnItem'] = (key, column, tableIndex, path) => {
          if (props.column.component === 'popover') {
            const rootColumnToChange = {
              ...props.column,
              options: {
                ...props.column.options,
                content: key === 'content' ? { ...column } : props.column.options?.content,
                popover: key === 'popover' ? { ...column } : props.column.options?.popover,
              },
            };
            const newColumns = [...props.tableConfig.columns];
            newColumns.splice(props.columnIndex, 1, rootColumnToChange);
            setTableColumns(newColumns, tableIndex);
            props.onColumnItemChanged?.('edit', {
              currentTableID: props.tableConfig.tableId,
              currentColumnID: rootColumnToChange.key,
              currentComponent: column,
              currentColumn: rootColumnToChange,
              currentComponentType: key,
              tableConfig: props.tableConfig,
            });
          } else if (props.column.component === 'group' && path) {
            const groupColumn = updateColumnItemByPath(props.column, path, column);
            const newColumns = [...props.tableConfig.columns];
            newColumns.splice(props.columnIndex, 1, groupColumn);
            setTableColumns(newColumns, tableIndex);
            props.onColumnItemChanged?.('edit', {
              currentTableID: props.tableConfig.tableId,
              currentColumnID: groupColumn.key,
              currentComponent: column,
              currentColumn: groupColumn,
              currentComponentType: key,
              tableConfig: props.tableConfig,
            });
          }
        };
        const onAddColumnItem: GroupCellProps<RecordType, ExtraOptions>['onAddColumnItem'] = (path, column, tableIndex, type) => {
          if (props.column.component === 'popover' && type) {
            const options = props.column.options;
            const groupColumn = updateColumnItemByPath(type === 'content' ? options.content : options.popover, path, column);
            const rootColumn = updateColumnItemByType(props.column, type, groupColumn);
            const newColumns = [...props.tableConfig.columns];
            newColumns.splice(props.columnIndex, 1, rootColumn);
            setTableColumns(newColumns, tableIndex);
            props.onColumnItemChanged?.('add', {
              currentTableID: props.tableConfig.tableId,
              currentColumnID: rootColumn.key,
              currentComponent: column,
              currentColumn: rootColumn,
              currentComponentType: type,
              currentComponentPath: path,
              tableConfig: props.tableConfig,
            });
          } else if (props.column.component === 'group') {
            const rootColumn = updateColumnItemByPath(props.column, path, column);
            const newColumns = [...props.tableConfig.columns];
            newColumns.splice(props.columnIndex, 1, rootColumn);
            setTableColumns(newColumns, tableIndex);
            props.onColumnItemChanged?.('add', {
              currentTableID: props.tableConfig.tableId,
              currentColumnID: rootColumn.key,
              currentComponent: column,
              currentColumn: rootColumn,
              currentComponentPath: path,
              tableConfig: props.tableConfig,
            });
          }
        };
        const onRemoveColumnItem: GroupCellProps<RecordType, ExtraOptions>['onRemoveColumnItem'] = (path, columnIndex, tableId, type) => {
          const tableIndex = tableConfigs.findIndex(item => item.tableId === tableId);
          if (tableIndex < -1) { return; }
          if (props.column.component === 'popover' && type) {
            const options = props.column.options;
            const groupColumn = updateColumnItemByPath(type === 'content' ? options.content : options.popover, path, null);
            const rootColumn = updateColumnItemByType(props.column, type, groupColumn);
            const newColumns = [...props.tableConfig.columns];
            newColumns.splice(props.columnIndex, 1, rootColumn);
            setTableColumns(newColumns, tableIndex);
            props.onColumnItemChanged?.('remove', {
              currentTableID: props.tableConfig.tableId,
              currentColumnID: rootColumn.key,
              currentColumn: rootColumn,
              currentComponentType: type,
              currentComponentPath: path,
              tableConfig: props.tableConfig,
            });
          } else if (props.column.component === 'group') {
            const rootColumn = updateColumnItemByPath(props.column, path, null);
            const newColumns = [...props.tableConfig.columns];
            newColumns.splice(props.columnIndex, 1, rootColumn);
            setTableColumns(newColumns, tableIndex);
            props.onColumnItemChanged?.('remove', {
              currentTableID: props.tableConfig.tableId,
              currentColumnID: rootColumn.key,
              currentColumn: rootColumn,
              currentComponentType: type,
              currentComponentPath: path,
              tableConfig: props.tableConfig,
            });
          }
        };
        return (
          <CellComponent
            {...props}
            icons={props.icons}
            schema={getSchemaValue(tableConfigs)}
            onChangeColumnItem={onChangeColumnItem}
            onAddColumnItem={onAddColumnItem}
            onRemoveColumnItem={onRemoveColumnItem}
          />
        );
      } }
    </TableConfigsContext.Consumer>
  );
};

export default TableCell;
