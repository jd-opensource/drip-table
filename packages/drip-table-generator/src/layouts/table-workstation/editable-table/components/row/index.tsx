/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import classNames from 'classnames';
import { DripTableBuiltInColumnSchema, DripTableExtraOptions, DripTableProps } from 'drip-table';
import React from 'react';

import { filterArray } from '@/utils';
import { DTGTableConfig } from '@/context';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

import TableCell from '../cell';

interface TableRowListProps<
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>{
  tableConfig: DTGTableConfig;
  record: RecordType;
  customComponents: DripTableProps<RecordType, ExtraOptions>['components'];
  customComponentPanel: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'] | undefined;
  mockDataSource: DripTableGeneratorProps<RecordType, ExtraOptions>['mockDataSource'];
  dataFields: DripTableGeneratorProps<RecordType, ExtraOptions>['dataFields'];
}

const VerticalAligns = {
  top: 'flex-start',
  middle: 'center',
  bottom: 'flex-end',
  stretch: 'stretch',
};

const TableRowList = <
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: TableRowListProps<RecordType, ExtraOptions>) => {
  const columnList = React.useMemo(() => props.tableConfig.columns.map((item, index) => ({ id: index + 1, column: item })), [props.tableConfig.columns]);
  const sortableColumns = filterArray(columnList, item => !item.column.fixed);

  const renderTableCell = React.useCallback((column: DripTableBuiltInColumnSchema) => (
    <div
      className={classNames('jfe-drip-table-generator-workstation-table-tr-td', {
        [props.tableConfig.configs.size || 'default']: props.tableConfig.configs.size,
      })}
      style={{
        justifyContent: column.align || 'center',
        alignItems: VerticalAligns[column.verticalAlign || 'middle'],
      }}
    >
      <TableCell
        record={props.record}
        column={column}
        customComponents={props.customComponents}
        customComponentPanel={props.customComponentPanel}
        mockDataSource={props.mockDataSource}
        dataFields={props.dataFields}
      />
    </div>
  ), []);

  return (
    <div className={classNames('jfe-drip-table-generator-workstation-table-tr-wrapper')}>
      { sortableColumns[0] && sortableColumns[0].id > 1
        ? props.tableConfig.columns
          .filter((item, index) => item.fixed && index < sortableColumns[0].id)
          .map((column, index) => renderTableCell(column as DripTableBuiltInColumnSchema))
        : null }
      <div
        style={{
          display: 'flex',
          width: typeof props.tableConfig.configs.scroll?.x === 'boolean' ? '100%' : props.tableConfig.configs.scroll?.x,
          overflowX: 'auto',
        }}
      >
        { props.tableConfig.columns.map((column, index) => renderTableCell(column as DripTableBuiltInColumnSchema)) }
      </div>
      { sortableColumns[sortableColumns.length - 1] && sortableColumns[sortableColumns.length - 1].id < columnList.length
        ? props.tableConfig.columns
          .filter((item, index) => item.fixed && index > sortableColumns[sortableColumns.length - 1].id)
          .map((column, index) => renderTableCell(column as DripTableBuiltInColumnSchema))
        : null }
    </div>
  );
};

export default TableRowList;
