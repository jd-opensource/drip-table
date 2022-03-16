import { DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, DripTableSchema } from 'drip-table';

import { CustomComponentSchema } from './drip-table/sample/custom-components';

export type SampleSubtableDataSourceKey = 'subtable' | 'subtableLevel2';

export const initSchema: DripTableSchema<CustomComponentSchema, SampleSubtableDataSourceKey> = {
  $schema: 'http://json-schema.org/draft/2019-09/schema#',
  id: 'sample-table',
  size: 'middle',
  bordered: true,
  ellipsis: false,
  sticky: true,
  rowSelection: true,
  virtual: false,
  scrollY: 400,
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
    pageSize: 10,
    size: 'small',
    position: 'bottomRight',
    showQuickJumper: true,
    showSizeChanger: true,
  },
  columns: [
    {
      key: 'mock_1',
      title: '商品名称',
      width: 80,
      align: 'center',
      'ui:type': 'text',
      'ui:props': {
        mode: 'single',
        maxRow: 1,
      },
      type: 'string',
      dataIndex: 'name',
    },
    {
      key: 'mock_2',
      title: '商品详情',
      align: 'center',
      'ui:type': 'text',
      'ui:props': {
        mode: 'single',
        tooltip: true,
        ellipsis: true,
        maxRow: 3,
      },
      type: 'string',
      dataIndex: 'description',
      hidable: true,
    },
    {
      key: 'mock_3',
      title: '库存状态',
      width: 150,
      align: 'center',
      dataIndex: 'status',
      'ui:type': 'text',
      'ui:props': {
        mode: 'single',
      },
      type: 'string',
      i18n: {
        onSale: '售卖中',
        soldOut: '已售罄',
      },
      description: '这是一条提示信息',
      hidable: true,
      filters: [
        { text: '售卖中', value: 'onSale' },
        { text: '已售罄', value: 'soldOut' },
      ],
      defaultFilteredValue: ['onSale', 'soldOut'],
    },
    {
      key: 'mock_4',
      title: '商品价格',
      width: 150,
      align: 'center',
      'ui:type': 'text',
      'ui:props': {
        mode: 'single',
        prefix: '￥',
      },
      type: 'number',
      dataIndex: 'price',
      hidable: true,
    },
    {
      key: 'mock_5',
      title: '渲染组件',
      width: 150,
      align: 'center',
      'ui:type': 'render-html',
      render: "if (rec.id == 1) {\n  return '<button onclick=\"alert(\\'123\\');\" style=\\\"padding: 2px 4px;color:#52c41a; border: 1px solid #b7eb8f; border-radius: 3px; background: #f6ffed\\\">进行中</button>';\n}\nif (rec.id == 2) {\n  return '<span style=\\\"padding: 2px 4px;color:#999; border: 1px solid #999; border-radius: 3px; background: #f2f2f2\\\">已完成</span>';\n}\nreturn '';",
      type: 'number',
      dataIndex: 'render',
      hidable: true,
    },
    {
      key: 'mock_6',
      title: '自定义组件',
      'ui:type': 'custom::CustomComponentSample',
      'ui:props': {},
      type: 'string',
      dataIndex: 'custom',
      hidable: true,
    },
    {
      key: 'mock_7',
      title: '操作',
      align: 'center',
      'ui:type': 'link',
      'ui:props': {
        mode: 'multiple',
        operates: [
          { name: 'order', label: '订购', href: './#order', target: '_blank' },
          { name: 'view', label: '查看', href: './#view' },
          { name: 'edit', label: '编辑', event: 'edit' },
          { name: 'remove', label: '删除', event: 'remove' },
        ],
      },
      type: 'string',
      dataIndex: 'operate',
      hidable: true,
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
        'ui:type': 'text',
        'ui:props': {
          mode: 'single',
          maxRow: 1,
        },
        type: 'string',
        dataIndex: 'name',
      },
      {
        key: 'mock_2',
        title: '开始/结束时间',
        align: 'center',
        'ui:type': 'text',
        'ui:props': {
          mode: 'single',
          tooltip: true,
          ellipsis: true,
          maxRow: 3,
        },
        type: 'string',
        dataIndex: 'description',
        hidable: true,
      },
      {
        key: 'mock_3',
        title: '页面状态',
        align: 'center',
        dataIndex: 'status',
        'ui:type': 'text',
        'ui:props': {
          mode: 'single',
        },
        type: 'string',
        i18n: {
          onSale: '售卖中',
          soldOut: '已售罄',
        },
        description: '这是一条提示信息',
        hidable: true,
        filters: [
          { text: '售卖中', value: 'onSale' },
          { text: '已售罄', value: 'soldOut' },
        ],
        defaultFilteredValue: ['onSale', 'soldOut'],
      },
      {
        key: 'mock_7',
        title: '操作',
        align: 'center',
        'ui:type': 'link',
        'ui:props': {
          mode: 'multiple',
          operates: [
            { name: 'order', label: '订购', href: './#order', target: '_blank' },
            { name: 'view', label: '查看', href: './#view' },
            { name: 'edit', label: '编辑', event: 'edit' },
            { name: 'remove', label: '删除', event: 'remove' },
          ],
        },
        type: 'string',
        dataIndex: 'operate',
        hidable: true,
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
          'ui:type': 'text',
          'ui:props': {
            mode: 'single',
            maxRow: 1,
          },
          type: 'string',
          dataIndex: 'name',
        },
        {
          key: 'mock_2',
          title: '开始/结束时间',
          align: 'center',
          'ui:type': 'text',
          'ui:props': {
            mode: 'single',
            tooltip: true,
            ellipsis: true,
            maxRow: 3,
          },
          type: 'string',
          dataIndex: 'description',
          hidable: true,
        },
      ],
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

