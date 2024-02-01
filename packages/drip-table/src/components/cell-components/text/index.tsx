/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import './index.less';

import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import Textarea from 'rc-textarea';
import React from 'react';
import Clipboard from 'react-clipboard.js';
import ReactDOM from 'react-dom';
import { EventInjector } from 'react-event-injector';
import { v4 as uuidv4 } from 'uuid';

import { DripTableColumnSchema, DripTableRecordTypeBase, SchemaObject } from '@/types';
import { stringify } from '@/utils/operator';
import Alert from '@/components/react-components/alert';
import Select from '@/components/react-components/select';
import Tooltip from '@/components/react-components/tooltip';

import { DripTableComponentProps } from '../component';
import { dataProcessIndex, dataProcessValue, finalizeString, preventEvent } from '../utils';

const prefixCls = 'jfe-drip-table-cc-text';

export type DTCTextColumnSchema = DripTableColumnSchema<'text', {
  /**
   * 组件类名
   */
  className?: string;
  /**
   * 字体大小
   */
  fontSize?: string;
  /**
   * 展示模式：
   * {'single'}   单行文本；
   * {'multiple'} 多行文本；
   * {'custom'}   自定义文本；
   * {'static'}   静态文本；
   */
  mode?: 'single' | 'multiple' | 'custom' | 'static';
  /**
   * 自定义格式化字符串
   */
  format?: string;
  /**
   * 静态文本内容
   */
  static?: string;
  /**
   * 内容展示翻译文案
   */
  i18n?: Record<string, string>;
  /**
   * 兜底文案
   */
  defaultValue?: string;
  /**
   * 前缀文案
   */
  prefix?: string;
  /**
   * 后缀文案
   */
  suffix?: string;
  /**
   * 展示提示文案
   */
  showTooltip?: boolean;
  /**
   * 提示文案显示位置
   */
  placement?: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
  /**
   * 自定义提示文案，支持 {{ data }} 格式字符串模板
   */
  tooltip?: string | {
    content?: string;
    style?: React.CSSProperties;
  };
  /**
   * 多行文本段落配置
   */
  parts?: {
    dataIndex: string | string[];
    /**
     * 内容展示翻译文案
     */
    i18n?: Record<string, string>;
    /**
     * 前缀文案
     */
    prefix?: string;
    /**
     * 后缀文案
     */
    suffix?: string;
  }[];
  /**
   * 最大行数
   */
  maxRow?: number;
  /**
   *  行高
   */
  lineHeight?: number;
  /**
   *  固定高度
   */
  height?: number;
  /**
   * 固定宽度
   */
  width?: number;
  /**
   * 超出部分显示省略号
   */
  ellipsis?: boolean;
  /**
   * 是否展示一键复制按钮
   */
  clipboard?: boolean;
  /**
   * 数据处理
   */
  dataProcess?: string;
  /**
   * 禁用的数据处理
   */
  disableFunc?: string;
  /**
   * 显隐的数据处理
   */
  visibleFunc?: string;
}>;

export interface DTCTextEvent {
  type: 'drip-text-copy';
  payload: {
    success: boolean;
  };
}

interface DTCTextProps<RecordType extends DripTableRecordTypeBase> extends DripTableComponentProps<RecordType, DTCTextColumnSchema> { }

interface DTCTextState {
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
  editWidth: number;
  editHeight: number;
  editValue: string;
}

const translate = (i18n: Record<string, string> | undefined, origin: string) => {
  if (typeof origin === 'string' && i18n && origin in i18n) {
    return i18n[origin];
  }
  return origin;
};

