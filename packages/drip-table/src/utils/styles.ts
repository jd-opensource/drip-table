/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import React from 'react';

export const translateStyleToClass = (className: string, styleProperties: React.CSSProperties) => {
  let styles = '';
  Object.keys(styleProperties).forEach((key) => {
    const lineKey = key.replace(/([A-Z])/ug, '-$1').toLowerCase();
    styles += `${lineKey}:${styleProperties[key]};`;
  });
  return `${className.startsWith('.') ? '' : '.'}${className} {${styles}}`;
};
