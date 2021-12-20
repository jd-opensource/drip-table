import path from 'path';
import { IBundleOptions } from 'father-build/src/types';
import eslint from '@rollup/plugin-eslint';

const options: IBundleOptions = {
  cjs: { type: 'rollup' },
  esm: {
    type: 'rollup',
    importLibToEs: true,
  },
  cssModules: {
    generateScopedName: 'drip-table-generator-[local]',
  },
  extractCSS: true,
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
    [
      'import',
      {
        libraryName: '@ant-design/icons',
        libraryDirectory: 'lib/icons',
        camel2DashComponentName: false,
      },
      '@ant-design/icons',
    ],
  ],
  extraRollupPlugins: [{
    before: "babel",
    plugins: [
      eslint(path.resolve(__dirname, '.eslintrc.js')),
    ],
  }],
  pkgs: [
    'drip-table',
    'drip-table-generator',
  ],
};

export default options;
