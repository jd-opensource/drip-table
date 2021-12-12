import { IBundleOptions } from 'father-build/src/types';

const options: IBundleOptions = {
  esm: 'rollup',
  disableTypeCheck: false,
  cjs: { type: 'babel', lazy: true },
  autoPkgs: false,
  pkgs: [
    'drip-table',
  ],
};

export default options;
