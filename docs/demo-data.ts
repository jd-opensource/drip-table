import { DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, DripTableSchema } from 'drip-table';

import { CustomColumnSchema } from './drip-table/sample/custom-components';

export type SubtableDataSourceKey = 'subtable' | 'subtableLevel2';

export const initSchema: DripTableSchema<CustomColumnSchema, SubtableDataSourceKey> & { rowKey: string } = {
  id: 'sample-table',
  size: 'middle',
  bordered: true,
  tableLayout: 'auto',
  sticky: true,
  rowSelection: true,
  editable: true,
  virtual: false,
  scroll: {
    y: 500,
  },
  rowKey: 'id',
  headerStyle: {
    marginBottom: '12px',
    backgroundColor: '#f60',
    borderRadius: '6px',
  },
  headerCellStyle: {
    borderWidth: '0px',
    padding: '2px 6px',
    backgroundColor: '#fff6f0',
  },
  rowGap: 12,
  rowRadius: 6,
  rowStyle: {
    boxShadow: '#2c2c2c 0 4px 8px -4px',
  },
  rowHoverStyle: {
    backgroundColor: '#9e9e90',
  },
  tableCellStyle: {
    backgroundColor: '#6e6e60',
    borderColor: '#6e6e60',
  },
  header: {
    style: { margin: '0', padding: '12px 0' },
    elements: [
      {
        type: 'display-column-selector',
        selectorButtonType: 'primary',
        selectorButtonText: '选择展示列',
      },
      {
        type: 'spacer',
        style: { width: '20px' },
      },
      {
        type: 'text',
        span: 'flex-auto',
        align: 'flex-start',
        text: '商品列表',
      },
      {
        type: 'layout-selector',
        selectorButtonType: 'primary',
        selectorButtonText: '布局模式',
      },
      {
        type: 'slot',
        slot: 'header-slot-sample',
      },
      {
        type: 'search',
        wrapperStyle: { width: 360 },
        align: 'flex-end',
        placeholder: '请输入关键字',
        allowClear: true,
        searchButtonText: '搜索',
        searchKeys: [{ label: '商品', value: 'goods' }, { label: '广告', value: 'advert' }],
        searchKeyDefaultValue: 'goods',
      },
      {
        type: 'insert-button',
        align: 'flex-end',
        insertButtonText: '添加商品',
        showIcon: true,
      },
    ],
  },
  pagination: {
    pageSize: 20,
    showTotal: '总共 {{total}} 条目',
    size: 'default',
    position: 'bottomRight',
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: [3, 5, 10, 20, 50, 100],
  },
  columns: [
    {
      key: 'mock_1',
      title: {
        body: '商品图名',
        header: {
          elements: [{
            type: 'text',
            span: 'flex-auto',
            align: 'flex-start',
            text: '⌚',
          }],
        },
        footer: {
          elements: [{
            type: 'text',
            span: 'flex-auto',
            align: 'flex-start',
            text: '🖼️',
          }],
        },
      },
      width: 140,
      align: 'center',
      verticalAlign: 'middle',
      dataIndex: '',
      component: 'group',
      options: {
        layout: [1, 1],
        horizontalAlign: 'center',
        verticalAlign: 'middle',
        gutter: [16, 8],
        wrap: false,
        items: [
          {
            component: 'image',
            options: {
              imageWidth: 86,
              imageHeight: 86,
            },
            dataIndex: 'demoPic',
          },
          {
            component: 'text',
            options: {
              mode: 'single',
            },
            dataIndex: 'name',
          },
        ],
      },
    },
    {
      key: 'mock_2',
      title: '商品详情',
      width: 200,
      align: 'center',
      hidable: true,
      dataIndex: 'description',
      component: 'text',
      clipboard: true,
      options: {
        mode: 'single',
        ellipsis: true,
        maxRow: 3,
        dataProcess: 'return rec.status === "soldOut" ? "该商品已售罄" : value',
      },
    },
    {
      key: 'link_1828c3251ad-1391',
      dataIndex: '',
      title: '链接',
      description: '',
      component: 'link',
      options: {
        mode: 'single',
        label: 'google',
        href: 'www.google.com',
        target: '',
        event: '',
        operates: [],
        tooltip: 'toolip示例{{rec.name}}',
      },
      align: 'center',
    },
    {
      key: 'rich-text_1828c32cb02-1392',
      dataIndex: '',
      title: '富文本',
      description: '',
      component: 'rich-text',
      options: {
        render: '<p><strong>{{rec.name}}</strong></p>',
        tooltip: 'toolip示例{{rec.name}}',
      },
      align: 'center',
    },
    {
      key: 'mock_3',
      title: '库存状态',
      width: 150,
      align: 'center',
      dataIndex: 'status',
      description: '这是一条提示信息',
      hidable: true,
      filters: [
        { text: '售卖中', value: 'onSale' },
        { text: '已售罄', value: 'soldOut' },
      ],
      defaultFilteredValue: ['onSale', 'soldOut'],
      component: 'text',
      options: {
        mode: 'single',
        i18n: {
          onSale: '售卖中',
          soldOut: '已售罄',
        },
      },
    },
    {
      key: 'date-picker_182e8eea517-1239',
      dataIndex: 'startDate',
      title: '日期',
      width: 120,
      description: '',
      component: 'date-picker',
      options: {
        mode: 'basic',
        format: 'YYYY-MM-DD',

      },
      align: 'center',
    },
    {
      key: 'date-picker_182e8eea517-1240',
      dataIndex: 'dateRange',
      width: 120,
      title: '日期范围',
      description: '',
      component: 'date-picker',
      options: {
        mode: 'range',
        format: 'YYYY-MM-DD',
      },
      align: 'center',
    },
    {
      key: 'mock_8',
      title: '状态选择',
      width: 120,
      dataIndex: 'status',
      component: 'select',
      options: {
        style: { width: 120 },
        options: [{ label: '售卖中', value: 'onSale' }, { label: '已售罄', value: 'soldOut' }],
        event: 'statusToggle',
      },
    },
    {
      key: 'mock_9',
      title: '数字显示',
      width: 120,
      dataIndex: 'num',
      component: 'input-number',
      options: {
        style: { width: 100 },
        step: 2,
        isEdit: true,
        bordered: true,
      },
    },
    {
      key: 'mock_4',
      title: '商品价格',
      width: 150,
      align: 'center',
      hidable: true,
      dataIndex: 'price',
      component: 'text',
      options: {
        mode: 'single',
        prefix: '￥',
      },
    },
    {
      key: 'mock_5',
      title: '渲染组件',
      width: 150,
      align: 'center',
      hidable: true,
      dataIndex: 'render',
      component: 'render-html',
      options: {
        render: "if (rec.id == 1) {\n  return '<button onclick=\"alert(\\'123\\');\" style=\\\"padding: 2px 4px;color:#52c41a; border: 1px solid #b7eb8f; border-radius: 3px; background: #f6ffed\\\">进行中</button>';\n}\nif (rec.id == 2) {\n  return '<span style=\\\"padding: 2px 4px;color:#999; border: 1px solid #999; border-radius: 3px; background: #f2f2f2\\\">已完成</span>';\n}\nreturn '';",
      },
    },
    {
      key: 'mock_6',
      title: '自定义组件',
      width: 200,
      hidable: true,
      dataIndex: 'custom',
      component: 'custom::CustomComponentSample',
      options: {
        customSchema: 'custom schema value',
      },
    },
    {
      key: 'mock_7',
      title: '操作',
      width: 200,
      align: 'center',
      fixed: 'right',
      hidable: true,
      dataIndex: 'operate',
      component: 'link',
      options: {
        mode: 'multiple',
        operates: [
          { name: 'order', label: '订购', href: './#order', target: '_blank' },
          { name: 'view', label: '查看', href: './#view' },
          { name: 'edit', label: '编辑', event: 'edit' },
          { name: 'remove', label: '删除', event: 'remove' },
        ],
      },
    },
  ],
  subtable: {
    id: 'sample-table-sub-level-1',
    dataSourceKey: 'subtable',
    columns: [
      {
        key: 'mock_1',
        title: '页面名称',
        align: 'center',
        dataIndex: 'name',
        component: 'text',
        options: {
          mode: 'single',
          maxRow: 1,
        },
      },
      {
        key: 'mock_2',
        title: '开始/结束时间',
        align: 'center',
        hidable: true,
        dataIndex: 'description',
        component: 'text',
        options: {
          mode: 'single',
          ellipsis: true,
          maxRow: 3,
        },
      },
      {
        key: 'mock_3',
        title: '页面状态',
        align: 'center',
        dataIndex: 'status',
        description: '这是一条提示信息',
        hidable: true,
        filters: [
          { text: '售卖中', value: 'onSale' },
          { text: '已售罄', value: 'soldOut' },
        ],
        defaultFilteredValue: ['onSale', 'soldOut'],
        component: 'text',
        options: {
          mode: 'single',
          i18n: {
            onSale: '售卖中',
            soldOut: '已售罄',
          },
        },
      },
      {
        key: 'mock_7',
        title: '操作',
        align: 'center',
        hidable: true,
        dataIndex: 'operate',
        component: 'link',
        options: {
          mode: 'multiple',
          operates: [
            { name: 'order', label: '订购', href: './#order', target: '_blank' },
            { name: 'view', label: '查看', href: './#view' },
            { name: 'edit', label: '编辑', event: 'edit' },
            { name: 'remove', label: '删除', event: 'remove' },
          ],
        },
      },
    ],
    showHeader: false,
    bordered: true,
    subtable: {
      id: 'sample-table-sub-level-2',
      dataSourceKey: 'subtableLevel2',
      columns: [
        {
          key: 'mock_1',
          title: '页面名称',
          align: 'center',
          dataIndex: 'name',
          component: 'text',
          options: {
            mode: 'single',
            maxRow: 1,
          },
        },
        {
          key: 'mock_2',
          title: '开始/结束时间',
          align: 'center',
          hidable: true,
          dataIndex: 'description',
          component: 'text',
          options: {
            mode: 'single',
            ellipsis: true,
            maxRow: 3,
          },
        },
      ],
    },
  },
  layout: {
    card: {
      columns: [
        {
          key: 'mock_1',
          component: 'image',
          title: '',
          options: {
            imageWidth: '100%',
          },
          dataIndex: 'demoPic',
        },
        {
          key: 'mock_2',
          style: { padding: '0 10px' },
        },
        {
          key: 'mock_3',
          style: { padding: '0 10px' },
        },
        {
          key: 'date-picker_182e8eea517-1239',
          style: { padding: '0 10px' },
        },
        {
          key: 'date-picker_182e8eea517-1240',
          style: { padding: '0 10px' },
        },
        {
          key: 'link_1828c3251ad-1391',
          style: { padding: '0 10px' },
        },
        {
          key: 'rich-text_1828c32cb02-1392',
          style: { padding: '0 10px' },
        },
        {
          key: 'mock_4',
          style: { padding: '0 10px' },
        },
        {
          key: 'mock_5',
          hideInLayout: true,
          style: { padding: '0 10px' },
        },
        {
          key: 'mock_6',
          hideInLayout: true,
        },
        {
          key: 'mock_7',
          hideInLayout: true,
        },
        {
          key: 'mock_8',
          hideInLayout: true,
        },
      ],
      rowSize: 4,
    },
  },
};

