/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : renwenci (ararakikon@163.com)
 * @modifier : renwenci (ararakikon@163.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import './index.less';

import moment, { Moment } from 'moment';
import React from 'react';

import { DripTableExtraOptions, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable } from '@/types';
import DatePicker from '@/components/date-picker';
import { useTableContext } from '@/hooks';
import { type ExtractDripTableExtraOption, TABLE_LAYOUT_COLUMN_RENDER_GENERATOR_DO_NOT_USE_IN_PRODUCTION as columnRenderGenerator } from '@/index';

import { TableLayoutComponentProps } from '../types';

const CalendarLayout = <
RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: TableLayoutComponentProps): JSX.Element => {
  const { props: tableProps, info: tableInfo, state: tableState } = useTableContext<RecordType, ExtraOptions>();
  const dataSource = tableProps.dataSource;

  const dateRender = (date: Moment, today: Moment, dataSources: RecordType[]) => {
    const record = dataSources.find(o => moment(o.startDate as string).isSame(date, 'date'));
    const extraProps = {
      driver: tableProps.driver,
      components: tableProps.components,
      ext: tableProps.ext,
      onEvent: tableProps.onEvent,
      onDataSourceChange: tableProps.onDataSourceChange,
    };

    return (
      <div
        className="jfe-drip-table-layout-calendar-container"
        style={{ borderTopColor: date.isSame(today, 'date') ? 'blue' : '#CCC' }}
      >
        { date.date() }
        { record && (
          <div className="jfe-drip-table-layout-calendar-record">
            {
            tableInfo.schema.columns
              .filter(column => !column.hidable || tableState.displayColumnKeys.includes(column.key))
              .map(column => ({ ...column, render: columnRenderGenerator(tableInfo, column, extraProps) }))
              .map(col => (
                <div key={col.key}>
                  <h4>{ col.title }</h4>
                  { col.render?.(null, { record, index: 0, type: 'body', key: '0' }, 0) }
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
