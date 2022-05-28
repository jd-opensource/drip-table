/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

const fs = require('fs');

try {
  // fix: umi 脚本报错
  // https://github.com/umijs/umi/issues/7708
  // https://github.com/umijs/umi/issues/8087
  const filePath = 'node_modules/umi/node_modules/@umijs/preset-built-in/lib/plugins/features/ssr/ssr.js';
  let text = fs.readFileSync(filePath, 'utf8');
  text = text.replace(
    'if (chunk && opts.chunks.find(c => c.name.startsWith(chunk))) {',
    'if (chunk && opts.chunks.find(c => c.name && c.name.startsWith(chunk))) {',
  );
  fs.writeFileSync(filePath, text);
} catch (error) {
  console.error(error);
}
