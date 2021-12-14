/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { DripTableSchema, ColumnConfig } from 'drip-table';
import { DripTableComponentConfig } from '@/typing';
import useSharedState from './custom-hook';

export type DripTableColumn = ColumnConfig & {
  $id: string;
  key: number;
  sort: number;
  type: DripTableComponentConfig['type'];
}

export interface DripTableGeneratorState {
  isEdit: boolean;
  columns: DripTableColumn[];
  currentColumn?: DripTableColumn;
  globalConfigs: DripTableSchema['configs'];
  /** 表格数据，generator不需要知道数据格式是什么，直接交给drip-table即可 */
  dataSource: Record<string, unknown>[];
}

export const defaultState: () => DripTableGeneratorState = () => ({
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
  dataSource: [],
});

export type GlobalStore = [DripTableGeneratorState, React.Dispatch<React.SetStateAction<DripTableGeneratorState>>];

export type GlobalStoreObject = {
  state: DripTableGeneratorState;
  setState: React.Dispatch<React.SetStateAction<DripTableGeneratorState>>;
};

export type GlobalActions = {
  toggleEditMode: (store?: GlobalStoreObject) => void;
  editColumns: (store?: GlobalStoreObject) => void;
  checkColumn: (store?: GlobalStoreObject) => void;
  updateDataSource: (store?: GlobalStoreObject) => void;
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
  updateDataSource(store) {
    store?.setState({ ...store.state, dataSource: [...store.state.dataSource] });
  },
  updateGlobalConfig(store) {
    store?.setState({ ...store.state, globalConfigs: { ...store.state.globalConfigs } });
  },
};

export const setState = (originState: DripTableGeneratorState, states?: DripTableGeneratorState) => {
  if (states) {
    Object.keys(states).forEach((key) => { originState[key] = states[key]; });
  }
};

const useStateHook = originState => useSharedState(originState, globalActions);

export default useStateHook;
