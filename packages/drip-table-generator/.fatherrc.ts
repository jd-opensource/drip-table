import eslint from '@rollup/plugin-eslint';
import { IBundleOptions } from 'father-build-universal/src/types.d';

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
  hookRollupConfig: (rollupConfigs, environment) => rollupConfigs.map(rollupConfig => ({
    ...rollupConfig,
    plugins: [
      eslint({
        include: [/\.js$/ui, /\.jsx$/ui, /\.ts$/ui, /\.tsx$/ui, /\.tx$/ui],
        exclude: [/\/node_modules\//ui, /\/dist\//ui],
        throwOnError: true,
        throwOnWarning: true,
      }),
      ...rollupConfig.plugins || [],
    ],
  })),
  pkgs: [
    'drip-table',
    'drip-table-generator',
  ],
};

export default options;
