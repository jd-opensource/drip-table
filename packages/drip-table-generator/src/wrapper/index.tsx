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
import { DripTableColumnSchema, DripTableExtraOptions, DripTableSchema } from 'drip-table';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';

import { filterAttributes } from '@/utils';
import { DripTableGeneratorContext, GeneratorContext } from '@/context';
import GeneratorLayout from '@/layouts';
import { themeList } from '@/layouts/toolbar/config';
import { getSchemaValue } from '@/layouts/utils';

import { DataSourceTypeAbbr, DripTableGeneratorProps } from '../typing';

export type GeneratorWrapperHandler = {
  getState: () => DripTableGeneratorContext;
  getSchemaValue: () => DripTableSchema<DripTableColumnSchema>;
  getDataSource: () => DripTableGeneratorContext['previewDataSource'];
}

const generateStates: <
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: DripTableGeneratorProps<RecordType, ExtraOptions>) => Omit<DripTableGeneratorContext, 'setState'> = (props) => {
  const schema = props.schema;
  const themeOptions = [...themeList, ...props.customThemeOptions || []];
  const columns = schema?.columns.map((item, index) => ({ index, ...item })) || [];
  const defaultTheme = themeOptions.find(item => item.value === props.defaultTheme);
  const columnsWithTheme = columns.map((column, index) => {
    const columnStyle = defaultTheme?.columnStyle?.(column, index);
    return {
      ...column,
      ...columnStyle,
    };
  });
  return {
    globalConfigs: schema
      ? { ...filterAttributes(schema, 'column'), ...Object.assign({}, defaultTheme?.style) }
      : { pagination: false, header: false },
    columns: columnsWithTheme,
    previewDataSource: [...props.dataSource || []],
    mode: props.defaultMode || 'edit',
  };
};

const DripTableGenerator = React.forwardRef(<
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: DripTableGeneratorProps<RecordType, ExtraOptions>, ref: React.ForwardedRef<GeneratorWrapperHandler>) => {
  const [generatorStates, setGeneratorStates] = React.useState(generateStates(props));
  const generatorContext: DripTableGeneratorContext = {
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
    getSchemaValue: () => getSchemaValue(generatorContext),
    getDataSource: () => generatorContext.previewDataSource,
  }));

  React.useEffect(() => {
    props.onSchemaChange?.(JSON.parse(JSON.stringify(getSchemaValue(generatorContext))));
  }, [generatorContext.columns, generatorContext.globalConfigs]);

  message.config({ maxCount: 1 });

  return (
    <ConfigProvider locale={zhCN}>
      <GeneratorContext.Provider value={generatorContext}>
        <GeneratorLayout {...props} />
      </GeneratorContext.Provider>
    </ConfigProvider>
  );
});

export default DripTableGenerator;
