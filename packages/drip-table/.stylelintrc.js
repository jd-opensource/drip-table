/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

module.exports = {
  extends: '../../.stylelintrc.js',
  rules: {
    'selector-class-pattern': [
      // Matches class name likes this: block__elem--mod or block1__elem1--mod1-block2__elem2--mod2- or block-50x50__50x50--50x50...
      /^(?:(?:(?:(?:^jfe-drip-table-|(?!^)-)[a-z]+\d*|-[a-z]*\d+|-\d+x\d+)(?:__[a-z]+\d*|__[a-z]*\d+|__\d+x\d+){0,1}(?:--[a-z]+\d*|--[a-z]*\d+|--\d+x\d+){0,1})*)$/u, {
        severity: 'error',
        resolveNestedSelectors: true,
        message: 'Selector must start with "jfe-drip-table-" and in BEM Naming',
      },
    ],
  },
};
