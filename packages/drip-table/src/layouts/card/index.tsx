/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : renwenci (ararakikon@163.com)
 * @modifier : renwenci (ararakikon@163.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import React, { useMemo } from 'react';

import { DripTableExtraOptions, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable } from '@/types';
import { indexValue } from '@/utils/operator';

import { columnGenerator } from '../table';
import { TableLayoutComponentProps } from '../types';

import styles from './index.module.less';

const CardLayout = <
RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: TableLayoutComponentProps<RecordType, ExtraOptions>): JSX.Element => {
  const { tableProps, tableInfo, tableState } = props;

  const extraProps = {
    driver: tableProps.driver,
    components: tableProps.components,
    ext: tableProps.ext,
    onEvent: tableProps.onEvent,
    onDataSourceChange: tableProps.onDataSourceChange,
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

  const CARDSIZE = tableInfo.schema.layout?.card?.rowSize ? tableInfo.schema.layout?.card?.rowSize : 0;
  const MARGIN = 2;
  const width = ((100 + MARGIN) / CARDSIZE) - MARGIN;
  return (
    <div className={styles.main}>
      { props.header }
      <div className={styles['card-container']} style={{ gridTemplateColumns: `repeat(auto-fill, ${width}%)` }}>
        {
          tableProps.dataSource.map(record => (
            <div
              className={styles['card-item']}
            >
              {
              mergedColumns
                .filter(column => !column.hidable || tableState.displayColumnKeys.includes(column.key))
                .map(column => columnGenerator(tableInfo, column, extraProps))
                .map(col => (
                  <div key={col.key}>
                    { col.title && <div className={styles.title}>{ col.title }</div> }
                    { /* TODO: 这写的什么鬼垃圾，为什么会跨 layout 依赖？扯淡呢？ */ }
                    { col.render?.(indexValue(record, col.dataIndex), { record, index: 0, type: 'body', key: '0' }, 0) }
                  </div>
                ))
            }
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default CardLayout;
