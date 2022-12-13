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

import RecursiveCache from './cache';
import { encodeJSON } from './json';

export interface AjvOptions {
  /**
   * Schema 校验时是否允许多余的数据
   */
  additionalProperties?: boolean;
}

const DRIP_TABLE_GENERIC_RENDER_ELEMENT_SCHEMA: SchemaObject = {
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
      {
        properties: {
          type: { const: 'layout-selector' },
          selectorButtonText: { type: 'string' },
          selectorButtonType: { enum: ['ghost', 'primary', 'dashed', 'link', 'text', 'default'] },
        },
      },
    ],
  },
};

const DRIP_TABLE_GENERIC_RENDER_SCHEMA: SchemaObject = {
  properties: {
    style: { typeof: 'object' },
    elements: DRIP_TABLE_GENERIC_RENDER_ELEMENT_SCHEMA,
  },
};

const DRIP_TABLE_CSS_SCHEMA: SchemaObject = {
  anyOf: [
    { type: 'string' },
    { type: 'object' },
  ],
};

let AJV_CACHE: Ajv | undefined;

const createAjv = (): Ajv => {
  if (!AJV_CACHE) {
    AJV_CACHE = AjvKeywords(new Ajv({ discriminator: true, strictTypes: false }));
  }
  return AJV_CACHE;
};

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
};

/**
 * Ajv Schema 缓存对象
 */
interface DripTablePropsAjvSchemaCacheItem {
  /**
   * 所有参数数据校验 Schema
   */
  props: SchemaObject & { properties: Record<string, SchemaObject>; required: string[] };
  /**
   * 子表数据校验 Schema
   */
  subtable: SchemaObject & { properties: Record<string, SchemaObject>; required: string[] };
}

const DRIP_TABLE_PROPS_AJV_SCHEMA_CACHE = new Map<string, DripTablePropsAjvSchemaCacheItem>();

