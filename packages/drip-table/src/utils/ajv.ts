/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import Ajv from 'ajv';
import AjvKeywords from 'ajv-keywords';

import { DripTableSchema, SchemaObject } from '@/types';

export interface AjvOptions {
  /**
   * Schema 校验时是否允许多余的数据
   */
  additionalProperties?: boolean;
}

const createAjv = (): Ajv => AjvKeywords(new Ajv({ discriminator: true, strictTypes: false }));

const getAjvErrorMessage = (
  ajv: Ajv,
  { separator = ', ', dataVar = 'data' }: Parameters<Ajv['errorsText']>[1] = {},
): string => {
  if (!ajv.errors || ajv.errors.length === 0) {
    return '';
  }
  return ajv.errors
    .map((e) => {
      const params = e.params && typeof e.params === 'object'
        ? Object.entries(e.params).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join(', ')
        : String(e.params);
      return `${dataVar}${e.instancePath} ${e.message}${params ? `, ${params}` : ''}`;
    })
    .reduce((text, msg) => `${text}${separator}${msg}`);
  // return ajv.errorsText(void 0, { dataVar: 'column' });
};

/**
 * 校验 DripTable Props 是否符合 Schema 要求
 * @param data DripTable Props
 * @param options ajv 校验选项
 * @returns 校验失败提示内容，成功返回 null
 */
export const validateDripTableProps = (data: unknown, options?: AjvOptions) => {
  const ajv = createAjv();
  const additionalProperties = options?.additionalProperties ?? false;
  const dripTableGenericRenderElementSchema: SchemaObject = {
    type: 'array',
    items: {
      typeof: 'object',
      discriminator: { propertyName: 'type' },
      required: ['type'],
      oneOf: [
        {
          properties: {
            type: { const: 'spacer' },
          },
        },
        {
          properties: {
            type: { const: 'text' },
            text: { type: 'string' },
          },
          required: ['text'],
        },
        {
          properties: {
            type: { const: 'html' },
            html: { type: 'string' },
          },
          required: ['html'],
        },
        {
          properties: {
            type: { const: 'search' },
            wrapperClassName: { type: 'string' },
            wrapperStyle: { typeof: 'object' },
            placeholder: { type: 'string' },
            allowClear: { type: 'boolean' },
            searchButtonText: { type: 'string' },
            searchButtonSize: { enum: ['large', 'middle', 'small'] },
            searchKeys: {
              type: 'array',
              items: {
                properties: {
                  label: { type: 'string' },
                  value: { typeof: ['number', 'string'] },
                },
                required: ['label', 'value'],
              },
            },
            searchKeyDefaultValue: { typeof: ['number', 'string'] },
          },
        },
        {
          properties: {
            type: { const: 'slot' },
            slot: { type: 'string' },
            props: { typeof: 'object' },
          },
          required: ['slot'],
        },
        {
          properties: {
            type: { const: 'insert-button' },
            insertButtonClassName: { type: 'string' },
            insertButtonStyle: { typeof: 'object' },
            insertButtonText: { type: 'string' },
            showIcon: { type: 'boolean' },
          },
        },
        {
          properties: {
            type: { const: 'display-column-selector' },
            selectorButtonText: { type: 'string' },
            selectorButtonType: { enum: ['ghost', 'primary', 'dashed', 'link', 'text', 'default'] },
          },
        },
      ],
    },
  };
  const dripTableSchema: SchemaObject = {
    properties: {
      id: { typeof: ['number', 'string'] },
      className: { type: 'string' },
      style: { typeof: 'object' },
      innerClassName: { type: 'string' },
      innerStyle: { typeof: 'object' },
      bordered: { type: 'boolean' },
      showHeader: { type: 'boolean' },
      header: {
        anyOf: [
          { type: 'boolean' },
          {
            properties: {
              style: { typeof: 'object' },
              elements: dripTableGenericRenderElementSchema,
            },
          },
        ],
      },
      footer: {
        properties: {
          style: { typeof: 'object' },
          elements: dripTableGenericRenderElementSchema,
        },
      },
      pagination: {
        anyOf: [
          { type: 'boolean' },
          {
            properties: {
              size: { enum: ['small', 'default'] },
              pageSize: { type: 'number' },
              position: { enum: ['bottomLeft', 'bottomCenter', 'bottomRight'] },
              showLessItems: { type: 'boolean' },
              showQuickJumper: { type: 'boolean' },
              showSizeChanger: { type: 'boolean' },
              hideOnSinglePage: { type: 'boolean' },
            },
            required: ['pageSize'],
          },
        ],
      },
      size: { enum: ['small', 'middle', 'large'] },
      sticky: { type: 'boolean' },
      scroll: {
        properties: {
          x: { typeof: ['number', 'boolean', 'string'] },
          y: { typeof: ['number', 'string'] },
          scrollToFirstRowOnChange: { type: 'boolean' },
        },
      },
      rowSelection: { type: 'boolean' },
      ellipsis: { type: 'boolean' },
      placeholder: {
        properties: {
          image: { type: 'string' },
          text: { type: 'string' },
        },
      },
      virtual: { type: 'boolean' },
      scrollY: { type: 'number' },
      columns: {
        type: 'array',
        items: {},
      },
      rowKey: { type: 'string' },
      subtable: {},
    },
    additionalProperties,
  };
  const dripTableSubtableSchema = {
    ...dripTableSchema,
    properties: {
      ...dripTableSchema.properties || [],
      dataSourceKey: { typeof: ['number', 'string'] },
    },
    required: [
      ...dripTableSchema.required || [],
      'dataSourceKey',
    ],
  };
  const propsSchema: SchemaObject = {
    properties: {
      driver: {},
      schema: dripTableSchema,
      dataSource: {
        type: 'array',
        items: {},
      },
      className: { type: 'string' },
      style: { typeof: 'object' },
      selectedRowKeys: {},
      displayColumnKeys: {},
      total: { type: 'number' },
      currentPage: { type: 'number' },
      loading: { type: 'boolean' },
      components: {},
      slots: {},
      ajv: {
        anyOf: [
          {
            properties: {
              additionalProperties: { type: 'boolean' },
            },
          },
          { type: 'boolean' },
        ],
      },
      ext: {},
      sticky: {
        properties: {
          offsetHeader: { type: 'number' },
          offsetScroll: { type: 'number' },
          getContainer: { instanceof: 'Function' },
        },
      },
      title: { instanceof: 'Function' },
      footer: { instanceof: 'Function' },
      subtableTitle: { instanceof: 'Function' },
      subtableFooter: { instanceof: 'Function' },
      rowExpandable: { instanceof: 'Function' },
      expandedRowRender: { instanceof: 'Function' },
      componentDidMount: { instanceof: 'Function' },
      componentDidUpdate: { instanceof: 'Function' },
      componentWillUnmount: { instanceof: 'Function' },
      onRowClick: { instanceof: 'Function' },
      onRowDoubleClick: { instanceof: 'Function' },
      onSelectionChange: { instanceof: 'Function' },
      onSearch: { instanceof: 'Function' },
      onInsertButtonClick: { instanceof: 'Function' },
      onFilterChange: { instanceof: 'Function' },
      onPageChange: { instanceof: 'Function' },
      onChange: { instanceof: 'Function' },
      onDisplayColumnKeysChange: { instanceof: 'Function' },
      onEvent: { instanceof: 'Function' },
    },
    required: [
      'driver',
      'schema',
      'dataSource',
    ],
    additionalProperties,
  };
  // 校验 Props Schema（不校验子表，因为 ajv 不支持循环引用）
  if (!ajv.validate(propsSchema, data)) {
    return getAjvErrorMessage(ajv, { dataVar: 'props', separator: '; ' });
  }
  // 递归校验子表 Schema
  let subtable = (data as { schema: DripTableSchema }).schema.subtable;
  let prefix = 'props.subtable';
  while (subtable) {
    if (!ajv.validate(dripTableSubtableSchema, subtable)) {
      return getAjvErrorMessage(ajv, { dataVar: prefix, separator: '; ' });
    }
    subtable = subtable.subtable;
    prefix += '.subtable';
  }
  return null;
};

