import { IBundleOptions } from 'father-build';
import path from 'path';
import eslint from '@rollup/plugin-eslint';

const options: IBundleOptions = {
  cjs: { type: 'rollup' },
  esm: {
    type: 'rollup',
    importLibToEs: true,
  },
  cssModules: true,
  extractCSS: true,
  extraBabelPlugins: [],
  extraRollupPlugins: [{
    before: "babel",
    plugins: [
      eslint({
        configFile: path.resolve(__dirname, '.eslintrc.js'),
      }),
    ],
  }],
  pkgs: [
    'drip-table',
  ],
  preCommit: {
    eslint: true,
  },
};

export default options;
