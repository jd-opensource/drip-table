/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import kebabCase from 'lodash/kebabCase';
import React from 'react';

/**
 * Parse React CSS
 * @param style target style: can be css object, react style object, css string
 * @returns React CSS Properties Object
 */
export const parseReactCSS = (style: string | Record<string, string>): React.CSSProperties => {
  if (typeof style === 'string') {
    style = Object.fromEntries(
      style
        .split(';')
        .map(
          line => line
            .split(':')
            .map(s => s.trim()),
        )
        .filter(([k, v]) => k && v),
    );
  }
  return typeof style === 'object' && style
    ? Object.fromEntries(
      Object.entries(style)
        .map(([k, v]) => [k.replace(/-[a-z]/ug, s => `${s.slice(1).toUpperCase()}`), v]),
    )
    : {};
};

/**
 * Parse CSSProperties
 * @param style target style: can be css object, react style object, css string
 * @returns CSS Properties Object
 */
export const parseCSS = (style: string | Record<string, string>): Record<string, string> => {
  if (typeof style === 'string') {
    style = Object.fromEntries(
      style
        .split(';')
        .map(
          line => line
            .split(':')
            .map(s => s.trim()),
        )
        .filter(([k, v]) => k && v),
    );
  }
  return typeof style === 'object' && style
    ? Object.fromEntries(
      Object.entries(style)
        .map(([k, v]) => [k.replace(/[A-Z]/ug, s => `-${s.toLowerCase()}`), v]),
    )
    : {};
};

/**
 * Parse Theme CSS
 * @param theme schema.theme
 * @returns Theme CSS Object
 */
export const parseThemeCSS = (theme: Record<string, string> | undefined) => Object.fromEntries(
  Object.entries({
    // Default theme css see: '@/styles/theme/default.less'
    ...theme,
  })
    .filter(([k, v]) => k && v)
    .map(([k, v]) => [`--drip-table-${kebabCase(k)}`, v]),
);

/**
 * Stringify CSSProperties
 * @param style target style: can be css object, react style object, css string
 * @returns CSS String
 */
export const stringifyCSS = (style: string | Record<string, string>): string =>
  Object.entries(parseCSS(style))
    .filter(([k, v]) => k && v)
    .map(([k, v]) => `${k}: ${v}`)
    .join('; ');

/**
 * Set element style
 * @param el target element
 * @param style target style: can be css object, react style object, css string
 */
export const setElementCSS = (el: HTMLElement, style: string | Record<string, string>): void => {
  Object.entries(parseCSS(style))
    .filter(([k, v]) => k && v)
    .forEach(([k, v]) => { el.style[k] = v; });
};
