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
import { DripTableExtraOptions, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, DripTableTableInformation, ExtractDripTableExtraOption } from 'drip-table';
import React from 'react';

import { formatNumber, mockId } from '@/utils';
import { DTGTableConfig, TableConfigsContext } from '@/context/table-configs';
import { DripTableGeneratorProps } from '@/typing';

import EditableTable from '../..';
import ColumnHeader from '../column-header';
import TableSection from '../table-section';

export interface LeftFixedColumnsProps<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never
> extends DripTableGeneratorProps<RecordType, ExtraOptions> {
  tableConfig: DTGTableConfig;
  previewDataSource: ({ id: number; record: RecordType })[];
  containerWidth: number;
  rowHeight: number | undefined;
  columnList: { id: number; column: DTGTableConfig['columns'][number] }[];
  ref?: React.RefObject<LeftFixedColumnsHandler>;
  rowHeaderHeights?: number[];
}

export interface LeftFixedColumnsHandler {
  getRowHeight: () => number[];
  getSubTableHeight: () => number[];
}

function LeftFixedColumnsInner<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never
>(
  props: LeftFixedColumnsProps<RecordType, ExtraOptions>,
  ref: React.ForwardedRef<LeftFixedColumnsHandler>,
) {
  const { tableConfigs } = React.useContext(TableConfigsContext);
  const currentTableIndex = tableConfigs.findIndex(c => c.tableId === props.tableConfig.tableId);
  const rowRef = React.createRef<HTMLDivElement>();
  const containerRef = React.createRef<HTMLDivElement>();
  const leftMargins = React.useMemo(() => {
    let margin = 0;
    if (props.tableConfig.hasSubTable) {
      margin += props.tableConfig.configs.bordered ? 50 : 48;
    }
    if (props.tableConfig.configs.rowSelection) {
      margin += props.tableConfig.configs.bordered ? 49 : 48;
    }
    for (let i = 0; i < props.columnList.length; i++) {
      const column = props.columnList[i].column;
      const width = column.width ? formatNumber(String(column.width).replace('px', '').replace('%', '') || 200) as number : 200;
      margin += Math.max(width, 120);
    }
    if (props.columnList.length > 0 && !props.tableConfig.configs.bordered) {
      margin += 3;
    }
    return margin;
  }, [props.tableConfig.hasSubTable, props.tableConfig.configs, props.columnList]);
  React.useImperativeHandle(ref, () => ({
    getRowHeight: () => {
      let maxCellHeight = 0;
      const rowHeight = rowRef.current?.offsetHeight ?? 0;
      for (const element of (rowRef.current?.children || []) as HTMLDivElement[]) {
        if (element.children[0]) {
          const trueCellHeight = (element.children[0] as HTMLDivElement).offsetHeight + 28;
          if (trueCellHeight > maxCellHeight) {
            maxCellHeight = trueCellHeight;
          }
        }
      }
      return [rowHeight, maxCellHeight];
    },
    getSubTableHeight: () => {
      const rows = (containerRef.current?.children || []) as HTMLDivElement[];
      const start = props.tableConfig.configs.showHeader ? 1 : 0;
      const subTableHeights: number[] = [];
      for (let i = start; i < rows.length; i++) {
        if (rows[i].className === 'jfe-drip-table-generator-workstation-table-row'
          || rows[i].className === 'jfe-drip-table-generator-workstation-table-row stripe'
        ) {
          if (rows[i + 1]?.className === 'subtable') {
            subTableHeights.push(rows[i + 1].offsetHeight);
          } else {
            subTableHeights.push(0);
          }
        }
      }
      return subTableHeights;
    },
  }));
  return (
    <div
      className={classNames('jfe-drip-table-generator-workstation-table-fixed-column left', {
        bordered: props.columnList.length > 0 || props.tableConfig.hasSubTable || props.tableConfig.configs.rowSelection,
      })}
      ref={containerRef}
      style={{ width: props.tableConfig.hasSubTable ? leftMargins : void 0 }}
    >
      <div className={classNames(
        'jfe-drip-table-generator-workstation-table-row jfe-drip-table-generator-workstation-table-header',
        {
          sticky: props.tableConfig.configs.sticky,
          invisible: props.tableConfig.configs.showHeader === false,
        },
      )}
      >
        {props.tableConfig.hasSubTable && (
          <div
            className={classNames('jfe-drip-table-generator-workstation-table-header-item disabled', {
              [props.tableConfig.configs.size || 'default']: props.tableConfig.configs.size,
              bordered: !!props.tableConfig.configs.bordered,
            })}
            style={{ width: 48, minWidth: 48 }}
          />
        )}
        {props.tableConfig.configs.rowSelection && (
          <div
            className={classNames('jfe-drip-table-generator-workstation-table-header-item disabled', {
              [props.tableConfig.configs.size || 'default']: props.tableConfig.configs.size,
              bordered: !!props.tableConfig.configs.bordered,
            })}
            style={{ width: 48, minWidth: 48 }}
          >
            <Checkbox disabled />
          </div>
        )}
        {props.columnList.map(columnWrapper => (
          <ColumnHeader
            tableConfig={props.tableConfig}
            column={columnWrapper.column}
            columnId={columnWrapper.id}
            customColumnAddPanel={props.customColumnAddPanel}
            customComponentPanel={props.customComponentPanel}
            columnTools={props.columnTools}
            dataSource={props.previewDataSource}
            onClick={props.onClick}
            renderHeaderCellFilter={props.renderHeaderCellFilter}
            containerWidth={props.containerWidth}
          />
        ))}
      </div>
      {props.previewDataSource.map((record, rowIndex) => {
        const hasSubTable = tableConfigs[currentTableIndex + 1] && Object.keys(record.record || {}).includes(tableConfigs[currentTableIndex + 1]?.dataSourceKey);
        const tableInfo: DripTableTableInformation<RecordType, ExtraOptions> = {
          uuid: props.tableConfig?.tableId,
          schema: {
            ...props.tableConfig?.configs,
            id: props.tableConfig.tableId ?? mockId(),
            columns: props.tableConfig?.columns,
            dataSourceKey: props.tableConfig?.dataSourceKey,
          } as DripTableTableInformation<RecordType, ExtraOptions>['schema'],
          dataSource: record?.[tableConfigs[currentTableIndex + 1]?.dataSourceKey || ''] as RecordType[] || [],
          record: record.record,
        };
        return (
          <React.Fragment>
            {props.tableConfig.configs.rowHeader && (
              <div style={{ width: '100%', height: props.rowHeaderHeights?.[rowIndex] || 0 }} />
            )}
            <div
              className={classNames('jfe-drip-table-generator-workstation-table-row', {
                stripe: props.tableConfig.configs.stripe && rowIndex % 2 === 1,
              })}
              ref={rowRef}
              style={{ height: props.rowHeight }}
            >
              {props.tableConfig.hasSubTable && (
                <div
                  className={classNames('jfe-drip-table-generator-workstation-table-tr-td operation-col', {
                    [props.tableConfig.configs.size || 'default']: props.tableConfig.configs.size,
                    bordered: !!props.tableConfig.configs.bordered,
                  })}
                >
                  {hasSubTable && <PlusSquareOutlined />}
                </div>
              )}
              {props.tableConfig.configs.rowSelection && (
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
                          record={record.record}
                          checked={false}
                          disabled={false}
                          onChange={() => false}
                        />
                      )
                      : <Checkbox disabled />
                  }
                </div>
              )}
              <TableSection
                {...props}
                record={record}
                rowIndex={rowIndex}
                columnList={props.columnList}
                tableConfig={props.tableConfig}
                containerWidth={props.containerWidth}
                isLastRow={rowIndex === props.previewDataSource.length - 1}
              />
            </div>
            {(props.tableConfig.hasSubTable && hasSubTable)
              && (
                <div className="subtable" style={{ marginLeft: 12, padding: '32px 0 12px 0', zIndex: 11, position: 'relative' }}>
                  <EditableTable
                    {...props}
                    index={currentTableIndex + 1}
                    tableConfig={tableConfigs[currentTableIndex + 1]}
                    dataSource={record.record[tableConfigs[currentTableIndex + 1].dataSourceKey] as RecordType[] || []}
                    parent={tableInfo}
                  />
                </div>
              )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// 使用 forwardRef 包装
const LeftFixedColumns = React.forwardRef(LeftFixedColumnsInner) as <RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never>(props: LeftFixedColumnsProps<RecordType, ExtraOptions>, ref: React.ForwardedRef<LeftFixedColumnsHandler>) => JSX.Element;

export default LeftFixedColumns;
