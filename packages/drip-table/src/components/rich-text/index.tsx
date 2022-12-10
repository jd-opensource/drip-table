/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import 'viewerjs/dist/viewer.css';

import cheerio, * as Cheerio from 'cheerio';
import * as DOMHandler from 'domhandler';
import React from 'react';
import ViewerJS from 'viewerjs';

import { createExecutor } from '@/utils/sandbox';
import Highlight, { HighlightProps } from '@/components/highlight';

type UppercaseLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';
type HTMLTagName = keyof React.ReactHTML;
type DOMEventType = keyof React.DOMAttributes<unknown> & `on${UppercaseLetter}${string}`;

interface RichTextProps {
  style?: React.CSSProperties;
  className?: string;
  html: string;
  singleLine?: boolean;
  maxLength?: number;
  highlight?: Omit<HighlightProps, 'content' | 'tagName'>;
  tagNames?: HTMLTagName[];
  domEvents?: DOMEventType[];
}

const SAFE_TAG_NAME: HTMLTagName[] = [
  'a',
  'abbr',
  'address',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'bdi',
  'bdo',
  'big',
  'blockquote',
  'br',
  'button',
  'caption',
  'cite',
  'code',
  'col',
  'colgroup',
  'data',
  'datalist',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'div',
  'dl',
  'dt',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hgroup',
  'hr',
  'html',
  'i',
  'img',
  'ins',
  'kbd',
  'keygen',
  'label',
  'legend',
  'li',
  'main',
  'map',
  'mark',
  'menu',
  'menuitem',
  'meta',
  'meter',
  'nav',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'param',
  'picture',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'slot',
  'section',
  'select',
  'small',
  'source',
  'span',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'table',
  'template',
  'tbody',
  'td',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'u',
  'ul',
  'var',
  'video',
  'wbr',
  'webview',
];

