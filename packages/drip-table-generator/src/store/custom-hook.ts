/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import React from 'react';

function setState<StateType>(that) {
  return (nextState: StateType) => {
    that.state = { ...that.state, ...nextState };
    that.subscriptions.forEach((subscription) => {
      subscription(that.state);
    });
  };
}

function useCustom(that) {
  return () => {
    const [state, subscription] = React.useState(that.state);
    React.useEffect(() => {
      that.subscriptions.push(subscription);
      return () => {
        that.subscriptions = that.subscriptions.filter(item => item !== subscription);
      };
    }, []);
    return [state, that.actions];
  };
}

function mappingActions(store, actions) {
  const associatedActions = {};
  Object.keys(actions).forEach((key) => {
    if (typeof actions[key] === 'function') {
      associatedActions[key] = actions[key].bind(null, store);
    }
    if (typeof actions[key] === 'object') {
      associatedActions[key] = mappingActions(store, actions[key]);
    }
  });
  return associatedActions;
}

export type StoreType<StateType> = {
  state: StateType;
  subscriptions: [];
  setState: (nextState: StateType) => void;
  actions: Record<string, unknown>;
}

export default function useSharedState<StateType>(initState: StateType, actions) {
  const store: StoreType<StateType> = {
    state: initState,
    subscriptions: [],
    setState,
    actions,
  };
  store.setState = setState<StateType>(store);
  store.actions = mappingActions(store, actions);
  return useCustom(store);
}
