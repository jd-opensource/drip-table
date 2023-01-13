/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { Alert } from 'antd';
import { DripTableExtraOptions } from 'drip-table';
import React from 'react';
import MonacoEditor from 'react-monaco-editor';

import { GeneratorContext } from '@/context';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

export type DataSourceHandler = {
  formatDataSource: () => void;
}

interface DataSourceEditorProps <
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>{
  width?: number;
  height?: number;
  onDataSourceChange: DripTableGeneratorProps<RecordType, ExtraOptions>['onDataSourceChange'];
}

const DataSourceEditor = <
RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: DataSourceEditorProps<RecordType, ExtraOptions>, ref: React.ForwardedRef<DataSourceHandler>) => {
  const { previewDataSource } = React.useContext(GeneratorContext);
  const [codeErrorMessage, setCodeErrorMessage] = React.useState('');
  const [code, setCode] = React.useState(JSON.stringify(previewDataSource, null, 4));

  React.useImperativeHandle(ref, () => ({
    formatDataSource: () => {
      setCode(JSON.stringify(previewDataSource, null, 4));
    },
  }));

  return (
    <GeneratorContext.Consumer>
      { ({ setState }) => (
        <div>
          { codeErrorMessage && <Alert style={{ margin: '8px 0' }} message={codeErrorMessage} type="error" showIcon /> }
          <MonacoEditor
            width={props.width || '100%'}
            height={props.height || '100%'}
            language="json"
            theme="vs-dark"
            value={code || ''}
            onChange={(value) => {
              setCodeErrorMessage('');
              setCode(value || '');
              try {
                const customDataSource = JSON.parse(value || '');
                if (Array.isArray(customDataSource)) {
                  setState({ previewDataSource: customDataSource }, () => {
                    props.onDataSourceChange?.(customDataSource);
                  });
                }
              } catch (error) {
                setCodeErrorMessage((error as Error).message);
              }
            }}
          />
        </div>
      ) }
    </GeneratorContext.Consumer>

  );
};

export default React.forwardRef(DataSourceEditor);
