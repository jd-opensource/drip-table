/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : renwenci (ararakikon@163.com)
 * @modifier : renwenci (ararakikon@163.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import moment, { Moment } from 'moment';
import React from 'react';

import { DripTableExtraOptions, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable } from '@/types';
import { indexValue } from '@/utils/operator';
import DatePicker from '@/components/date-picker';

import { columnGenerator } from '../table';
import { TableLayoutComponentProps } from '../types';

import styles from './index.module.less';

const CalendarLayout = <
RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: TableLayoutComponentProps<RecordType, ExtraOptions>): JSX.Element => {
  const { tableInfo, tableProps, tableState } = props;
  const dataSource = tableProps.dataSource;

  const dateRender = (date: Moment, today: Moment, dataSources: RecordType[]) => {
    const record = dataSources.find(o => moment(o.startDate as string).isSame(date, 'date'));
    const extraProps = {
      driver: tableProps.driver,
      components: tableProps.components,
      ext: tableProps.ext,
      hoverRowKey: void 0,
      setHoverRowKey: () => void 0,
      hoverColumnKey: void 0,
      setHoverColumnKey: () => void 0,
      onEvent: tableProps.onEvent,
      onDataSourceChange: tableProps.onDataSourceChange,
    };

    return (
      <div
        className={styles.container}
        style={{ borderTopColor: date.isSame(today, 'date') ? 'blue' : '#CCC' }}
      >
        { date.date() }
        { record && (
          <div className={styles.record}>
            {
            tableInfo.schema.columns
              .filter(column => !column.hidable || tableState.displayColumnKeys.includes(column.key))
              .map(column => columnGenerator(tableInfo, column, extraProps))
              .map(col => (
                <div key={col.key}>
                  <h4>{ col.title }</h4>
                  { /* TODO: 这写的什么鬼垃圾，为什么会跨 layout 依赖？扯淡呢？ */ }
                  { col.render?.(indexValue(record, col.dataIndex), { record, index: 0, type: 'body', key: '0' }, 0) }
                </div>
              ))
          }
          </div>
        ) }
      </div>
    );
  };

  return (
    <div>
      { props.header }
      <DatePicker.Calendar
        dateRender={(date, today) => dateRender(date, today, dataSource)}
      />
    </div>
  );
};

export default CalendarLayout;
