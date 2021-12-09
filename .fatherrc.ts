export default {
  esm: 'rollup',
  disableTypeCheck: false,
  cjs: { type: 'babel', lazy: true },
  autoPkgs: false,
  pkgs: [
    'drip-table',
  ],
};
