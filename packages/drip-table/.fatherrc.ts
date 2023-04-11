import { defineConfig } from 'father';
import path from 'path';
import TerserWebpackPlugin from 'terser-webpack-plugin';

export default defineConfig({
  umd: {
    entry: {
      'src/index': {
        output: 'dist',
      },
    },
    chainWebpack(config, { webpack }) {
      config.entry('index').add(path.join(__dirname, './src/index.ts'));
      config.entry('index.min').add(path.join(__dirname, './src/index.ts'));
      config.optimization.minimizer('css').use(TerserWebpackPlugin, [{
        test: /min/u,
        terserOptions: {
          module: true,
        },
        minify: v => new Promise(resolve => resolve({ code: v.value })),
      }]);
      return config;
    },
  },
  cjs: {
    platform: 'browser',
    output: 'lib',
  },
  esm: { output: 'es' },
});
