/*
 * This file is part of the drip-table project.
 * @link     : https://ace.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import React from 'react';

export interface HighlightProps {
  content: string;
  keywords: string[];
  color?: string;
  tagName?: keyof React.ReactHTML;
  tagAttrs?: Record<string, unknown>;
}

interface ContentPart {
  highlight: boolean;
  text: string;
}

/**
 * 高亮文本
 *
 * @export
 * @class Highlight
 * @extends {React.Component<HighlightProps, {}>}
 */
export default class Highlight extends React.PureComponent<HighlightProps> {
  private get contents(): ContentPart[] {
    const contents: ContentPart[] = [];
    let { content, keywords } = this.props;
    keywords = keywords
      .filter(kw => kw)
      .sort((s1, s2) => s2.length - s1.length);
    if (keywords.length > 0) {
      while (content) {
        const [keyword, index] = this.searchString(content, keywords);
        if (keyword) {
          if (index > 0) {
            contents.push({
              highlight: false,
              text: content.slice(0, Math.max(0, index)),
            });
          }
          contents.push({
            highlight: true,
            text: keyword,
          });
          content = content.slice(index + keyword.length);
        } else {
          contents.push({
            highlight: false,
            text: content,
          });
          content = '';
        }
      }
    }
    return contents;
  }

  /**
   * 搜索匹配字符串
   *
   * @private
   * @param {string} content 内容文本
   * @param {string[]} keywords 关键字列表（按长度降序排列）
   * @returns {[string, number]} 匹配到的关键字, 匹配到的位置
   *
   * @memberOf Highlight
   */
  private searchString(content: string, keywords: string[]): [string, number] {
    let keyword = '';
    let foundIndex = -1;
    for (const kw of keywords) {
      const index = content.indexOf(kw);
      if (index >= 0 && (index < foundIndex || foundIndex === -1)) {
        keyword = kw;
        foundIndex = index;
      }
    }
    return [keyword, foundIndex];
  }

  public render(): JSX.Element {
    const { color = 'red', tagName = 'span', tagAttrs } = this.props;
    const children = this.contents.map((content, i) => (
      content.highlight
        ? <span key={i} style={{ color }}>{ content.text }</span>
        : <span key={i}>{ content.text }</span>
    ));
    return React.createElement(tagName, tagAttrs, children);
  }
}
