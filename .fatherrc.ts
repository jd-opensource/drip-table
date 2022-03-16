import { IBundleOptions } from 'father-build-universal/src/types';

const options: IBundleOptions = {
  esm: 'rollup',
  disableTypeCheck: false,
  cjs: { type: 'babel', lazy: true },
  pkgs: [
    'drip-table',
  ],
};

export default options;
