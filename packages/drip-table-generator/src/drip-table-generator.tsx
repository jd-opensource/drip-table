import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { DripTableSchema } from 'drip-table';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import { defaultState, DripTableGeneratorState, GlobalStore } from '@/store';
import { Ctx } from '@/context';
import { DripTableGeneratorHandler, DripTableGeneratorProps } from '@/typing';

import { filterAttributes } from './utils';
import Wrapper, { GeneratorWrapperHandler } from './wrapper';

const useTableRoot = (
  props: DripTableGeneratorProps,
  store: [DripTableGeneratorState<string, never>, React.Dispatch<React.SetStateAction<DripTableGeneratorState<string, never>>>],
  wrapper: React.MutableRefObject<GeneratorWrapperHandler | null>,
) => {
  const [state, setState] = store;

  const getSchemaValue = (): DripTableSchema<never> => {
    if (wrapper.current) {
      const currentState = wrapper.current.getState();
      return {
        $schema: 'http://json-schema.org/draft/2019-09/schema#',
        ...filterAttributes(currentState.globalConfigs, '$version'),
        columns: currentState.columns.map(item => ({ ...item, sort: void 0, index: void 0 })),
      };
    }

    return {
      $schema: 'http://json-schema.org/draft/2019-09/schema#',
      ...filterAttributes(state.globalConfigs, '$version'),
      columns: state.columns.map(item => ({ ...item, sort: void 0, index: void 0 })),
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

const Container = (props: DripTableGeneratorProps, ref: React.ForwardedRef<DripTableGeneratorHandler>) => {
  if (props.schema && props.schema.columns.some(c => c['ui:type'] || c['ui:props'])) {
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
              console.warn(`[DripTable] Column ${key} "ui:props" is deprecated, please spread values instead.`);
            }
            return {
              ...Object.fromEntries(Object.entries(column).filter(([k]) => k !== 'ui:type' && k !== 'ui:props')),
              ...column['ui:props'] || null,
              component: column['ui:type'] || column.component,
            };
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

  const WrapperRef = forwardRef<GeneratorWrapperHandler, DripTableGeneratorProps & { store: GlobalStore }>(Wrapper);

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
