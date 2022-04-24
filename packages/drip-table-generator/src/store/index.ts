/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { DripTableBuiltInColumnSchema, DripTableColumnSchema, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, DripTableSchema } from 'drip-table';
import cloneDeep from 'lodash/cloneDeep';

import useSharedState from './custom-hook';

export type DripTableColumn = (DripTableColumnSchema | DripTableBuiltInColumnSchema) & {
  index: number;
  sort: number;
};

export type GlobalSchema = Omit<DripTableSchema<DripTableColumn>, 'columns'> & { '$version'?: number };
export interface DripTableGeneratorState {
  isEdit: boolean;
  columns: DripTableColumn[];
  currentColumn?: DripTableColumn;
  currentColumnPath?: number[];
  globalConfigs: GlobalSchema;
  /** 表格数据，generator不需要知道数据格式是什么，直接交给drip-table即可 */
  previewDataSource: DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, React.Key>[];
}

export const defaultState: () => DripTableGeneratorState = () => ({
  isEdit: true,
  /** 生成的列配置 */
  columns: [],
  /** 当前选中的列 */
  currentColumn: void 0,
  /** 当前选中列内部选中路径 */
  currentColumnPath: [],
  /** 配置项 */
  globalConfigs: {
    pagination: false,
  },
  /** 数据 */
  previewDataSource: [],
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
  updatePreviewDataSource: (store?: GlobalStoreObject) => void;
  updateGlobalConfig: (store?: GlobalStoreObject) => void;
  updateColumnPath: (store?: GlobalStoreObject) => void;
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
    const version = Number(store?.state.globalConfigs.$version) || 0;
    store?.setState({ ...store.state, globalConfigs: cloneDeep({ ...store.state.globalConfigs, $version: version + 1 }) });
  },
  updateColumnPath(store) {
    store?.setState({ ...store.state, currentColumnPath: [...store.state?.currentColumnPath || []] });
  },
};

export const setState = (originState: DripTableGeneratorState, states?: DripTableGeneratorState) => {
  if (states) {
    Object.keys(states).forEach((key) => { originState[key] = cloneDeep(states[key]); });
  }
};

const useStateHook = originState => useSharedState(originState, globalActions);

export default useStateHook;
