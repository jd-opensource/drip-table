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
                position: { enum: ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight'] },
                showLessItems: { type: 'boolean' },
                showQuickJumper: { type: 'boolean' },
                showSizeChanger: { type: 'boolean' },
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
        layout: { enum: ['table', 'card'] },
        editable: { type: 'boolean' },
        ellipsis: { type: 'boolean' },
        tableLayout: { enum: ['auto', 'fixed'] },
        virtual: { type: 'boolean' },
        rowHeight: { type: 'number' },
        scrollY: { type: 'number' },
        columns: {
          type: 'array',
          items: {},
        },
        rowKey: { type: 'string' },
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

/**
 * 校验 DripTable Props 是否符合 Schema 要求
 * @param key DripTable Props key
 * @param value DripTable Props value
 * @param options ajv 校验选项
 * @returns 校验失败提示内容，成功返回 null
 */
export const validateDripTableProp = (key: string, value: unknown, options?: AjvOptions) => {
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
  if (schema && !ajv.validate(schema, value)) {
    return getAjvErrorMessage(ajv, { dataVar: `props.${key}`, separator: '; ' });
  }
  // 递归校验子表 Schema
  if (key === 'schema') {
    let subtable = (value as DripTableSchema).subtable;
    let prefix = 'props.schema.subtable';
    while (subtable) {
      if (!ajv.validate(schemas.subtable, subtable)) {
        return getAjvErrorMessage(ajv, { dataVar: prefix, separator: '; ' });
      }
      subtable = subtable.subtable;
      prefix += '.subtable';
    }
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
      verticalAlign: { enum: ['top', 'middle', 'bottom', 'stretch'] },
      dataIndex: {
        anyOf: [
          { type: 'array', items: { type: 'string' } },
          { type: 'string' },
        ],
      },
      defaultValue: {},
      description: { type: 'string' },
      clipboard: { type: 'boolean' },
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
