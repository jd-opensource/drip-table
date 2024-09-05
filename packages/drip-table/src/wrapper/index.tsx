/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import './index.less';

import get from 'lodash/get';
import React, { CSSProperties } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  type DripTableExtraOptions,
  type DripTableProps,
  type DripTableRecordTypeBase,
  type DripTableRecordTypeWithSubtable,
  type SchemaObject,
} from '@/types';
import { getDripTableValidatePropsKeys, validateDripTableColumnSchema, validateDripTableProp, validateDripTableRequiredProps } from '@/utils/ajv';
import { useState } from '@/utils/hooks';
import { type SandboxCreateEvaluator, type SandboxEvaluate, type SandboxSafeEvaluate, createEvaluator as defaultCreateExecutor } from '@/utils/sandbox';
import DripTableBuiltInComponents from '@/components/cell-components';
import { createTableComponentState, DripTableComponentContext, IDripTableComponentContext } from '@/components/cell-components/hooks';
import { type FinalizeString, stringify } from '@/components/cell-components/utils';
import { type IDripTableContext, createTableState, DripTableContext } from '@/hooks';
import { type DripTableBuiltInColumnSchema, type DripTableTableInformation, type ExtractDripTableExtraOption, indexValue } from '@/index';
import DripTableLayout from '@/layouts';

/**
 * 暴露给外部直接操作实例的接口
 */
export interface DripTableWrapperContext<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>> = DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, never>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  /**
   * 当前选中行数据
   */
  selectedRowKeys: IDripTableContext<RecordType, ExtraOptions>['state']['selectedRowKeys'];
  /**
   * 通过接口选择行
   *
   * @param selectedRowKeys 选中的行标识符数组
   */
  select: (selectedRowKeys: IDripTableContext<RecordType, ExtraOptions>['state']['selectedRowKeys']) => void;
  /**
   * 当前显示列数据
   */
  displayColumnKeys: IDripTableContext<RecordType, ExtraOptions>['state']['displayColumnKeys'];
  /**
   * 通过接口设置展示列
   *
   * @param displayColumnKeys 展示列标识符数组
   */
  setDisplayColumnKeys: (displayColumnKeys: IDripTableContext<RecordType, ExtraOptions>['state']['displayColumnKeys']) => void;
  /**
   * 当前排序器
   */
  sorter: IDripTableContext<RecordType, ExtraOptions>['state']['sorter'];
  /**
   * 通过接口设置当前排序
   *
   * @param sorter 目标排序设置
   */
  setSorter: (sorter: Omit<IDripTableContext<RecordType, ExtraOptions>['state']['sorter'], 'comparer'> | null) => void;
}