/**
 * 校验 DripTableColumnSchema 是否符合 Schema 要求
 * @param data DripTableColumnSchema 数据
 * @param schema DripTableColumnSchema 的 Schema 对象
 * @param options ajv 校验选项
 * @returns 校验失败提示内容，成功返回 null
 */
export const validateDripTableColumnSchema = (data: unknown, schema?: SchemaObject, options?: AjvOptions) => {
  const ajv = createAjv();
  const additionalProperties = options?.additionalProperties ?? false;
  const dripTableColumnSchema: SchemaObject = {
    properties: {
      component: { type: 'string' },
      options: schema
        ? { ...schema, additionalProperties }
        : {},
      key: { type: 'string' },
      title: { type: 'string' },
      width: { typeof: ['string', 'number'] },
      align: { enum: ['left', 'center', 'right'] },
      dataIndex: {
        anyOf: [
          { type: 'array', items: { type: 'string' } },
          { type: 'string' },
        ],
      },
      default: {},
      description: { type: 'string' },
      fixed: {
        anyOf: [
          { enum: ['left', 'right'] },
          { type: 'boolean' },
        ],
      },
      hidable: { type: 'boolean' },
      filters: {
        type: 'array',
        items: {
          properties: {
            text: {},
            value: { typeof: ['string', 'number', 'boolean'] },
          },
          required: ['text', 'value'],
        },
      },
      defaultFilteredValue: { typeof: ['string', 'number', 'object'] },
    },
    required: [
      'component',
      schema ? 'options' : '',
      'key',
      'title',
      'dataIndex',
    ].map(_ => _),
    additionalProperties,
  };
  if (!ajv.validate(dripTableColumnSchema, data)) {
    return getAjvErrorMessage(ajv, { dataVar: 'column', separator: '; ' });
  }
  return null;
};
