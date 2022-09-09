/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { message } from 'antd';
import { DripTableColumnSchema, DripTableExtraOptions, DripTableRecordTypeBase, DripTableSchema } from 'drip-table';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';

import { filterAttributes } from '@/utils';
import { DripTableGeneratorContext, GeneratorContext } from '@/context';
import GeneratorLayout from '@/layouts';

import { DripTableGeneratorProps } from '../typing';

export type GeneratorWrapperHandler = {
  getState: () => DripTableGeneratorContext<DripTableColumnSchema>;
  getSchemaValue: () => DripTableSchema<DripTableColumnSchema>;
}

const generateStates: <
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
>(props: DripTableGeneratorProps<RecordType, ExtraOptions>) => Omit<DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']>, 'setState'> = (props) => {
  const schema = props.schema;
  return {
    globalConfigs: schema
      ? { ...filterAttributes(schema, 'column') }
      : { pagination: false, header: false },
    columns: schema?.columns.map((item, index) => ({ index, ...item })) || [],
    previewDataSource: [...props.dataSource || []],
    mode: 'edit',
  };
};

const DripTableGenerator = React.forwardRef(<
RecordType extends DripTableRecordTypeBase = DripTableRecordTypeBase,
ExtraOptions extends DripTableExtraOptions = DripTableExtraOptions,
>(props: DripTableGeneratorProps<RecordType, ExtraOptions>, ref: React.ForwardedRef<GeneratorWrapperHandler>) => {
  const [generatorStates, setGeneratorStates] = React.useState(generateStates(props));
  const generatorContext: DripTableGeneratorContext<ExtraOptions['CustomColumnSchema']> = {
    ...generatorStates,
    setState: (states, callback) => {
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
    getState: () => generatorContext,
    getSchemaValue: () => ({
      ...filterAttributes(generatorContext.globalConfigs, '$version'),
      columns: generatorContext.columns.map(item => ({ ...item })),
    }),
  }));

  message.config({ maxCount: 1 });

  return (
    <GeneratorContext.Provider value={generatorContext}>
      <GeneratorLayout {...props} />
    </GeneratorContext.Provider>
  );
});

export default DripTableGenerator;
