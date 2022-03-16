import eslint from '@rollup/plugin-eslint';
import { IBundleOptions } from 'father-build-universal/src/types.d';

const options: IBundleOptions = {
  esm: 'rollup',
  disableTypeCheck: false,
  cjs: { type: 'babel', lazy: true },
  hookGetRollupConfig: (rollupConfigs, opts) => rollupConfigs.map(rollupConfig => ({
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
  ],
};

export default options;
