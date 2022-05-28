/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

const fs = require('fs');
const path = require('path');
const less = require('less');
const htmlMinifierTerser = require('html-minifier-terser');

const srcPath = path.resolve(__dirname, './src');
const distPath = path.join(__dirname, '../docs-dist');

/**
 * Look ma, it's cp -R.
 * @param {string} src  The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 */
const copyRecursiveSync = (src, dest) => {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    for (const childItemName of fs.readdirSync(src)) {
      copyRecursiveSync(path.join(src, childItemName),
        path.join(dest, childItemName));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
};

try {
  // HTML
  const html = fs.readFileSync(path.join(srcPath, './index.html'), 'utf8');
  htmlMinifierTerser.minify(html, {
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    noNewlinesBeforeTagClose: true,
    preserveLineBreaks: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    sortAttributes: true,
    sortClassName: true,
    minifyJS: true,
  })
    .then((res) => {
      fs.writeFileSync(path.join(distPath, 'index.html'), res.replace(/\n/uig, ''));
      return res;
    })
    .catch((error) => { throw error; });
  // CSS
  const css = fs.readFileSync(path.join(srcPath, './index.less'), 'utf8');
  less.render(css, {
    compress: true,
  })
    .then((res) => {
      fs.writeFileSync(path.join(distPath, 'index.css'), res.css);
      return res;
    })
    .catch((error) => { throw error; });
  // ASSETS
  copyRecursiveSync(path.join(__dirname, './assets'), path.join(distPath, './assets'));
} catch (error) {
  console.error(error);
}