const getDripTablePropsAjvSchema = (options?: AjvOptions) => {
  const additionalProperties = options?.additionalProperties ?? false;
  const key = `CK-${additionalProperties ? 1 : 0}`;
  if (!DRIP_TABLE_PROPS_AJV_SCHEMA_CACHE.has(key)) {
    const dripTableSchema: SchemaObject = {
      properties: {
        id: { typeof: ['number', 'string'] },
        className: { type: 'string' },
        style: { typeof: 'object' },
        innerClassName: { type: 'string' },
        innerStyle: { typeof: 'object' },
        bordered: { type: 'boolean' },
        showHeader: { type: 'boolean' },
        headerStyle: { typeof: 'object' },
        headerCellStyle: { typeof: 'object' },
        rowGap: { typeof: 'number' },
        rowRadius: { typeof: 'number' },
        rowStyle: { typeof: 'object' },
        rowHoverStyle: { typeof: 'object' },
        tableCellStyle: { typeof: 'object' },
        header: {
          anyOf: [
            { type: 'boolean' },
            DRIP_TABLE_GENERIC_RENDER_SCHEMA,
          ],
        },
        footer: DRIP_TABLE_GENERIC_RENDER_SCHEMA,
        pagination: {
          anyOf: [
            { type: 'boolean' },
            {
              properties: {
                size: { enum: ['small', 'default'] },
                pageSize: { type: 'number' },
                position: { enum: ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight'] },
                showLessItems: { type: 'boolean' },
                showQuickJumper: { type: 'boolean' },
                showSizeChanger: { type: 'boolean' },
                pageSizeOptions: {
                  anyOf: [
                    { type: 'array', items: { type: 'number' } },
                    { type: 'array', items: { type: 'string' } },
                  ],
                },
                hideOnSinglePage: { type: 'boolean' },
              },
            },
          ],
        },
        size: { enum: ['small', 'middle', 'large', 'default'] },
        sticky: { type: 'boolean' },
        scroll: {
          properties: {
            x: { typeof: ['number', 'boolean', 'string'] },
            y: { typeof: ['number', 'string'] },
            scrollToFirstRowOnChange: { type: 'boolean' },
          },
        },
        rowSelection: {
          anyOf: [
            { type: 'boolean' },
            {
              properties: {
                align: { enum: ['left', 'center', 'right'] },
                verticalAlign: { enum: ['top', 'middle', 'bottom', 'stretch'] },
              },
            },
          ],
        },
        rowDraggable: { type: 'boolean' },
        defaultTableLayout: { enum: ['card', 'table'] },
        layout: {
          properties: {
            card: { properties: {
              columns: {
                type: 'array',
                items: {},
              },
              rowSize: { type: 'number' },
            } },
            calendar: { properties: {
              columns: {
                type: 'array',
                items: {},
              },
            } },
          },
        },
        editable: { type: 'boolean' },
        ellipsis: { type: 'boolean' },
        tableLayout: { enum: ['auto', 'fixed'] },
        stripe: { type: 'boolean' },
        virtual: { type: 'boolean' },
        rowHeight: { type: 'number' },
        scrollY: { type: 'number' },
        columns: {
          type: 'array',
          items: {},
        },
        rowKey: { type: 'string' },
        rowSlotKey: { type: 'string' },
        rowHeader: DRIP_TABLE_GENERIC_RENDER_SCHEMA,
        rowFooter: DRIP_TABLE_GENERIC_RENDER_SCHEMA,
        subtable: {}, // （不校验子表，因为 ajv 不支持循环引用）
      },
      required: ['columns'],
      additionalProperties,
    };
    const dripTableSubtableSchema: DripTablePropsAjvSchemaCacheItem['subtable'] = {
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
    const subtablePropsSchema: SchemaObject = {
      properties: {
        defaultExpandAllRows: { type: 'boolean' },
        defaultExpandedRowKeys: {
          type: 'array',
          items: { type: ['number', 'string'] },
        },
      },
      required: [],
      additionalProperties,
    };
    const propsSchema: DripTablePropsAjvSchemaCacheItem['props'] = {
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
        ...subtablePropsSchema.properties,
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
        subtableProps: {
          type: 'array',
          items: {
            properties: {
              subtableID: { type: ['number', 'string'] },
              recordKeys: { type: 'array', items: {} },
              default: { type: 'boolean' },
              properties: subtablePropsSchema,
            },
            required: ['properties'],
            additionalProperties,
          },
        },
        title: { instanceof: 'Function' },
        footer: { instanceof: 'Function' },
        subtableTitle: { instanceof: 'Function' },
        subtableFooter: { instanceof: 'Function' },
        rowExpandable: { instanceof: 'Function' },
        expandedRowRender: { instanceof: 'Function' },
        rowHeaderVisible: { instanceof: 'Function' },
        rowFooterVisible: { instanceof: 'Function' },
        rowSelectable: { instanceof: 'Function' },
        componentDidMount: { instanceof: 'Function' },
        componentDidUpdate: { instanceof: 'Function' },
        componentWillUnmount: { instanceof: 'Function' },
        onRowClick: { instanceof: 'Function' },
        onRowDoubleClick: { instanceof: 'Function' },
        onRowExpand: { instanceof: 'Function' },
        onRowCollapse: { instanceof: 'Function' },
        onSelectionChange: { instanceof: 'Function' },
        onSearch: { instanceof: 'Function' },
        onInsertButtonClick: { instanceof: 'Function' },
        onFilterChange: { instanceof: 'Function' },
        onPageChange: { instanceof: 'Function' },
        onChange: { instanceof: 'Function' },
        onDataSourceChange: { instanceof: 'Function' },
        onDisplayColumnKeysChange: { instanceof: 'Function' },
        onEvent: { instanceof: 'Function' },
        __PARENT_INFO__: { type: 'object' },
      },
      required: [
        'driver',
        'schema',
        'dataSource',
        ...subtablePropsSchema.required,
      ],
      additionalProperties,
    };

    DRIP_TABLE_PROPS_AJV_SCHEMA_CACHE.set(key, {
      props: propsSchema,
      subtable: dripTableSubtableSchema,
    });
  }
  const schemas = DRIP_TABLE_PROPS_AJV_SCHEMA_CACHE.get(key);
  if (!schemas) {
    throw new Error('Get drip-table props ajv schema failed.');
  }
  return schemas;
};

export const validateDripTableRequiredProps = (props: unknown, options?: AjvOptions) => {
  if (props && typeof props === 'object') {
    const schemas = getDripTablePropsAjvSchema(options);
    for (const key of schemas.props.required) {
      if (props[key] === void 0) {
        return `props must have required property '${key}', missingProperty: "${key}"`;
      }
    }
  }
  return null;
};

export const getDripTableValidatePropsCount = (options?: AjvOptions) => {
  if (options?.additionalProperties) {
    return 100;
  }
  const schemas = getDripTablePropsAjvSchema(options);
  return Object.keys(schemas.props.properties).length;
};

const DRIP_TABLE_AJV_PROPS_CACHE = new RecursiveCache<ReturnType<typeof validateDripTableProp>>();
const DRIP_TABLE_AJV_PROPS_KEY_CACHE = new RecursiveCache<ReturnType<typeof validateDripTableProp>>();
/**
 * 校验 DripTable Props 是否符合 Schema 要求
 * @param key DripTable Props key
 * @param value DripTable Props value
 * @param options ajv 校验选项
 * @returns 校验失败提示内容，成功返回 null
 */
export const validateDripTableProp = (key: string, value: unknown, options?: AjvOptions): string | null => {
  // 检查缓存
  if (DRIP_TABLE_AJV_PROPS_CACHE.has(key, value, options)) {
    return DRIP_TABLE_AJV_PROPS_CACHE.get(key, value, options) || null;
  }
  const valueKey = encodeJSON(value);
  const optionsKey = encodeJSON(options);
  if (valueKey && optionsKey && DRIP_TABLE_AJV_PROPS_KEY_CACHE.has(key, valueKey, optionsKey)) {
    return DRIP_TABLE_AJV_PROPS_KEY_CACHE.get(key, valueKey, optionsKey) || null;
  }
  // 缓存未命中
  const ajv = createAjv();
  const schemas = getDripTablePropsAjvSchema(options);
  // 校验指定的 Props Schema
  if (value === void 0) {
    if (schemas.props.required.includes(key)) {
      return `props must have required property '${key}', missingProperty: "${key}"`;
    }
    return null;
  }
  const schema = schemas.props.properties[key];
  if (!schema && !options?.additionalProperties) {
    return `props must NOT have additional properties, additionalProperty: "${key}"`;
  }
  let res: string | null = null;
  if (schema && !ajv.validate(schema, value)) {
    res = getAjvErrorMessage(ajv, { dataVar: `props.${key}`, separator: '; ' });
  } else if (key === 'schema') {
    // 递归校验子表 Schema
    let subtable = (value as DripTableSchema).subtable;
    let prefix = 'props.schema.subtable';
    while (subtable) {
      if (!ajv.validate(schemas.subtable, subtable)) {
        res = getAjvErrorMessage(ajv, { dataVar: prefix, separator: '; ' });
        break;
      }
      subtable = subtable.subtable;
      prefix += '.subtable';
    }
  }
  DRIP_TABLE_AJV_PROPS_CACHE.set(key, value, options, res);
  DRIP_TABLE_AJV_PROPS_KEY_CACHE.set(key, valueKey, optionsKey, res);
  return res;
};

const DRIP_TABLE_AJV_COLUMN_SCHEMA_RESULT_CACHE = new RecursiveCache<ReturnType<typeof validateDripTableColumnSchema>>();

/**
 * 校验 DripTableColumnSchema 是否符合 Schema 要求
 * @param data DripTableColumnSchema 数据
 * @param schema DripTableColumnSchema 的 Schema 对象
 * @param options ajv 校验选项
 * @returns 校验失败提示内容，成功返回 null
 */
export const validateDripTableColumnSchema = (data: unknown, schema?: SchemaObject, options?: AjvOptions): string | null => {
  // 检查缓存
  if (DRIP_TABLE_AJV_COLUMN_SCHEMA_RESULT_CACHE.has(data, schema, options)) {
    return DRIP_TABLE_AJV_COLUMN_SCHEMA_RESULT_CACHE.get(data, schema, options) || null;
  }
  const dataKey = encodeJSON(data);
  const schemaKey = encodeJSON(schema);
  const optionsKey = encodeJSON(options);
  if (dataKey && schemaKey && optionsKey && DRIP_TABLE_AJV_COLUMN_SCHEMA_RESULT_CACHE.has(dataKey, schemaKey, optionsKey)) {
    return DRIP_TABLE_AJV_COLUMN_SCHEMA_RESULT_CACHE.get(dataKey, schemaKey, optionsKey) || null;
  }
  // 缓存未命中
  const ajv = createAjv();
  const additionalProperties = options?.additionalProperties ?? false;
  const dripTableColumnSchema: SchemaObject = {
    properties: {
      component: { type: 'string' },
      options: schema
        ? { ...schema, additionalProperties }
        : {},
      key: { type: 'string' },
      title: {
        anyOf: [
          { type: 'string' },
          {
            properties: {
              style: DRIP_TABLE_CSS_SCHEMA,
              body: {
                anyOf: [
                  { type: 'string' },
                  {
                    properties: {
                      style: DRIP_TABLE_CSS_SCHEMA,
                      content: { type: 'string' },
                    },
                  },
                ],
              },
              header: DRIP_TABLE_GENERIC_RENDER_SCHEMA,
              footer: DRIP_TABLE_GENERIC_RENDER_SCHEMA,
            },
            required: ['body'],
          },
        ],
      },
      style: DRIP_TABLE_CSS_SCHEMA,
      width: { typeof: ['string', 'number'] },
      align: { enum: ['left', 'center', 'right'] },
      verticalAlign: { enum: ['top', 'middle', 'bottom', 'stretch'] },
      dataIndex: {
        anyOf: [
          { type: 'array', items: { type: 'string' } },
          { type: 'string' },
        ],
      },
      dataTranslation: { type: 'string' },
      defaultValue: {},
      description: { type: 'string' },
      clipboard: { type: 'boolean' },
      fixed: {
        anyOf: [
          { enum: ['left', 'right'] },
          { type: 'boolean' },
        ],
      },
      hidden: {
        anyOf: [
          { type: 'string' },
          { type: 'boolean' },
        ],
      },
      disable: {
        anyOf: [
          { type: 'string' },
          { type: 'boolean' },
        ],
      },
      editable: {
        anyOf: [
          { type: 'string' },
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
  const res = ajv.validate(dripTableColumnSchema, data)
    ? null
    : getAjvErrorMessage(ajv, { dataVar: 'column', separator: '; ' });
  DRIP_TABLE_AJV_COLUMN_SCHEMA_RESULT_CACHE.set(data, schema, options, res);
  DRIP_TABLE_AJV_COLUMN_SCHEMA_RESULT_CACHE.set(dataKey, schemaKey, optionsKey, res);
  return res;
};