export default class DTCText<RecordType extends DripTableRecordTypeBase> extends React.PureComponent<DTCTextProps<RecordType>, DTCTextState> {
  public static componentName: DTCTextColumnSchema['component'] = 'text';
  public static schema: SchemaObject = {
    type: 'object',
    properties: {
      fontSize: { type: 'string' },
      mode: { enum: ['single', 'multiple', 'custom'] },
      format: { type: 'string' },
      static: { type: 'string' },
      i18n: {},
      defaultValue: { type: 'string' },
      prefix: { type: 'string' },
      suffix: { type: 'string' },
      showTooltip: { type: 'boolean' },
      placement: { enum: ['top', 'left', 'right', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom'] },
      tooltip: {
        anyOf: [
          { type: 'string' },
          {
            type: 'object',
            properties: {
              content: { type: 'string' },
              style: {
                type: 'object',
                patternProperties: {
                  '^.*$': {
                    anyOf: [
                      { type: 'string' },
                      { type: 'number' },
                    ],
                  },
                },
              },
            },
          },
        ],
      },
      parts: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            dataIndex: {
              anyOf: [
                { type: 'string' },
                { type: 'array', items: { type: 'string' } },
              ],
            },
            i18n: {},
            prefix: { type: 'string' },
            suffix: { type: 'string' },
          },
        },
      },
      maxRow: { type: 'number' },
      lineHeight: { type: 'number' },
      height: { type: 'number' },
      width: { type: 'number' },
      ellipsis: { type: 'boolean' },
      clipboard: { type: 'boolean' },
      dataProcess: { type: 'string' },
      disableFunc: { type: 'string' },
      visibleFunc: { type: 'string' },
    },
  };

  public state: DTCTextState = {
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
    editWidth: 0,
    editHeight: 0,
    editValue: '',
  };

  private componentUuid = `dtc-${uuidv4()}`;
  private $main = React.createRef<HTMLDivElement>();

  private get configured() {
    const schema = this.props.schema;
    const options = schema.options;
    if (options.mode === 'custom') {
      if (options.format) {
        return true;
      }
      return false;
    }
    if (options.mode === 'multiple') {
      if (options.parts) {
        return options.parts.length > 0;
      }
      return false;
    }
    if (options.mode === 'single') {
      if (typeof schema.dataIndex === 'object') {
        return Object.keys(schema.dataIndex).length > 0;
      }
      return !!schema.dataIndex;
    }
    if (options.mode === 'static') {
      return typeof options.static === 'string';
    }
    return false;
  }

  private get fontSize() {
    let fontSize = String(this.props.schema.options.fontSize || '').trim();
    if ((/^[0-9]+$/uig).test(fontSize)) {
      fontSize += 'px';
    }
    return fontSize;
  }

  private get lineHeight() {
    return this.props.schema.options.lineHeight || 1.5;
  }

  private get wrapperClassName(): string | null {
    const maxRow = this.props.schema.options.maxRow;
    const wrapperClassName: string[] = [];
    if (this.props.schema.options.ellipsis) {
      wrapperClassName.push(`${prefixCls}-text-ellipsis`);
    }
    if (maxRow) {
      wrapperClassName.push(`${prefixCls}-max-row`);
    }
    return classNames(wrapperClassName, this.props.schema.options.className);
  }

  private get commonStyles(): React.CSSProperties {
    const lineHeight = this.lineHeight;
    const textStyles: React.CSSProperties = {
      fontSize: this.fontSize,
      lineHeight,
    };
    if (this.props.schema.options.height) {
      textStyles.height = this.props.schema.options.height;
    }
    if (this.props.schema.options.width) {
      textStyles.width = this.props.schema.options.width;
    }
    return textStyles;
  }

  private get rawTextStyles(): React.CSSProperties {
    const { schema } = this.props;
    const commonStyles = this.commonStyles;
    const textStyles = Object.assign({}, commonStyles);
    if (typeof schema.options.tooltip === 'object') {
      Object.assign(textStyles, schema.options.tooltip.style);
    }
    return textStyles;
  }

  private get wrapperStyles(): React.CSSProperties {
    const commonStyles = this.commonStyles;
    const maxRow = this.props.schema.options.maxRow;
    const lineHeight = this.lineHeight;
    const wrapperStyles: React.CSSProperties = Object.assign({}, commonStyles);
    if (maxRow) {
      wrapperStyles.WebkitLineClamp = maxRow;
      wrapperStyles.maxHeight = `${maxRow * lineHeight}em`;
    }
    return wrapperStyles;
  }

  private get rawText(): string[] {
    const { schema, value, record, recordIndex, indexValue } = this.props;
    const { dataIndex, options } = schema;
    const { mode, format, prefix, suffix, parts: params } = options;
    const defaultValue = 'defaultValue' in options ? options.defaultValue : String(schema.defaultValue ?? '');
    if (mode === 'custom') {
      return (format || '')
        .replace(
          /\{\{(.+?)\}\}/guis, (s, s1) =>
            finalizeString('script', `return ${s1}`, record, recordIndex),
        )
        .split('\n');
    }
    if (mode === 'single') {
      if (options.dataProcess) {
        console.warn('[DripTable] schema.columns[].options.dataProcess is deprecated, use schema.columns[].dataTranslation instead.');
        return `${prefix ?? ''}${translate(schema.options.i18n, dataProcessIndex(record, dataIndex, defaultValue, options.dataProcess)) ?? ''}${suffix ?? ''}`.split('\n');
      }
      return `${prefix ?? ''}${translate(schema.options.i18n, `${value ?? defaultValue}`)}${suffix ?? ''}`.split('\n');
    }
    if (mode === 'multiple') {
      if (options.dataProcess) {
        console.warn('[DripTable] schema.columns[].options.dataProcess is deprecated, use schema.columns[].dataTranslation instead.');
        return (params || [])
          .map((config, i) => `${config.prefix || ''}${translate(config.i18n, dataProcessIndex(record, config.dataIndex, defaultValue, options.dataProcess)) ?? ''}${config.suffix || ''}`)
          .join('\n')
          .split('\n');
      }
      return (params || [])
        .map((config, i) => `${config.prefix || ''}${translate(config.i18n, `${indexValue(config.dataIndex, defaultValue)}`)}${config.suffix || ''}`)
        .join('\n')
        .split('\n');
    }
    if (mode === 'static') {
      return (options.static || '').split('\n');
    }
    return [];
  }

  private get visible(): boolean {
    const { schema, record } = this.props;
    const { dataIndex, options } = schema;
    const { mode, visibleFunc } = options;
    if (mode === 'single' && visibleFunc) {
      console.warn('schema.columns[].options.visibleFunc is deprecated, use schema.columns[].hidden instead.');
      return dataProcessValue(record, dataIndex, visibleFunc);
    }
    return true;
  }

  private get disabled(): boolean {
    const { schema, record } = this.props;
    const { dataIndex, options } = schema;
    const { mode, disableFunc } = options;
    if (mode === 'single' && disableFunc) {
      console.warn('schema.columns[].options.disableFunc is deprecated, use schema.columns[].disable instead.');
      return dataProcessValue(record, dataIndex, disableFunc);
    }
    return this.props.disable ?? false;
  }

  private get tooltip(): string {
    const { schema, record, recordIndex } = this.props;
    const tooltip = (typeof schema.options.tooltip === 'object'
      ? schema.options.tooltip.content
      : schema.options.tooltip) || '';
    if (tooltip) {
      return tooltip
        .replace(
          /\{\{(.+?)\}\}/guis, (s, s1) =>
            finalizeString('script', `return ${s1}`, record, recordIndex),
        );
    }
    return '';
  }

  private updateCellRect = ($main: HTMLElement) => {
    const innerRect = $main.getBoundingClientRect();
    const $cell = $main.parentElement as HTMLElement;
    const cellRect = $cell.getBoundingClientRect();
    this.setState({
      cellLeft: cellRect.left,
      cellTop: cellRect.top,
      cellWidth: cellRect.width,
      cellHeight: cellRect.height,
      cellPaddingLeft: innerRect.left - cellRect.left,
      cellPaddingRight: cellRect.right - innerRect.right,
      cellPaddingTop: innerRect.top - cellRect.top,
      cellPaddingBottom: cellRect.bottom - innerRect.bottom,
      editWidth: cellRect.width,
      editHeight: cellRect.height,
    });
  };

  private onDoubleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (this.props.preview) { return; }
    if (!this.props.editable) {
      return;
    }
    if (this.state.editState !== 'none') {
      return;
    }
    this.updateCellRect(e.currentTarget);
    this.setState({ editState: 'entering' });
  };

  private onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (this.props.preview) { return; }
    if (this.state.editState === 'none' && e.key.length === 1 && !this.props.schema.options.i18n) {
      this.setState({
        editState: 'editing',
        editValue: '',
      });
      this.updateCellRect(e.currentTarget);
    } else if (this.state.editState === 'editing' && e.key === 'Escape') {
      this.setState({ editState: 'none' });
    } else if (this.state.editState === 'none') {
      e.currentTarget.blur();
    }
  };

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

  private onResize: React.ComponentProps<typeof ResizeObserver>['onResize'] = (sizeInfo, el) => {
    if (this.$main.current) {
      this.updateCellRect(this.$main.current);
    }
    this.setState({ windowInnerWidth: globalThis.window?.innerWidth ?? 0 });
  };

  private focusEdit = () => {
    const $editPopup = document.querySelector(`#${this.componentUuid}-popup`);
    if (!$editPopup) {
      return;
    }
    const $editTextarea = $editPopup.querySelector(`.${prefixCls}-edit-textarea`);
    if (!$editTextarea || !($editTextarea instanceof HTMLTextAreaElement)) {
      return;
    }
    const end = $editTextarea.value.length;
    $editTextarea.setSelectionRange(end, end);
    $editTextarea.focus();
  };

  public componentDidUpdate() {
    if (this.state.editState === 'entering') {
      this.setState(
        {
          editState: 'editing',
          editValue: String(this.props.value),
        },
        () => this.focusEdit(),
      );
    }
  }

  private renderEditInput() {
    if (this.props.schema.options.i18n) {
      const selectMinWidth = 100;
      const selectMaxWidth = this.state.windowInnerWidth - this.state.cellLeft - 17;
      const selectFinalWidth = Math.min(Math.max(this.state.cellWidth, selectMinWidth), selectMaxWidth);
      let justifyContent = 'center';
      if (this.props.schema.verticalAlign === 'top' || this.props.schema.verticalAlign === 'stretch') {
        justifyContent = 'flex-start';
      } else if (this.props.schema.verticalAlign === 'bottom') {
        justifyContent = 'flex-end';
      }
      return (
        <div
          className={classNames(`${prefixCls}-edit-editing-outline`, `${prefixCls}-edit-select`)}
          style={{ width: selectFinalWidth, height: this.state.cellHeight, justifyContent }}
        >
          <Select
            style={{ width: selectFinalWidth - 36 }}
            autoFocus
            value={this.state.editValue}
            onChange={(value) => { this.setState({ editValue: value }); }}
            onBlur={() => {
              this.props.onChange?.(this.state.editValue);
              this.setState({ editState: 'none' });
            }}
            dropdownClassName={`${prefixCls}-edit-select-dropdown`}
          >
            {
              Object.entries(this.props.schema.options.i18n).map(([k, v]) => (
                <Select.Option value={k}>{ v }</Select.Option>
              ))
            }
          </Select>
        </div>
      );
    }
    const editMinWidth = this.state.windowInnerWidth < 768 ? 200 : 500;
    const editMaxWidth = this.state.windowInnerWidth - this.state.cellLeft - 17;
    const editFinalWidth = Math.min(Math.max(this.state.cellWidth, editMinWidth), editMaxWidth);
    return (
      <Textarea
        className={classNames(`${prefixCls}-edit-editing-outline`, `${prefixCls}-edit-textarea`)}
        value={this.state.editValue}
        autoFocus
        autoSize={{ maxRows: 6 }}
        style={{ width: editFinalWidth, height: this.state.editHeight, minHeight: this.state.cellHeight }}
        onResize={({ width, height }) => {
          this.setState({ editWidth: width, editHeight: height });
        }}
        onChange={(e) => { this.setState({ editValue: e.target.value }); }}
        onBlur={() => {
          this.props.onChange?.(this.state.editValue);
          this.setState({ editState: 'none' });
        }}
      />
    );
  }

  private renderEdit() {
    if (!this.props.editable) {
      return null;
    }
    return (
      <React.Fragment>
        <div className={`${prefixCls}-edit-padding-left`} style={{ width: this.state.cellPaddingLeft, left: -this.state.cellPaddingLeft }} />
        <div className={`${prefixCls}-edit-padding-right`} style={{ width: this.state.cellPaddingRight, right: -this.state.cellPaddingRight }} />
        <div className={`${prefixCls}-edit-padding-top`} style={{ height: this.state.cellPaddingTop, top: -this.state.cellPaddingTop }} />
        <div className={`${prefixCls}-edit-padding-bottom`} style={{ height: this.state.cellPaddingBottom, bottom: -this.state.cellPaddingBottom }} />
        {
          this.state.editState === 'none'
            ? void 0
            : ReactDOM.createPortal(
              <EventInjector
                onWheel={this.onWheel}
                settings={{ capture: true, passive: false }}
              >
                <div className={`${prefixCls}-edit-popup`} id={`${this.componentUuid}-popup`} onWheelCapture={e => preventEvent(e)}>
                  <div className={`${prefixCls}-edit-popup-body`} style={{ left: this.state.cellLeft, right: 0, top: this.state.cellTop, bottom: 0 }}>
                    <div className={`${prefixCls}-edit-popup-bg`} style={{ width: this.state.editWidth, height: this.state.editHeight }} />
                    { this.renderEditInput() }
                  </div>
                </div>
              </EventInjector>,
              document.body,
            )
        }
      </React.Fragment>
    );
  }

  private renderClipboard() {
    const showClipboard = this.props.schema.options.clipboard;
    if (!showClipboard) { return null; }
    return (
      <Clipboard
        component="div"
        option-text={() => this.rawText.join(' ')}
        onSuccess={() => { this.props.fireEvent({ type: 'drip-text-copy', payload: { success: true } }); }}
        onError={() => { this.props.fireEvent({ type: 'drip-text-copy', payload: { success: false } }); }}
      >
        <span role="img" aria-label="copy">
          <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true">
            <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z" />
          </svg>
        </span>
      </Clipboard>
    );
  }

  public render(): JSX.Element {
    const wrapperClassName = this.wrapperClassName;
    const wrapperStyles = this.wrapperStyles;
    if (!this.visible) {
      return <div />;
    }
    if (!this.configured) {
      return <Alert message="未配置字段" showIcon type="error" />;
    }
    const rawTextEl = this.rawText.map((s, i) => (
      <div key={i}>{ stringify(s) || (i === 0 ? '' : <br />) }</div>
    ));
    let wrapperEl = (
      <div
        className={classNames(wrapperClassName, `${prefixCls}-word-break`)}
        style={wrapperStyles}
      >
        { rawTextEl }
      </div>
    );
    if (((this.props.schema.options.maxRow && this.props.schema.options.showTooltip === void 0)
      || this.props.schema.options.showTooltip !== false
    ) && !this.props.preview) {
      wrapperEl = (
        <Tooltip
          title={(
            <div
              className={`${prefixCls}-word-break`}
              style={this.rawTextStyles}
            >
              { this.tooltip || rawTextEl }
            </div>
          )}
          placement={this.props.schema.options.placement}
        >
          { wrapperEl }
        </Tooltip>
      );
    }

    return (
      <React.Fragment>
        <ResizeObserver onResize={this.onResize}>
          <div
            ref={this.$main}
            className={classNames(`${prefixCls}-main`, {
              [`${prefixCls}-editable`]: this.props.editable && !this.props.preview,
              [`${prefixCls}-disabled`]: this.disabled,
            })}
            tabIndex={0}
            onDoubleClick={this.onDoubleClick}
            onKeyDown={this.onKeyDown}
          >
            { wrapperEl }
            { !this.disabled && this.renderEdit() }
            { this.renderClipboard() }
          </div>
        </ResizeObserver>
        <div className={`${prefixCls}-focus-border`} />
      </React.Fragment>
    );
  }
}
