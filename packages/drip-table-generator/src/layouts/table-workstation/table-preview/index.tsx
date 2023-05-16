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

  return (
    <div
      className="jfe-drip-table-generator-workstation-table-preview-wrapper"
      style={props.mode === 'modal'
        ? {
          width: (props.width ?? 1000) - 16,
          height: (props.height ?? 640) - 53,
        }
        : {
          width: '100%',
        }}
    >
      <DripTable
        style={Object.assign({ ...props.style },
          props.visible ? void 0 : { display: 'none' },
          props.mode === 'modal' ? { height: '', width: '' } : void 0)}
        schema={getSchemaValue(tableConfigs)}
        dataSource={context.previewDataSource as RecordType[]}
        components={props.components || props.customComponents}
        {...filterAttributes(props, [
          'width',
          'height',
          'mode',
          'dataSource',
          'schema',
          'style',
          'save',
          'onSave',
          'showTemplate',
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
