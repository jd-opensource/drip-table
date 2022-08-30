/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import Textarea from 'rc-textarea';
import React from 'react';
import ReactDOM from 'react-dom';
import { EventInjector } from 'react-event-injector';
import { v4 as uuidv4 } from 'uuid';

import { DripTableColumnSchema, DripTableRecordTypeBase, SchemaObject } from '@/types';
import { copyTextToClipboard, indexValue, stringify } from '@/utils/operator';
import Select from '@/components/select';

import { DripTableComponentProps } from '../component';
import { preventEvent } from '../utils';

import styles from './index.module.less';

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
   * 超出部分显示省略号
   */
  ellipsis?: boolean;
  /**
   * 是否展示一键复制按钮
   */
  clipboard?: boolean;
}>;

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
    properties: {
      fontSize: { type: 'string' },
      mode: { enum: ['single', 'multiple', 'custom'] },
      format: { type: 'string' },
      static: { type: 'string' },
      i18n: {},
      defaultValue: { type: 'string' },
      prefix: { type: 'string' },
      suffix: { type: 'string' },
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
            i18n: {},
            prefix: { type: 'string' },
            suffix: { type: 'string' },
          },
        },
      },
      maxRow: { type: 'number' },
      lineHeight: { type: 'number' },
      ellipsis: { type: 'boolean' },
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
      wrapperClassName.push(styles['text-ellipsis']);
    }
    if (maxRow) {
      wrapperClassName.push(styles['max-row']);
    }
    return classNames(wrapperClassName, this.props.schema.options.className);
  }

  private get rawTextStyles(): React.CSSProperties {
    const lineHeight = this.lineHeight;
    const textStyles: React.CSSProperties = {
      fontSize: this.fontSize,
      lineHeight,
    };
    return textStyles;
  }

  private get wrapperStyles(): React.CSSProperties {
    const rawTextStyles = this.rawTextStyles;
    const maxRow = this.props.schema.options.maxRow;
    const lineHeight = this.lineHeight;
    const wrapperStyles: React.CSSProperties = Object.assign({}, rawTextStyles);
    if (maxRow) {
      wrapperStyles.WebkitLineClamp = maxRow;
      wrapperStyles.maxHeight = `${maxRow * lineHeight}em`;
    }
    return wrapperStyles;
  }

  private get rawText(): string[] {
    const { schema, data } = this.props;
    const { dataIndex, options } = schema;
    const { mode, format, prefix, suffix, parts: params } = options;
    const defaultValue = 'defaultValue' in options ? options.defaultValue : String(schema.defaultValue ?? '');
    if (mode === 'custom') {
      return (format || '')
        .replace(/\{\{(.+?)\}\}/guis, (s, s1) => {
          try {
            return stringify(new Function('rec', `return ${s1}`)(data));
          } catch (error) {
            return error instanceof Error
              ? `{{Render Error: ${error.message}}}`
              : '{{Unknown Render Error}}';
          }
        })
        .split('\n');
    }
    if (mode === 'single') {
      return `${prefix ?? ''}${translate(schema.options.i18n, indexValue(data, dataIndex, defaultValue)) ?? ''}${suffix ?? ''}`.split('\n');
    }
    if (mode === 'multiple') {
      return (params || [])
        .map((config, i) => `${config.prefix || ''}${translate(config.i18n, indexValue(data, config.dataIndex, defaultValue)) ?? ''}${config.suffix || ''}`)
        .join('\n')
        .split('\n');
    }
    if (mode === 'static') {
      return (options.static || '').split('\n');
    }
    return [];
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
    const $editTextarea = $editPopup.querySelector(`.${styles['edit-textarea']}`);
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
          className={classNames(styles['edit-editing-outline'], styles['edit-select'])}
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
            dropdownClassName={styles['edit-select-dropdown']}
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
        className={classNames(styles['edit-editing-outline'], styles['edit-textarea'])}
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
                    <div className={styles['edit-popup-bg']} style={{ width: this.state.editWidth, height: this.state.editHeight }} />
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
    const { CopyOutlined } = this.props.driver.icons;

    const message = this.props.driver.components.message;
    const showClipboard = this.props.schema.options.clipboard;
    if (!showClipboard) { return null; }
    return (
      <div onClick={() => copyTextToClipboard(this.rawText.join(' '), () => message.success('复制成功'), e => message.success(e.message))}>
        <CopyOutlined />
      </div>
    );
  }

  public render(): JSX.Element {
    const Tooltip = this.props.driver.components.Tooltip;
    const Alert = this.props.driver.components.Alert;
    const wrapperClassName = this.wrapperClassName;
    const wrapperStyles = this.wrapperStyles;
    if (!this.configured) {
      return <Alert message="未配置字段" showIcon type="error" />;
    }
    const rawTextEl = this.rawText.map((s, i) => (
      <div key={i}>{ stringify(s) || (i === 0 ? '' : <br />) }</div>
    ));
    let wrapperEl = (
      <div
        className={classNames(wrapperClassName, styles['word-break'])}
        style={wrapperStyles}
      >
        { rawTextEl }
      </div>
    );
    if (this.props.schema.options.maxRow) {
      wrapperEl = (
        <Tooltip title={<div className={styles['word-break']} style={this.rawTextStyles}>{ rawTextEl }</div>}>
          { wrapperEl }
        </Tooltip>
      );
    }

    return (
      <React.Fragment>
        <ResizeObserver onResize={this.onResize}>
          <div
            ref={this.$main}
            className={classNames(styles.main, { [styles.editable]: this.props.editable })}
            tabIndex={0}
            onDoubleClick={this.onDoubleClick}
            onKeyDown={this.onKeyDown}
          >
            { wrapperEl }
            { this.renderEdit() }
            { this.renderClipboard() }
          </div>
        </ResizeObserver>
        <div className={styles['focus-border']} />
      </React.Fragment>
    );
  }
}
