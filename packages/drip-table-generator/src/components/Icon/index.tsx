/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : qianjing29 (qianjing29@jd.com)
 * @modifier : qianjing29 (qianjing29@jd.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import cheerio, * as Cheerio from 'cheerio';
import * as DOMHandler from 'domhandler';
import { DripTableDriver } from 'drip-table';
import React from 'react';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  driver?: DripTableDriver;
  svg?: React.ReactSVG | string;
}

type SvgTagName = keyof React.ReactSVG;

const SAFE_SVG_NAME: SvgTagName[] = [
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

const HIDDEN_TAG_PROP_NAME = new Set([
  'key',
  'class',
]);

interface ReducerRenderValue {
  elements: (JSX.Element | string)[];
  tagNames: SvgTagName[];
}

export default class Icon extends React.PureComponent<IconProps> {
  public constructor(props: IconProps) {
    super(props);
    this.state = {};
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
  private reducerRenderEl = (prevVal: ReducerRenderValue, el: DOMHandler.Element | Cheerio.Node, key: number): ReducerRenderValue => {
    const { tagNames } = prevVal;
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
      const props: Record<string, unknown> = {
        // normal props 通用属性
        ...Object.fromEntries(
          Object.entries(attribs)
            .filter(([k, v]) => !HIDDEN_TAG_PROP_NAME.has(k)),
        ),
        // static props 静态属性
        key,
        style,
        className: attribs.class,
        src: attribs.src,
        width: attribs.width,
        height: attribs.height,
      };
      if (attribs.title) {
        props.title = attribs.title;
      }
      let content: (JSX.Element | string | null)[] | undefined;
      if (children) {
        const res = children.reduce<ReducerRenderValue>(this.reducerRenderEl, {
          elements: [],
          tagNames,
        });
        if (res.elements.length > 0) {
          content = res.elements;
        }
      }
      prevVal.elements.push(React.createElement(tagName, props, content));
      return prevVal;
    }
    return prevVal;
  };

  public renderByName() {
    if (this.props.name && this.props.driver) {
      const DriverIcon = this.props.driver.icons[this.props.name] as React.ComponentClass;
      if (DriverIcon) {
        return <DriverIcon />;
      }
    }
    return null;
  }

  public renderBySVG() {
    if (typeof this.props.svg === 'string') {
      if (this.props.svg.startsWith('base64')) {
        return (
          <div className={this.props.className} style={{ ...this.props.style, backgroundImage: `url(${this.props.svg})` }} />
        );
      }
      const rootElement = cheerio.load(this.props.svg)('body')[0];
      return (
        <div className={this.props.className} style={this.props.style}>
          {
          rootElement && rootElement.type === 'tag'
            ? rootElement.children.reduce<ReducerRenderValue>(this.reducerRenderEl, {
              elements: [],
              tagNames: SAFE_SVG_NAME,
            }).elements
            : void 0
        }
        </div>
      );
    }
    return null;
  }

  public render() {
    if (this.props.name) {
      return this.renderByName();
    }
    if (this.props.svg) {
      return this.renderBySVG();
    }
    return (
      <div />
    );
  }
}
