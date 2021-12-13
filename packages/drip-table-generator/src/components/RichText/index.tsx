/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import React, { CSSProperties } from 'react';
import cheerio from 'cheerio';
import ViewerJS from 'viewerjs';
import Highlight, { HighlightProps } from '../Highlight';
import 'viewerjs/dist/viewer.css';

interface RichTextProps {
  html: string;
  tagNames?: (keyof React.ReactDOM)[];
  singleLine?: boolean;
  maxLength?: number;
  highlight?: Omit<HighlightProps, 'content' | 'tagName'>;
  style?: CSSProperties;
  wrapperClass?: string;
}

const SAFE_TAG_NAME: NonNullable<RichTextProps['tagNames']> = [
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
  // 'body',
  'br',
  'button',
  // 'canvas',
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
  // 'form',
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
  // 'iframe',
  'img',
  // 'input',
  'ins',
  'kbd',
  'keygen',
  'label',
  'legend',
  'li',
  // 'link',
  'main',
  'map',
  'mark',
  'menu',
  'menuitem',
  'meta',
  'meter',
  'nav',
  // 'noscript',
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
  // 'script',
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
  'animate',
  'circle',
  'clipPath',
  'defs',
  'desc',
  'ellipse',
  'feBlend',
  'feColorMatrix',
  'feComponentTransfer',
  'feComposite',
  'feConvolveMatrix',
  'feDiffuseLighting',
  'feDisplacementMap',
  'feDistantLight',
  'feDropShadow',
  'feFlood',
  'feFuncA',
  'feFuncB',
  'feFuncG',
  'feFuncR',
  'feGaussianBlur',
  'feImage',
  'feMerge',
  'feMergeNode',
  'feMorphology',
  'feOffset',
  'fePointLight',
  'feSpecularLighting',
  'feSpotLight',
  'feTile',
  'feTurbulence',
  'filter',
  'foreignObject',
  'g',
  'image',
  'line',
  'linearGradient',
  'marker',
  'mask',
  'metadata',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialGradient',
  'rect',
  'stop',
  'svg',
  'switch',
  'symbol',
  'text',
  'textPath',
  'tspan',
  'use',
  'view',
];

interface ReducerRenderValue {
  elements: (JSX.Element | string)[];
  maxLength: number;
  tagNames: NonNullable<RichTextProps['tagNames']>;
  singleLine: NonNullable<RichTextProps['singleLine']>;
  highlight: RichTextProps['highlight'];
}

/**
 * 高亮文本
 *
 * @export
 * @class RichText
 * @extends {React.PureComponent<RichTextProps>}
 */
export default class RichText extends React.PureComponent<RichTextProps> {
  private viewer!: ViewerJS;

  /**
   * 根据指定属性名过滤掉一部分属性
   *
   * @private
   * @param {Record<string, unknown>} originAttr 原始属性对象
   * @param {string[]} excludeKeys 指定需要过滤的属性名
   * @returns {Record<string, unknown>} 过滤后的属性
   *
   * @memberOf RichText
   */
  private filterAttrs(originAttr: Record<string, unknown>, excludeKeys: string[]) {
    const attr = {};
    Object.keys(originAttr).filter(k => !excludeKeys.includes(k)).forEach((key) => {
      attr[key] = originAttr[key];
    });
    return attr;
  }

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
  private reducerRenderEl = (prevVal: ReducerRenderValue, el: cheerio.Element, key: number): ReducerRenderValue => {
    const { tagNames, singleLine, maxLength, highlight } = prevVal;
    if (el.type === 'text') {
      let text = el.data || '';
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
    if (tagNames.includes(el.tagName as never)) {
      const tagName = el.tagName as NonNullable<HighlightProps['tagName']>;
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
        ...this.filterAttrs(attribs, ['key', 'class', 'onclick']),
        key,
        style,
        className: attribs.class,
        src: attribs.src,
        width: attribs.width,
        height: attribs.height,
        onClick: new Function(attribs.onclick),
      };
      if (tagName === 'a') {
        props.href = attribs.href;
        props.target = attribs.target;
      }
      let content: (JSX.Element | string | null)[] | undefined;
      if (children) {
        const res = children.reduce<ReducerRenderValue>(this.reducerRenderEl, {
          elements: [],
          maxLength,
          tagNames,
          singleLine,
          highlight,
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
  }

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
  }

  public componentDidUpdate() {
    if (this.viewer) {
      this.viewer.update();
    }
  }

  public render(): JSX.Element | null {
    const { html, maxLength = -1, tagNames = SAFE_TAG_NAME, singleLine = false, highlight, style, wrapperClass } = this.props;
    const $ = cheerio.load(html);
    const body = $('body')[0];
    return (
      <div ref={this.onRef} style={style} className={wrapperClass}>
        {
          body && body.type === 'tag'
            ? body.children.reduce<ReducerRenderValue>(this.reducerRenderEl, {
              elements: [],
              maxLength,
              tagNames,
              singleLine,
              highlight,
            }).elements
            : void 0
        }
      </div>
    );
  }
}
