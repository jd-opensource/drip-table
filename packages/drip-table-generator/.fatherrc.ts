import { IBundleOptions } from 'father-build/src/types';
import commonjs from 'rollup-plugin-commonjs';

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
  extraRollupPlugins: [
    // fix error "'isFragment' is not exported by node_modules/react-is/index.js"
    // https://github.com/mui-org/material-ui/issues/18791#issuecomment-574275944
    commonjs({
      include: '../../node_modules/**',
      namedExports: {
        '../../node_modules/react-is/index.js': [
          'isFragment',
          'isMemo',
          'ForwardRef',
        ],
      },
    }),
  ],
  pkgs: [
    'drip-table',
    'drip-table-generator',
  ],
};

export default options;
