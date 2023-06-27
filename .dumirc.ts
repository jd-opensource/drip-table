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

const DRIP_TABLE_SIDEBAR = [
  {
    children: [
      {
        title: '介绍 Index',
        link: '/drip-table',
        children: [
          { title: '介绍', link: '/drip-table' },
        ],
      },
      {
        title: '快速开始 Quick Start',
        link: '/drip-table/quick-start',
        children: [
          { title: '快速开始', link: '/drip-table/quick-start' },
        ],
      },
      {
        title: '基础案例 Basic Demo',
        link: '/drip-table/basic-demo',
        children: [
          { title: '基础案例', link: '/drip-table/basic-demo' },
        ],
      },
      {
        title: '高级案例 Pro Demo',
        link: '/drip-table/demo',
        children: [
          { title: '高级案例', link: '/drip-table/demo' },
        ],
      },
      {
        title: '组件 Components',
        link: '/drip-table/components',
        children: [
          { title: '目录', link: '/drip-table/components' },
          { title: '文本 Text', link: '/drip-table/components/text' },
          { title: '图片 Image', link: '/drip-table/components/image' },
          { title: '链接 Link', link: '/drip-table/components/link' },
          { title: '标签 Tag', link: '/drip-table/components/tag' },
          { title: '按钮 Button', link: '/drip-table/components/button' },
          { title: '下拉 Select', link: '/drip-table/components/select' },
          { title: '日期 DatePicker', link: '/drip-table/components/date-picker' },
          { title: '网页 PopUpPage', link: '/drip-table/components/pop-up-page' },
          { title: '数字 InputNumber', link: '/drip-table/components/input-number' },
        ],
      },
      {
        title: '表格配置 Schema',
        link: '/drip-table/schema',
        children: [
          { title: '目录', link: '/drip-table/schema' },
          { title: '标识符 id', link: '/drip-table/schema/id' },
          { title: '类名 className', link: '/drip-table/schema/class-name' },
          { title: '样式 style', link: '/drip-table/schema/style' },
          { title: '内部类名 innerClassName', link: '/drip-table/schema/inner-class-name' },
          { title: '内部样式 innerStyle', link: '/drip-table/schema/inner-style' },
          {
            title: '列配置 columns',
            link: '/drip-table/schema/columns',
            children: [
              { title: '目录', link: '/drip-table/schema/columns' },
              { title: '唯一标识 key', link: '/drip-table/schema/columns/key' },
              { title: '列头 title', link: '/drip-table/schema/columns/title' },
              { title: '列索引 dataIndex', link: '/drip-table/schema/columns/data-index' },
              { title: '列数据处理 dataTranslation', link: '/drip-table/schema/columns/data-translation' },
              { title: '默认数据 defaultValue', link: '/drip-table/schema/columns/default-value' },
              { title: '单元格样式 style', link: '/drip-table/schema/columns/style' },
              { title: '悬浮样式 hoverStyle', link: '/drip-table/schema/columns/hover-style' },
              { title: '行悬浮样式 rowHoverStyle', link: '/drip-table/schema/columns/row-hover-style' },
              { title: '列悬浮样式 columnHoverStyle', link: '/drip-table/schema/columns/column-hover-style' },
              { title: '列宽 width', link: '/drip-table/schema/columns/width' },
              { title: '水平对齐 align', link: '/drip-table/schema/columns/align' },
              { title: '垂直对齐 verticalAlign', link: '/drip-table/schema/columns/vertical-align' },
              { title: '表头描述 description', link: '/drip-table/schema/columns/description' },
              { title: '列固定 fixed', link: '/drip-table/schema/columns/fixed' },
              { title: '列隐藏 hidden', link: '/drip-table/schema/columns/hidden' },
              { title: '列禁用 disable', link: '/drip-table/schema/columns/disable' },
              { title: '列可编辑 editable', link: '/drip-table/schema/columns/editable' },
              { title: '列可隐藏 hidable', link: '/drip-table/schema/columns/hidable' },
              { title: '过滤器 filters', link: '/drip-table/schema/columns/filters' },
              { title: '过滤器最大数量 filtersMaxSelect', link: '/drip-table/schema/columns/filters-max-select' },
              { title: '过滤器默认值 defaultFilteredValue', link: '/drip-table/schema/columns/default-filtered-value' },
              { title: '组件类型 component', link: '/drip-table/schema/columns/component' },
              { title: '配置项 options', link: '/drip-table/schema/columns/options' },
            ],
          },
          { title: '边框 bordered', link: '/drip-table/schema/bordered' },
          { title: '显示表头 showHeader', link: '/drip-table/schema/show-header' },
          { title: '头部 header', link: '/drip-table/schema/header' },
          { title: '尾部 footer', link: '/drip-table/schema/footer' },
          { title: '分页 pagination', link: '/drip-table/schema/pagination' },
          { title: '大小 size', link: '/drip-table/schema/size' },
          { title: '冻结表头 sticky', link: '/drip-table/schema/sticky' },
          { title: '滚动设置 scroll', link: '/drip-table/schema/scroll' },
          { title: '行可选择 rowSelection', link: '/drip-table/schema/row-selection' },
          { title: '行可拖拽 rowDraggable', link: '/drip-table/schema/row-draggable' },
          { title: '可编辑 editable', link: '/drip-table/schema/editable' },
          { title: '表格布局 tableLayout', link: '/drip-table/schema/table-layout' },
          { title: '间隔斑马纹 stripe', link: '/drip-table/schema/stripe' },
          { title: '虚拟滚动 virtual', link: '/drip-table/schema/virtual' },
          { title: '行高 rowHeight', link: '/drip-table/schema/row-height' },
          { title: '行主键 rowKey', link: '/drip-table/schema/row-key' },
          { title: '行插槽键名 rowSlotKey', link: '/drip-table/schema/row-slot-key' },
          { title: '行头插槽 rowHeader', link: '/drip-table/schema/row-header' },
          { title: '行尾插槽 rowFooter', link: '/drip-table/schema/row-footer' },
          { title: '行列合并 span', link: '/drip-table/schema/span' },
          { title: '空表提示 emptyText', link: '/drip-table/schema/empty-text' },
          { title: '子表 subtable', link: '/drip-table/schema/subtable' },
        ],
      },
      {
        title: '插槽系统 Slot',
        link: '/drip-table/slot',
        children: [
          { title: '插槽系统', link: '/drip-table/slot' },
          { title: '插槽样式 style', link: '/drip-table/slot/style' },
          { title: '插槽配置 elements', link: '/drip-table/slot/elements' },
        ],
      },
      {
        title: '布局差异化 Layout',
        link: '/drip-table/layout',
        children: [
          { title: '目录', link: '/drip-table/layout' },
          { title: '卡片模式 Card', link: '/drip-table/layout/card-layout' },
        ],
      },
      {
        title: '属性参数 Props',
        link: '/drip-table/props',
        children: [
          { title: '目录', link: '/drip-table/props' },
          { title: '样式表类名 className', link: '/drip-table/props/class-name' },
          { title: '自定义样式表 style', link: '/drip-table/props/style' },
          { title: '引用实例 ref', link: '/drip-table/props/ref' },
          { title: '校验配置项 ajv', link: '/drip-table/props/ajv' },
          { title: '表格配置 schema', link: '/drip-table/props/schema' },
          { title: '校验配置项 dataSource', link: '/drip-table/props/data-source' },
          { title: '当前显示列键 displayColumnKeys', link: '/drip-table/props/display-column-keys' },
          { title: '指定行可选择 rowSelectable', link: '/drip-table/props/row-selectable' },
          { title: '选中行键 selectedRowKeys', link: '/drip-table/props/selected-row-keys' },
          { title: '冻结表头 sticky', link: '/drip-table/props/sticky' },
          { title: '总条数 total', link: '/drip-table/props/total' },
          { title: '当前页码 currentPage', link: '/drip-table/props/current-page' },
          { title: '加载中 loading', link: '/drip-table/props/loading' },
          { title: '空表提示 emptyText', link: '/drip-table/props/empty-text' },
          { title: '顶部渲染函数 title', link: '/drip-table/props/title' },
          { title: '底部渲染函数 footer', link: '/drip-table/props/footer' },
          { title: '子表顶部渲染函数 subtableTitle', link: '/drip-table/props/subtable-title' },
          { title: '子表底部渲染函数 subtableFooter', link: '/drip-table/props/subtable-footer' },
          { title: '子表配置项 subtableProps', link: '/drip-table/props/subtable-props' },
          { title: '自定义组件库 components', link: '/drip-table/props/components' },
          { title: '组件插槽 slots', link: '/drip-table/props/slots' },
          { title: '附加透传数据 ext', link: '/drip-table/props/ext' },
          { title: '指定行可展开 rowExpandable', link: '/drip-table/props/row-expandable' },
          { title: '行展开渲染函数 expandedRowRender', link: '/drip-table/props/expanded-row-render' },
          { title: '子表默认展开项 defaultExpandedRowKeys', link: '/drip-table/props/default-expanded-row-keys' },
          { title: '子表默认展开 defaultExpandAllRows', link: '/drip-table/props/default-expand-all-rows' },
          { title: '行头插槽是否显示 rowHeaderVisible', link: '/drip-table/props/row-header-visible' },
          { title: '行尾插槽是否显示 rowFooterVisible', link: '/drip-table/props/row-footer-visible' },
          { title: '组件加载完成 componentDidMount', link: '/drip-table/props/component-did-mount' },
          { title: '组件更新完成 componentDidUpdate', link: '/drip-table/props/component-did-update' },
          { title: '组件即将卸载 componentWillUnmount', link: '/drip-table/props/component-will-unmount' },
          { title: '点击行触发 onRowClick', link: '/drip-table/props/on-row-click' },
          { title: '双击行触发 onRowDoubleClick', link: '/drip-table/props/on-row-double-click' },
          { title: '行展开触发 onRowExpand', link: '/drip-table/props/on-row-expand' },
          { title: '行收起触发 onRowCollapse', link: '/drip-table/props/on-row-collapse' },
          { title: '行变化触发 onSelectionChange', link: '/drip-table/props/on-selection-change' },
          { title: '搜索触发 onSearch', link: '/drip-table/props/on-search' },
          { title: '添加按钮触发 onInsertButtonClick', link: '/drip-table/props/on-insert-button-click' },
          { title: '过滤器触发 onFilterChange', link: '/drip-table/props/on-filter-change' },
          { title: '页码变化触发 onPageChange', link: '/drip-table/props/on-page-change' },
          { title: '变动触发 onChange', link: '/drip-table/props/on-change' },
          { title: '展示列触发 onDisplayColumnKeysChange', link: '/drip-table/props/on-display-column-keys-change' },
          { title: '通用事件机制 onEvent', link: '/drip-table/props/on-event' },
        ],
      },
      {
        title: '类型 Types',
        link: '/drip-table/types',
        children: [
          { title: '目录', link: '/drip-table/types' },
          { title: '表格信息 TableInformation', link: '/drip-table/types/table-information' },
          { title: '插槽配置项 SlotSchema', link: '/drip-table/types/slot-schema' },
          { title: '列配置项 ColumnSchema', link: '/drip-table/types/column-schema' },
        ],
      },
      {
        title: '常见问题 FAQ',
        link: '/drip-table/faq',
        children: [
          { title: '常见问题', link: '/drip-table/faq' },
        ],
      },
      {
        title: '更新日志 Changelog',
        link: '/drip-table/changelog',
        children: [
          { title: '更新日志', link: '/drip-table/changelog' },
        ],
      },
      {
        title: '版本升级 Migration',
        link: '/drip-table/migration',
        children: [
          { title: '目录', link: '/drip-table/migration' },
          { title: 'V2-V3', link: '/drip-table/migration/v2-v3' },
        ],
      },
    ],
  },
];

