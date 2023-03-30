/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { Alert, Col, Row } from 'antd';
import {
  DripTableBuiltInColumnSchema,
  DripTableExtraOptions,
  DripTableProps,
  TABLE_LAYOUT_COLUMN_RENDER_GENERATOR_DO_NOT_USE_IN_PRODUCTION as columnRenderGenerator,
} from 'drip-table';
import React from 'react';

import { filterAttributes } from '@/utils';
import { TableConfigsContext } from '@/context/table-configs';
import { getSchemaValue } from '@/layouts/utils';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

interface TableCellProps<
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  column: DripTableBuiltInColumnSchema;
  record: RecordType;
  customComponents: DripTableProps<RecordType, ExtraOptions>['components'];
  customComponentPanel: DripTableGeneratorProps<RecordType, ExtraOptions>['customComponentPanel'] | undefined;
  mockDataSource: DripTableGeneratorProps<RecordType, ExtraOptions>['mockDataSource'];
  dataFields: DripTableGeneratorProps<RecordType, ExtraOptions>['dataFields'];
}

const generatorComponentSchema = <T extends DripTableBuiltInColumnSchema | null>(column: T): T => (
  column
    ? {
      ...column,
      options: {
        ...filterAttributes(column.options, 'visibleFunc'),
      },
    }
    : column
);

const getIndex = (layout: number[], rowIndex: number, colIndex: number) => layout.slice(0, rowIndex).reduce((prev, curr) => prev + curr, 0) + colIndex;

const TableCell = <
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: TableCellProps<RecordType, ExtraOptions>) => {
  const { tableConfigs } = React.useContext(TableConfigsContext);

  // 组合组件支持可视化编辑
  if (props.column?.component === 'group') {
    const options = props.column.options;
    return (
      <TableConfigsContext.Consumer>
        { ({ updateTableConfig }) => (
          <div>
            { options.layout.map((colLength, rowIndex) => (
              <Row
                key={rowIndex}
                gutter={options.gutter ?? [0, 0]}
                justify={options.horizontalAlign}
                wrap={options.wrap}
              >
                { Array.from({ length: colLength }, (v, i) => i).map((col, colIndex) => {
                  const itemColumn = options.items[getIndex(options.layout, rowIndex, colIndex)];
                  return (
                    <Col
                      key={colIndex}
                      style={{
                        height: '100%',
                        overflow: 'auto',
                      }}
                    >
                      { itemColumn && <TableCell {...props} column={itemColumn} /> }
                    </Col>
                  );
                }) }
              </Row>
            )) }
          </div>
        ) }
      </TableConfigsContext.Consumer>
    );
  }
  const columnSchema = generatorComponentSchema(props.column);
  const renderCommonCell = columnSchema
    ? columnRenderGenerator<RecordType, ExtraOptions>(
      {
        uuid: 'DRIP-TABLE-GENERATOR-INSTANCE',
        schema: getSchemaValue(tableConfigs),
        dataSource: [props.record],
      },
      columnSchema,
      {
        components: props.customComponents,
        ext: void 0, // TODO: ext
        unknownComponent: <Alert type="error" message="未知组件" />,
        preview: true,
      },
    )
    : () => <div />;
  return (
    <React.Fragment>
      { renderCommonCell(null, { type: 'body', key: '$$KEY$$', record: props.record, index: 0 }, 0) }
    </React.Fragment>
  );
};

export default TableCell;
