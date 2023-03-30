/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { message } from 'antd';
import ConfigProvider from 'antd/es/config-provider';
import zhCN from 'antd/es/locale/zh_CN';
import { DripTableExtraOptions, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, ExtractDripTableExtraOption } from 'drip-table';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';

import { DripTableGeneratorContext, DripTableGeneratorStates, GeneratorContext } from '@/context';
import GeneratorLayout from '@/layouts';
import { generateTableConfigsBySchema } from '@/layouts/utils';

import { DataSourceTypeAbbr, DripTableGeneratorProps } from '../typing';

export type GeneratorWrapperHandler = {
  getState: () => void;
  getSchemaValue: () => void;
  getDataSource: () => void;
}

const generateStates = <
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: DripTableGeneratorProps<RecordType, ExtraOptions>): DripTableGeneratorStates => ({
    currentTableID: void 0,
    previewDataSource: [...props.dataSource || []],
    mode: 'edit',
    tableConfigs: generateTableConfigsBySchema(props.schema),
  });

const DripTableGenerator = React.forwardRef(<
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: DripTableGeneratorProps<RecordType, ExtraOptions>, ref: React.ForwardedRef<GeneratorWrapperHandler>) => {
  const [generatorStates, setGeneratorStates] = React.useState(generateStates(props));

  const dripTableGeneratorContext: DripTableGeneratorContext = {
    ...generatorStates,
    updateTableConfig(config, index, callback) {
      const newTableConfigs = [...generatorStates.tableConfigs];
      newTableConfigs[index] = cloneDeep(config);
      const newStates = { ...generatorStates, tableConfigs: newTableConfigs };
      setGeneratorStates(newStates);
      callback?.(newTableConfigs);
    },
    updateTableConfigs(configs, callback) {
      const newTableConfigs = cloneDeep([...configs]);
      const newStates = { ...generatorStates, tableConfigs: newTableConfigs };
      setGeneratorStates(newStates);
      callback?.(newTableConfigs);
    },
    setTableConfigs(config, index, callback) {
      const newTableConfigs = [...generatorStates.tableConfigs];
      newTableConfigs[index] = {
        ...newTableConfigs[index],
        configs: config,
      };
      const newStates = { ...generatorStates, tableConfigs: newTableConfigs };
      setGeneratorStates(newStates);
      callback?.(newTableConfigs);
    },
    setTableColumns(columns, index, callback) {
      const newTableConfigs = [...generatorStates.tableConfigs];
      newTableConfigs[index] = {
        ...newTableConfigs[index],
        columns,
      };
      const newStates = { ...generatorStates, tableConfigs: newTableConfigs };
      setGeneratorStates(newStates);
      callback?.(newTableConfigs);
    },
    setState(states, callback) {
      if (!states) { return; }
      const newStates = { ...generatorStates };
      Object.keys(states).forEach((key) => {
        newStates[key] = cloneDeep(states[key]);
      });
      setGeneratorStates(newStates);
      callback?.(newStates);
    },
  };

  React.useImperativeHandle(ref, () => ({
    getState: () => false,
    getSchemaValue: () => false,
    getDataSource: () => [],
  }));

  React.useEffect(() => {
    props.onSchemaChange?.({ pagination: false, columns: [] });
  }, [generatorStates.tableConfigs]);

  message.config({ maxCount: 1 });

  return (
    <ConfigProvider locale={zhCN}>
      <GeneratorContext.Provider value={dripTableGeneratorContext}>
        <GeneratorLayout {...props} />
      </GeneratorContext.Provider>
    </ConfigProvider>
  );
}) as <
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> (props: React.PropsWithoutRef<DripTableGeneratorProps<RecordType, ExtraOptions>> & React.RefAttributes<GeneratorWrapperHandler>) =>
(React.ReactElement | null);

export default DripTableGenerator;
