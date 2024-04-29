const fs = require('fs');
const path = require('path');

// 替换函数
function replaceInFile(filePath, srcDir) {
  fs.readFile(filePath, 'utf8', (err1, data) => {
    if (err1) {
      console.error(`Error reading file ${filePath}: ${err1}`);
      return;
    }

    // 计算替换字符串
    const relativePath = path.relative(path.dirname(filePath), srcDir) || '.';
    const newPath = data.replace(/@@drip-table-src\//ug, `${relativePath}/`);

    // 写回文件
    fs.writeFile(filePath, newPath, 'utf8', (err2) => {
      if (err2) {
        console.error(`Error writing file ${filePath}: ${err2}`);
      } else {
        console.log(`File processed: ${filePath}`);
      }
    });
  });
}

// 递归遍历文件夹
function walkDir(dir, srcDir = dir) {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}: ${err}`);
      return;
    }

    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        walkDir(fullPath, srcDir);
      } else if (file.isFile() && fullPath.endsWith('.less')) {
        replaceInFile(fullPath, srcDir);
      }
    }
  });
}

// 开始遍历
walkDir(path.join(__dirname, 'es'));
walkDir(path.join(__dirname, 'lib'));
