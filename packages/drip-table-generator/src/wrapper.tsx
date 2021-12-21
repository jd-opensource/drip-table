import React, { useState, useImperativeHandle } from 'react';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import { useGlobalData } from './hooks';
import { defaultState, DripTableGeneratorState, GlobalStore, setState } from './store';
import AttributeLayout from './layout/attribute-layout';
import ComponentLayout from './layout/component-layout';
import EditableTable from './layout/editable-table';
import PreviewTable from './layout/preview-table';
import ToolLayout from './layout/tool-layout';
import { DripTableGeneratorProps } from './typing';

import styles from './index.module.less';

export type GeneratorWrapperHandler = {
  getState: () => DripTableGeneratorState;
}

const Wrapper = (props: DripTableGeneratorProps & {
  store: GlobalStore;
}, ref: React.ForwardedRef<GeneratorWrapperHandler>) => {
  const {
    style = {},
    driver,
    showComponentLayout = true,
    componentLayoutStyle = {},
    rightLayoutStyle = {},
    showToolLayout = true,
    dataSource,
    schema,
    customComponentPanel,
    customComponents,
  } = useGlobalData();
  const initialData = { previewDataSource: dataSource } as DripTableGeneratorState;
  if (schema) {
    initialData.globalConfigs = schema.configs;
    initialData.columns = schema.columns?.map((item, index) => ({ key: index, sort: index, ...item }));
  }
  const originState: DripTableGeneratorState = props.store ? props.store[0] : defaultState();
  setState(originState, { ...initialData });
  const store = useState(originState);
  const [state] = store;

  useImperativeHandle(ref, () => ({
    getState: () => state,
  }));

  let leftLayoutWidth = '280px';
  if (typeof componentLayoutStyle.width === 'number') {
    leftLayoutWidth = `${componentLayoutStyle.width}px`;
  } else if (typeof componentLayoutStyle.width === 'string') {
    leftLayoutWidth = componentLayoutStyle.width;
  }

  return (
    <div className={styles.wrapper} style={style}>
      { showComponentLayout && (
        <ComponentLayout store={store} width={componentLayoutStyle.width} customComponentPanel={customComponentPanel} />
      ) }
      <div
        className={`${styles['layout-right-wrapper']} ${!state.isEdit ? styles.preview : ''}`}
        style={showComponentLayout ? { width: `calc(100% - ${leftLayoutWidth})`, ...rightLayoutStyle } : {}}
      >
        <div className={styles['layout-right-title']}>
          <span style={{ margin: '0 12px', fontWeight: 'bold' }}>可视区</span>
          { showToolLayout && <ToolLayout store={store} /> }
        </div>
        <div className={styles['layout-right-workstation']}>
          { state.isEdit
            ? <EditableTable driver={driver || DripTableDriverAntDesign} customComponents={customComponents} store={store} />
            : <PreviewTable driver={driver || DripTableDriverAntDesign} customComponents={customComponents} store={store} /> }
          <AttributeLayout customComponentPanel={customComponentPanel} store={store} />
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
