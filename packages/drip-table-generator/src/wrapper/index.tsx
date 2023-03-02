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
import { DripTableColumnSchema, DripTableExtraOptions, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, DripTableSchema, ExtractDripTableExtraOption } from 'drip-table';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';

import { filterAttributes, mockId } from '@/utils';
import { DripTableGeneratorContext, GeneratorContext } from '@/context';
import GeneratorLayout from '@/layouts';
import { builtInThemes } from '@/layouts/toolbar/config';
import { getSchemaValue } from '@/layouts/utils';

import { DataSourceTypeAbbr, DripTableGeneratorProps } from '../typing';

export type GeneratorWrapperHandler = {
  getState: () => DripTableGeneratorContext;
  getSchemaValue: () => DripTableSchema<DripTableColumnSchema>;
  getDataSource: () => DripTableGeneratorContext['previewDataSource'];
}

const generateProps2Configs = <
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(
    schema: DripTableGeneratorProps<RecordType, ExtraOptions>['schema'],
    customThemeOptions: DripTableGeneratorProps<RecordType, ExtraOptions>['customThemeOptions'],
    defaultTheme: DripTableGeneratorProps<RecordType, ExtraOptions>['defaultTheme']): DripTableGeneratorContext['tableConfigs'] => {
  const rootTableId = `${schema.id ?? mockId()}`;
  if (!schema) {
    return [{
      tableId: rootTableId,
      columns: [],
      configs: { pagination: false, header: false },
      subtable: false,
      dataSourceKey: '',
    }];
  }
  const configs: DripTableGeneratorContext['tableConfigs'] = [];
  const themeOptions = [...builtInThemes<RecordType, ExtraOptions>() || [], ...customThemeOptions || []];
  const themes = themeOptions.find(item => item.value === defaultTheme);
  let currentSchema = schema ? Object.assign({ dataSourceKey: void 0 }, schema) : void 0;
  let currentTheme = themes
    ? {
      id: rootTableId,
      style: themes.style,
      columnStyle: themes.columnStyle,
      subtable: themes.subtable,
    }
    : void 0;
  do {
    if (currentSchema) {
      const theSchema = { ...filterAttributes(currentSchema, 'dataSourceKey') };
      const themeStyle = typeof currentTheme?.style === 'function' ? currentTheme.style(theSchema) : currentTheme?.style;
      const columnStyle = currentTheme?.columnStyle;
      configs.push({
        tableId: `${currentSchema?.id || mockId()}`,
        columns: currentSchema?.columns.map((column, index) => ({ ...column, ...columnStyle?.(column, index) })) || [],
        configs: schema ? { ...currentSchema, ...themeStyle } : { pagination: false },
        subtable: !!currentSchema?.subtable,
        dataSourceKey: currentSchema?.dataSourceKey || '',
      });
    }
    currentSchema = currentSchema?.subtable ? Object.assign({ dataSourceKey: void 0 }, currentSchema.subtable) : void 0;
    currentTheme = currentTheme?.subtable
      ? {
        id: currentTheme.subtable.id,
        style: currentTheme.subtable.style,
        columnStyle: currentTheme.subtable.columnStyle,
        subtable: currentTheme.subtable.subtable,
      }
      : void 0;
  } while (currentSchema?.subtable);
  if (configs.length < 0) {
    return [{
      tableId: rootTableId,
      columns: [],
      configs: { pagination: false, header: false },
      subtable: false,
      dataSourceKey: '',
    }];
  }
  configs[0].tableId = rootTableId;
  return configs;
};

const generateStates = <
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: DripTableGeneratorProps<RecordType, ExtraOptions>): Omit<DripTableGeneratorContext, 'setState'> => {
  const schema = props.schema;
  const globalSchema = filterAttributes(schema, ['column', 'subtable']);
  const themeOptions = [...builtInThemes<RecordType, ExtraOptions>() || [], ...props.customThemeOptions || []];
  const defaultTheme = themeOptions.find(item => item.value === props.defaultTheme);
  const themeStyle = typeof defaultTheme?.style === 'function' ? defaultTheme.style(globalSchema) : defaultTheme?.style;
  const tableConfigs = generateProps2Configs(schema, props.customThemeOptions, props.defaultTheme);
  return {
    globalConfigs: schema
      ? { ...globalSchema, ...themeStyle }
      : { pagination: false, header: false },
    columns: schema?.columns.map((column, index) => ({ ...column, ...defaultTheme?.columnStyle?.(column, index), innerIndexForGenerator: index })) || [],
    previewDataSource: [...props.dataSource || []],
    mode: props.defaultMode || 'edit',
    tableConfigs,
    currentTableID: tableConfigs[0].tableId,
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
}) as <
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> (props: React.PropsWithoutRef<DripTableGeneratorProps<RecordType, ExtraOptions>> & React.RefAttributes<GeneratorWrapperHandler>) =>
(React.ReactElement | null);

export default DripTableGenerator;
