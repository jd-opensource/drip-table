/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : renwenci (ararakikon@163.com)
 * @modifier : renwenci (ararakikon@163.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import './index.less';

import React, { useMemo } from 'react';

import { DripTableExtraOptions, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable } from '@/types';
import { useTableContext } from '@/hooks';
import { type ExtractDripTableExtraOption, TABLE_LAYOUT_COLUMN_RENDER_GENERATOR_DO_NOT_USE_IN_PRODUCTION as columnRenderGenerator } from '@/index';

import { DripTableColumnRenderOptions } from '../table/types';
import { finalizeColumnTitle } from '../table/utils';
import { TableLayoutComponentProps } from '../types';

function CardLayout<
RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: TableLayoutComponentProps): JSX.Element {
  const { props: tableProps, info: tableInfo, state: tableState, createExecutor, execute, safeExecute, finalizeString } = useTableContext<RecordType, ExtraOptions>();

  const extraProps: DripTableColumnRenderOptions<RecordType, ExtraOptions>['extraProps'] = {
    components: tableProps.components,
    ext: tableProps.ext,
    onEvent: tableProps.onEvent,
    onDataSourceChange: tableProps.onDataSourceChange,
    createExecutor,
    execute,
    safeExecute,
    finalizeString,
  };

  const mergedColumns = useMemo(() => {
    const { columns, layout } = tableInfo.schema;
    if (layout?.card?.columns) {
      const rel = columns.filter((col) => {
        const cardCol = layout.card?.columns.find(s => col.key === s.key);
        if (cardCol) {
          return !cardCol.hideInLayout;
        }
        return true;
      }).map((col) => {
        const cardCol = layout.card?.columns.find(s => col.key === s.key);
        return cardCol
          ? Object.assign({}, col, cardCol)
          : col;
      });
      return rel;
    }
    return columns;
  }, [tableInfo.schema]);

  const CARDSIZE = tableInfo.schema.layout?.card?.rowSize || 0;
  const MARGIN = 2;
  const width = ((100 + MARGIN) / CARDSIZE) - MARGIN;
  return (
    <div className="jfe-drip-table-layout-card-main">
      { props.header }
      <div className="jfe-drip-table-layout-card-container" style={{ gridTemplateColumns: `repeat(auto-fill, ${width}%)` }}>
        {
          tableProps.dataSource.map(record => (
            <div
              className="jfe-drip-table-layout-card-item"
            >
              {
              mergedColumns
                .filter(column => !column.hidable || tableState.displayColumnKeys.includes(column.key))
                .map(column => ({ ...column, render: columnRenderGenerator(tableInfo, column, extraProps) }))
                .map(col => (
                  <div key={col.key}>
                    { col.title && <div className="jfe-drip-table-layout-card-title">{ finalizeColumnTitle(col) }</div> }
                    { col.render?.(null, { record, index: 0, type: 'body', key: '0' }, 0) }
                  </div>
                ))
            }
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default CardLayout;
