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

/**
 * 递归设置 Schema 用户自定属性并返回设置后的 Schema 对象
 * @param schema Schema 对象
 * @param options 用户自定属性设置项
 * @returns 新的 Schema 对象
 */
const finalizeSchema = <T extends SchemaObject = SchemaObject>(schema: T, options?: AjvOptions): T => {
  if (schema.type === 'object') {
    schema = {
      ...schema,
      additionalProperties: options?.additionalProperties ?? false,
    };
  }
  if (schema.properties) {
    schema = {
      ...schema,
      properties: Object.fromEntries(
        Object.entries<SchemaObject>(schema.properties)
          .map(([k, p]) => [k, finalizeSchema(p, options)]),
      ),
    };
  }
  if (schema.patternProperties) {
    schema = {
      ...schema,
      patternProperties: Object.fromEntries(
        Object.entries<SchemaObject>(schema.patternProperties)
          .map(([k, p]) => [k, finalizeSchema(p, options)]),
      ),
    };
  }
  if (schema.oneOf) {
    schema = {
      ...schema,
      oneOf: schema.oneOf
        .map((s: SchemaObject) => finalizeSchema(s, options)),
    };
  }
  if (schema.anyOf) {
    schema = {
      ...schema,
      anyOf: schema.anyOf
        .map((s: SchemaObject) => finalizeSchema(s, options)),
    };
  }
  return schema;
};

const DRIP_TABLE_CSS_SCHEMA: SchemaObject = {
  type: 'object',
  patternProperties: {
    '^.*$': {
      anyOf: [
        { type: 'string' },
        { type: 'number' },
      ],
    },
  },
};

const DRIP_TABLE_GENERIC_CSS_SCHEMA: SchemaObject = {
  anyOf: [
    { type: 'string' },
    DRIP_TABLE_CSS_SCHEMA,
  ],
};

