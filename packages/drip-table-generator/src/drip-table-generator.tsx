import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { DripTableColumnSchema, DripTableExtraOptions, DripTableRecordTypeBase, DripTableSchema } from 'drip-table';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import { defaultState, DripTableGeneratorState, GlobalStore } from '@/store';
import { Ctx } from '@/context';
import { DripTableGeneratorHandler, DripTableGeneratorProps } from '@/typing';

import { filterAttributes, generateColumn } from './utils';
import Wrapper, { GeneratorWrapperHandler } from './wrapper';

const useTableRoot = <
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions>(
    props: DripTableGeneratorProps<RecordType, ExtraOptions>,
    store: [DripTableGeneratorState, React.Dispatch<React.SetStateAction<DripTableGeneratorState>>],
    wrapper: React.MutableRefObject<GeneratorWrapperHandler | null>,
  ) => {
  const [state, setState] = store;

  const getSchemaValue = (): DripTableSchema<DripTableColumnSchema> => {
    if (wrapper.current) {
      const currentState = wrapper.current.getState();
      return {
        ...filterAttributes(currentState.globalConfigs, '$version'),
        columns: currentState.columns.map(item => generateColumn(item)),
      };
    }

    return {
      ...filterAttributes(state.globalConfigs, '$version'),
      columns: state.columns.map(item => generateColumn(item)),
    };
  };

  const getDataSource = () => {
    if (wrapper.current) {
      const currentState = wrapper.current.getState();
      return currentState.previewDataSource;
    }
    return state.previewDataSource;
  };

  const context = {
    ...props,
    ...state,
    getSchemaValue,
    getDataSource,
    setGlobalData: setState,
  };

  return context;
};

const Container = <
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
>(props: DripTableGeneratorProps<RecordType, ExtraOptions>, ref: React.ForwardedRef<DripTableGeneratorHandler>) => {
  if (props.schema && props.schema.columns.some(c => c.component || c.options)) {
    props = {
      ...props,
      schema: {
        ...props.schema,
        columns: props.schema.columns.map((column) => {
          // 兼容旧版本数据
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
            } as typeof column;
          }
          return column;
        }),
      },
    };
  }

  const wrapper = useRef(null);
  const initialState = defaultState();
  const store = useState(initialState);
  const context = useTableRoot(props, store, wrapper);

  useImperativeHandle(ref, () => context);

  const WrapperRef = forwardRef<GeneratorWrapperHandler, DripTableGeneratorProps<RecordType, ExtraOptions> & { store: GlobalStore }>(Wrapper);

  return (
    <ConfigProvider locale={zhCN}>
      <Ctx.Provider {...props} value={context}>
        <WrapperRef ref={wrapper} {...props} store={store} />
      </Ctx.Provider>
    </ConfigProvider>
  );
};

const DripTableGeneratorProvider = forwardRef(Container);

export default DripTableGeneratorProvider;