const DripTableWrapper = React.forwardRef(<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(
    props: React.PropsWithChildren<DripTableProps<RecordType, ExtraOptions> & React.RefAttributes<DripTableWrapperContext<RecordType, ExtraOptions>>>,
    ref: React.ForwardedRef<DripTableWrapperContext<RecordType, ExtraOptions>>,
  ) => {
  // 旧版参数兼容
  const tablePropsMigrated = React.useMemo(
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
      return rtp;
    },
    [props],
  );

  // 列 ajv 校验
  const tableProps = React.useMemo(
    () => {
      let rtp = tablePropsMigrated;
      const ajv = rtp.ajv;
      if (ajv !== false) {
        const validateColumnSchema = (column: (typeof rtp.schema.columns)[number], path: string = 'column'): string | null => {
          let errorMessage: string | null = null;
          let schema: SchemaObject | undefined;
          const BuiltInComponent = DripTableBuiltInComponents[column?.component];
          if (BuiltInComponent) {
            schema = BuiltInComponent.schema;
            if (!schema) {
              errorMessage = `Built-in component must contains a valid options ajv schema! (component: ${column.component})`;
            }
          } else {
            let [libName, componentName] = column?.component?.split('::') || [];
            if (!componentName && tableProps.defaultComponentLib) {
              componentName = libName;
              libName = tableProps.defaultComponentLib;
            }
            if (libName && componentName) {
              schema = rtp.components?.[libName]?.[componentName]?.schema;
            }
          }
          if (schema && !errorMessage) {
            const columnErrorMessage = validateDripTableColumnSchema(column, schema, ajv);
            if (columnErrorMessage) {
              errorMessage = columnErrorMessage.replace(/^column/u, path);
            } else if (column.component === 'group') {
              const items = column.options.items as (typeof column | { style: CSSProperties; schema: typeof column })[];
              for (const [index, item] of items.entries()) {
                const itemSchema = item && 'schema' in item ? item.schema : item;
                const message = validateColumnSchema(itemSchema, `${path ?? ''}/options/items/${index}`);
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
    [tablePropsMigrated],
  );

  // 创建上下文
  const [state, setState] = useState(createTableState());
  const [componentState, setComponentState] = useState(createTableComponentState());

  const [tableUUID] = React.useState(uuidv4());

  const tableInfo = React.useMemo((): DripTableTableInformation<RecordType, ExtraOptions> => ({
    uuid: tableUUID,
    schema: props.schema,
    dataSource: props.dataSource,
    parent: props.__PARENT_INFO__,
  }), [props.schema, props.dataSource, props.__PARENT_INFO__]);

  const createEvaluator: SandboxCreateEvaluator = props.createEvaluator ?? defaultCreateExecutor;
  const execute: SandboxEvaluate = (script, ctx = {}) => createEvaluator(script, Object.keys(ctx))?.(...Object.values(ctx));
  const safeExecute: SandboxSafeEvaluate = (script, ctx = {}, defaultValue = void 0) => {
    try {
      return execute(script, ctx);
    } catch (error) {
      console.warn(error);
    }
    return defaultValue;
  };
  const finalizeString: FinalizeString = (mode, text, record, recordIndex, ext) => {
    let value = '';
    if (!mode || mode === 'plain') {
      value = stringify(text);
    } else if (mode === 'key') {
      value = stringify(get(record, text, ''));
    } else if (mode === 'pattern') {
      value = stringify(text)
        .replace(/\{\{(.+?)\}\}/guis, (s, s1) => {
          try {
            return execute(`return ${s1}`, {
              props: {
                record,
                recordIndex,
                ext,
              },
              rec: record,
            });
          } catch (error) {
            return error instanceof Error
              ? `{{Render Error: ${error.message}}}`
              : '{{Unknown Render Error}}';
          }
        });
    } else if (mode === 'script') {
      try {
        value = stringify(execute(text, {
          props: {
            record,
            recordIndex,
            ext,
          },
          rec: record,
        }));
      } catch (error) {
        value = error instanceof Error
          ? `Render Error: ${error.message}`
          : 'Unknown Render Error';
      }
    }
    return value;
  };

  const context = React.useMemo(
    (): IDripTableContext<RecordType, ExtraOptions> => ({
      props: tableProps,
      info: tableInfo,
      state,
      setState,
      createEvaluator,
      evaluate: execute,
      safeEvaluate: safeExecute,
      finalizeString,
    }),
    [
      props,
      tableInfo,
      state,
      setState,
      createEvaluator,
      execute,
      safeExecute,
      finalizeString,
    ],
  );

  const componentContext = React.useMemo(
    (): IDripTableComponentContext<RecordType, ExtraOptions> => ({
      props: tableProps,
      info: tableInfo,
      state: componentState,
      setState: setComponentState,
    }),
    [props, tableInfo, componentState, setComponentState],
  );

  // 组件提供给外部的公共接口
  React.useImperativeHandle(
    ref,
    (): DripTableWrapperContext<RecordType, ExtraOptions> => ({
      select: (selectedRowKeys) => {
        setState({ selectedRowKeys });
      },
      selectedRowKeys: context.state.selectedRowKeys,
      setDisplayColumnKeys: (displayColumnKeys) => {
        setState({ displayColumnKeys });
      },
      displayColumnKeys: context.state.displayColumnKeys,
      sorter: context.state.sorter,
      setSorter: (sorter) => {
        if (sorter) {
          const columnSchema = tableInfo.schema.columns.find(c => c.key === sorter.key);
          if (!columnSchema?.sorter) {
            return;
          }
          setState({
            sorter: {
              key: sorter.key,
              direction: sorter.direction,
              comparer: (a, b) => {
                let multiply = context.safeEvaluate<number>(columnSchema.sorter || '', {
                  props: {
                    column: columnSchema,
                    leftRecord: a,
                    rightRecord: b,
                    leftValue: indexValue(a, columnSchema.dataIndex),
                    rightValue: indexValue(b, columnSchema.dataIndex),
                    ext: tableProps.ext,
                  },
                }, 1);
                if (typeof multiply !== 'number') {
                  multiply = 1;
                }
                return (sorter.direction === 'ascend' ? 1 : -1) * multiply;
              },
            },
            sorterChanged: true,
          });
        } else {
          setState({
            sorter: { key: null, direction: null, comparer: null },
            sorterChanged: true,
          });
        }
      },
    }),
    [
      setState,
      indexValue,
      context.safeEvaluate,
      context.state.selectedRowKeys,
      context.state.displayColumnKeys,
      context.state.sorter,
      tableInfo.schema.columns,
    ],
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
    const sorter = tableInfo.schema.initialSorter;
    if (sorter) {
      const columnSchema = tableInfo.schema.columns.find(c => c.key === sorter.key);
      if (!columnSchema?.sorter) {
        return;
      }
      setState({
        sorter: {
          key: sorter.key,
          direction: sorter.direction,
          comparer: (a, b) => {
            let multiply = context.safeEvaluate<number>(columnSchema.sorter || '', {
              props: {
                column: columnSchema,
                leftRecord: a,
                rightRecord: b,
                leftValue: indexValue(a, columnSchema.dataIndex),
                rightValue: indexValue(b, columnSchema.dataIndex),
                ext: tableProps.ext,
              },
            }, 1);
            if (typeof multiply !== 'number') {
              multiply = 1;
            }
            return (sorter.direction === 'ascend' ? 1 : -1) * multiply;
          },
        },
        sorterChanged: true,
      });
    }
    tableProps.componentDidMount?.(tableInfo);
    return () => {
      tableProps.componentWillUnmount?.(tableInfo);
    };
  }, []);

  React.useEffect(() => {
    tableProps.componentDidUpdate?.(tableInfo);
  });

  return (
    <DripTableContext.Provider value={context as unknown as IDripTableContext}>
      <DripTableComponentContext.Provider value={componentContext as unknown as IDripTableComponentContext}>
        <DripTableLayout />
      </DripTableComponentContext.Provider>
    </DripTableContext.Provider>
  );
}) as <
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> (props: React.PropsWithoutRef<DripTableProps<RecordType, ExtraOptions>> & React.RefAttributes<DripTableWrapperContext<RecordType, ExtraOptions>>) =>
(React.ReactElement | null);

export default DripTableWrapper;
