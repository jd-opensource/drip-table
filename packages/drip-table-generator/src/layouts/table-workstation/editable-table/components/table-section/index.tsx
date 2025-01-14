import './index.less';

import classNames from 'classnames';
import { DripTableBuiltInColumnSchema, DripTableExtraOptions, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, ExtractDripTableExtraOption } from 'drip-table';
import React from 'react';

import { formatNumber } from '@/utils';
import { GeneratorContext } from '@/context';
import { DTGTableConfig } from '@/context/table-configs';
import { DripTableGeneratorProps } from '@/typing';

import TableCell from '../cell';

export interface TableSectionProps<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> extends DripTableGeneratorProps<RecordType, ExtraOptions> {
  tableConfig: DTGTableConfig;
  record: { id: number; record: RecordType };
  rowIndex: number;
  columnList: { id: number; column: DTGTableConfig['columns'][number] }[];
  containerWidth: number;
  isLastRow: boolean;
}

const VerticalAligns = {
  top: 'flex-start',
  middle: 'center',
  bottom: 'flex-end',
  stretch: 'stretch',
};

function TableSection<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: TableSectionProps<RecordType, ExtraOptions>) {
  const { currentTableID, currentColumnID, currentHoverColumnID } = React.useContext(GeneratorContext);
  const formatColumnWidth = (column: DripTableBuiltInColumnSchema) => {
    if (typeof column.width === 'string' && column.width.endsWith('%')) {
      const rawColumnWidth = (Number(column.width.slice(0, -1)) * props.containerWidth) / 100;
      return `${rawColumnWidth}px`;
    }
    return formatNumber(column.width || 200);
  };
  return (
    <React.Fragment>
      {props.columnList.map((columnWrapper, colIndex) => (
        <div
          className={classNames('jfe-drip-table-generator-workstation-table-tr-td', 'cell', {
            [props.tableConfig.configs.size || 'default']: props.tableConfig.configs.size,
            bordered: props.tableConfig.configs.bordered,
            checked: columnWrapper.column.key === currentColumnID && props.tableConfig.tableId === currentTableID,
            hovered: columnWrapper.column.key === currentHoverColumnID,
            'last-row': props?.isLastRow,
          })}
          style={{
            ...typeof columnWrapper.column.style === 'object' ? columnWrapper.column.style : {},
            justifyContent: columnWrapper.column.align || 'center',
            alignItems: VerticalAligns[columnWrapper.column.verticalAlign || 'middle'],
            width: formatColumnWidth(columnWrapper.column as DripTableBuiltInColumnSchema),
          }}
        >
          <TableCell
            record={props.record.record}
            column={columnWrapper.column as DripTableBuiltInColumnSchema}
            rowIndex={props.rowIndex}
            columnIndex={colIndex}
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
            schemaFunctionPreprocessor={props.schemaFunctionPreprocessor}
          />
        </div>
      ))}
    </React.Fragment>
  );
}

export default TableSection;
