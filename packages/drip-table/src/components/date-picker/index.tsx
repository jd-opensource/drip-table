/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : renwenci(ararakikon@163.com)
 * @modifier : renwenci(ararakikon@163.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import './index.module.less';

import moment, { Moment } from 'moment';
import RcPicker, { PickerPanel, PickerPanelProps, PickerProps, RangePicker, RangePickerProps } from 'rc-picker';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import zh from 'rc-picker/lib/locale/zh_CN';
import React from 'react';

export type DatePickerProps = Omit<PickerProps<Moment> & {
  date: string;
}, 'locale' | 'prefixCls' | 'generateConfig'>

const DatePicker = React.memo<DatePickerProps>(({ ...props }) => {
  const { date } = props;

  if (!moment(date).isValid()) {
    return <div>非法日期</div>;
  }

  const value = moment(date);
  return (
    <RcPicker<Moment>
      {...props}
      value={value}
      locale={zh}
      open
      showToday
      prefixCls="jfe-drip-table-date-picker"
      generateConfig={momentGenerateConfig}
    />
  );
});

export type DateRangePickerProps = Omit<RangePickerProps<Moment> & {
  date: string[];
}, 'locale' | 'prefixCls' | 'generateConfig'>

const DateRangePicker = React.memo<DateRangePickerProps>((props) => {
  const { date } = props;

  if (!moment(date[0]).isValid() || !moment(date[1]).isValid()) {
    return <div>非法日期</div>;
  }

  return (
    <RangePicker
      {...props}
      open
      prefixCls="jfe-drip-table-date-picker"
      generateConfig={momentGenerateConfig}
      locale={zh}
      value={[moment(date[0]), moment(date[1])]}
      allowClear
    />
  );
});

export type CalendarProps = Omit<PickerPanelProps<Moment>, 'locale' | 'prefixCls' | 'generateConfig'>

const Calendar = React.memo<CalendarProps>((props) => {
  const { dateRender } = props;

  return (
    <PickerPanel<Moment>
      locale={zh}
      prefixCls="jfe-drip-table-date-picker"
      generateConfig={momentGenerateConfig}
      dateRender={dateRender}
    />
  );
});

export default { DatePicker, DateRangePicker, Calendar };