export const mockData: DripTableRecordTypeWithSubtable<SampleRecordType, SampleSubtableDataSourceKey>[] = [
  {
    id: 1,
    name: '商品一',
    description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。',
    status: 'onSale',
    price: 7999,
    subtable: [
      {
        id: '1-1',
        name: '苹果',
        description: '是苹果树的果实，一般呈紅色，但需視品種而定，富含矿物质和维生素',
        status: 'onSale',
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
    name: '商品二',
    description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。',
    status: 'onSale',
    price: 6488,
    subtable: [
      { id: '2-1', name: '梨', description: '通常是一种落叶乔木或灌木，极少数品种为常绿，属于蔷薇目蔷薇科苹果族', status: 'onSale', price: 799 },
    ],
  },
  { id: 3, name: '商品三', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 2099 },
  { id: 4, name: '商品四', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 5999 },
  { id: 5, name: '商品五', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 109.9 },
  { id: 6, name: '商品六', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'soldOut', price: 178 },
  { id: 7, name: '商品七', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'soldOut', price: 9999 },
  { id: 8, name: '商品八', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 7999 },
  { id: 9, name: '商品九', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 6488 },
  { id: 10, name: '商品十', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 2099 },
  { id: 11, name: '商品一', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'soldOut', price: 5999 },
  { id: 12, name: '商品二', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 109.9 },
  { id: 13, name: '商品三', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 178 },
  { id: 14, name: '商品四', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'soldOut', price: 9999 },
  { id: 15, name: '商品五', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 7999 },
  { id: 16, name: '商品六', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 6488 },
  { id: 17, name: '商品七', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 2099 },
  { id: 18, name: '商品八', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 5999 },
  { id: 19, name: '商品九', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 109.9 },
  { id: 20, name: '商品十', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 178 },
  { id: 21, name: '商品一', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'soldOut', price: 9999 },
  { id: 22, name: '商品二', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 7999 },
  { id: 23, name: '商品三', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 6488 },
  { id: 24, name: '商品四', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 2099 },
  { id: 25, name: '商品五', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 5999 },
  { id: 26, name: '商品六', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 109.9 },
  { id: 27, name: '商品七', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 178 },
  { id: 28, name: '商品八', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'soldOut', price: 9999 },
  { id: 29, name: '商品九', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'soldOut', price: 7999 },
  { id: 30, name: '商品十', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 6488 },
  { id: 31, name: '商品一', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 2099 },
  { id: 32, name: '商品二', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 5999 },
  { id: 33, name: '商品三', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 109.9 },
  { id: 34, name: '商品四', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 178 },
  { id: 35, name: '商品五', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'soldOut', price: 9999 },
  { id: 36, name: '商品六', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 7999 },
  { id: 37, name: '商品七', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 6488 },
  { id: 38, name: '商品八', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 2099 },
  { id: 39, name: '商品一', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 5999 },
  { id: 40, name: '商品二', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'soldOut', price: 109.9 },
  { id: 41, name: '商品三', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'onSale', price: 178 },
  { id: 42, name: '商品四', description: '商品是为了出售而生产的劳动成果，是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。', status: 'soldOut', price: 9999 },
];
