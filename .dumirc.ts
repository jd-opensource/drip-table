import { defineConfig } from 'dumi';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';
import path from 'path';

const customCSS = `
/** 取消页面限宽导致的左右边距 **/
.dumi-default-header-content,
.dumi-default-doc-layout > main {
  max-width: 100% !important;
}

/** 恢复暗黑模式下表格边框颜色问题 **/
.markdown th, .markdown td {
  border-color: #cccccc !important;
}

/** 缩放 Logo 图标 **/
.dumi-default-header-left {
  display: flex;
  justify-content: center;
  align-items: center;
}
.dumi-default-logo > img {
  width: 146px !important;
  height: auto !important;
  color: transparent !important;
}

/** Github 按钮 **/
.dumi-default-navbar > :nth-child(5) {
  position: relative;
  display: inline-block;
  color: #454d64;
  height: 64px;
  cursor: pointer;
  font-size: 14px;
  line-height: 64px;
  text-decoration: none;
  letter-spacing: 0;
  background-image: url("https://img14.360buyimg.com/imagetools/jfs/t1/220852/40/8646/5883/61c2dd7aE04a55d46/e930932b7dee46b0.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
}
.dumi-default-navbar > :nth-child(5) a {
  display: inline-block;
  width: 30px;
  height: 100%;
}

/** 隐藏页脚 **/
.dumi-default-footer {
  display: none;
}

/** 代码换行 **/
pre.prism-code {
  word-break: break-all !important;
  white-space: pre-wrap !important;
}
`;

export default defineConfig({
  themeConfig: {
    logo: 'https://img11.360buyimg.com/imagetools/jfs/t1/156025/11/22552/175523/617fb164E678b9642/6b8c55c5079b9819.jpg',
    nav: [
      {
        title: '渲染器',
        link: '/drip-table',
        children: [
          { title: '使用指南', link: '/drip-table' },
          { title: '常见问题', link: '/drip-table/faq' },
          { title: '案例展示', link: '/drip-table/sample' },
          { title: '更新日志', link: '/drip-table/changelog' },
        ],
      },
      {
        title: '生成器',
        link: '/drip-table-generator',
        children: [
          { title: '使用指南', link: '/drip-table-generator' },
          { title: '常见问题', link: '/drip-table-generator/faq' },
          { title: '案例展示', link: '/drip-table-generator/preview' },
          { title: '更新日志', link: '/drip-table-generator/changelog' },
        ],
      },
      {
        title: 'DEMO',
        link: '/demo',
        children: [],
      },
      {
        title: '讨论组',
        link: 'https://github.com/JDFED/drip-table/discussions',
        children: [],
      },
      {
        title: '',
        link: 'https://github.com/JDFED/drip-table',
        children: [],
      },
    ],
  },
  locales: [{ id: 'zh-CN', name: '中文' }],
  resolve: {
    atomDirs: [
      { type: 'component', dir: 'docs' },
      { type: 'component', dir: 'docs/drip-table' },
      { type: 'component', dir: 'docs/drip-table/schema' },
    ],
  },
  sitemap: {
    hostname: 'https://drip-table.jd.com',
  },
  favicons: ['https://img13.360buyimg.com/imagetools/jfs/t1/204416/31/13736/8631/617f8334E9ae79a1c/5b96dfdce922e5fb.png'],
  logo: '',
  outputPath: 'docs-dist',
  hash: true,
  mfsu: {},
  ignoreMomentLocale: false,
  publicPath: '/',
  copy: [
    { from: './docs/assets', to: './assets' },
  ],
  exportStatic: {},
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'lib',
        style: true,
      },
      'antd',
    ],
    [
      'import',
      {
        libraryName: '@alifd/next',
        libraryDirectory: 'lib',
      },
      '@alifd/next',
    ],
  ],
  chainWebpack(config, { webpack }) {
    config.plugin('monaco-editor').use(MonacoWebpackPlugin);
  },
  alias: {
    'drip-table': path.resolve(__dirname, './packages/drip-table'),
    'drip-table-driver-antd': path.resolve(__dirname, './packages/drip-table-driver-antd'),
    'drip-table-generator': path.resolve(__dirname, './packages/drip-table-generator'),
  },
  proxy: {
    '/storage.jd.com': {
      target: 'https://storage.jd.com/',
      changeOrigin: true,
      pathRewrite: { '^/storage.jd.com': '' },
    },
  },
  // more config: https://d.umijs.org/config
  styles: [customCSS],
});
