import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { ConfigProvider } from 'antd';
import { ColumnConfig, DripTableRecordTypeBase, DripTableSchema } from 'drip-table';
import zhCN from 'antd/lib/locale/zh_CN';

import { Ctx } from '@/context';
import { DripTableGeneratorProps } from '@/typing';
import { defaultState, DripTableGeneratorState, GlobalStore } from '@/store';

import Wrapper from './wrapper';

import 'antd/dist/antd.less';

export interface DripTableGeneratorHandle extends DripTableGeneratorState {
  /**
   * 通过接口获取配置
   *
   * @returns { DripTableSchema } 返回DripTableSchema配置
   */
  getSchemaValue: () => DripTableSchema;
}

const useTableRoot = (props, store, wrapper) => {
  const [state, setState] = store;

  const getSchemaValue = (): DripTableSchema => {
    if (wrapper.current) {
      const currentState = wrapper.current.getState();
      return {
        $schema: 'http://json-schema.org/draft/2019-09/schema#',
        configs: {
          ...currentState.globalConfigs,
        },
        columns: currentState.columns.map(item => ({ ...item, key: void 0, sort: void 0 })) as ColumnConfig[],

      };
    }

    return {
      $schema: 'http://json-schema.org/draft/2019-09/schema#',
      configs: {
        ...state.globalConfigs,
      },
      columns: state.columns.map(item => ({ ...item, key: void 0, sort: void 0 })) as ColumnConfig[],
    };
  };

  const context = {
    ...props,
    getSchemaValue,
    setGlobalData: setState,
  };

  return context;
};

const Container = <RecordType extends DripTableRecordTypeBase>(props: DripTableGeneratorProps<RecordType>, ref: React.ForwardedRef<DripTableGeneratorHandle>) => {
  const wrapper = useRef({});
  const initialState = defaultState();
  const store = useState(initialState);
  const context = useTableRoot(props, store, wrapper);

  useImperativeHandle(ref, () => context);

  const WrapperRef = forwardRef<unknown, DripTableGeneratorProps<RecordType> & { store: GlobalStore }>(Wrapper);

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
