/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { DripTableBuiltInColumnSchema, DripTableColumnSchema, DripTableComponentSchema, DripTableSchema } from 'drip-table';

import { DripTableComponentAttrConfig } from '@/typing';

import useSharedState from './custom-hook';

export type DripTableColumn<T, P extends DripTableComponentSchema> = (DripTableColumnSchema<T, P> | DripTableBuiltInColumnSchema) & {
  key: string;
  index: number;
  sort: number;
  type: DripTableComponentAttrConfig['type'];
  title: string;
  dataIndex: string | string[];
};

export interface DripTableGeneratorState<T, P extends DripTableComponentSchema> {
  isEdit: boolean;
  columns: DripTableColumn<T, P>[];
  currentColumn?: DripTableColumn<T, P>;
  globalConfigs: Omit<DripTableSchema, '$schema' | 'columns'>;
  /** 表格数据，generator不需要知道数据格式是什么，直接交给drip-table即可 */
  previewDataSource: Record<string, unknown>[];
}

export const defaultState: () => DripTableGeneratorState<string, never> = () => ({
  isEdit: true,
  /** 生成的列配置 */
  columns: [],
  /** 当前选中的列 */
  currentColumn: void 0,
  /** 配置项 */
  globalConfigs: {
    pagination: false,
  },
  /** 数据 */
  previewDataSource: [],
});

export type GlobalStore = [DripTableGeneratorState<string, never>, React.Dispatch<React.SetStateAction<DripTableGeneratorState<string, never>>>];

export type GlobalStoreObject = {
  state: DripTableGeneratorState<string, never>;
  setState: React.Dispatch<React.SetStateAction<DripTableGeneratorState<string, never>>>;
};

export type GlobalActions = {
  toggleEditMode: (store?: GlobalStoreObject) => void;
  editColumns: (store?: GlobalStoreObject) => void;
  checkColumn: (store?: GlobalStoreObject) => void;
  updatePreviewDataSource: (store?: GlobalStoreObject) => void;
  updateGlobalConfig: (store?: GlobalStoreObject) => void;
}

export const globalActions: GlobalActions = {
  toggleEditMode(store) {
    store?.setState({ ...store.state, isEdit: !store.state.isEdit });
  },
  editColumns(store) {
    store?.setState({ ...store.state, columns: [...store.state.columns] });
  },
  checkColumn(store) {
    store?.setState({ ...store.state, currentColumn: store.state.currentColumn ? { ...store.state?.currentColumn } : void 0 });
  },
  updatePreviewDataSource(store) {
    store?.setState({ ...store.state, previewDataSource: [...store.state.previewDataSource] });
  },
  updateGlobalConfig(store) {
    store?.setState({ ...store.state, globalConfigs: { ...store.state.globalConfigs } });
  },
};

export const setState = (originState: DripTableGeneratorState<string, never>, states?: DripTableGeneratorState<string, never>) => {
  if (states) {
    Object.keys(states).forEach((key) => { originState[key] = states[key]; });
  }
};

const useStateHook = originState => useSharedState(originState, globalActions);

export default useStateHook;
