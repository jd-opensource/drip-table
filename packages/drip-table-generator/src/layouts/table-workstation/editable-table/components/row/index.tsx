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
import { DripTableBuiltInColumnSchema, DripTableExtraOptions, DripTableProps } from 'drip-table';
import React from 'react';

import { filterArray, formatNumber } from '@/utils';
import { GeneratorContext } from '@/context';
import { DTGTableConfig } from '@/context/table-configs';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

import TableCell from '../cell';
import RowHeader from './row-header';

interface TableRowListProps<
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>{
  rowIndex: number;
  isLastRow?: boolean;
  scrollTarget: string;
  scrollLeft: number;
  tableConfig: DTGTableConfig;
  record: RecordType;
  containerWidth: number;
  hasSubTable?: boolean;
  customComponents: DripTableProps<RecordType, ExtraOptions>['components'];
  customComponentPanel?: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'];
  customColumnAddPanel?: DripTableGeneratorProps<RecordType, ExtraOptions>['customColumnAddPanel'];
  mockDataSource: DripTableGeneratorProps<RecordType, ExtraOptions>['mockDataSource'];
  dataFields: DripTableGeneratorProps<RecordType, ExtraOptions>['dataFields'];
  ext: DripTableGeneratorProps<RecordType, ExtraOptions>['ext'];
  icons: DripTableGeneratorProps<RecordType, ExtraOptions>['icons'];
  preview: DripTableGeneratorProps<RecordType, ExtraOptions>['preview'];
  defaultComponentLib: DripTableGeneratorProps<RecordType, ExtraOptions>['defaultComponentLib'];
  onEvent: DripTableGeneratorProps<RecordType, ExtraOptions>['onEvent'];
  slots: DripTableGeneratorProps<RecordType, ExtraOptions>['slots'];
  onScroll: (scrollLeft: number) => void;
  onClick: DripTableGeneratorProps<RecordType, ExtraOptions>['onClick'];
  onColumnItemChanged: DripTableGeneratorProps<RecordType, ExtraOptions>['onColumnItemChanged'];
  renderSelection: DripTableGeneratorProps<RecordType, ExtraOptions>['renderSelection'];
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
  const { currentTableID, currentColumnID, currentHoverColumnID, previewDataSource } = React.useContext(GeneratorContext);
  const scrollableRow = React.useRef<HTMLDivElement>(null);
  const columnList = React.useMemo(() => props.tableConfig.columns.map((item, index) => ({ id: index, column: item })), [props.tableConfig.columns]);
  const sortableColumns = filterArray(columnList, item => !item.column.fixed);
  let leftFixedColumns = filterArray(columnList, item => item.column.fixed === 'left');
  let rightFixedColumns = filterArray(columnList, item => item.column.fixed === 'right');
  if (sortableColumns.length > 0) {
    leftFixedColumns = filterArray(columnList, item => item.column.fixed === 'left' || (item.column.fixed && item.id < sortableColumns[0].id));
    rightFixedColumns = filterArray(columnList, item => item.column.fixed === 'right' || (item.column.fixed && item.id > sortableColumns[0].id));
  }
  React.useEffect(() => {
    if (scrollableRow.current && props.scrollTarget !== `__row_${props.rowIndex}`) {
      scrollableRow.current.scrollLeft = props.scrollLeft;
    }
  }, [props.scrollLeft, props.scrollTarget]);

  const formatColumnWidth = (column: DripTableBuiltInColumnSchema) => {
    if (typeof column.width === 'string' && column.width.endsWith('%')) {
      const rawColumnWidth = (Number(column.width.slice(0, -1)) * props.containerWidth) / 100;
      return `${rawColumnWidth}px`;
    }
    return formatNumber(column.width || 200);
  };

  const renderTableCell = (column: DripTableBuiltInColumnSchema, index: number, extraOptions?: {
    showRightShadow?: boolean;
    showLeftShadow?: boolean;
    isLastRow?: boolean;
  }) => (
    <div
      key={index}
      className={classNames('jfe-drip-table-generator-workstation-table-tr-td', {
        [props.tableConfig.configs.size || 'default']: props.tableConfig.configs.size,
        bordered: props.tableConfig.configs.bordered,
        checked: column.key === currentColumnID && props.tableConfig.tableId === currentTableID,
        hovered: column.key === currentHoverColumnID,
        'right-shadow': extraOptions?.showRightShadow,
        'left-shadow': extraOptions?.showLeftShadow,
        'last-row': extraOptions?.isLastRow,
      })}
      style={{
        ...typeof column.style === 'object' ? column.style : {},
        justifyContent: column.align || 'center',
        alignItems: VerticalAligns[column.verticalAlign || 'middle'],
        width: formatColumnWidth(column),
      }}
    >
      <TableCell
        record={props.record}
        column={column}
        rowIndex={index}
        columnIndex={props.tableConfig.columns.findIndex(item => item.key === column.key)}
        tableConfig={props.tableConfig}
        customComponents={props.customComponents}
        defaultComponentLib={props.defaultComponentLib}
        customComponentPanel={props.customComponentPanel}
        customColumnAddPanel={props.customColumnAddPanel}
        mockDataSource={props.mockDataSource}
        dataFields={props.dataFields}
        path={[]}
        ext={props.ext}
        icons={props.icons}
        preview={props.preview}
        onEvent={props.onEvent}
        onClick={props.onClick}
        onColumnItemChanged={props.onColumnItemChanged}
      />
    </div>
  );

  return (
    <React.Fragment>
      { props.tableConfig.configs.rowHeader && (
        <RowHeader
          ext={props.ext}
          slots={props.slots}
          tableConfig={props.tableConfig}
          configs={props.tableConfig.configs.rowHeader}
        />
      ) }
      <div
        className={classNames('jfe-drip-table-generator-workstation-table-tr-wrapper')}
        onClick={(e) => {
          e.stopPropagation();
          props.onClick?.('row-click', { record: props.record, recordIndex: props.rowIndex });
        }}
      >
        { props.tableConfig.hasSubTable && (
        <div
          className={classNames('jfe-drip-table-generator-workstation-table-tr-td operation-col', {
            [props.tableConfig.configs.size || 'default']: props.tableConfig.configs.size,
            bordered: !!props.tableConfig.configs.bordered,
          })}
        >
          { props.hasSubTable && <PlusSquareOutlined /> }
        </div>
        ) }
        { props.tableConfig.configs.rowSelection && (
        <div
          className={classNames('jfe-drip-table-generator-workstation-table-tr-td operation-col', {
            [props.tableConfig.configs.size || 'default']: props.tableConfig.configs.size,
            bordered: !!props.tableConfig.configs.bordered,
          })}
        >
          {
            props.renderSelection
              ? (
                <props.renderSelection
                  record={previewDataSource[props.rowIndex] as RecordType}
                  checked={false}
                  disabled={false}
                  onChange={() => false}
                />
              )
              : <Checkbox disabled />
          }
        </div>
        ) }
        { leftFixedColumns.length > 0
          ? leftFixedColumns.map((columnWrapper, index) =>
            renderTableCell(columnWrapper.column as DripTableBuiltInColumnSchema, columnWrapper.id, {
              showRightShadow: index === leftFixedColumns.length - 1,
              isLastRow: props.isLastRow,
            }))
          : null }
        <div
          ref={scrollableRow}
          className="jfe-drip-table-generator-workstation-table-tr-scrollbar"
          style={{
            width: typeof props.tableConfig.configs.scroll?.x === 'boolean' ? '100%' : props.tableConfig.configs.scroll?.x,
          }}
          onScroll={(e) => { if (props.scrollTarget === `__row_${props.rowIndex}`) { props.onScroll((e.target as HTMLDivElement).scrollLeft); } }}
        >
          <div style={{ display: 'flex' }}>
            { sortableColumns.map(columnWrapper =>
              renderTableCell(columnWrapper.column as DripTableBuiltInColumnSchema, columnWrapper.id, {
                isLastRow: props.isLastRow,
              })) }
          </div>
        </div>
        { rightFixedColumns.length > 0
          ? rightFixedColumns.map((columnWrapper, index) =>
            renderTableCell(columnWrapper.column as DripTableBuiltInColumnSchema, columnWrapper.id, {
              showLeftShadow: !index,
              isLastRow: props.isLastRow,
            }))
          : null }
      </div>
    </React.Fragment>

  );
};

export default TableRowList;