const DRIP_TABLE_GENERIC_RENDER_ELEMENT_SCHEMA: SchemaObject = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      type: { type: 'string' },
    },
    required: ['type'],
    discriminator: { propertyName: 'type' },
    oneOf: [
      {
        type: 'object',
        properties: {
          type: { const: 'spacer' },
        },
      },
      {
        type: 'object',
        properties: {
          type: { const: 'text' },
          text: { type: 'string' },
        },
        required: ['text'],
      },
      {
        type: 'object',
        properties: {
          type: { const: 'html' },
          html: { type: 'string' },
        },
        required: ['html'],
      },
      {
        type: 'object',
        properties: {
          type: { const: 'search' },
          wrapperClassName: { type: 'string' },
          wrapperStyle: DRIP_TABLE_CSS_SCHEMA,
          placeholder: { type: 'string' },
          allowClear: { type: 'boolean' },
          searchButtonText: { type: 'string' },
          searchButtonSize: { enum: ['large', 'middle', 'small'] },
          searchKeys: {
            type: 'array',
            items: {
              type: 'object',
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
        type: 'object',
        properties: {
          type: { const: 'slot' },
          slot: { type: 'string' },
          props: { typeof: 'object' },
        },
        required: ['slot'],
      },
      {
        type: 'object',
        properties: {
          type: { const: 'insert-button' },
          insertButtonClassName: { type: 'string' },
          insertButtonStyle: DRIP_TABLE_CSS_SCHEMA,
          insertButtonText: { type: 'string' },
          showIcon: { type: 'boolean' },
        },
      },
      {
        type: 'object',
        properties: {
          type: { const: 'display-column-selector' },
          selectorButtonText: { type: 'string' },
          selectorButtonType: { enum: ['ghost', 'primary', 'dashed', 'link', 'text', 'default'] },
        },
      },
      {
        type: 'object',
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
  type: 'object',
  properties: {
    style: DRIP_TABLE_CSS_SCHEMA,
    elements: DRIP_TABLE_GENERIC_RENDER_ELEMENT_SCHEMA,
  },
};

let AJV_CACHE: Ajv | undefined;

const createAjv = (): Ajv => {
  if (!AJV_CACHE) {
    AJV_CACHE = AjvKeywords(new Ajv({ strict: true, discriminator: true, allowUnionTypes: true }));
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
      type: 'object',
      properties: {
        id: { typeof: ['number', 'string'] },
        className: { type: 'string' },
        style: DRIP_TABLE_CSS_SCHEMA,
        innerClassName: { type: 'string' },
        innerStyle: DRIP_TABLE_CSS_SCHEMA,
        bordered: { type: 'boolean' },
        showHeader: { type: 'boolean' },
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
              type: 'object',
              properties: {
                size: { enum: ['small', 'default'] },
                pageSize: { type: 'number' },
                position: { enum: ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight'] },
                showTotal: { type: 'string' },
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
          type: 'object',
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
              type: 'object',
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
          type: 'object',
          properties: {
            card: {
              type: 'object',
              properties: {
                columns: {
                  type: 'array',
                  items: {},
                },
                rowSize: { type: 'number' },
              },
            },
            calendar: {
              type: 'object',
              properties: {
                columns: {
                  type: 'array',
                  items: {},
                },
              },
            },
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
        span: {
          oneOf: [
            { type: 'string' },
            {
              type: 'array',
              items: {
                type: 'array',
                items: { type: 'number' },
                minItems: 4,
                maxItems: 4,
              },
            },
            {
              type: 'object',
              properties: {
                rectangles: {
                  type: 'array',
                  items: {
                    type: 'array',
                    items: { type: 'number' },
                    minItems: 4,
                    maxItems: 4,
                  },
                },
                generator: { type: 'string' },
              },
            },
          ],
        },
        emptyText: { type: 'string' },
        subtable: {}, // （不校验子表，因为 ajv 不支持循环引用）
        ext: {},
      },
      required: ['columns'],
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
      type: 'object',
      properties: {
        defaultExpandAllRows: { type: 'boolean' },
        defaultExpandedRowKeys: {
          type: 'array',
          items: { type: ['number', 'string'] },
        },
      },
      required: [],
    };
    const propsSchema: DripTablePropsAjvSchemaCacheItem['props'] = {
      type: 'object',
      properties: {
        schema: dripTableSchema,
        dataSource: {
          type: 'array',
          items: {},
        },
        className: { type: 'string' },
        style: DRIP_TABLE_CSS_SCHEMA,
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
              type: 'object',
              properties: {
                additionalProperties: { type: 'boolean' },
              },
            },
            { type: 'boolean' },
          ],
        },
        ext: {},
        sticky: {
          type: 'object',
          properties: {
            offsetHeader: { type: 'number' },
            offsetScroll: { type: 'number' },
            getContainer: { instanceof: 'Function' },
          },
        },
        subtableProps: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              subtableID: { type: ['number', 'string'] },
              recordKeys: { type: 'array', items: {} },
              default: { type: 'boolean' },
              properties: subtablePropsSchema,
            },
            required: ['properties'],
          },
        },
        title: { instanceof: 'Function' },
        footer: { instanceof: 'Function' },
        emptyText: { instanceof: 'Function' },
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
        __PARENT_INFO__: {},
      },
      required: [
        'schema',
        'dataSource',
        ...subtablePropsSchema.required,
      ],
    };

    DRIP_TABLE_PROPS_AJV_SCHEMA_CACHE.set(key, {
      props: finalizeSchema(propsSchema, options),
      subtable: finalizeSchema(dripTableSubtableSchema, options),
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

/**
 * 根据用户传入的表格属性获取需要校验的属性名称列表，输出固定长度的结果提供给 React Hooks 使用
 * @param props DripTable 用户传入属性 props 对象
 * @param options ajv 校验选项
 * @returns 需要校验的属性名称列表
 */
export const getDripTableValidatePropsKeys = (props: object, options?: AjvOptions) => {
  const schemas = getDripTablePropsAjvSchema(options);
  const propertiesKeys = Object.keys(schemas.props.properties);
  const propertiesCount = propertiesKeys.length;
  if (options?.additionalProperties) {
    return propertiesKeys;
  }
  return [...new Set([...Object.keys(props), ...propertiesKeys])].filter((_, i) => i < propertiesCount);
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
  const dripTableColumnSchema: SchemaObject = finalizeSchema({
    type: 'object',
    properties: {
      component: { type: 'string' },
      options: schema || {},
      key: { type: 'string' },
      title: {
        anyOf: [
          { type: 'string' },
          {
            type: 'object',
            properties: {
              style: DRIP_TABLE_CSS_SCHEMA,
              body: {
                anyOf: [
                  { type: 'string' },
                  {
                    type: 'object',
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
      style: DRIP_TABLE_GENERIC_CSS_SCHEMA,
      hoverStyle: DRIP_TABLE_GENERIC_CSS_SCHEMA,
      rowHoverStyle: DRIP_TABLE_GENERIC_CSS_SCHEMA,
      columnHoverStyle: DRIP_TABLE_GENERIC_CSS_SCHEMA,
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
          type: 'object',
          properties: {
            text: {},
            value: { typeof: ['string', 'number', 'boolean'] },
          },
          required: ['text', 'value'],
        },
      },
      filtersMaxSelect: { type: 'number' },
      defaultFilteredValue: { typeof: ['string', 'number', 'object'] },
    },
    required: [
      'component',
      schema ? 'options' : '',
      'key',
      'title',
      'dataIndex',
    ].map(_ => _),
  }, options);
  const res = ajv.validate(dripTableColumnSchema, data)
    ? null
    : getAjvErrorMessage(ajv, { dataVar: 'column', separator: '; ' });
  DRIP_TABLE_AJV_COLUMN_SCHEMA_RESULT_CACHE.set(data, schema, options, res);
  DRIP_TABLE_AJV_COLUMN_SCHEMA_RESULT_CACHE.set(dataKey, schemaKey, optionsKey, res);
  return res;
};
