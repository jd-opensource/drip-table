/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import DripTable, { DripTableExtraOptions } from 'drip-table';
import React from 'react';

import { filterAttributes } from '@/utils';
import { GeneratorContext } from '@/context';
import { TableConfigsContext } from '@/context/table-configs';
import { getSchemaValue } from '@/layouts/utils';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

const PreviewTable = <
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: DripTableGeneratorProps<RecordType, ExtraOptions> & { visible: boolean }) => {
  const context = React.useContext(GeneratorContext);
  const { tableConfigs } = React.useContext(TableConfigsContext);
  let width = 0;
  let widthStr = '';
  tableConfigs[0].columns.forEach((item) => {
    if (item.width === void 0) { width += 120; }
    if (typeof item.width === 'number') { width += item.width; }
    if (typeof item.width === 'string') { widthStr += ` + ${item.width}`; }
  });
  return (
    <div className="jfe-drip-table-generator-workstation-table-preview-wrapper">
      <DripTable
        style={Object.assign({
          ...props.style,
          width: props.style?.width ?? `calc(${width}px${widthStr})`,
        }, props.visible ? void 0 : { display: 'none' })}
        schema={getSchemaValue(tableConfigs)}
        dataSource={context.previewDataSource as RecordType[]}
        components={props.components || props.customComponents}
        {...filterAttributes(props, [
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
    </div>
  );
};

export default PreviewTable;