export type SampleRecordType = DripTableRecordTypeBase & (
  {
    name: string;
    id: number;
    description: string;
    status: string;
    price: number;
  }
  | {
    id: string;
    name: string;
    description: string;
    status: string;
    price: number;
  }
)

export const mockData: DripTableRecordTypeWithSubtable<SampleRecordType, SubtableDataSourceKey>[] = [
  {
    id: 1,
    name: '商品一',
    pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png',
    description: '商品是为了出售而生产的劳动成果',
    status: 'onSale',
    price: 7999,
    startDate: '2022-09-23',
    endDate: '2022-09-30',
    demoPic: 'https://img11.360buyimg.com/n1/jfs/t1/159786/31/30814/90307/6343dea0E9d5574ae/12d488e175b2525f.jpg.avif',
    dateRange: ['2022-09-23', '2022-09-30'],
    num: 3,
    subtable: [
      {
        id: '1-1',
        name: '苹果',
        description: '是苹果树的果实，一般呈紅色，但需視品種而定，富含矿物质和维生素',
        status: 'soldOut',
        price: 799,
        subtableLevel2: [
          { id: '1-1', name: '苹果', description: '是苹果树的果实，一般呈紅色，但需視品種而定，富含矿物质和维生素', status: 'onSale', price: 799 },
        ],
      },
      { id: '1-2', name: '梨', description: '通常是一种落叶乔木或灌木，极少数品种为常绿，属于蔷薇目蔷薇科苹果族', status: 'onSale', price: 799 },
    ],
  },
  {
    id: 2,
    demoPic: 'https://img12.360buyimg.com/n1/jfs/t1/205502/17/27094/108830/634594f1Efd95ce58/1cb60e6730591991.jpg.avif',
    name: '商品二',
    startDate: '2022-09-24',
    endDate: '2022-09-30',
    dateRange: ['2022-09-23', '2022-09-30'],
    num: 3,
    pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png',
    description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品',
    status: 'onSale',
    price: 6488,
    subtable: [
      { id: '2-1', name: '梨', description: '通常是一种落叶乔木或灌木，极少数品种为常绿，属于蔷薇目蔷薇科苹果族', status: 'onSale', price: 799 },
    ],
  },
  { id: 3, demoPic: 'https://img14.360buyimg.com/n1/jfs/t1/171364/34/30862/62588/6345485eEa1d63dd2/c6e755dfe92f3675.jpg.avif', name: '商品三', startDate: '2022-09-23', endDate: '2022-09-30', dateRange: ['2022-09-23', '2022-09-25'], num: 3, pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 2099 },
  { id: 4, demoPic: 'https://img14.360buyimg.com/n1/jfs/t1/162280/14/31288/70554/634548bbEedadb392/6ec54168429838c3.jpg.avif', name: '商品四', startDate: '2022-09-24', endDate: '2022-09-30', dateRange: ['2022-09-23', '2022-09-26'], num: 3, pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 5999 },
  { id: 5, demoPic: 'https://img13.360buyimg.com/n1/jfs/t1/78098/3/22575/242034/6345952bE55daf87a/4860b8f422cf6dcd.jpg.avif', name: '商品五', startDate: '2022-09-25', endDate: '2022-09-30', dateRange: ['2022-09-23', '2022-09-27'], num: 3, pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 109.9 },
  { id: 6, demoPic: 'https://img13.360buyimg.com/n1/jfs/t1/24167/17/19633/44533/634548a1E9aeafcaf/8c722d784bd8c51e.jpg.avif', name: '商品六', startDate: '2022-09-24', endDate: '2022-09-30', dateRange: ['2022-09-23', '2022-09-28'], num: 3, pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'soldOut', price: 178 },
  { id: 7, demoPic: 'https://img11.360buyimg.com/n1/jfs/t1/87718/30/29483/81120/631b15afE2fd4603d/1a86cbddeb88b92e.jpg.avif', name: '商品七', startDate: '2022-09-25', endDate: '2022-09-30', dateRange: ['2022-09-23', '2022-09-29'], num: 3, pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'soldOut', price: 9999 },
  { id: 8, demoPic: 'https://img13.360buyimg.com/n1/jfs/t1/175174/18/30442/104946/63422ca4E91ff254b/41e61f84b9617acd.jpg.avif', name: '商品八', startDate: '2022-09-26', endDate: '2022-09-30', dateRange: ['2022-09-23', '2022-09-30'], num: 3, pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 7999 },
  { id: 9, demoPic: 'https://img14.360buyimg.com/n1/jfs/t1/72385/20/22305/377250/634548c8E607ab8b0/592f410b52ed7e63.jpg.avif', name: '商品九', startDate: '2022-09-27', endDate: '2022-09-30', dateRange: ['2022-09-23', '2022-09-30'], num: 3, pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 6488 },
  { id: 10, demoPic: 'https://img13.360buyimg.com/n1/jfs/t1/152456/18/25225/57949/634548ecEeef14a5b/a59b7cc05a7fcd56.jpg.avif', name: '商品十', startDate: '2022-09-28', endDate: '2022-09-30', dateRange: ['2022-09-23', '2022-09-30'], num: 3, pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 2099 },
  { id: 11, demoPic: 'https://img14.360buyimg.com/n1/jfs/t1/40609/2/19405/89978/6336e3a9E3cff945e/71046d74b343edd9.jpg.avif', name: '商品十一', startDate: '2022-09-29', endDate: '2022-09-30', dateRange: ['2022-09-23', '2022-09-30'], num: 3, pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'soldOut', price: 5999 },
  { id: 12, demoPic: 'https://img13.360buyimg.com/n1/jfs/t1/69467/10/21344/76893/62fda245Ed05eb205/1e33e91b8ab6f8a8.jpg.avif', name: '商品十二', startDate: '2022-09-30', endDate: '2022-09-30', dateRange: ['2022-09-23', '2022-09-30'], num: 3, pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 109.9 },
  { id: 13, demoPic: 'https://img11.360buyimg.com/n1/jfs/t1/55458/9/20474/108702/62fdbd8cEedb9ef34/00c9cd9be6f98ddd.jpg.avif', name: '商品十三', startDate: '2022-09-23', endDate: '2022-09-30', dateRange: ['2022-09-23', '2022-09-30'], num: 3, pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 178 },
  { id: 14, demoPic: 'https://img12.360buyimg.com/n1/jfs/t1/60033/13/21016/98981/62fd9d30E4cb5c92a/2b9e2e5f02791ec0.jpg.avif', name: '商品十四', startDate: '2022-09-23', endDate: '2022-09-30', dateRange: ['2022-09-23', '2022-09-30'], num: 3, pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'soldOut', price: 9999 },
  { id: 15, demoPic: 'https://img14.360buyimg.com/n1/jfs/t1/162280/14/31288/70554/634548bbEedadb392/6ec54168429838c3.jpg.avif', name: '商品十五', startDate: '2022-09-23', endDate: '2022-09-30', dateRange: ['2022-09-23', '2022-09-30'], num: 3, pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 7999 },
  { id: 16, demoPic: 'https://img13.360buyimg.com/n1/jfs/t1/69467/10/21344/76893/62fda245Ed05eb205/1e33e91b8ab6f8a8.jpg.avif', name: '商品十六', startDate: '2022-09-23', endDate: '2022-09-30', dateRange: ['2022-09-23', '2022-09-30'], num: 3, pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 6488 },
  { id: 17, demoPic: 'https://img12.360buyimg.com/n1/jfs/t1/157963/39/31135/93392/6341680bE569f85c5/89752136813f161b.jpg.avif', name: '商品十七', startDate: '2022-09-23', endDate: '2022-09-30', dateRange: ['2022-09-23', '2022-09-30'], num: 3, pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 2099 },
  { id: 18, demoPic: 'https://img12.360buyimg.com/n1/jfs/t1/46587/1/21715/75903/634160fbE0c2b5d99/01c15c103923208c.jpg.avif', name: '商品十八', startDate: '2022-09-23', endDate: '2022-09-30', dateRange: ['2022-09-23', '2022-09-30'], num: 3, pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 5999 },
  { id: 19, demoPic: 'https://img13.360buyimg.com/n1/jfs/t1/168770/17/32064/99570/6345f1d9E6d43bdef/00433bb8a77f3329.jpg.avif', name: '商品十九', startDate: '2022-09-23', endDate: '2022-09-30', dateRange: ['2022-09-23', '2022-09-30'], num: 3, pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 109.9 },
  { id: 20, demoPic: 'https://img10.360buyimg.com/n1/jfs/t1/179962/28/29180/79484/6336aad4Ed3ae89f8/70a2a4f0e1cec87d.jpg.avif', name: '商品十十', startDate: '2022-09-23', endDate: '2022-09-30', dateRange: ['2022-09-23', '2022-09-30'], num: 3, pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 178 },
  { id: 21, demoPic: 'https://img11.360buyimg.com/n1/jfs/t1/123431/32/27629/75334/63454295E6147c2af/189a0ffc231668fa.jpg.avif', name: '商品二十一', pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'soldOut', price: 9999 },
  { id: 22, demoPic: 'https://img11.360buyimg.com/n1/jfs/t1/179433/14/29158/68909/6341fb59E328f2d8e/20aa6cfecf5f3130.jpg.avif', name: '商品二十二', pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 7999 },
  { id: 23, demoPic: 'https://img12.360buyimg.com/n1/jfs/t1/183155/27/28743/74192/6344ca28E2feb14a9/c405aef18ecde8f0.jpg.avif', name: '商品二十三', pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 6488 },
  { id: 24, demoPic: 'https://img14.360buyimg.com/n1/jfs/t1/145328/8/30739/183767/634547ecE68af5f07/a0b2b3477b14005f.jpg.avif', name: '商品二十四', pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 2099 },
  { id: 25, demoPic: 'https://img11.360buyimg.com/n1/jfs/t1/58125/32/20192/129783/6345480cEb664df83/0ed918c31f9a7a06.jpg.avif', name: '商品二十五', pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 5999 },
  { id: 26, demoPic: 'https://img13.360buyimg.com/n1/jfs/t1/168770/17/32064/99570/6345f1d9E6d43bdef/00433bb8a77f3329.jpg.avif', name: '商品二十六', pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 109.9 },
  { id: 27, demoPic: 'https://img10.360buyimg.com/n1/jfs/t1/105565/13/27261/282268/6345489bEcf26a11a/6f26e279b9821074.jpg.avif', name: '商品二十七', pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 178 },
  { id: 28, demoPic: 'https://img12.360buyimg.com/n1/jfs/t1/157963/39/31135/93392/6341680bE569f85c5/89752136813f161b.jpg.avif', name: '商品二十八', pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'soldOut', price: 9999 },
  { id: 29, demoPic: 'https://img12.360buyimg.com/n1/jfs/t1/104817/40/32452/235048/631b1643Ea91b149e/f71312ed7ae9a058.jpg.avif', name: '商品二十九', pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'soldOut', price: 7999 },
  { id: 30, demoPic: 'https://img12.360buyimg.com/n1/jfs/t1/11378/35/20564/61851/63454833Ea9c6cf65/69bc99b2e3c33a8e.jpg.avif', name: '商品二十十', pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 6488 },
  { id: 31, demoPic: 'https://img14.360buyimg.com/n1/jfs/t1/162280/14/31288/70554/634548bbEedadb392/6ec54168429838c3.jpg.avif', name: '商品三十一', pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 2099 },
  { id: 32, demoPic: 'https://img11.360buyimg.com/n1/jfs/t1/179433/14/29158/68909/6341fb59E328f2d8e/20aa6cfecf5f3130.jpg.avif', name: '商品三十二', pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 5999 },
  { id: 33, demoPic: 'https://img14.360buyimg.com/n1/jfs/t1/145328/8/30739/183767/634547ecE68af5f07/a0b2b3477b14005f.jpg.avif', name: '商品三十三', pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 109.9 },
  { id: 34, demoPic: 'https://img12.360buyimg.com/n1/jfs/t1/46587/1/21715/75903/634160fbE0c2b5d99/01c15c103923208c.jpg.avif', name: '商品三十四', pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 178 },
  { id: 35, demoPic: 'https://img10.360buyimg.com/n1/jfs/t1/179962/28/29180/79484/6336aad4Ed3ae89f8/70a2a4f0e1cec87d.jpg.avif', name: '商品三十五', pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'soldOut', price: 9999 },
  { id: 36, demoPic: 'https://img12.360buyimg.com/n1/jfs/t1/183155/27/28743/74192/6344ca28E2feb14a9/c405aef18ecde8f0.jpg.avif', name: '商品三十六', pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 7999 },
  { id: 37, demoPic: 'https://img11.360buyimg.com/n1/jfs/t1/179433/14/29158/68909/6341fb59E328f2d8e/20aa6cfecf5f3130.jpg.avif', name: '商品三十七', pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 6488 },
  { id: 38, demoPic: 'https://img11.360buyimg.com/n1/jfs/t1/123431/32/27629/75334/63454295E6147c2af/189a0ffc231668fa.jpg.avif', name: '商品三十八', pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 2099 },
  { id: 39, demoPic: 'https://img12.360buyimg.com/n1/jfs/t1/157963/39/31135/93392/6341680bE569f85c5/89752136813f161b.jpg.avif', name: '商品三十一', pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 5999 },
  { id: 40, demoPic: 'https://img10.360buyimg.com/n1/jfs/t1/179962/28/29180/79484/6336aad4Ed3ae89f8/70a2a4f0e1cec87d.jpg.avif', name: '商品三十二', pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'soldOut', price: 109.9 },
  { id: 41, demoPic: 'https://img13.360buyimg.com/n1/jfs/t1/168770/17/32064/99570/6345f1d9E6d43bdef/00433bb8a77f3329.jpg.avif', name: '商品三十三', pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 178 },
  { id: 42, demoPic: 'https://img12.360buyimg.com/n1/jfs/t1/46587/1/21715/75903/634160fbE0c2b5d99/01c15c103923208c.jpg.avif', name: '商品三十四', pictureUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/119951/14/21336/15771/6218427eE68f8f468/e0647b9b7507755d.png', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'soldOut', price: 9999 },
];