const DOM_EVENT_TYPE: DOMEventType[] = [
  'onCopy',
  'onCopyCapture',
  'onCut',
  'onCutCapture',
  'onPaste',
  'onPasteCapture',
  'onCompositionEnd',
  'onCompositionEndCapture',
  'onCompositionStart',
  'onCompositionStartCapture',
  'onCompositionUpdate',
  'onCompositionUpdateCapture',
  'onFocus',
  'onFocusCapture',
  'onBlur',
  'onBlurCapture',
  'onChange',
  'onChangeCapture',
  'onBeforeInput',
  'onBeforeInputCapture',
  'onInput',
  'onInputCapture',
  'onReset',
  'onResetCapture',
  'onSubmit',
  'onSubmitCapture',
  'onInvalid',
  'onInvalidCapture',
  'onLoad',
  'onLoadCapture',
  'onError',
  'onErrorCapture',
  'onKeyDown',
  'onKeyDownCapture',
  'onKeyPress',
  'onKeyPressCapture',
  'onKeyUp',
  'onKeyUpCapture',
  'onAbort',
  'onAbortCapture',
  'onCanPlay',
  'onCanPlayCapture',
  'onCanPlayThrough',
  'onCanPlayThroughCapture',
  'onDurationChange',
  'onDurationChangeCapture',
  'onEmptied',
  'onEmptiedCapture',
  'onEncrypted',
  'onEncryptedCapture',
  'onEnded',
  'onEndedCapture',
  'onLoadedData',
  'onLoadedDataCapture',
  'onLoadedMetadata',
  'onLoadedMetadataCapture',
  'onLoadStart',
  'onLoadStartCapture',
  'onPause',
  'onPauseCapture',
  'onPlay',
  'onPlayCapture',
  'onPlaying',
  'onPlayingCapture',
  'onProgress',
  'onProgressCapture',
  'onRateChange',
  'onRateChangeCapture',
  'onSeeked',
  'onSeekedCapture',
  'onSeeking',
  'onSeekingCapture',
  'onStalled',
  'onStalledCapture',
  'onSuspend',
  'onSuspendCapture',
  'onTimeUpdate',
  'onTimeUpdateCapture',
  'onVolumeChange',
  'onVolumeChangeCapture',
  'onWaiting',
  'onWaitingCapture',
  'onAuxClick',
  'onAuxClickCapture',
  'onClick',
  'onClickCapture',
  'onContextMenu',
  'onContextMenuCapture',
  'onDoubleClick',
  'onDoubleClickCapture',
  'onDrag',
  'onDragCapture',
  'onDragEnd',
  'onDragEndCapture',
  'onDragEnter',
  'onDragEnterCapture',
  'onDragExit',
  'onDragExitCapture',
  'onDragLeave',
  'onDragLeaveCapture',
  'onDragOver',
  'onDragOverCapture',
  'onDragStart',
  'onDragStartCapture',
  'onDrop',
  'onDropCapture',
  'onMouseDown',
  'onMouseDownCapture',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseMove',
  'onMouseMoveCapture',
  'onMouseOut',
  'onMouseOutCapture',
  'onMouseOver',
  'onMouseOverCapture',
  'onMouseUp',
  'onMouseUpCapture',
  'onSelect',
  'onSelectCapture',
  'onTouchCancel',
  'onTouchCancelCapture',
  'onTouchEnd',
  'onTouchEndCapture',
  'onTouchMove',
  'onTouchMoveCapture',
  'onTouchStart',
  'onTouchStartCapture',
  'onPointerDown',
  'onPointerDownCapture',
  'onPointerMove',
  'onPointerMoveCapture',
  'onPointerUp',
  'onPointerUpCapture',
  'onPointerCancel',
  'onPointerCancelCapture',
  'onPointerEnter',
  'onPointerEnterCapture',
  'onPointerLeave',
  'onPointerLeaveCapture',
  'onPointerOver',
  'onPointerOverCapture',
  'onPointerOut',
  'onPointerOutCapture',
  'onGotPointerCapture',
  'onGotPointerCaptureCapture',
  'onLostPointerCapture',
  'onLostPointerCaptureCapture',
  'onScroll',
  'onScrollCapture',
  'onWheel',
  'onWheelCapture',
  'onAnimationStart',
  'onAnimationStartCapture',
  'onAnimationEnd',
  'onAnimationEndCapture',
  'onAnimationIteration',
  'onAnimationIterationCapture',
  'onTransitionEnd',
  'onTransitionEndCapture',
];

const HIDDEN_TAG_PROP_NAME = new Set([
  'key',
  'class',
]);

interface ReducerRenderValue {
  elements: (JSX.Element | string)[];
  maxLength: number;
  singleLine: NonNullable<RichTextProps['singleLine']>;
  highlight: RichTextProps['highlight'];
  tagNames: HTMLTagName[];
  domEvents: Record<string, DOMEventType>;
}

/**
 * 高亮文本
 */
export default class RichText extends React.PureComponent<RichTextProps> {
  private viewer!: ViewerJS;

