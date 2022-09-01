/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : renwenci (ararakikon@163.com)
 * @modifier : renwenci (ararakikon@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import classNames from 'classnames';
import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';
import { EventInjector } from 'react-event-injector';
import { v4 as uuidv4 } from 'uuid';

import { DripTableColumnSchema, DripTableRecordTypeBase, SchemaObject } from '@/types';
import { indexValue } from '@/utils/operator';
import Picker from '@/components/date-picker';

import { DripTableComponentProps } from '../component';
import { preventEvent } from '../utils';

import styles from './index.module.less';

export type DTCDateColumnSchema = DripTableColumnSchema<'date-picker', {
  /** 展示模式：单日期选择、日期范围选择 */
  mode: 'basic' | 'range';
  /**
   * 范围日期配置
   */
  parts?: {
    dataIndex: string | string[];
  }[];
  /**
   * 日期格式
   */
  format: string;
}>;

interface DTCDateState {
  windowInnerWidth: number;
  cellLeft: number;
  cellTop: number;
  cellWidth: number;
  cellHeight: number;
  cellPaddingLeft: number;
  cellPaddingRight: number;
  cellPaddingTop: number;
  cellPaddingBottom: number;
  editState: 'none' | 'entering' | 'editing';
  editHeight: number;
}

interface DTCDateProps<RecordType extends DripTableRecordTypeBase> extends DripTableComponentProps<RecordType, DTCDateColumnSchema> { }

interface DTCDateState {}

export default class DTCDate<RecordType extends DripTableRecordTypeBase> extends React.PureComponent<DTCDateProps<RecordType>, DTCDateState> {
  public static componentName: DTCDateColumnSchema['component'] = 'date-picker';
  public static schema: SchemaObject = {
    properties: {
      mode: { enum: ['basic', 'range'] },
      parts: {
        type: 'array',
        items: {
          properties: {
            dataIndex: {
              anyOf: [
                { type: 'string' },
                { type: 'array', items: { type: 'string' } },
              ],
            },
          },
        },
      },
      format: { type: 'string' },
    },
  };

  public state: DTCDateState = {
    windowInnerWidth: globalThis.window?.innerWidth || 0,
    cellLeft: 0,
    cellTop: 0,
    cellWidth: 0,
    cellHeight: 0,
    cellPaddingLeft: 0,
    cellPaddingRight: 0,
    cellPaddingTop: 0,
    cellPaddingBottom: 0,
    editState: 'none',
    editHeight: 0,
  };

  private get configured() {
    const schema = this.props.schema;
    const options = schema.options;
    if (options.mode === 'basic') {
      return true;
    }
    if (options.mode === 'range') {
      if (options.parts) {
        return options.parts.length === 2;
      }
      return false;
    }
    return false;
  }

  private get value() {
    const { dataIndex, options, defaultValue } = this.props.schema;
    const { data } = this.props;
    if (!data) {
      return defaultValue;
    }
    if (options.mode === 'basic') {
      return indexValue(data, dataIndex, '');
    }
    if (options.mode === 'range') {
      const { parts } = options;
      return (parts || [])
        .map((config, i) => indexValue(data, config.dataIndex, defaultValue));
    }
    return defaultValue;
  }

  private onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (this.state.editState === 'none' && e.key.length === 1) {
      this.setState({
        editState: 'editing',
      });
      this.updateCellRect(e.currentTarget);
    } else if (this.state.editState === 'editing' && e.key === 'Escape') {
      this.setState({ editState: 'none' });
    } else if (this.state.editState === 'none') {
      e.currentTarget.blur();
    }
  };

  private componentUuid = `dtc-${uuidv4()}`;
  private $main = React.createRef<HTMLDivElement>();

  private onDoubleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!this.props.editable || this.props.schema.options.mode === 'range') {
      return;
    }
    if (this.state.editState !== 'none') {
      return;
    }
    this.updateCellRect(e.currentTarget);
    this.setState({ editState: 'entering' });
  };

  private updateCellRect = ($main: HTMLElement) => {
    const innerRect = $main.getBoundingClientRect();
    const $cell = $main.parentElement as HTMLElement;
    const cellRect = $cell.getBoundingClientRect();
    this.setState({
      cellLeft: cellRect.left,
      cellTop: cellRect.top,
      cellHeight: cellRect.height,
      cellPaddingLeft: innerRect.left - cellRect.left,
      cellPaddingRight: cellRect.right - innerRect.right,
      cellPaddingTop: innerRect.top - cellRect.top,
      cellPaddingBottom: cellRect.bottom - innerRect.bottom,
      editHeight: cellRect.height,
    });
  };

  private renderEditDate() {
    const { options } = this.props.schema;
    const selectMinWidth = 100;
    const selectMaxWidth = this.state.windowInnerWidth - this.state.cellLeft - 17;
    const selectFinalWidth = Math.min(Math.max(this.state.cellWidth, selectMinWidth), selectMaxWidth);
    let justifyContent = 'center';
    if (this.props.schema.verticalAlign === 'top' || this.props.schema.verticalAlign === 'stretch') {
      justifyContent = 'flex-start';
    } else if (this.props.schema.verticalAlign === 'bottom') {
      justifyContent = 'flex-end';
    }
    if (options.mode === 'basic') {
      return (
        <div
          className={classNames(styles['edit-editing-outline'], styles['edit-select'])}
          style={{ width: selectFinalWidth, height: this.state.cellHeight, justifyContent }}
        >
          <Picker.DatePicker
            date={this.value}
            onChange={(value) => {
              if (this.props.preview) { return; }
              this.props.onChange?.(moment(value).format(options.format));
              this.setState({ editState: 'none' });
            }}
          />
        </div>
      );
    }
    if (options.mode === 'range') {
      return (
        <div
          className={classNames(styles['edit-editing-outline'], styles['edit-select'])}
          style={{ width: 300, height: this.state.cellHeight, justifyContent }}
        >
          <Picker.DateRangePicker
            date={this.value}
            style={Object.assign({}, { width: 300 })}
            format={options.format}
            onChange={(value, dataString) => {
              if (this.props.preview) { return; }
              this.setState({ editState: 'none' });
              if (value) {
                // 暂时不支持修改2个dataIndex的值
                this.setState({ editState: 'none' });
              }
            }}
          />
        </div>
      );
    }
    return null;
  }

  private onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    if (e.target instanceof HTMLTextAreaElement) {
      const scrollable = e.deltaY < 0
        ? Math.abs(e.target.scrollTop) > Number.EPSILON
        : e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight > Number.EPSILON;
      if (scrollable) {
        return;
      }
    }
    return preventEvent(e);
  };

  private renderEdit() {
    if (!this.props.editable) {
      return null;
    }
    const selectMinWidth = 100;
    const selectMaxWidth = this.state.windowInnerWidth - this.state.cellLeft - 17;
    const selectFinalWidth = Math.min(Math.max(this.state.cellWidth, selectMinWidth), selectMaxWidth);
    return (
      <React.Fragment>
        <div className={styles['edit-padding-left']} style={{ width: this.state.cellPaddingLeft, left: -this.state.cellPaddingLeft }} />
        <div className={styles['edit-padding-right']} style={{ width: this.state.cellPaddingRight, right: -this.state.cellPaddingRight }} />
        <div className={styles['edit-padding-top']} style={{ height: this.state.cellPaddingTop, top: -this.state.cellPaddingTop }} />
        <div className={styles['edit-padding-bottom']} style={{ height: this.state.cellPaddingBottom, bottom: -this.state.cellPaddingBottom }} />
        {
          this.state.editState === 'none'
            ? void 0
            : ReactDOM.createPortal(
              <EventInjector
                onWheel={this.onWheel}
                settings={{ capture: true, passive: false }}
              >
                <div className={styles['edit-popup']} id={`${this.componentUuid}-popup`} onWheelCapture={e => preventEvent(e)}>
                  <div className={styles['edit-popup-body']} style={{ left: this.state.cellLeft, right: 0, top: this.state.cellTop, bottom: 0 }}>
                    <div className={styles['edit-popup-bg']} style={{ width: selectFinalWidth, height: this.state.editHeight }} />
                    { this.renderEditDate() }
                  </div>
                </div>
              </EventInjector>,
              document.body,
            )
        }
      </React.Fragment>
    );
  }

  public render() {
    const Alert = this.props.driver.components.Alert;
    const { format } = this.props.schema.options;

    if (!this.configured) {
      return <Alert message="未正确配置字段" showIcon type="error" />;
    }
    return (
      <div
        ref={this.$main}
        className={classNames(styles.main, { [styles.editable]: this.props.editable })}
        tabIndex={0}
        onDoubleClick={this.onDoubleClick}
        onKeyDown={this.onKeyDown}
      >
        { Array.isArray(this.value) ? this.value.map(v => moment(v).format(format)).join(' - ') : moment(this.value).format(format) }
        { this.renderEdit() }
      </div>
    );
  }
}
