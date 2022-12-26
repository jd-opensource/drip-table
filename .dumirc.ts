import { defineConfig } from 'dumi';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';
import path from 'path';

const scriptText = `
(function() {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = '/assets/global.css';
  document.body.appendChild(link);
}());
`;

export default defineConfig({
  // 重点配置项
  // https://d.umijs.org/config#%E9%87%8D%E7%82%B9%E9%85%8D%E7%BD%AE%E9%A1%B9
  resolve: {
    atomDirs: [
      { type: 'component', dir: 'docs' },
      { type: 'component', dir: 'docs/drip-table' },
      { type: 'component', dir: 'docs/drip-table/schema' },
    ],
  },
  locales: [{ id: 'zh-CN', name: '中文' }],
  analytics: {
    // google analytics 的 key (GA 4)
    ga_v2: 'G-FSYSGDZ0KE',
    // 百度统计的 key
    // baidu: 'baidu_tongji_key',
  },
  sitemap: {
    hostname: 'https://drip-table.jd.com',
  },
  // 主题配置项
  // https://d.umijs.org/config#%E4%B8%BB%E9%A2%98%E9%85%8D%E7%BD%AE%E9%A1%B9
  themeConfig: {
    logo: 'https://img11.360buyimg.com/imagetools/jfs/t1/156025/11/22552/175523/617fb164E678b9642/6b8c55c5079b9819.jpg',
    nav: [
      {
        title: '渲染器',
        link: '/drip-table',
        children: [
          { title: '使用指南', link: '/drip-table' },
          { title: '常见问题', link: '/drip-table/faq' },
          { title: '案例展示', link: '/drip-table/demo' },
          { title: '更新日志', link: '/drip-table/changelog' },
        ],
      },
      {
        title: '生成器',
        link: '/drip-table-generator',
        children: [
          { title: '使用指南', link: '/drip-table-generator' },
          { title: '常见问题', link: '/drip-table-generator/faq' },
          { title: '案例展示', link: '/drip-table-generator/demo' },
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
  // 基础配置项
  // https://d.umijs.org/config#%E5%9F%BA%E7%A1%80%E9%85%8D%E7%BD%AE%E9%A1%B9
  alias: {
    'drip-table': path.resolve(__dirname, './packages/drip-table'),
    'drip-table-driver-antd': path.resolve(__dirname, './packages/drip-table-driver-antd'),
    'drip-table-generator': path.resolve(__dirname, './packages/drip-table-generator'),
  },
  chainWebpack(config, { webpack }) {
    config.devServer.contentBase(path.join(__dirname, 'docs-static'));
    config.devServer.watchContentBase(true);
    config.plugin('monaco-editor').use(MonacoWebpackPlugin);
  },
  copy: [
    { from: 'docs-static', to: 'docs-dist' },
  ],
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
  exportStatic: {},
  favicons: ['https://img13.360buyimg.com/imagetools/jfs/t1/204416/31/13736/8631/617f8334E9ae79a1c/5b96dfdce922e5fb.png'],
  hash: true,
  ignoreMomentLocale: false,
  metas: [
    { name: 'keywords', content: 'DripTable,drip,drip-table,lowcode,react,中台,中后台,表格,开箱即用,可视化搭建' },
    { name: 'description', content: '轻量、强大的企业级列表可视化搭建解决方案，中后台「表格」开箱即用解决方案。' },
    { name: 'color-scheme', content: 'light' },
    { name: 'referrer', content: 'origin' },
    { name: 'viewport" id="view', content: 'width=device-width, initial-scale=1.0 ,user-scalable=no' },
    { name: 'google-site-verification', content: 'mFmvTiwa8ZRLKOK3MC_g_kOKWJ4avZj_eXWsE7uFkDk' },
  ],
  mfsu: {},
  outputPath: 'docs-dist',
  publicPath: '/',
  proxy: {
    '/storage.jd.com': {
      target: 'https://storage.jd.com/',
      changeOrigin: true,
      pathRewrite: { '^/storage.jd.com': '' },
    },
  },
  scripts: [scriptText],
});
