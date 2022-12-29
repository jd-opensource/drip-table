import { defineConfig } from 'father';

export default defineConfig({
  umd: {
    entry: {
      'src/index': {
        output: 'dist',
      },
    },
  },
  cjs: {
    platform: 'browser',
    output: 'lib',
  },
  esm: { output: 'es' },
});
