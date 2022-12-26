import { defineConfig } from 'father';
import sha1 from 'sha1';

export default defineConfig({
  umd: {
    entry: {
      'src/index': {
        output: 'dist',
      },
    },
    chainWebpack: (config, { webpack }) => {
      for (const ext of ['css', 'less', 'sass']) {
        config.module.rule(ext)
          .oneOf('css')
          .use('css-loader')
          .tap(options => ({
            ...options,
            modules: {
              ...options?.modules,
              getLocalIdent: (loaderContext: { resourcePath: string }, localIdentName: string, localName: string, options: unknown) => {
                const resourcePath = loaderContext.resourcePath;
                if (localName === 'jfe-drip-table-generator' || localName.startsWith('jfe-drip-table-generator-')) {
                  return localName;
                }
                return `jfe-drip-table-generator-${sha1(resourcePath).slice(0, 4)}-${localName}`;
              },
            },
          }));
      }
      return config;
    },
  },
  cjs: {
    platform: 'browser',
    output: 'lib',
  },
  esm: { output: 'es' },
});
