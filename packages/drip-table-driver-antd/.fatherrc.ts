import { IBundleOptions } from 'father-build/src/types';

const options: IBundleOptions = {
  cjs: { type: 'rollup' },
  esm: {
    type: 'rollup',
    importLibToEs: true,
  },
  cssModules: true,
  extractCSS: true,
  pkgs: [
    'drip-table',
  ],
  preCommit: {
    eslint: true,
  },
};

export default options;
