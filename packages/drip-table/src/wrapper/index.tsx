/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import './index.less';

import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  type DripTableExtraOptions,
  type DripTableProps,
  type DripTableRecordTypeBase,
  type DripTableRecordTypeWithSubtable,
  type SchemaObject,
} from '@/types';
import { getDripTableValidatePropsKeys, validateDripTableColumnSchema, validateDripTableProp, validateDripTableRequiredProps } from '@/utils/ajv';
import DripTableBuiltInComponents from '@/components/built-in';
import { type IDripTableContext, createTableState, DripTableContext, useState } from '@/hooks';
import { type DripTableBuiltInColumnSchema, type DripTableTableInformation, type ExtractDripTableExtraOption } from '@/index';
import DripTableLayout from '@/layouts';

/**
 * 暴露给外部直接操作实例的接口
 */
export interface DripTableWrapperContext<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>> = DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, never>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  /**
   * 通过接口选择行
   *
   * @param selectedRowKeys 选中的行标识符数组
   */
  select: (selectedRowKeys: IDripTableContext<RecordType, ExtraOptions>['state']['selectedRowKeys']) => void;
}

const DripTableWrapper = React.forwardRef(<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(
    props: React.PropsWithChildren<DripTableProps<RecordType, ExtraOptions> & React.RefAttributes<DripTableWrapperContext<RecordType, ExtraOptions>>>,
    ref: React.ForwardedRef<DripTableWrapperContext<RecordType, ExtraOptions>>,
  ) => {
  // 标准化参数
  const tableProps = React.useMemo(
    () => {
      let rtp = props;
      // 兼容旧版本数据
      if (rtp.schema?.columns?.some(c => c['ui:type'] || c['ui:props'])) {
        rtp = {
          ...rtp,
          schema: Object.assign(
            {},
            rtp.schema,
            {
              columns: rtp.schema?.columns?.map((c) => {
                const column = c as DripTableBuiltInColumnSchema;
                if ('ui:type' in column || 'ui:props' in column) {
                  const key = column.key;
                  if ('ui:type' in column) {
                    console.warn(`[DripTable] Column ${key} "ui:type" is deprecated, please use "component" instead.`);
                  }
                  if ('ui:props' in column) {
                    console.warn(`[DripTable] Column ${key} "ui:props" is deprecated, please use "options" instead.`);
                  }
                  return {
                    ...Object.fromEntries(Object.entries(column).filter(([k]) => k !== 'ui:type' && k !== 'ui:props')),
                    options: column['ui:props'] || column.options || void 0,
                    component: column['ui:type'] || column.component,
                  };
                }
                return column;
              }),
            },
          ),
        };
      }
      // 列 ajv 校验
      const ajv = rtp.ajv;
      if (ajv !== false) {
        const validateColumnSchema = (column: (typeof rtp.schema.columns)[number], path: string = 'column'): string | null => {
          let errorMessage: string | null = null;
          let schema: SchemaObject | undefined;
          const BuiltInComponent = DripTableBuiltInComponents[column.component];
          if (BuiltInComponent) {
            schema = BuiltInComponent.schema;
            if (!schema) {
              errorMessage = `Built-in component must contains a valid options ajv schema! (component: ${column.component})`;
            }
          } else {
            const [libName, componentName] = column.component.split('::');
            if (libName && componentName) {
              schema = rtp.components?.[libName]?.[componentName]?.schema;
            }
          }
          if (schema && !errorMessage) {
            const columnErrorMessage = validateDripTableColumnSchema(column, schema, ajv);
            if (columnErrorMessage) {
              errorMessage = columnErrorMessage.replace(/^column/u, path);
            } else if (column.component === 'group') {
              const items = column.options.items as (typeof column)[];
              for (const [index, item] of items.entries()) {
                const message = validateColumnSchema(item, `${path ?? ''}/options/items/${index}`);
                if (message) {
                  errorMessage = message;
                  break;
                }
              }
            }
          }
          return errorMessage;
        };
        rtp = {
          ...rtp,
          schema: Object.assign(
            {},
            rtp.schema,
            {
              columns: rtp.schema?.columns?.map((column): typeof column => {
                const errorMessage = validateColumnSchema(column);
                if (errorMessage) {
                  return {
                    key: column.key,
                    title: column.title,
                    dataIndex: column.dataIndex,
                    component: 'text',
                    options: {
                      mode: 'static',
                      static: errorMessage,
                      className: 'jfe-drip-table-wrapper-column-ajv-error',
                    },
                  };
                }
                return column;
              }),
            },
          ),
        };
      }
      return rtp;
    },
    [props],
  );

  // 创建上下文
  const [state, setState] = useState(createTableState());

  const [tableUUID] = React.useState(uuidv4());

  const tableInfo = React.useMemo((): DripTableTableInformation<RecordType, ExtraOptions> => ({
    uuid: tableUUID,
    schema: props.schema,
    dataSource: props.dataSource,
    parent: props.__PARENT_INFO__,
  }), [props.schema, props.dataSource, props.__PARENT_INFO__]);

  const context = React.useMemo(
    (): IDripTableContext<RecordType, ExtraOptions> => ({
      _CTX_SOURCE: 'CONTEXT',
      props,
      info: tableInfo,
      state,
      setState,
    }),
    [props, tableInfo, state, setState],
  );

  // 组件提供给外部的公共接口
  React.useImperativeHandle(
    ref,
    (): DripTableWrapperContext<RecordType, ExtraOptions> => ({
      select: (selectedRowKeys) => {
        setState({ selectedRowKeys });
      },
    }),
    [setState],
  );

  // 校验参数
  const errorMessage = [
    (props.ajv !== false && validateDripTableRequiredProps(props, props.ajv)) || '',
    ...getDripTableValidatePropsKeys(props, props.ajv === false ? void 0 : props.ajv)
      .map(k => React.useMemo(
        () => (props.ajv !== false && validateDripTableProp(k, props[k], props.ajv)) || '',
        [k, props[k], props.ajv],
      )),
  ]
    .filter(Boolean)
    .join('\n');
  if (errorMessage) {
    return (
      <pre className="jfe-drip-table-wrapper-column-ajv-error">
        { `Props validate failed: ${errorMessage.includes('\n') ? '\n' : ''}${errorMessage}` }
      </pre>
    );
  }

  React.useEffect(() => {
    tableProps.componentDidMount?.(tableInfo);
    return () => {
      tableProps.componentWillUnmount?.(tableInfo);
    };
  }, []);

  React.useEffect(() => {
    tableProps.componentDidUpdate?.(tableInfo);
  });

  const ConfigProvider = tableProps.driver.components.ConfigProvider;
  return (
    <ConfigProvider locale={tableProps?.driver.locale}>
      <DripTableContext.Provider value={context as unknown as IDripTableContext}>
        <DripTableLayout />
      </DripTableContext.Provider>
    </ConfigProvider>
  );
}) as <
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> (props: React.PropsWithoutRef<DripTableProps<RecordType, ExtraOptions>> & React.RefAttributes<DripTableWrapperContext<RecordType, ExtraOptions>>) =>
(React.ReactElement | null);

export default DripTableWrapper;
