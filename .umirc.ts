import path from 'path';
import { IConfig } from '@umijs/core';
import { defineConfig } from 'dumi';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

const config: IConfig = {
  title: ' ',
  favicon: 'https://img13.360buyimg.com/imagetools/jfs/t1/204416/31/13736/8631/617f8334E9ae79a1c/5b96dfdce922e5fb.png',
  logo: 'https://img11.360buyimg.com/imagetools/jfs/t1/156025/11/22552/175523/617fb164E678b9642/6b8c55c5079b9819.jpg',
  outputPath: 'docs-dist',
  hash: true,
  dynamicImport: {
    loading: '/docs/Loading.js',
  },
  locales: [['zh-CN', '中文']],
  ignoreMomentLocale: false,
  navs: [
    {
      title: '渲染器',
      path: '/drip-table',
      children: [
        { title: '使用指南', path: '/drip-table' },
        { title: '常见问题', path: '/drip-table/faq' },
        { title: '案例展示', path: '/drip-table/sample' },
        { title: '更新日志', path: '/drip-table/changelog' },
      ],
    },
    {
      title: '生成器',
      path: '/drip-table-generator',
      children: [
        { title: '使用指南', path: '/drip-table-generator' },
        { title: '常见问题', path: '/drip-table-generator/faq' },
        { title: '案例展示', path: '/drip-table-generator/preview' },
        { title: '更新日志', path: '/drip-table-generator/changelog' },
      ],
    },
    {
      title: 'Git-Hub',
      path: 'https://github.com/JDFED/drip-table',
    },
    {
      title: '讨论组',
      path: 'https://github.com/JDFED/drip-table/discussions'
    }
  ],
  menus: {
    '/drip-table': [
      {
        title: '指南',
        path: '/drip-table/guide',
        children: [
          '/drip-table/guide/index.md',
          '/drip-table/guide/fast-start.md',
          '/drip-table/guide/basic-demo.md',
        ],
      },
      {
        title: '功能',
        path: '/drip-table/functions',
        children: [
          '/drip-table/functions/index.md',
          '/drip-table/functions/refs.md',
          '/drip-table/functions/event',
          '/drip-table/functions/api.md',
        ],
      },
      {
        title: '常见问题',
        path: '/drip-table/faq',
      },
      {
        title: '案例展示',
        path: '/drip-table/sample',
        children: [],
      },
      {
        title: '更新日志',
        path: '/drip-table/changelog',
        children: [],
      },
    ],
    '/drip-table-generator': [
      {
        title: '使用指南',
        path: '/drip-table-generator/guide',
        children: [
          '/drip-table-generator/guide/index.md',
          '/drip-table-generator/guide/fast-start.md',
        ],
      },
      {
        title: '使用教程',
        path: '/drip-table-generator/functions',
        children: [
          '/drip-table-generator/functions/index.md',
          '/drip-table-generator/functions/usage-pro.md',
          '/drip-table-generator/functions/api.md',
        ],
      },
      {
        title: '常见问题',
        path: '/drip-table-generator/faq',
      },
      {
        title: '案例展示',
        path: '/drip-table-generator/preview',
      },
      {
        title: '更新日志',
        path: '/drip-table-generator/changelog',
        children: [],
      },
    ],
  },
  mode: 'site',
  esbuild: {},
  publicPath: '/',
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
    'drip-table': path.resolve(__dirname, './packages/drip-table/dist'),
    'drip-table-driver-antd': path.resolve(__dirname, './packages/drip-table-driver-antd/dist'),
    'drip-table-generator': path.resolve(__dirname, './packages/drip-table-generator/dist'),
  },
  // more config: https://d.umijs.org/config
  styles: [
    `.__dumi-default-navbar-logo {width:146px !important;}
    .__dumi-default-layout-hero,
    .__dumi-default-layout-toc li a.active::before,
    .__dumi-default-menu-inner ul li a::before,
    .__dumi-default-menu-inner ul li > span::before,
    .__dumi-default-navbar nav > span > a.active::after,
    .__dumi-default-menu-list > li > a::after
    { background-image: linear-gradient( 90deg, #00C6FF 0%, #0072FF 100% );}`,
    '.__dumi-default-layout-hero h1 { color: #fff !important; }',
    '.__dumi-default-layout-hero h1 + div .markdown { color: #fff !important; }',
    '.__dumi-default-layout-hero button { border: 1px solid #fff !important; color: #fff !important; }',
    '.__dumi-default-layout-hero a:last-child button { background: #fff !important; color: #2b64ff !important; }',
    `.__dumi-default-navbar nav a:hover,
    .__dumi-default-navbar a.active,
    .__dumi-default-menu-inner ul li,
    .__dumi-default-layout-toc li a:hover,
    ul[role='slug-list'] li > a.active,
    .__dumi-default-menu-inner ul li a:hover,
    .__dumi-default-menu-inner ul li > span:hover,
    .__dumi-default-menu-inner ul li a.active,
    .__dumi-default-menu-inner ul li > span.active,
    .__dumi-default-layout-footer-meta > span:last-child::before
    { color: #2b64ff !important; }`,
    '.__dumi-default-menu-list > li > a.active { background: linear-gradient(to left, #f8faff, rgb(248 255 253 / 0%)); !important; }',
    '.__dumi-default-layout-content { max-width:100% !important; }',
    '.__dumi-default-layout[data-route="/"] .__dumi-default-layout-footer-meta { display: none; }',
  ],
};

export default defineConfig(config);
