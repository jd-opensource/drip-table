/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import DripTable, { DripTableExtraOptions } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import React from 'react';

import { filterAttributes } from '@/utils';
import { GeneratorContext } from '@/context';
import { getSchemaValue } from '@/layouts/utils';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

const PreviewTable = <
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: DripTableGeneratorProps<RecordType, ExtraOptions> & { visible: boolean }) => {
  const context = React.useContext(GeneratorContext);
  return (
    <DripTable
      style={Object.assign({ ...props.style }, props.visible ? void 0 : { display: 'none' })}
      driver={DripTableDriverAntDesign}
      schema={getSchemaValue<ExtraOptions>(context)}
      dataSource={context.previewDataSource as RecordType[]}
      components={props.components || props.customComponents}
      {...filterAttributes(props, [
        'driver',
        'dataSource',
        'schema',
        'style',
        'customComponents',
        'visible',
        'mockDataSource',
        'dataFields',
        'showComponentLayout',
        'componentLayoutStyle',
        'rightLayoutMode',
        'rightLayoutStyle',
        'showToolLayout',
        'toolbarStyle',
        'defaultTheme',
        'customThemeOptions',
        'defaultMode',
        'dataFields',
        'noDataFeedBack',
        'customComponentPanel',
        'customGlobalConfigPanel',
        'customAttributeComponents',
        'slotsSchema',
        'onExportSchema',
        'onSchemaChange',
      ])}
    />
  );
};

export default PreviewTable;