const DRIP_TABLE_GENERATOR_SIDEBAR = [
  {
    children: [
      {
        title: '介绍 Index',
        link: '/drip-table-generator',
        children: [
          { title: '介绍', link: '/drip-table-generator' },
        ],
      },
      {
        title: '快速开始 Quick Start',
        link: '/drip-table-generator/quick-start',
        children: [
          { title: '快速开始', link: '/drip-table-generator/quick-start' },
        ],
      },
      {
        title: '使用教程 Tutorial',
        link: '/drip-table-generator/tutorial',
        children: [
          { title: '使用教程', link: '/drip-table-generator/tutorial' },
          { title: 'Refs引用', link: '/drip-table-generator/tutorial/refs' },
          { title: '高级教程', link: '/drip-table-generator/tutorial/usage-pro' },
          { title: '自定义属性面板', link: '/drip-table-generator/tutorial/custom' },
          { title: 'API', link: '/drip-table-generator/tutorial/api' },
          { title: '表头自定义配置', link: '/drip-table-generator/tutorial/title' },
          { title: '头部配置', link: '/drip-table-generator/tutorial/header' },
          { title: '数据预览配置', link: '/drip-table-generator/tutorial/data-source' },
          { title: '透传 Table 属性', link: '/drip-table-generator/tutorial/table-props' },
          { title: '自定义主题配置', link: '/drip-table-generator/tutorial/custom-theme' },
        ],
      },
      {
        title: '内置组件库 Components',
        link: '/drip-table-generator/components',
        children: [
          { title: '内置组件库', link: '/drip-table-generator/components' },
          { title: '组合组件', link: '/drip-table-generator/components/group' },
          { title: '自定义组件', link: '/drip-table-generator/components/lowcode' },
          { title: 'CDN 链接组件', link: '/drip-table-generator/components/cdn-link' },
          { title: '富文本组件', link: '/drip-table-generator/components/rich-text' },
        ],
      },
      {
        title: '属性参数 Props',
        link: '/drip-table-generator/props',
        children: [
          { title: 'index', link: '/drip-table-generator/props' },
          { title: 'customComponentPanel', link: '/drip-table-generator/props/custom-component-panel' },
          { title: 'customGlobalConfigPanel', link: '/drip-table-generator/props/custom-global-config-panel' },
          { title: 'customAttributeComponents', link: '/drip-table-generator/props/custom-attribute-components' },
          { title: 'dataFields', link: '/drip-table-generator/props/data-fields' },
          { title: 'save', link: '/drip-table-generator/props/save' },
          { title: 'mode', link: '/drip-table-generator/props/mode' },
          { title: 'mockDataSource', link: '/drip-table-generator/props/mock-data-source' },
          { title: 'noDataFeedback', link: '/drip-table-generator/props/no-data-feedback' },
          { title: 'onExportSchema', link: '/drip-table-generator/props/on-export-schema' },
          { title: 'onDataSourceChange', link: '/drip-table-generator/props/on-datasource-change' },
          { title: 'onSave', link: '/drip-table-generator/props/on-save' },
          { title: 'showComponentLayout', link: '/drip-table-generator/props/show-component-layout' },
          { title: 'showToolLayout', link: '/drip-table-generator/props/show-tool-layout' },
          { title: 'slotsSchema', link: '/drip-table-generator/props/slots-schema' },
        ],
      },
      {
        title: '常见问题 FAQ',
        link: '/drip-table-generator/faq',
        children: [
          { title: '常见问题', link: '/drip-table-generator/faq' },
        ],
      },
      {
        title: '案例展示 Demo',
        link: '/drip-table-generator/demo',
        children: [
          { title: '案例展示', link: '/drip-table-generator/demo' },
        ],
      },
      {
        title: '更新日志 Changelog',
        link: '/drip-table-generator/changelog',
        children: [
          { title: '更新日志', link: '/drip-table-generator/changelog' },
        ],
      },
    ],
  },
];

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
        title: '',
        link: 'https://github.com/JDFED/drip-table',
        children: [],
      },
    ],
    sidebar: {
      '/drip-table': DRIP_TABLE_SIDEBAR,
      '/drip-table/components': DRIP_TABLE_SIDEBAR,
      '/drip-table/schema': DRIP_TABLE_SIDEBAR,
      '/drip-table/schema/columns': DRIP_TABLE_SIDEBAR,
      '/drip-table/slot': DRIP_TABLE_SIDEBAR,
      '/drip-table/layout': DRIP_TABLE_SIDEBAR,
      '/drip-table/props': DRIP_TABLE_SIDEBAR,
      '/drip-table/types': DRIP_TABLE_SIDEBAR,
      '/drip-table/migration': DRIP_TABLE_SIDEBAR,
      '/drip-table-generator': DRIP_TABLE_GENERATOR_SIDEBAR,
      '/drip-table-generator/tutorial': DRIP_TABLE_GENERATOR_SIDEBAR,
      '/drip-table-generator/components': DRIP_TABLE_GENERATOR_SIDEBAR,
      '/drip-table-generator/props': DRIP_TABLE_GENERATOR_SIDEBAR,
      '/demo': [],
    },
  },
  // 基础配置项
  // https://d.umijs.org/config#%E5%9F%BA%E7%A1%80%E9%85%8D%E7%BD%AE%E9%A1%B9
  alias: {
    'drip-table': path.resolve(__dirname, './packages/drip-table'),
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
  forkTSChecker: {
    typescript: {
      configOverwrite: {
        exclude: ['node_modules', 'dist', 'packages'],
      },
    },
  },
  hash: true,
  ignoreMomentLocale: false,
  metas: [
    { name: 'keywords', content: 'DripTable,drip,drip-table,lowcode,react,中台,中后台,表格,开箱即用,可视化搭建' },
    { name: 'description', content: '轻量、强大的企业级列表可视化搭建解决方案，中后台「表格」开箱即用解决方案。' },
    { name: 'color-scheme', content: 'light' },
    { name: 'referrer', content: 'origin' },
    { itemprop: 'image', content: 'https://img13.360buyimg.com/imagetools/jfs/t1/204416/31/13736/8631/617f8334E9ae79a1c/5b96dfdce922e5fb.png' },
    { name: 'viewport', id: 'view', content: 'width=device-width, initial-scale=1.0 ,user-scalable=no' },
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