  /**
   * 迭代渲染一个节点
   *
   * @private
   * @param {ReducerRenderValue} prevVal 迭代器当前数据
   * @param {CheerioElement} el 节点原始数据
   * @param {number} key 节点唯一标识
   * @param {number} maxLength 最大剩余渲染文本长度
   * @returns {ReducerRenderValue} 迭代器当前数据
   *
   * @memberOf RichText
   */
  private reducerRenderEl = (prevVal: ReducerRenderValue, el: DOMHandler.DataNode | DOMHandler.Element | Cheerio.Node, key: number): ReducerRenderValue => {
    const { maxLength, singleLine, highlight, tagNames, domEvents } = prevVal;
    if (el.type === 'text') {
      let text = 'data' in el ? el.data ?? '' : '';
      if (singleLine) {
        text = text.replace(/[\r\n]/ug, '$nbsp');
      }
      if (prevVal.maxLength >= 0) {
        text = text.slice(0, Math.max(0, prevVal.maxLength));
        if (text.length > 0 && text.length === prevVal.maxLength) {
          text += '...';
        }
        prevVal.maxLength = Math.max(prevVal.maxLength - text.length, 0);
      }
      prevVal.elements.push(
        highlight
          ? React.createElement(Highlight, { ...highlight, key, content: text })
          : text,
      );
      return prevVal;
    }
    if ('tagName' in el && tagNames.includes(el.tagName as never)) {
      const tagName = el.tagName;
      const { attribs = {}, children } = el;
      const style: React.CSSProperties = {};
      if (attribs.style) {
        attribs.style.split(';').forEach((s: string) => {
          const [k, v] = s.split(':');
          if (v) {
            style[k.trim().replace(/-([a-z])/ug, (_: string, c: string) => c.toUpperCase())] = v.trim();
          }
        });
      }
      if (tagName === 'img') {
        style.maxWidth = '100%';
      }
      if (singleLine) {
        if (tagName === 'br') {
          prevVal.elements.push(<span key={key}>&nbsp;</span>);
          return prevVal;
        }
        style.display = 'inline';
      }
      const props: Record<string, unknown> = {
        // normal props 通用属性
        ...Object.fromEntries(
          Object.entries(attribs)
            .filter(([k, v]) => !HIDDEN_TAG_PROP_NAME.has(k) && !(k.toLowerCase() in domEvents)),
        ),
        // event props 事件属性
        ...Object.fromEntries(
          Object.entries(attribs)
            .map(([k, v]) => [domEvents[k.toLowerCase()], v])
            .filter(([k, v]) => k)
            .map(([k, v]) => [k, createExecutor(v)]),
        ),
        // static props 静态属性
        key,
        style,
        className: attribs.class,
        src: attribs.src,
        width: attribs.width,
        height: attribs.height,
      };
      if (tagName === 'a') {
        props.href = attribs.href;
        props.target = attribs.target;
      }
      if (attribs.title) {
        props.title = attribs.title;
      }
      let content: (JSX.Element | string | null)[] | undefined;
      if (children) {
        const res = children.reduce<ReducerRenderValue>(this.reducerRenderEl, {
          elements: [],
          maxLength,
          singleLine,
          highlight,
          tagNames,
          domEvents,
        });
        if (res.elements.length > 0) {
          content = res.elements;
        }
        prevVal.maxLength = res.maxLength;
      }
      prevVal.elements.push(React.createElement(tagName, props, content));
      return prevVal;
    }
    return prevVal;
  };

  /**
   * 处理页面，绑定图片查看器
   *
   * @private
   * @param {HTMLDivElement} el 页面根节点
   * @returns {void}
   *
   * @memberOf RichText
   */
  private onRef = (el: HTMLDivElement | null) => {
    if (!el) {
      return;
    }
    if (this.viewer) {
      this.viewer.destroy();
    }
    this.viewer = new ViewerJS(el);
  };

  public componentDidUpdate() {
    if (this.viewer) {
      this.viewer.update();
    }
  }

  public render(): JSX.Element | null {
    const bodyEl = cheerio.load(this.props.html)('body')[0];
    return (
      <div ref={this.onRef} className={this.props.className} style={this.props.style}>
        {
          bodyEl && bodyEl.type === 'tag'
            ? bodyEl.children.reduce<ReducerRenderValue>(this.reducerRenderEl, {
              elements: [],
              maxLength: this.props.maxLength ?? -1,
              singleLine: this.props.singleLine ?? false,
              highlight: this.props.highlight,
              tagNames: this.props.tagNames ?? SAFE_TAG_NAME,
              domEvents: Object.fromEntries((this.props.domEvents ?? DOM_EVENT_TYPE).map(name => [name.toLowerCase(), name])),
            }).elements
            : void 0
        }
      </div>
    );
  }
}
